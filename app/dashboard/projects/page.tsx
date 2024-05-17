import { Button } from '@/components/ui/button'
import React from 'react'


export default function ProjectsPage() {
return(<>
       <div className=' p-4 m-4 justify-center items-center gap-1'>
              <h1  className='text-3xl items-center mt-4 pt-3 underline-offset-1  p-5 justify-center'>Projects</h1>
               <p className='p-4 m-5 '>You have no project</p>
              <Button className='m-5 p-4 bottom-0'>create new Project</Button>
       </div>


</>)
}