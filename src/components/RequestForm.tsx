import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface RequestFormProps {
  productName?: string;
  onClose: () => void;
}

export default function RequestForm({ productName, onClose }: RequestFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/ff379546-f6a5-4371-aac9-4d4d5f09700e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          product: productName || '',
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: '✅ Заявка отправлена!',
          description: data.message || 'Мы свяжемся с вами в ближайшее время',
        });
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
        setTimeout(() => onClose(), 2000);
      } else {
        toast({
          variant: 'destructive',
          title: '❌ Ошибка',
          description: data.error || 'Не удалось отправить заявку',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '❌ Ошибка',
        description: 'Не удалось отправить заявку. Проверьте подключение к интернету.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <Card 
        className="max-w-md w-full p-6 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Оставить заявку</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {productName && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-sm text-muted-foreground mb-1">Вы интересуетесь:</div>
            <div className="font-semibold text-primary">{productName}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Ваше имя <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван Петров"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Телефон <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@example.com"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Комментарий</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Расскажите, что вас интересует..."
              rows={4}
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить заявку
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Отмена
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={14} className="text-primary" />
              <span>Или позвоните: <a href="tel:+73830000000" className="text-primary hover:underline">+7 (383) 000-00-00</a></span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Mail" size={14} className="text-primary" />
              <span>Email: <a href="mailto:info@svettehprom.ru" className="text-primary hover:underline">info@svettehprom.ru</a></span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
