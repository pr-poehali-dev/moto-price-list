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
  { id: '1', name: '!!!! Новое в прайсе !!!!!', image: 'https://cdn.poehali.dev/files/87d9429f-0c96-4dc2-9c67-12ea08a877d6.jpg', route: '/category/new' },
  { id: '2', name: '139QMB 50-100cc Китайский мопед вариаторный', image: 'https://cdn.poehali.dev/files/121fe29c-6a2f-4239-b175-081e12c6b5fd.jpg', route: '/category/139qmb' },
  { id: '3', name: '2т Китайцы цепные', image: 'https://cdn.poehali.dev/files/a4736cd5-ee70-494a-850a-f6f414abf050.jpg', route: '/category/2t-chain' },
  { id: '4', name: '152QMI 157QMJ 125-150cc Китайский мопед вариаторный', image: 'https://cdn.poehali.dev/files/754e1f09-0b09-4b4f-baca-084bbd5346a8.jpg', route: '/category/152qmi' },
  { id: '5', name: 'Aktive', image: 'https://cdn.poehali.dev/files/0fdfa6b5-3483-41ee-a229-8a1c045ce03b.jpg', route: '/category/aktive' },
  { id: '6', name: 'Delta Alfa', image: 'https://cdn.poehali.dev/files/121fe29c-6a2f-4239-b175-081e12c6b5fd.jpg', route: '/category/delta-alfa' },
  { id: '7', name: 'Honda', image: 'https://cdn.poehali.dev/files/a4736cd5-ee70-494a-850a-f6f414abf050.jpg', route: '/category/honda' },
  { id: '8', name: 'Suzuki', image: 'https://cdn.poehali.dev/files/754e1f09-0b09-4b4f-baca-084bbd5346a8.jpg', route: '/category/suzuki' },
  { id: '9', name: 'Yamaha', image: 'https://cdn.poehali.dev/files/0fdfa6b5-3483-41ee-a229-8a1c045ce03b.jpg', route: '/category/yamaha' },
  { id: '10', name: 'АКЦИЯ!!!! (цена указана за количество которое стоит в скобках)', image: 'https://cdn.poehali.dev/files/87d9429f-0c96-4dc2-9c67-12ea08a877d6.jpg', route: '/sales' },
  { id: '11', name: 'Аккумуляторы', image: 'https://cdn.poehali.dev/files/121fe29c-6a2f-4239-b175-081e12c6b5fd.jpg', route: '/category/batteries' },
  { id: '12', name: 'Аксессуары', image: 'https://cdn.poehali.dev/files/a4736cd5-ee70-494a-850a-f6f414abf050.jpg', route: '/category/accessories' },
  { id: '13', name: 'Запчасти на Питбайки', image: 'https://cdn.poehali.dev/files/754e1f09-0b09-4b4f-baca-084bbd5346a8.jpg', route: '/category/pitbike' },
  { id: '14', name: 'Масло, ХИМИЯ', image: 'https://cdn.poehali.dev/files/0fdfa6b5-3483-41ee-a229-8a1c045ce03b.jpg', route: '/category/oil' },
  { id: '15', name: 'Подшипники', image: 'https://cdn.poehali.dev/files/121fe29c-6a2f-4239-b175-081e12c6b5fd.jpg', route: '/category/bearings' },
  { id: '16', name: 'Покрышки', image: 'https://cdn.poehali.dev/files/a4736cd5-ee70-494a-850a-f6f414abf050.jpg', route: '/category/tires' },
  { id: '17', name: 'Резина вело', image: 'https://cdn.poehali.dev/files/754e1f09-0b09-4b4f-baca-084bbd5346a8.jpg', route: '/category/bike-tires' },
  { id: '18', name: 'Резина камера', image: 'https://cdn.poehali.dev/files/0fdfa6b5-3483-41ee-a229-8a1c045ce03b.jpg', route: '/category/inner-tubes' },
  { id: '19', name: 'Ремни', image: 'https://cdn.poehali.dev/files/121fe29c-6a2f-4239-b175-081e12c6b5fd.jpg', route: '/category/belts' },
  { id: '20', name: 'Свечи зажигания', image: 'https://cdn.poehali.dev/files/a4736cd5-ee70-494a-850a-f6f414abf050.jpg', route: '/category/spark-plugs' },
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