import { ArrowRight, Github } from 'lucide-react';
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "../ui/button";
import Image from 'next/image';
export default function HeroSection() {

    return (
        <div className='flex flex-col items-center justify-center leading-6 mt-[3rem]'>
                <h1 className="scroll-m-20 text-4xl sm:text-4xl md:text-6xl font-semibold tracking-tight lg:text-7xl text-center max-w-[1120px] bg-gradient-to-b dark:text-white">
                    Generate & Manage Content Seamlessly
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 text-xl text-center mt-2 dark:text-gray-400">
                    Everything you need to create, manage, and deliver high-quality content across your platform with ease.
                </p>

            <div className="flex justify-center items-center gap-3">
                <Link href='/sign-up' className="mt-5">
                    <Button className="animate-buttonheartbeat rounded-md bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white">
                        Get Started
                    </Button>
                </Link>

                
                    <Button variant="outline" className="flex gap-1">
                        Join Discord
                        <ArrowRight className='w-4 h-4' aria-hidden="true" />
                    </Button>
                
                <Link
                    href="https://github.com/ake144/Nextjs_CMS"
                    target='_blank'
                    className='animate-buttonheartbeat border p-2 rounded-full mt-5 hover:dark:bg-black hover:cursor-pointer'
                    aria-label="View NextJS 14 Starter Template on GitHub"
                >
                    <Github className='w-5 h-5' aria-hidden="true" />
                </Link>
            </div>
            <div>
                <div className="relative flex max-w-6xl justify-center overflow-hidden mt-7">
                    <div className="relative rounded-xl">
                        <Image
                            src="/home.png"
                            alt="Hero Image"
                            width={1100}
                            height={550}
                            priority={true}
                            className="block rounded-[inherit] border object-contain shadow-lg dark:hidden"
                        />
                        <Image
                            src="/home.png"
                            width={1100}
                            height={550}
                            alt="Hero Image"
                            priority={true}
                            className="dark:block rounded-[inherit] border object-contain shadow-lg hidden"
                        />
                        <BorderBeam size={250} duration={12} delay={9} />
                    </div>
                </div>
            </div>

        </div>
    )
}