'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GetPostById } from '@/utils/actions/blog/getbyId';
import { useUser } from '@clerk/nextjs';
import { getByClerkId } from '@/utils/actions/user/user';
import Image from 'next/image';
import Templates from '@/components/postArea';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  created_at: Date;
}

const PostsPage: React.FC = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

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
    <div className="p-8 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <Button 
          onClick={() => router.back()} 
          variant="ghost" 
          className="text-blue-700 hover:text-blue-200 transition-all duration-300"
        >
          Back
        </Button>
        <Link href='/dashboard/addPost'>
          <Button variant="outline" className="hover:bg-blue-700 hover:text-white transition-all duration-300">
            Create New Post
          </Button>
        </Link>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-lg mb-8">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">Coming Features - Stay Tuned!</h2>
        <Templates />
      </div>

      <div className="text-center my-12">
        <h1 className="text-5xl font-extrabold text-gray-900">Your Posts</h1>
        <p className="text-gray-600 mt-4">Explore and manage your created posts</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-700">You have no posts yet. Start creating by clicking the button above.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 hover:rotate-1"
            >
              <Image
                alt="Post Thumbnail"
                height={240}
                width={320}
                src={post.image ?? 'https://via.placeholder.com/400'}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <time 
                  dateTime={post.created_at.toISOString()} 
                  className="block text-xs text-gray-500 mb-2"
                >
                  {new Date(post.created_at).toLocaleDateString()}
                </time>
                <Link href={`/dashboard/posts/${post.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-all duration-300">
                    {post.title}
                  </h3>
                </Link>
                <p className="mt-3 text-gray-700 line-clamp-3">
                  {post.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
