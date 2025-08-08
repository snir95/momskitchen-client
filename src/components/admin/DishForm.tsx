import React, { useState, useEffect } from "react";
import { MenuItem } from "@/entities/MenuItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const initialFormState = {
  name: "",
  description: "",
  price: "",
  category: "main",
  image_url: "",
  ingredients: "",
  spice_level: "mild",
  available: true,
};

export default function DishForm({ dishToEdit, onFormSubmit }) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (dishToEdit) {
      setFormData({
        ...initialFormState,
        ...dishToEdit,
        price: dishToEdit.price.toString(),
      });
    } else {
      setFormData(initialFormState);
    }
  }, [dishToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dataToSave = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (dishToEdit) {
        await MenuItem.update(dishToEdit.id, dataToSave);
      } else {
        await MenuItem.create(dataToSave);
      }

      setFormData(initialFormState);
      if (onFormSubmit) {
        onFormSubmit();
      }
    } catch (error) {
      console.error("Failed to save dish", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{dishToEdit ? "עריכת מנה" : "הוספת מנה חדשה"}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">שם המנה</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">מחיר (₪)</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="description">תיאור</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">קטגוריה</Label>
            <Select name="category" value={formData.category} onValueChange={(value) => setFormData(p => ({ ...p, category: value }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="appetizer">מנה ראשונה</SelectItem>
                <SelectItem value="main">מנה עיקרית</SelectItem>
                <SelectItem value="dessert">קינוח</SelectItem>
                <SelectItem value="beverage">שתיה</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="spice_level">רמת חריפות</Label>
            <Select name="spice_level" value={formData.spice_level} onValueChange={(value) => setFormData(p => ({ ...p, spice_level: value }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">עדין</SelectItem>
                <SelectItem value="medium">פיקנטי</SelectItem>
                <SelectItem value="spicy">חריף</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="ingredients">מרכיבים עיקריים</Label>
            <Input id="ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="לדוגמה: עוף, לימונים כבושים, זיתים" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="image_url">כתובת URL של תמונה</Label>
            <Input id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} />
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox id="available" name="available" checked={formData.available} onCheckedChange={(checked) => setFormData(p => ({ ...p, available: checked }))} />
            <label htmlFor="available" className="text-sm font-medium leading-none">זמין היום?</label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "שומר..." : (dishToEdit ? "עדכן מנה" : "הוסף מנה")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}