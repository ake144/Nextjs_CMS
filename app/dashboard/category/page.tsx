'use client'

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCategories } from '@/utils/actions/category/findCategory';

function Categories() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className='flex flex-col top-9 p-5 m-5 justify-center items-center'>
        <h1>Categories</h1>
        <Link href='/dashboard/category/add' className='p-8'>
          <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Add Category
          </Button>
        </Link>
        <div className="mt-10">
          {categories.map((category: any) => (
            <div key={category.id} className='p-2 m-3'>
              <Link href={`/dashboard/category/${category.id}`}>
                <p className='text-blue-500 hover:text-blue-800'>{category.category}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
