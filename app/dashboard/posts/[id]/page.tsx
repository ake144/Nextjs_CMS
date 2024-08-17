'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getPostByPostId, getUserById } from '@/utils/actions/blog/blog';
import { GetPostById } from '@/utils/actions/blog/getbyId';

interface Post {
  id: string;
  title: string;
  author: string;
  created_at: Date;
  content: string;
  image?: string | null;
}

const BlogPost=({ params }: { params: { id: string } })=>{
  const { id } = params;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const fetchedPost = await getPostByPostId(id);
          const author = await getUserById(fetchedPost.author_id);  // Fetch author details using author_id
          setPost({
            ...fetchedPost,
            author: `${author?.first_name} ${author?.last_name}`,
          });
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      }
    };

    fetchPost();
  }, [id]);

  const relatedPosts = [
    { title: "The Art of Decluttering", date: "May 15, 2024" },
    { title: "Embracing Essentialism", date: "April 20, 2024" },
    { title: "Minimalist Travel", date: "March 1, 2024" },
    { title: "The Minimalist Mindset", date: "February 15, 2024" },
  ];

  if (!post) {
    return <div>Loading...</div>; // You can customize your loading state
  }

  return (
    <div className="max-w-6xl mx-auto lg:ml-[70px] lg:mt-[50px] mt-10 p-6">
      <Link href='/'>
        <div className='mb-2 p-3'>
          Back
        </div>
      </Link>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-6">By {post.author} • {new Date(post.created_at).toLocaleDateString()}</p>
          {post.image && (
            <Image src={post.image} alt="Blog Post Image" height={400} width={300} className="w-full h-[500px] mb-6" />
          )}
           <pre  className='overflow-x-auto mb-6 text-md whitespace-pre-wrap '> {post.content} </pre> 
        </div>
        <div className="md:w-1/3 md:pl-6">
          <div className="mb-6 border rounded-lg p-4">
            <h2 className="text-xl font-semibold border rounded-lg p-3 mb-4">Related Posts</h2>
            {relatedPosts.map((relatedPost, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg">{relatedPost.title}</h3>
                <p className="text-gray-600">{relatedPost.date}</p>
              </div>
            ))}
          </div>
          <div className="mb-6 border rounded-lg p-3">
            <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <button className="w-full p-2 bg-blue-500 text-white rounded">Subscribe</button>
          </div>
          <div className='border rounded-lg p-3'>
            <h2 className="text-xl font-semibold border rounded-lg p-2 mb-4">Popular Categories</h2>
            <ul>
              <li className="mb-2"><a href="#" className="text-blue-500">Decluttering</a></li>
              <li className="mb-2"><a href="#" className="text-blue-500">Mindfulness</a></li>
              <li className="mb-2"><a href="#" className="text-blue-500">Minimalist Living</a></li>
              <li className="mb-2"><a href="#" className="text-blue-500">Sustainable Living</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
