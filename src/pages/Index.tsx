import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Category {
  id: string;
  name: string;
  image: string;
  route: string;
}

const categories: Category[] = [
  { id: '1', name: '!!!! Новое в прайсе !!!!!', image: 'https://cdn.poehali.dev/files/dfa81e9c-998a-4cca-a8f3-588f9c520e0f.jpg', route: '/category/new' },
  { id: '2', name: '139QMB 50-100cc Китайский мопед вариаторный', image: 'https://cdn.poehali.dev/files/0ff6e11a-8d32-4b3f-9448-9def2089aa08.jpg', route: '/category/139qmb' },
  { id: '3', name: '2т Китайцы цепные', image: 'https://cdn.poehali.dev/files/ada89d07-075a-4226-b971-05eb6d7eb1f5.jpg', route: '/category/2t-chain' },
  { id: '4', name: '152QMI 157QMJ 125-150cc Китайский мопед вариаторный', image: 'https://cdn.poehali.dev/files/e22cb5c8-02b1-4cb0-9ef4-f334c8d3a367.jpg', route: '/category/152qmi' },
  { id: '5', name: 'Aktive', image: 'https://cdn.poehali.dev/files/97861d4a-6b6b-4306-9689-db061c6ee68d.jpg', route: '/category/aktive' },
  { id: '6', name: 'Delta Alfa', image: 'https://cdn.poehali.dev/files/7344f1df-1432-422c-b028-cde3667a4717.jpg', route: '/category/delta-alfa' },
  { id: '7', name: 'Honda', image: 'https://cdn.poehali.dev/files/d175a475-aa65-4309-b55e-0c9b77277fa3.jpg', route: '/category/honda' },
  { id: '8', name: 'Suzuki', image: 'https://cdn.poehali.dev/files/175c0691-e70c-4ca0-b79b-9a40b52d2a79.jpg', route: '/category/suzuki' },
  { id: '9', name: 'Yamaha', image: 'https://cdn.poehali.dev/files/8913c9ed-791f-405f-a136-5685da410d4f.jpg', route: '/category/yamaha' },
  { id: '10', name: 'АКЦИЯ!!!! (цена указана за количество которое стоит в скобках)', image: 'https://cdn.poehali.dev/files/a733be22-769c-45e6-a5ca-d500f289237e.jpg', route: '/sales' },
  { id: '11', name: 'Аккумуляторы', image: 'https://cdn.poehali.dev/files/c0c8affc-6368-416d-b82b-ae719a20f788.jpg', route: '/category/batteries' },
  { id: '12', name: 'Аксессуары', image: 'https://cdn.poehali.dev/files/a931bae4-f061-41f4-8723-0187d08658c1.jpg', route: '/category/accessories' },
  { id: '13', name: 'Запчасти на Питбайки', image: 'https://cdn.poehali.dev/files/2c25bcbc-5d94-4f36-96ed-8c98f505b249.jpg', route: '/category/pitbike' },
  { id: '14', name: 'Масло, ХИМИЯ', image: 'https://cdn.poehali.dev/files/fd733e33-5155-4547-bc59-5283a61ad564.jpg', route: '/category/oil' },
  { id: '15', name: 'Подшипники', image: 'https://cdn.poehali.dev/files/c0c8affc-6368-416d-b82b-ae719a20f788.jpg', route: '/category/bearings' },
  { id: '16', name: 'Покрышки', image: 'https://cdn.poehali.dev/files/a931bae4-f061-41f4-8723-0187d08658c1.jpg', route: '/category/tires' },
  { id: '17', name: 'Резина вело', image: 'https://cdn.poehali.dev/files/2c25bcbc-5d94-4f36-96ed-8c98f505b249.jpg', route: '/category/bike-tires' },
  { id: '18', name: 'Резина камера', image: 'https://cdn.poehali.dev/files/fd733e33-5155-4547-bc59-5283a61ad564.jpg', route: '/category/inner-tubes' },
  { id: '19', name: 'Ремни', image: 'https://cdn.poehali.dev/files/c0c8affc-6368-416d-b82b-ae719a20f788.jpg', route: '/category/belts' },
  { id: '20', name: 'Свечи зажигания', image: 'https://cdn.poehali.dev/files/a931bae4-f061-41f4-8723-0187d08658c1.jpg', route: '/category/spark-plugs' },
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
                  className="flex items-center gap-4 p-4 hover:bg-card active:bg-muted transition-colors border-b border-border"
                >
                  <img src={category.image} alt={category.name} className="w-12 h-12 object-cover rounded" />
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
                  className="flex items-center gap-4 p-4 hover:bg-card active:bg-muted transition-colors border-b border-border"
                >
                  <img src={category.image} alt={category.name} className="w-12 h-12 object-cover rounded" />
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