import { useParams, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Part {
  id: string;
  name: string;
  price: number;
  article?: string;
}

const mockParts: Record<string, Part[]> = {
  'new': [
    { id: '1', name: 'Поршневая группа 50cc (диаметр 39мм)', price: 1200, article: 'PG-50-39' },
    { id: '2', name: 'Карбюратор CVK 18мм', price: 850, article: 'CVK-18' },
    { id: '3', name: 'Вариатор в сборе GY6-50', price: 2100, article: 'VAR-GY6-50' },
  ],
  '139qmb': [
    { id: '1', name: 'Поршневая группа 139QMB 50cc', price: 1350, article: '139QMB-PG' },
    { id: '2', name: 'Коленвал 139QMB', price: 2800, article: '139QMB-CRANK' },
    { id: '3', name: 'Головка цилиндра 139QMB', price: 1900, article: '139QMB-HEAD' },
    { id: '4', name: 'Ролики вариатора 5гр (6шт)', price: 180, article: 'ROLL-5G' },
  ],
  '2t-chain': [
    { id: '1', name: 'Цепь ГРМ 88 звеньев', price: 320, article: 'CHAIN-88' },
    { id: '2', name: 'Натяжитель цепи', price: 450, article: 'TENS-CH' },
    { id: '3', name: 'Звездочка распредвала', price: 380, article: 'STAR-CAM' },
  ],
  'batteries': [
    { id: '1', name: 'Аккумулятор 12V 7Ah (YTX7L-BS)', price: 1400, article: 'BAT-7AH' },
    { id: '2', name: 'Аккумулятор 12V 9Ah (YTX9-BS)', price: 1650, article: 'BAT-9AH' },
    { id: '3', name: 'Аккумулятор 12V 12Ah (YTX12-BS)', price: 2100, article: 'BAT-12AH' },
  ],
  'tires': [
    { id: '1', name: 'Покрышка 3.50-10 (бескамерка)', price: 1200, article: 'TIRE-350-10' },
    { id: '2', name: 'Покрышка 90/90-10', price: 1350, article: 'TIRE-9090-10' },
    { id: '3', name: 'Покрышка 130/70-12', price: 1800, article: 'TIRE-13070-12' },
  ],
};

const categoryNames: Record<string, string> = {
  'new': '!!!! Новое в прайсе !!!!!',
  '139qmb': '139QMB 50-100cc',
  '2t-chain': '2т Китайцы цепные',
  'batteries': 'Аккумуляторы',
  'tires': 'Покрышки',
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  const parts = mockParts[categoryId || ''] || [];
  const categoryName = categoryNames[categoryId || ''] || 'Категория';

  const filteredParts = parts.filter(part =>
    part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.article?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Link to="/">
            <Icon name="ArrowLeft" size={24} />
          </Link>
          <h1 className="text-lg font-bold flex-1">{categoryName}</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск по деталям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          {filteredParts.length > 0 ? (
            filteredParts.map((part) => (
              <div
                key={part.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-base mb-1">{part.name}</h3>
                  {part.article && (
                    <p className="text-sm text-muted-foreground">Артикул: {part.article}</p>
                  )}
                </div>
                <div className="text-right ml-4">
                  <p className="text-lg font-bold text-secondary">{part.price} ₽</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              {searchQuery ? 'Ничего не найдено' : 'В этой категории пока нет деталей'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;