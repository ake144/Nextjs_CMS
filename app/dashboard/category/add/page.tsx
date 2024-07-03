'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createCategory, CategorySchema } from '@/utils/actions/category/createCategory';
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";




const AddCategories: React.FC = () => {
 const formMethods = useForm<CategorySchema>({
    mode: 'onChange',
  });

  const { handleSubmit, reset, formState: { errors } } = formMethods;

  const onSubmit = async (data: CategorySchema) => {
    try {
      const result = await createCategory(data);
      console.log("Category created:", result);
      reset(); // Reset form after successful submission
      // Optionally, you can show a success message or redirect to another page
    } catch (error) {
      console.error("Error creating category:", error);
      // Handle error or display error messages to the user
    }
  
 }

  return (
    <>
      <div className='p-25 m-4 items-center justify-center flex'>Add New Categories</div>
      <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
                  control={formMethods.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>category</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug for your Blog" {...field} />
                      </FormControl> 
                    </FormItem>
                  )}
                />


          <Button type="submit" className="bg-blue-600 text-white">

            Submit
          </Button>
          </form>
      </Form>
    </>
  );
}

export default AddCategories;
