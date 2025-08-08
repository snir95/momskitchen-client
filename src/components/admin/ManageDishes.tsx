import  { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import DishForm from "./DishForm";
import type { MenuItem } from "@/types";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

export default function ManageDishes() {
  const [dishes, setDishes] = useState<MenuItem[]>([]);
  const [editingDish, setEditingDish] = useState<MenuItem | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = async () => {
    // TODO: Implement actual API call
    console.log('Loading dishes...');
    setDishes([]);
  };

  const handleToggleAvailable = async (dish: MenuItem, available: boolean) => {
    // TODO: Implement actual API call
    console.log('Toggle available:', dish._id, available);
    loadDishes();
  };

  const handleDelete = async (dishId: string) => {
    // TODO: Implement actual API call
    console.log('Delete dish:', dishId);
    loadDishes();
  };

  const handleEdit = (dish: MenuItem) => {
    setEditingDish(dish);
    setIsFormOpen(true);
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setEditingDish(undefined);
    loadDishes();
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>שם המנה</TableHead>
            <TableHead>מחיר</TableHead>
            <TableHead>קטגוריה</TableHead>
            <TableHead>זמין היום?</TableHead>
            <TableHead>פעולות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dishes.map((dish) => (
            <TableRow key={dish._id}>
              <TableCell className="font-medium">{dish.name}</TableCell>
              <TableCell>₪{dish.price.toFixed(2)}</TableCell>
              <TableCell>{dish.category}</TableCell>
              <TableCell>
                <Switch
                  checked={dish.available}
                  onCheckedChange={(checked) => handleToggleAvailable(dish, checked)}
                />
              </TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(dish)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
                      <AlertDialogDescription>
                        פעולה זו תמחק את המנה '{dish.name}' לצמיתות. לא ניתן לבטל פעולה זו.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>ביטול</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(dish._id)}>
                        מחק
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingDish ? 'עריכת מנה' : 'הוספת מנה'}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <DishForm dishToEdit={editingDish} onFormSubmit={handleFormSubmit} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}