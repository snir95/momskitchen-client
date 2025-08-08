import  { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MenuItem } from '@/types';

interface UpcomingDishCardProps {
  item: MenuItem;
  onRequestDish: (item: MenuItem) => Promise<void>;
}

export default function UpcomingDishCard({ item, onRequestDish }: UpcomingDishCardProps) {
  const [requestState, setRequestState] = useState('idle'); // idle, loading, success

  const handleRequest = async () => {
    setRequestState('loading');
    try {
      await onRequestDish(item);
      setRequestState('success');
    } catch (error) {
      console.error("Request failed:", error);
      setRequestState('idle'); // Reset on error
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Card className="h-full bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border-dashed border-orange-200">
        <CardContent className="p-6 text-center flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-6">{item.description}</p>
          </div>
          <Button
            onClick={handleRequest}
            disabled={requestState !== 'idle'}
            variant="outline"
            className={`w-full transition-all duration-300 ${
              requestState === 'success' 
                ? "bg-green-100 text-green-700 border-green-200 cursor-not-allowed" 
                : requestState === 'loading'
                ? "bg-orange-50 text-orange-700 border-orange-200 cursor-wait"
                : "text-orange-600 hover:bg-orange-50 border-orange-200"
            }`}
          >
            {requestState === 'idle' && (
              <>
                <Mail className="w-4 h-4 ml-2" />
                בקש את המנה
              </>
            )}
            {requestState === 'loading' && (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                שולח בקשה...
              </>
            )}
            {requestState === 'success' && (
              <>
                <Check className="w-4 h-4 ml-2" />
                הבקשה נשלחה
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}