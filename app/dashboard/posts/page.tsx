'use client'


import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GetPostById } from '@/utils/actions/blog/getbyId';
import { useUser } from '@clerk/nextjs';
import { getByClerkId } from '@/utils/actions/user/user';

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  created_at: Date; // or Date
  
 // Adjust as per your date format from the backend
}

const PostsPage: React.FC = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const fetchedUser = await getByClerkId(user.id);
        const userId = fetchedUser?.id ?? null;
        if (userId) {
          const fetchedPosts = await GetPostById(userId);
          setPosts(fetchedPosts);
        }
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <>
      <Link href='/'>
        <div className='mx-2 p-7'>
          Back
        </div>
      </Link>
      <div className='p-4 m-4 justify-center items-center gap-1'>
        <h1 className='text-3xl items-center mt-4 pt-3 underline-offset-1 p-5 justify-center'>Projects</h1>

        <Link href='/dashboard/addPost'>
          <Button className='m-5 p-4 bottom-0'>Create New Post</Button>
        </Link>
      </div>

      {posts.length === 0 && (
        <p className='p-4 m-5'>You have no projects</p>
      )}

      <div className='flex flex-row'>
        <h2 className='mt-[50px] p-3 text-4xl flex items-center justify-center'>
          Explore Your Posts
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mx-4 mt-7 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            <img
              alt=""
              src={post.image ?? 'https://via.placeholder.com/400'}
              className="h-56 w-full object-cover"
            />

            <div className="bg-white p-4 sm:p-6">
              <time dateTime={post.created_at.toISOString()} className="block text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</time>

              <Link href={`/dashboard/posts/${post.id}`}>
              
                  <h3 className="mt-0.5 text-lg text-gray-900">{post.title}</h3>
              
              </Link>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                {post.content}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default PostsPage;
