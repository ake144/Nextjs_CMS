'use client';

import { useEffect, useState } from 'react';
import { createCategory } from '@/utils/actions/category/createCat';
import { getCategories } from '@/utils/actions/category/getCat';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CategorySchema {
  category: string;
}

function Category() {
  const [categories, setCategories] = useState<any>([]);
  const [newCategory, setNewCategory] = useState<string>('');

  useEffect(() => {
    getCategories().then((data) => {
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error(data.error);
      }
    });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCategory.trim() === '') return;
    const category = await createCategory({ category: newCategory });
    setCategories([...categories, category]);
    setNewCategory('');
  };

  return (
    <div className="container mx-auto mt-10 p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Category Page</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>Enter the name of the new category you want to add.</DialogDescription>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
              required
              className="w-full"
            />
            <Button type="submit">Add Category</Button>
          </form>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <ul className="space-y-2 mt-4">
        <h2 className="text-2xl my-2 font-bold">Categories</h2>
        {categories.map((category: CategorySchema, index: number) => (
          <li key={index} className="p-2 border-b">{category.category}</li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
