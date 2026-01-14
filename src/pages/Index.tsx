import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  { id: 'all', name: 'Все продукты', icon: 'Grid3x3' as const },
  { id: 'signs', name: 'Дорожные знаки', icon: 'Triangle' as const },
  { id: 'lights', name: 'Светофоры', icon: 'Lightbulb' as const },
  { id: 'smart', name: 'Умные системы', icon: 'Cpu' as const },
  { id: 'parts', name: 'Комплектующие', icon: 'Package' as const },
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
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-yellow-50/30">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Icon name="ShieldCheck" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  СветТехПром
                </h1>
                <p className="text-xs text-muted-foreground">Безопасность на дорогах</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <a href="tel:+73830000000">
                  <Icon name="Phone" size={16} className="mr-2" />
                  +7 (383) 000-00-00
                </a>
              </Button>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md"
                onClick={() => {
                  setRequestProductName('');
                  setShowRequestForm(true);
                }}
              >
                <Icon name="Send" size={16} className="mr-2" />
                Связаться
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20 px-4 py-2">
              <Icon name="Award" size={16} className="mr-2" />
              Сертифицированное оборудование
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Современные решения для{' '}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
                безопасности дорог
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Производим и поставляем светодиодные дорожные знаки, светофоры и системы управления дорожным движением
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 shadow-lg text-base px-8 h-14"
                onClick={() => {
                  setRequestProductName('Каталог продукции');
                  setShowRequestForm(true);
                }}
              >
                <Icon name="Download" size={20} className="mr-2" />
                Скачать каталог
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 text-base px-8 h-14"
                onClick={() => {
                  setRequestProductName('Расчет проекта');
                  setShowRequestForm(true);
                }}
              >
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать проект
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: 'Shield', title: '10+ лет', desc: 'на рынке' },
              { icon: 'Award', title: '5000+', desc: 'проектов' },
              { icon: 'Users', title: '500+', desc: 'клиентов' },
              { icon: 'TrendingUp', title: '42%', desc: 'снижение аварий' },
            ].map((stat, i) => (
              <Card key={i} className="p-6 text-center border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat.icon as any} size={24} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.title}</div>
                <div className="text-sm text-muted-foreground">{stat.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наша продукция</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Полный спектр оборудования для организации безопасного дорожного движения
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id 
                  ? 'bg-gradient-to-r from-primary to-green-500 shadow-lg' 
                  : 'border-2 hover:border-primary/50'
                }
              >
                <Icon name={cat.icon} size={18} className="mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden cursor-pointer border-2 hover:border-primary/50 hover:shadow-xl transition-all"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-primary to-green-500 text-white border-0 shadow-lg">
                      {product.category === 'signs' && 'Знаки'}
                      {product.category === 'lights' && 'Светофоры'}
                      {product.category === 'smart' && 'Умные системы'}
                      {product.category === 'parts' && 'Комплектующие'}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t-2 border-border">
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {product.price}
                    </div>
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90"
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
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 via-green-50/50 to-secondary/5">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-10 shadow-2xl border-2">
            <div className="text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icon name="MessageSquare" size={32} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Есть вопросы?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Оставьте заявку и наш специалист свяжется с вами для бесплатной консультации
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-green-500 hover:opacity-90 shadow-lg text-base px-8 h-14"
                  onClick={() => {
                    setRequestProductName('');
                    setShowRequestForm(true);
                  }}
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Оставить заявку
                </Button>
                <Button size="lg" variant="outline" asChild className="border-2 text-base px-8 h-14">
                  <a href="tel:+73830000000">
                    <Icon name="Phone" size={20} className="mr-2" />
                    Позвонить сейчас
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="ShieldCheck" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">СветТехПром</span>
              </div>
              <p className="text-slate-300 text-sm">
                Надежные решения для безопасности дорожного движения
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Контакты</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <a href="tel:+73830000000" className="hover:text-white transition-colors">
                    +7 (383) 000-00-00
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <a href="mailto:info@svettehprom.ru" className="hover:text-white transition-colors">
                    info@svettehprom.ru
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span>г. Новосибирск</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Режим работы</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div>Пн-Пт: 9:00 - 18:00</div>
                <div>Сб-Вс: Выходной</div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p>© 2024 СветТехПром. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <Card 
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white shadow-lg"
                onClick={() => setSelectedProduct(null)}
              >
                <Icon name="X" size={20} />
              </Button>
              <div className="h-80 overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="p-8">
              <Badge className="mb-4 bg-gradient-to-r from-primary to-green-500 text-white border-0">
                {selectedProduct.category === 'signs' && 'Дорожные знаки'}
                {selectedProduct.category === 'lights' && 'Светофоры'}
                {selectedProduct.category === 'smart' && 'Умные системы'}
                {selectedProduct.category === 'parts' && 'Комплектующие'}
              </Badge>
              <h2 className="text-3xl font-bold mb-4">{selectedProduct.name}</h2>
              <p className="text-muted-foreground mb-8 text-lg">{selectedProduct.description}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                    <Icon name="Settings" size={20} className="text-primary" />
                    Технические характеристики
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(selectedProduct.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground capitalize">
                          {key === 'ip' && 'Защита'}
                          {key === 'warranty' && 'Гарантия'}
                          {key === 'cert' && 'Сертификат'}
                          {key === 'power' && 'Мощность'}
                          {key === 'temp' && 'Температура'}
                        </span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                    <Icon name="CheckCircle" size={20} className="text-primary" />
                    Преимущества
                  </h3>
                  <ul className="space-y-3">
                    {selectedProduct.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t-2 pt-6 space-y-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {selectedProduct.price}
                </div>
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary to-green-500 hover:opacity-90 shadow-lg h-12"
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
                    className="flex-1 border-2 h-12"
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