'use client'

import { NavBar } from "@/components/Nav";
import Dashboard from "./dashboard/page";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from '@/components/ModeToggle';

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
        <div className="flex items-end justify-end">
              <ModeToggle />
        </div>
        <div className="container mx-auto flex flex-col items-center justify-center py-20">
          {!user && (
            <>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold dark:text-white text-gray-800 mb-4">Welcome to CMS</h1>
                <p className="text-xl text-gray-600">Please Sign Up to view your Dashboard</p>
                <Link href='/sign-up'>
                  <Button   variant='link' className="mt-6 inline-block bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                    Sign Up
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between mt-[90px] gap-12">
                <div className="w-full md:w-1/2 flex justify-center">
                  <Image src='/posts.png' width={600} height={400} alt="posts" className="rounded-lg shadow-lg"/>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <Image src='/createPost.png' width={600} height={400} alt="create post" className="rounded-lg shadow-lg"/>
                </div>
              
              </div>

              <div className="flex flex-col md:flex-row items-center mt-11 justify-between gap-12">
              <div className="w-full md:w-1/2 flex justify-center">
                  <Image src='/trump.png' width={600} height={400} alt="create post" className="rounded-lg shadow-lg"/>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <Image src='/post.png' width={600} height={400} alt="create post" className="rounded-lg shadow-lg"/>
                </div>  
              
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
