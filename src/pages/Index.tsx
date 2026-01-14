import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import RequestForm from '@/components/RequestForm';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  specs: {
    ip: string;
    warranty: string;
    cert: string;
    power: string;
    temp: string;
  };
  benefits: string[];
}

const products: Product[] = [
  {
    id: '1',
    category: 'signs',
    name: 'Светодиодный дорожный знак 1.23 (Дети)',
    description: 'Знак активной индикации с ярким светодиодным свечением для повышения видимости в условиях недостаточной освещенности',
    price: 'от 18 500 ₽',
    image: 'https://cdn.poehali.dev/projects/8917a7f8-78e0-448c-874a-bb1ba55a899e/files/5de1b236-c852-4f52-be0e-c5bb537d1bcd.jpg',
    specs: {
      ip: 'IP65',
      warranty: '3 года',
      cert: 'ГОСТ Р 52290-2004',
      power: '12 Вт',
      temp: '-40°C до +60°C'
    },
    benefits: [
      'Снижение аварийности на 42%',
      'Экономия электроэнергии до 85%',
      'Соответствие БКД',
      'Видимость до 200 метров'
    ]
  },
  {
    id: '2',
    category: 'signs',
    name: 'Светодиодный знак 3.24 (Ограничение скорости)',
    description: 'Активный дорожный знак с регулируемой яркостью и автоматической подстройкой под уровень освещения',
    price: 'от 21 000 ₽',
    image: 'https://cdn.poehali.dev/projects/8917a7f8-78e0-448c-874a-bb1ba55a899e/files/5de1b236-c852-4f52-be0e-c5bb537d1bcd.jpg',
    specs: {
      ip: 'IP66',
      warranty: '3 года',
      cert: 'ГОСТ Р 52290-2004',
      power: '15 Вт',
      temp: '-40°C до +65°C'
    },
    benefits: [
      'Автоматическая регулировка яркости',
      'Повышенная видимость в любое время',
      'Срок службы светодиодов 100 000 часов',
      'Быстрая окупаемость'
    ]
  },
  {
    id: '3',
    category: 'lights',
    name: 'Светофор транспортный Т.1',
    description: 'Трехсекционный транспортный светофор на светодиодах с увеличенным сроком службы',
    price: 'от 32 000 ₽',
    image: 'https://cdn.poehali.dev/projects/8917a7f8-78e0-448c-874a-bb1ba55a899e/files/b4607268-80d9-43eb-b2b4-a6aa8dcadf62.jpg',
    specs: {
      ip: 'IP54',
      warranty: '5 лет',
      cert: 'ГОСТ Р 52282-2004',
      power: '25 Вт',
      temp: '-40°C до +70°C'
    },
    benefits: [
      'Снижение энергопотребления в 10 раз',
      'Минимальное обслуживание',
      'Высокая контрастность сигнала',
      'Соответствие требованиям БДД'
    ]
  },
  {
    id: '4',
    category: 'lights',
    name: 'Пешеходный светофор П.1',
    description: 'Двухсекционный светофор для пешеходных переходов с повышенной яркостью',
    price: 'от 28 500 ₽',
    image: 'https://cdn.poehali.dev/projects/8917a7f8-78e0-448c-874a-bb1ba55a899e/files/b4607268-80d9-43eb-b2b4-a6aa8dcadf62.jpg',
    specs: {
      ip: 'IP54',
      warranty: '5 лет',
      cert: 'ГОСТ Р 52282-2004',
      power: '18 Вт',
      temp: '-40°C до +70°C'
    },
    benefits: [
      'Четкая видимость символов',
      'Защита от вандализма',
      'Минимальные эксплуатационные расходы',
      'Длительный срок службы'
    ]
  },
  {
    id: '5',
    category: 'smart',
    name: 'Контроллер дорожный КД-01',
    description: 'Интеллектуальный контроллер для управления светофорными объектами с поддержкой адаптивных алгоритмов',
    price: 'от 85 000 ₽',
    image: 'https://cdn.poehali.dev/projects/8917a7f8-78e0-448c-874a-bb1ba55a899e/files/ee90600f-3531-4419-b503-e7ff4deb2f9e.jpg',
    specs: {
      ip: 'IP40',
      warranty: '3 года',
      cert: 'ГОСТ Р',
      power: '50 Вт',
      temp: '-10°C до +50°C'
    },
    benefits: [
      'Снижение заторов на 35%',
      'Удаленное управление',
      'Интеграция с АСУДД',
      'Адаптивное регулирование'
    ]
  },
  {
    id: '6',
    category: 'parts',
    name: 'Комплект монтажный КМ-Т1',
    description: 'Полный набор крепежных элементов и стоек для установки светофорных объектов',
    price: 'от 12 000 ₽',
    image: 'https://cdn.poehali.dev/projects/8917a7f8-78e0-448c-874a-bb1ba55a899e/files/ee90600f-3531-4419-b503-e7ff4deb2f9e.jpg',
    specs: {
      ip: 'N/A',
      warranty: '2 года',
      cert: 'ГОСТ',
      power: 'N/A',
      temp: '-50°C до +80°C'
    },
    benefits: [
      'Все необходимое в комплекте',
      'Быстрый монтаж',
      'Антикоррозийное покрытие',
      'Соответствие нормам'
    ]
  }
];

const categories = [
  { id: 'all', name: 'Все продукты', icon: 'Grid3x3' },
  { id: 'signs', name: 'Светодиодные дорожные знаки', icon: 'Octagon' },
  { id: 'lights', name: 'Светофоры и секции', icon: 'CircleDot' },
  { id: 'smart', name: 'Умные транспортные системы', icon: 'Cpu' },
  { id: 'parts', name: 'Комплектующие и монтаж', icon: 'Wrench' }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestProductName, setRequestProductName] = useState('');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      
      <header className="relative border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
                <Icon name="Lightbulb" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">СветТехПром</h1>
                <p className="text-xs text-muted-foreground">Светотехническое оборудование</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="tel:+73830000000">
                  <Icon name="Phone" size={16} className="mr-2" />
                  +7 (383) 000-00-00
                </a>
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => {
                  setRequestProductName('');
                  setShowRequestForm(true);
                }}
              >
                Получить КП
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="border-primary text-primary">
                <Icon name="MapPin" size={14} className="mr-1" />
                Новосибирск и Сибирь
              </Badge>
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                Производство светодиодного
                <span className="text-primary"> дорожного оборудования</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Собственное производство, полный цикл монтажа и сервисного обслуживания. 
                Соответствие ГОСТ Р и требованиям БКД. Гарантия до 5 лет.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setRequestProductName('Каталог продукции');
                    setShowRequestForm(true);
                  }}
                >
                  <Icon name="FileText" size={18} className="mr-2" />
                  Скачать каталог
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    setRequestProductName('Расчет проекта');
                    setShowRequestForm(true);
                  }}
                >
                  <Icon name="Calculator" size={18} className="mr-2" />
                  Рассчитать проект
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-primary/20">
                <img 
                  src="https://cdn.poehali.dev/projects/8917a7f8-78e0-448c-874a-bb1ba55a899e/files/ee90600f-3531-4419-b503-e7ff4deb2f9e.jpg"
                  alt="Производство"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-lg p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Award" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-muted-foreground">Реализованных объектов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: 'Factory', title: 'Собственное производство', desc: 'Полный контроль качества' },
              { icon: 'Shield', title: 'Гарантия до 5 лет', desc: 'Сервисное обслуживание' },
              { icon: 'CheckCircle', title: 'ГОСТ Р сертификаты', desc: 'Полное соответствие БКД' },
              { icon: 'Truck', title: 'Монтаж под ключ', desc: 'По всей Сибири' }
            ].map((item, i) => (
              <Card key={i} className="p-6 tech-border hover:border-primary/50 transition-colors">
                <Icon name={item.icon as any} size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Каталог продукции</h2>
            <p className="text-muted-foreground text-lg">
              Светодиодное оборудование для безопасности дорожного движения
            </p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-8">
            <TabsList className="w-full grid grid-cols-5 h-auto p-1 bg-card">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="flex flex-col gap-2 py-4 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Icon name={cat.icon as any} size={20} />
                  <span className="text-xs font-medium">{cat.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Shield" size={12} className="mr-1" />
                        {product.specs.ip}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Award" size={12} className="mr-1" />
                        {product.specs.cert}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Clock" size={12} className="mr-1" />
                        {product.specs.warranty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-2xl font-bold text-primary">{product.price}</div>
                      <Button 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                      >
                        Подробнее
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши проекты</h2>
            <p className="text-muted-foreground text-lg">
              Реализованные объекты в Новосибирске и регионах Сибири
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Трасса М-52, км 145', desc: '45 светодиодных знаков, монтаж под ключ', img: 'https://cdn.poehali.dev/projects/8917a7f8-78e0-448c-874a-bb1ba55a899e/files/5de1b236-c852-4f52-be0e-c5bb537d1bcd.jpg' },
              { title: 'Перекресток ул. Ленина / Вокзальная', desc: 'Комплекс светофорного оборудования', img: 'https://cdn.poehali.dev/projects/8917a7f8-78e0-448c-874a-bb1ba55a899e/files/b4607268-80d9-43eb-b2b4-a6aa8dcadf62.jpg' },
              { title: 'Школьная зона, мкр. Академгородок', desc: 'Система активной индикации пешеходных переходов', img: 'https://cdn.poehali.dev/projects/8917a7f8-78e0-448c-874a-bb1ba55a899e/files/5de1b236-c852-4f52-be0e-c5bb537d1bcd.jpg' }
            ].map((project, i) => (
              <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 p-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl font-bold">Получите коммерческое предложение</h2>
              <p className="text-lg text-muted-foreground">
                Оставьте заявку и получите расчет стоимости в течение 2 часов. 
                Бесплатный выезд специалиста на объект в Новосибирске.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setRequestProductName('');
                    setShowRequestForm(true);
                  }}
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  Оставить заявку
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+73830000000">
                    <Icon name="Phone" size={18} className="mr-2" />
                    Позвонить сейчас
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <Icon name="Lightbulb" className="text-white" size={16} />
                </div>
                <span className="font-bold text-lg">СветТехПром</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Производство и поставка светодиодного дорожного оборудования
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Продукция</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Дорожные знаки</li>
                <li>Светофоры</li>
                <li>Умные системы</li>
                <li>Комплектующие</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О производстве</li>
                <li>Сертификаты</li>
                <li>Проекты</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={14} />
                  Новосибирск
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  +7 (383) 000-00-00
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  info@svettehprom.ru
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 СветТехПром. Все права защищены. ОГРН 1234567890123
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <Card 
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                  <p className="text-muted-foreground">{selectedProduct.description}</p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Технические характеристики</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Степень защиты</div>
                      <div className="font-bold">{selectedProduct.specs.ip}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Гарантия</div>
                      <div className="font-bold">{selectedProduct.specs.warranty}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Сертификат</div>
                      <div className="font-bold">{selectedProduct.specs.cert}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Мощность</div>
                      <div className="font-bold">{selectedProduct.specs.power}</div>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <div className="text-xs text-muted-foreground">Диапазон температур</div>
                      <div className="font-bold">{selectedProduct.specs.temp}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Преимущества</h3>
                  <ul className="space-y-2">
                    {selectedProduct.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border space-y-4">
                  <div className="text-3xl font-bold text-primary">{selectedProduct.price}</div>
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => {
                        setRequestProductName(selectedProduct.name);
                        setSelectedProduct(null);
                        setShowRequestForm(true);
                      }}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Заказать
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setRequestProductName(`ТЗ на ${selectedProduct.name}`);
                        setSelectedProduct(null);
                        setShowRequestForm(true);
                      }}
                    >
                      <Icon name="Download" size={18} className="mr-2" />
                      Скачать ТЗ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showRequestForm && (
        <RequestForm 
          productName={requestProductName}
          onClose={() => setShowRequestForm(false)}
        />
      )}
    </div>
  );
}