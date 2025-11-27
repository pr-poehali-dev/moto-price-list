import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Category {
  id: string;
  name: string;
  emoji: string;
  route: string;
}

const categories: Category[] = [
  { id: '1', name: '!!!! Новое в прайсе !!!!!', emoji: '🆕', route: '/category/new' },
  { id: '2', name: '139QMB 50-100cc Китайский мопед вариаторный', emoji: '🛵', route: '/category/139qmb' },
  { id: '3', name: '2т Китайцы цепные', emoji: '🏍️', route: '/category/2t-chain' },
  { id: '4', name: '152QMI 157QMJ 125-150cc Китайский мопед вариаторный', emoji: '🛵', route: '/category/152qmi' },
  { id: '5', name: 'Aktive', emoji: '🏍️', route: '/category/aktive' },
  { id: '6', name: 'Delta Alfa', emoji: '🛵', route: '/category/delta-alfa' },
  { id: '7', name: 'Honda', emoji: '🏍️', route: '/category/honda' },
  { id: '8', name: 'Suzuki', emoji: '🏍️', route: '/category/suzuki' },
  { id: '9', name: 'Yamaha', emoji: '🏍️', route: '/category/yamaha' },
  { id: '10', name: 'АКЦИЯ!!!! (цена указана за количество которое стоит в скобках)', emoji: '🎁', route: '/sales' },
  { id: '11', name: 'Аккумуляторы', emoji: '🔋', route: '/category/batteries' },
  { id: '12', name: 'Аксессуары', emoji: '🧰', route: '/category/accessories' },
  { id: '13', name: 'Запчасти на Питбайки', emoji: '🏍️', route: '/category/pitbike' },
  { id: '14', name: 'Масло, ХИМИЯ', emoji: '🛢️', route: '/category/oil' },
  { id: '15', name: 'Подшипники', emoji: '⚙️', route: '/category/bearings' },
  { id: '16', name: 'Покрышки', emoji: '🛞', route: '/category/tires' },
  { id: '17', name: 'Резина вело', emoji: '🚴', route: '/category/bike-tires' },
  { id: '18', name: 'Резина камера', emoji: '🏍️', route: '/category/inner-tubes' },
  { id: '19', name: 'Ремни', emoji: '⚙️', route: '/category/belts' },
  { id: '20', name: 'Свечи зажигания', emoji: '⚡', route: '/category/spark-plugs' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'catalog' | 'sales'>('catalog');

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const catalogCategories = filteredCategories.filter(cat => !cat.name.includes('АКЦИЯ'));
  const salesCategories = filteredCategories.filter(cat => cat.name.includes('АКЦИЯ'));

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-lg">
        <h1 className="text-xl font-bold text-center">Каталог мотодеталей</h1>
      </header>

      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск по каталогу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex-1 py-3 font-medium transition-colors ${
              activeTab === 'catalog'
                ? 'text-secondary border-b-2 border-secondary'
                : 'text-muted-foreground'
            }`}
          >
            Каталог
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`flex-1 py-3 font-medium transition-colors ${
              activeTab === 'sales'
                ? 'text-secondary border-b-2 border-secondary'
                : 'text-muted-foreground'
            }`}
          >
            Акции
          </button>
        </div>

        <div className="space-y-1">
          {activeTab === 'catalog' ? (
            catalogCategories.length > 0 ? (
              catalogCategories.map((category) => (
                <Link
                  key={category.id}
                  to={category.route}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
                >
                  <span className="text-3xl">{category.emoji}</span>
                  <span className="text-base flex-1">{category.name}</span>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </Link>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">Ничего не найдено</p>
            )
          ) : (
            salesCategories.length > 0 ? (
              salesCategories.map((category) => (
                <Link
                  key={category.id}
                  to={category.route}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
                >
                  <span className="text-3xl">{category.emoji}</span>
                  <span className="text-base flex-1 text-secondary font-medium">{category.name}</span>
                  <Icon name="ChevronRight" size={20} className="text-secondary" />
                </Link>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">Нет активных акций</p>
            )
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 text-center shadow-lg">
        <p className="text-sm">Заказы</p>
      </div>
    </div>
  );
};

export default Index;