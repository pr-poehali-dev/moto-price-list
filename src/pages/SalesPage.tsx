import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface SaleItem {
  id: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  quantity: number;
  article?: string;
}

const saleItems: SaleItem[] = [
  { id: '1', name: 'Поршневая группа 50cc (комплект 5шт)', oldPrice: 6000, newPrice: 4500, quantity: 5, article: 'PG-50-SET' },
  { id: '2', name: 'Карбюратор CVK (упаковка 10шт)', oldPrice: 8500, newPrice: 6800, quantity: 10, article: 'CVK-PACK' },
  { id: '3', name: 'Ролики вариатора 5гр (набор 30шт)', oldPrice: 5400, newPrice: 4000, quantity: 30, article: 'ROLL-BULK' },
  { id: '4', name: 'Аккумулятор 12V 7Ah (комплект 4шт)', oldPrice: 5600, newPrice: 4800, quantity: 4, article: 'BAT-7AH-SET' },
  { id: '5', name: 'Свечи зажигания A7TC (упаковка 20шт)', oldPrice: 2000, newPrice: 1400, quantity: 20, article: 'SPARK-A7-BULK' },
  { id: '6', name: 'Покрышки 3.50-10 (набор 6шт)', oldPrice: 7200, newPrice: 5900, quantity: 6, article: 'TIRE-SET' },
];

const SalesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = saleItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.article?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateDiscount = (oldPrice: number, newPrice: number) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Link to="/">
            <Icon name="ArrowLeft" size={24} />
          </Link>
          <h1 className="text-lg font-bold flex-1">🎁 Акции</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-sm text-orange-800">
            <strong>Внимание!</strong> Цена указана за количество товара, указанное в скобках
          </p>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск по акциям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const discount = calculateDiscount(item.oldPrice, item.newPrice);
              return (
                <div
                  key={item.id}
                  className="relative border-2 border-primary rounded-lg p-4 hover:bg-orange-50 transition-colors"
                >
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                    -{discount}%
                  </Badge>
                  
                  <div className="pr-16">
                    <h3 className="font-medium text-base mb-1">{item.name}</h3>
                    {item.article && (
                      <p className="text-sm text-gray-500 mb-2">Артикул: {item.article}</p>
                    )}
                    <p className="text-sm text-gray-600 mb-3">Количество: {item.quantity} шт</p>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 line-through text-sm">{item.oldPrice} ₽</span>
                      <span className="text-xl font-bold text-primary">{item.newPrice} ₽</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 py-8">
              {searchQuery ? 'Ничего не найдено' : 'Нет активных акций'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
