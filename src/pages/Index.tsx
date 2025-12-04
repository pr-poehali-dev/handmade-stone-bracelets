import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface Bracelet {
  id: number;
  name: string;
  stone: string;
  price: number;
  image: string;
  description: string;
  reviews: Review[];
  averageRating: number;
}

interface CartItem {
  bracelet: Bracelet;
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedBracelet, setSelectedBracelet] = useState<Bracelet | null>(null);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, text: '' });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const bracelets: Bracelet[] = [
    {
      id: 1,
      name: 'Midnight Elegance',
      stone: 'Чёрный Оникс',
      price: 12500,
      image: 'https://cdn.poehali.dev/projects/8e42c228-18df-4ab7-9132-64c9173c6ce3/files/2f39ce26-e453-4978-8292-e8c38d893079.jpg',
      description: 'Роскошный браслет из натурального чёрного оникса с золотыми вставками. Символ силы и элегантности.',
      reviews: [
        { id: 1, author: 'Анна М.', rating: 5, text: 'Невероятно красивый браслет! Качество на высшем уровне.', date: '15.11.2024' },
        { id: 2, author: 'Екатерина В.', rating: 5, text: 'Ношу каждый день, получаю комплименты. Спасибо мастеру!', date: '10.11.2024' }
      ],
      averageRating: 5
    },
    {
      id: 2,
      name: 'Rose Dream',
      stone: 'Розовый Кварц',
      price: 9800,
      image: 'https://cdn.poehali.dev/projects/8e42c228-18df-4ab7-9132-64c9173c6ce3/files/9c44beb1-8e88-468b-b43f-069f6aa5297e.jpg',
      description: 'Нежный браслет из розового кварца — камня любви и гармонии. Идеально подходит для особых случаев.',
      reviews: [
        { id: 3, author: 'Мария С.', rating: 5, text: 'Очень нежный и красивый. Камни качественные, работа аккуратная.', date: '20.11.2024' }
      ],
      averageRating: 5
    },
    {
      id: 3,
      name: 'Golden Tiger',
      stone: 'Тигровый Глаз',
      price: 11200,
      image: 'https://cdn.poehali.dev/projects/8e42c228-18df-4ab7-9132-64c9173c6ce3/files/94640224-a328-45f6-bb1e-3df566a4aed2.jpg',
      description: 'Эксклюзивный браслет из тигрового глаза с золотым покрытием. Камень удачи и процветания.',
      reviews: [
        { id: 4, author: 'Дмитрий К.', rating: 5, text: 'Купил в подарок жене, она в восторге! Упаковка премиальная.', date: '18.11.2024' },
        { id: 5, author: 'Ольга Р.', rating: 4, text: 'Красивый браслет, немного тяжеловат, но качество отличное.', date: '12.11.2024' }
      ],
      averageRating: 4.5
    }
  ];

  const handleAddReview = (braceletId: number) => {
    if (newReview.author && newReview.text) {
      setNewReview({ author: '', rating: 5, text: '' });
    }
  };

  const addToCart = (bracelet: Bracelet) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.bracelet.id === bracelet.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.bracelet.id === bracelet.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { bracelet, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (braceletId: number) => {
    setCart(prevCart => prevCart.filter(item => item.bracelet.id !== braceletId));
  };

  const updateQuantity = (braceletId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(braceletId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.bracelet.id === braceletId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.bracelet.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Icon 
        key={i} 
        name={i < rating ? "Star" : "Star"} 
        size={16} 
        className={i < rating ? "fill-accent text-accent" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <img 
            src="https://cdn.poehali.dev/files/3d72b536-61c2-4840-aa8d-78c7f67bdd4f.jpeg" 
            alt="BRIOL'Ka Logo" 
            className="h-12 sm:h-14 w-auto object-contain cursor-pointer animate-fade-in"
            onClick={() => setActiveSection('home')}
          />
          <div className="hidden md:flex items-center gap-8">
            {['home', 'catalog', 'about', 'gallery', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`font-medium transition-colors ${
                  activeSection === section ? 'text-accent' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {section === 'home' && 'Главная'}
                {section === 'catalog' && 'Каталог'}
                {section === 'about' && 'О мастере'}
                {section === 'gallery' && 'Галерея'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-primary">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {cart.map((item) => (
                          <Card key={item.bracelet.id}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img 
                                  src={item.bracelet.image} 
                                  alt={item.bracelet.name}
                                  className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                  <h4 className="font-serif font-bold mb-1">{item.bracelet.name}</h4>
                                  <p className="text-sm text-muted-foreground mb-2">{item.bracelet.stone}</p>
                                  <p className="font-semibold text-accent">{item.bracelet.price.toLocaleString()} ₽</p>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => removeFromCart(item.bracelet.id)}
                                  >
                                    <Icon name="X" size={16} />
                                  </Button>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.bracelet.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.bracelet.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="border-t border-border pt-4 space-y-4">
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-semibold">Итого:</span>
                          <span className="font-serif text-2xl font-bold text-accent">{getTotalPrice().toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-6 text-lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-primary">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {cart.map((item) => (
                          <Card key={item.bracelet.id}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img 
                                  src={item.bracelet.image} 
                                  alt={item.bracelet.name}
                                  className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                  <h4 className="font-serif font-bold mb-1">{item.bracelet.name}</h4>
                                  <p className="text-sm text-muted-foreground mb-2">{item.bracelet.stone}</p>
                                  <p className="font-semibold text-accent">{item.bracelet.price.toLocaleString()} ₽</p>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => removeFromCart(item.bracelet.id)}
                                  >
                                    <Icon name="X" size={16} />
                                  </Button>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.bracelet.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.bracelet.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="border-t border-border pt-4 space-y-4">
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-semibold">Итого:</span>
                          <span className="font-serif text-2xl font-bold text-accent">{getTotalPrice().toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-6 text-lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Icon name="Menu" size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle>
                    <img 
                      src="https://cdn.poehali.dev/files/ee29e6e1-d342-4bcb-82bd-cd7a271f5d5d.jpeg" 
                      alt="BRIOL'Ka Logo" 
                      className="h-12 w-auto object-contain brightness-0 invert"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {['home', 'catalog', 'about', 'gallery', 'contacts'].map((section) => (
                    <button
                      key={section}
                      onClick={() => {
                        setActiveSection(section);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left font-medium py-3 px-4 rounded-md transition-colors ${
                        activeSection === section 
                          ? 'bg-accent text-primary' 
                          : 'text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      {section === 'home' && 'Главная'}
                      {section === 'catalog' && 'Каталог'}
                      {section === 'about' && 'О мастере'}
                      {section === 'gallery' && 'Галерея'}
                      {section === 'contacts' && 'Контакты'}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {activeSection === 'home' && (
          <div className="animate-fade-in">
            <section className="relative min-h-[70vh] sm:h-[90vh] flex items-center justify-center bg-gradient-to-b from-secondary/50 to-background">
              <div className="text-center max-w-4xl px-4 sm:px-6 py-12">
                <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-primary mb-4 sm:mb-6 animate-scale-in">
                  Браслеты ручной работы
                </h2>
                <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 font-light">
                  Эксклюзивные украшения из натуральных камней с золотыми акцентами
                </p>
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-primary font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
                  onClick={() => setActiveSection('catalog')}
                >
                  Смотреть коллекцию
                </Button>
              </div>
            </section>

            <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Icon name="Gem" size={48} className="mx-auto mb-4 text-accent" />
                    <h3 className="font-serif text-2xl font-bold mb-3">Натуральные камни</h3>
                    <p className="text-muted-foreground">Только подлинные минералы высшего качества</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Icon name="Sparkles" size={48} className="mx-auto mb-4 text-accent" />
                    <h3 className="font-serif text-2xl font-bold mb-3">Ручная работа</h3>
                    <p className="text-muted-foreground">Каждый браслет создан с любовью и вниманием к деталям</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Icon name="Award" size={48} className="mx-auto mb-4 text-accent" />
                    <h3 className="font-serif text-2xl font-bold mb-3">Премиум качество</h3>
                    <p className="text-muted-foreground">Золотые элементы и безупречное исполнение</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto animate-fade-in">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-16">Наша коллекция</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {bracelets.map((bracelet) => (
                <Card key={bracelet.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img 
                      src={bracelet.image} 
                      alt={bracelet.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-serif text-2xl font-bold mb-1">{bracelet.name}</h3>
                        <Badge variant="secondary" className="text-xs">{bracelet.stone}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="fill-accent text-accent" />
                        <span className="font-semibold">{bracelet.averageRating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm">{bracelet.description}</p>
                    <div className="flex justify-between items-center gap-2">
                      <span className="font-serif text-2xl font-bold text-accent">{bracelet.price.toLocaleString()} ₽</span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedBracelet(bracelet)}
                        >
                          <Icon name="MessageCircle" size={16} />
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-accent hover:bg-accent/90 text-primary"
                          onClick={() => addToCart(bracelet)}
                        >
                          <Icon name="ShoppingCart" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto animate-fade-in">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">О мастере</h2>
            <Card className="p-10">
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Меня зовут Елена, и я создаю украшения из натуральных камней уже более 10 лет. 
                  Каждый браслет — это результат тщательного отбора камней, вдохновения и кропотливой ручной работы.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Я верю, что украшения должны не только радовать глаз, но и нести энергетику природы. 
                  Поэтому использую только натуральные минералы высшего качества и драгоценные металлы.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Каждый браслет уникален, создан вручную и несёт частичку моей души. 
                  Для меня важно, чтобы мои работы приносили радость и вдохновение их обладателям.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'gallery' && (
          <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto animate-fade-in">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-16">Галерея работ</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {bracelets.map((bracelet) => (
                <div key={bracelet.id} className="aspect-square overflow-hidden rounded-lg group cursor-pointer">
                  <img 
                    src={bracelet.image} 
                    alt={bracelet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-2xl mx-auto animate-fade-in">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">Контакты</h2>
            <Card className="p-10">
              <CardContent>
                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-4">
                    <Icon name="Mail" size={24} className="text-accent" />
                    <span className="text-lg">info@bracelets-stone.ru</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Icon name="Phone" size={24} className="text-accent" />
                    <span className="text-lg">+7 (999) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Icon name="MapPin" size={24} className="text-accent" />
                    <span className="text-lg">Москва, ул. Примерная, д. 1</span>
                  </div>
                </div>
                
                <div className="border-t border-border pt-8">
                  <h3 className="font-serif text-2xl font-bold mb-6">Связаться со мной</h3>
                  <form className="space-y-4">
                    <Input placeholder="Ваше имя" />
                    <Input type="email" placeholder="Email" />
                    <Textarea placeholder="Сообщение" rows={4} />
                    <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold">
                      Отправить
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {selectedBracelet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={() => setSelectedBracelet(null)}>
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-serif text-3xl font-bold mb-2">{selectedBracelet.name}</h3>
                  <div className="flex items-center gap-2">
                    {renderStars(Math.round(selectedBracelet.averageRating))}
                    <span className="text-muted-foreground">({selectedBracelet.reviews.length} отзывов)</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedBracelet(null)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>

              <div className="space-y-6 mb-8">
                {selectedBracelet.reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <div className="flex gap-1 mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-serif text-xl font-bold mb-4">Оставить отзыв</h4>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddReview(selectedBracelet.id); }}>
                  <Input 
                    placeholder="Ваше имя" 
                    value={newReview.author}
                    onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                  />
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Оценка</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                        >
                          <Icon 
                            name="Star" 
                            size={24} 
                            className={star <= newReview.rating ? "fill-accent text-accent" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Textarea 
                    placeholder="Ваш отзыв" 
                    rows={3}
                    value={newReview.text}
                    onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                  />
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold">
                    Отправить отзыв
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <footer className="bg-primary text-primary-foreground py-8 sm:py-12 mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <img 
            src="https://cdn.poehali.dev/files/ee29e6e1-d342-4bcb-82bd-cd7a271f5d5d.jpeg" 
            alt="BRIOL'Ka Logo" 
            className="h-12 sm:h-16 w-auto object-contain mx-auto mb-4"
          />
          <p className="text-primary-foreground/80 mb-6">Браслеты ручной работы из натуральных камней</p>
          <div className="flex justify-center gap-6">
            <Icon name="Instagram" size={24} className="cursor-pointer hover:text-accent transition-colors" />
            <Icon name="Facebook" size={24} className="cursor-pointer hover:text-accent transition-colors" />
            <Icon name="Send" size={24} className="cursor-pointer hover:text-accent transition-colors" />
          </div>
          <p className="text-sm text-primary-foreground/60 mt-8">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;