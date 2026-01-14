import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import urllib.request
import urllib.parse

def handler(event: dict, context) -> dict:
    """Обработка заявок с сайта: отправка на email и в Telegram"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        name = body.get('name', '')
        phone = body.get('phone', '')
        email = body.get('email', '')
        product = body.get('product', '')
        message = body.get('message', '')
        
        if not name or not phone:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Имя и телефон обязательны'}),
                'isBase64Encoded': False
            }
        
        timestamp = datetime.now().strftime('%d.%m.%Y %H:%M')
        
        email_sent = False
        telegram_sent = False
        errors = []
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = os.environ.get('SMTP_PORT')
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        recipient_email = os.environ.get('RECIPIENT_EMAIL')
        
        if smtp_host and smtp_port and smtp_user and smtp_password and recipient_email:
            try:
                msg = MIMEMultipart('alternative')
                msg['Subject'] = f'Новая заявка с сайта СветТехПром - {timestamp}'
                msg['From'] = smtp_user
                msg['To'] = recipient_email
                
                html_content = f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #0EA5E9; border-radius: 10px;">
                        <h2 style="color: #0EA5E9; border-bottom: 2px solid #0EA5E9; padding-bottom: 10px;">
                            🔔 Новая заявка с сайта
                        </h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 150px;">Имя:</td>
                                <td style="padding: 10px;">{name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Телефон:</td>
                                <td style="padding: 10px;"><a href="tel:{phone}">{phone}</a></td>
                            </tr>
                            {f'''<tr>
                                <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Email:</td>
                                <td style="padding: 10px;"><a href="mailto:{email}">{email}</a></td>
                            </tr>''' if email else ''}
                            {f'''<tr>
                                <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Интересует:</td>
                                <td style="padding: 10px;">{product}</td>
                            </tr>''' if product else ''}
                            {f'''<tr>
                                <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Сообщение:</td>
                                <td style="padding: 10px;">{message}</td>
                            </tr>''' if message else ''}
                            <tr>
                                <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Время:</td>
                                <td style="padding: 10px;">{timestamp}</td>
                            </tr>
                        </table>
                    </div>
                </body>
                </html>
                """
                
                html_part = MIMEText(html_content, 'html', 'utf-8')
                msg.attach(html_part)
                
                with smtplib.SMTP(smtp_host, int(smtp_port)) as server:
                    server.starttls()
                    server.login(smtp_user, smtp_password)
                    server.send_message(msg)
                
                email_sent = True
            except Exception as e:
                errors.append(f'Email: {str(e)}')
        
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        if telegram_token and telegram_chat_id:
            try:
                telegram_text = f"""
🔔 <b>Новая заявка с сайта СветТехПром</b>

👤 <b>Имя:</b> {name}
📞 <b>Телефон:</b> {phone}
{f'📧 <b>Email:</b> {email}' if email else ''}
{f'📦 <b>Интересует:</b> {product}' if product else ''}
{f'💬 <b>Сообщение:</b> {message}' if message else ''}

🕐 <b>Время:</b> {timestamp}
                """.strip()
                
                url = f'https://api.telegram.org/bot{telegram_token}/sendMessage'
                data = {
                    'chat_id': telegram_chat_id,
                    'text': telegram_text,
                    'parse_mode': 'HTML'
                }
                
                req = urllib.request.Request(
                    url,
                    data=json.dumps(data).encode('utf-8'),
                    headers={'Content-Type': 'application/json'}
                )
                
                with urllib.request.urlopen(req) as response:
                    response.read()
                
                telegram_sent = True
            except Exception as e:
                errors.append(f'Telegram: {str(e)}')
        
        if email_sent or telegram_sent:
            status_parts = []
            if email_sent:
                status_parts.append('email')
            if telegram_sent:
                status_parts.append('Telegram')
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': f'Заявка отправлена в {" и ".join(status_parts)}',
                    'channels': {
                        'email': email_sent,
                        'telegram': telegram_sent
                    }
                }),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Не удалось отправить заявку. Проверьте настройки.',
                    'details': errors
                }),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }
