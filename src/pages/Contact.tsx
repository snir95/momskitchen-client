import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageSquare, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 via-red-600 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1571197119282-7c4ac63d2e4a?w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              צרו קשר
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 leading-relaxed">
              נשמח לשמוע מכם ולשרת אתכם בקרוב
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  בואו נדבר
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  מוכנים לחוות טעמים מרוקאיים אותנטיים? אנחנו כאן כדי לשרת אתכם באהבה ולהביא את חום מרוקו לשולחן שלכם. צרו קשר להזמנות, שאלות, או סתם כדי להגיד שלום!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center flex-shrink-0"><Phone className="w-6 h-6 text-white" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">טלפון</h3>
                    <p className="text-gray-600 mb-2">התקשרו להזמנות ובירורים</p>
                    <a href="tel:+1234567890" className="text-lg font-semibold text-orange-600 hover:text-orange-700 transition-colors">(123) 456-7890</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0"><Mail className="w-6 h-6 text-white" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">אימייל</h3>
                    <p className="text-gray-600 mb-2">שלחו לנו שאלות בכל עת</p>
                    <a href="mailto:hello@alizasmoroccan.com" className="text-lg font-semibold text-orange-600 hover:text-orange-700 transition-colors">hello@alizasmoroccan.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0"><MapPin className="w-6 h-6 text-white" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">אזור שירות</h3>
                    <p className="text-gray-600 mb-2">אנו מספקים משלוחים טריים עד הדלת</p>
                    <p className="text-lg font-semibold text-gray-900">משלוחים מקומיים ברדיוס של 25 ק"מ</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0"><Clock className="w-6 h-6 text-white" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">שעות פתיחה</h3>
                    <p className="text-gray-600 mb-2">כשאנחנו מבשלים עבורכם</p>
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900">שלישי - שבת</p><p className="text-gray-600">11:00 - 20:00</p>
                      <p className="font-semibold text-gray-900 mt-2">ראשון - שני</p><p className="text-gray-600">סגור</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center"><MessageSquare className="w-8 h-8 text-white" /></div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">מוכנים להזמין?</h3>
                    <p className="text-gray-700 leading-relaxed">עיינו בתפריט היומי שלנו אונליין ובצעו הזמנה בקלות. אנו נכין הכל טרי ומוכן לאיסוף או משלוח.</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg py-3 rounded-xl shadow-lg">צפו בתפריט היומי</Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">איך מזמינים</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
                      <div><h4 className="font-semibold text-gray-900 mb-1">מעיינים בתפריט</h4><p className="text-gray-600">בדקו את המבחר הטרי של היום</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
                      <div><h4 className="font-semibold text-gray-900 mb-1">מבצעים הזמנה</h4><p className="text-gray-600">הוסיפו פריטים לעגלה ומלאו פרטים</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
                      <div><h4 className="font-semibold text-gray-900 mb-1">אנחנו מכינים</h4><p className="text-gray-600">הכנה טרייה במטבח הביתי שלנו</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">4</div>
                      <div><h4 className="font-semibold text-gray-900 mb-1">נהנים!</h4><p className="text-gray-600">איסוף או משלוח - חם וטרי עד אליכם</p></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <Car className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">משלוח חינם</h3>
                  <p className="text-gray-700">בהזמנות מעל 100₪ באזור השירות שלנו</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}