import { useState, useEffect } from "react";
import type { User } from "@/entities/User";
import UserService from "@/entities/User";
import type { Order } from "@/entities/Order";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, UserCircle, ShoppingBag, ShieldAlert } from "lucide-react";
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await UserService.me();
        if (!currentUser) {
          throw new Error('No user found');
        }
        setUser(currentUser);
        // TODO: Replace with actual API call when backend is ready
        const mockOrders: Order[] = [];
        setOrders(mockOrders);
      } catch (e) {
        navigate(createPageUrl("Homepage"));
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center p-4">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">אינך מחובר</h1>
        <p className="text-lg text-gray-600 mb-6">עליך להתחבר כדי לצפות בדף זה.</p>
        <Button onClick={() => UserService.login('admin@moroccan-kitchen.com', 'admin123')}>התחברות / הרשמה</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">החשבון שלי</h1>
          <p className="text-xl text-gray-600">ברוך שובך, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Details */}
          <div className="md:col-span-1">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center gap-4">
                <UserCircle className="w-10 h-10 text-orange-500" />
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Order History */}
          <div className="md:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-orange-500" />
                  <span>היסטוריית הזמנות</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order._id} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold">הזמנה #{order._id.substring(0, 8)}</p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(order.createdAt), 'd LLLL yyyy, HH:mm', { locale: he })}
                            </p>
                          </div>
                          <div className="text-right">
                             <p className="font-bold text-lg">₪{order.total_amount.toFixed(2)}</p>
                             <p className="text-sm capitalize">{order.status}</p>
                          </div>
                        </div>
                         <div className="mt-2 text-sm text-gray-700">
                           {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">עדיין לא ביצעת הזמנות.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}