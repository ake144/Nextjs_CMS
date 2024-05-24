import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Categories() {
  return (
    <>
    <div className='flex flex-col top-9 p-5 m-5 justify-center items-center'><h1>Categories</h1>
    <Link href='/dashboard/category/add' className='p-8 '>
      <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      Add Category
      </Button>
    </Link> 
    </div>

      
    </>  
  )
}

export default Categories