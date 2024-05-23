'use client'


import { NavBar } from "@/components/Nav";
import Dashboard from "./dashboard/page";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);
  return (
   <>
<div className="min-h-screen p-6 m-4 ">
        <div  className="w-full flex flex-col  mt-12 items-end justify-end">
         
        {!user && (
        <>
          <h3 className="p-25 m-4 justify-center items-center w-full gap-3 flex">Welcome to My Dashboard</h3>
          <div className="flex flex-col gap-2 p-3 m-2 justify-center items-center w-full"> 
            <h1 className="p-25 m-4 justify-center items-center w-full gap-3 flex">
              Please Sign Up to view your Dashboard
            </h1>
            <Link href='/sign-up'> Sign Up</Link>
          </div>
        </>
      )}
        </div>
</div>
   

   </>
  );
}
