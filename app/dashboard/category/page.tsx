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
  const [categories, setCategories] = useState<CategorySchema[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');

  useEffect(() => {
    getCategories().then((data) => {
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Failed to fetch categories:', data.error);
      }
    });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCategory.trim() === '') return;
    const category = await createCategory({ category: newCategory });
    if ('category' in category) {
      setCategories([...categories, category]);
    } else {
      console.error('Failed to create category:', category.error);
    }
    setNewCategory('');
  };

  return (
    <div className="container mx-auto mt-10 p-6 max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Category Management</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-6 bg-blue-600 text-white hover:bg-blue-700 transition-all">Add New Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-2xl font-bold">Add a New Category</DialogTitle>
          <DialogDescription className="text-gray-600 mb-4">Please enter the name of the new category.</DialogDescription>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="secondary" className="bg-gray-500 text-white hover:bg-gray-600">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 transition-all">Add Category</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ul className="mt-6 divide-y divide-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Existing Categories</h2>
        {categories.map((category: CategorySchema, index: number) => (
          <li key={index} className="py-2 text-lg text-gray-700">{category.category}</li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
