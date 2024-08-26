import Footer from './footer';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex w-full min-h-screen flex-col pt-16 items-center dark:bg-gray-900 bg-white justify-between">
        <div className="absolute z-[-99] pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {children}
      </main>
    </>
  ); 
}
