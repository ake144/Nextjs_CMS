import Image from 'next/image';
import Link from 'next/link';

export default function BlogSample() {
  const articles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      title: "The Importance of Storytelling in Modern Branding",
      date: "2024-04-15 21:16:04.765648-05",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      title: "How to Choose the Right Dog for Your Lifestyle",
      date: "2024-04-16 08:29:32.188999-05",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      title: "Top Automation Testing Suites for Seamless Software Testing",
      date: "2024-04-16 15:20:52.368844-05",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className='flex flex-col items-center p-3 w-full'>
        <div className='flex flex-col justify-start items-center gap-2 w-full'>
          <div className='flex gap-3 justify-start items-center w-full'>
            <h1 className="scroll-m-20 text-3xl md:text-4xl tracking-tight font-semibold text-center">
              Some Sample Blog Articles
            </h1>
          </div>
          <div className='flex gap-3 justify-start items-center w-full border-b pb-4'>
            <p className="text-gray-600 dark:text-gray-400">
              All these articles were generated using Sample Articles AI
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-start'>
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5">
          {articles?.map((article) => (
            <Link href={"/"} key={article?.id}>
              <article className="flex flex-col space-y-2 p-4 rounded-md border dark:bg-black">
                <Image
                  src={article?.image!}
                  alt={"blog image"}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                />
                <div className='flex lg:flex-row w-full justify-between items-center'>
                  <h2 className="text-md lg:text-lg font-bold">{article?.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(article?.date!)?.toLocaleDateString()}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
