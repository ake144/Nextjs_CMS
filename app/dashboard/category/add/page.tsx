'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { useForm, SubmitHandler } from "react-hook-form"

  type Inputs = {
    categories:string;
  }

const AddCategories=()=> {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

   const form  = useForm<Inputs>({
      defaultValues: {
        categories: "",
      },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  
    return (

    <>
      <div className='p-25 m-4 items-center justify-center flex'>Add New Categories</div>
      <Form {...form}>
    <form className='flex  flex-col justify-center items-center'  onSubmit={handleSubmit(onSubmit)}>        
      <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>categories</FormLabel>
              <FormControl>
                <>
                <Input className="text-md mx-4" placeholder="add categories for your post" {...field} />
                {errors.categories && <span>This field is required</span>}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
             <Button type="submit" className='p-4 m-5'>Submit</Button>

        </form>
    </Form>
  
    </>
  )
}

export default AddCategories