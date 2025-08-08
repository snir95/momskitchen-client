import React, { useState, useEffect } from "react";
import { MenuItem } from "@/entities/MenuItem";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import DishForm from "./DishForm";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

export default function ManageDishes() {
  const [dishes, setDishes] = useState([]);
  const [editingDish, setEditingDish] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = async () => {
    const allDishes = await MenuItem.list();
    setDishes(allDishes);
  };

  const handleToggleAvailable = async (dish, available) => {
    await MenuItem.update(dish.id, { available });
    loadDishes();
  };

  const handleDelete = async (dishId) => {
    await MenuItem.delete(dishId);
    loadDishes();
  };

  const handleEdit = (dish) => {
    setEditingDish(dish);
    setIsFormOpen(true);
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setEditingDish(null);
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
            <TableRow key={dish.id}>
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
                    <Button variant="destructive" size="icon">
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
                      <AlertDialogAction onClick={() => handleDelete(dish.id)}>
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