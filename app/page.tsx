'use client';

import { NavBar } from "@/components/Nav";
import Dashboard from "./dashboard/page";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from '@/components/ModeToggle';
import { AccordionComponent } from "@/components/home/accordion-component";
import BlogSample from "@/components/home/blog-sample";
import HeroSection from "@/components/home/hero-section";
import PageWrapper from "@/components/wrapper/page-wrapper";

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
      <div className="min-h-screen p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="flex items-end justify-end mb-8">
          <ModeToggle />
        </div>
        <div className="container mx-auto flex flex-col items-center justify-center py-20">
          {!user && (
            <>
              <section className="text-center mb-16">
                <h1 className="text-6xl font-extrabold dark:text-white text-gray-900 mb-6">Welcome to CMS</h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">Join our platform to manage your content efficiently and effortlessly.</p>
                <Link href='/sign-up'>
                  <Button className="mt-6 bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                    Sign Up Now
                  </Button>
                </Link>
              </section>

              <PageWrapper>
                <HeroSection />

                <section className="mt-16 lg:mt-24 lg:mb-32 px-4 max-w-7xl mx-auto">
                  <h2 className="text-4xl font-bold text-center dark:text-white text-gray-900 mb-8">Explore Our Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex justify-center">
                      <Image src='/posts.png' width={600} height={400} alt="posts" className="rounded-lg shadow-lg"/>
                    </div>
                    <div className="flex justify-center">
                      <Image src='/createPost.png' width={600} height={400} alt="create post" className="rounded-lg shadow-lg"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    <div className="flex justify-center">
                      <Image src='/trump.png' width={600} height={400} alt="trump post" className="rounded-lg shadow-lg"/>
                    </div>
                    <div className="flex justify-center">
                      <Image src='/post.png' width={600} height={400} alt="post" className="rounded-lg shadow-lg"/>
                    </div>
                  </div>
                </section>

                <section className="my-20 max-w-7xl mx-auto">
                  <h2 className="text-4xl font-bold text-center dark:text-white text-gray-900 mb-8">Latest Blog Posts</h2>
                  <BlogSample />
                </section>

                <section className="my-32 w-full mx-9 flex items-center ">
                  <AccordionComponent />
                </section>
              </PageWrapper>
            </>
          )}
        </div>
      </div>
    </>
  );
}
