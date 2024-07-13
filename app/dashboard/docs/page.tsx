'use client'


import { getByClerkId } from '@/utils/actions/user/user';
import { useUser } from '@clerk/nextjs';
import React,{useState, useEffect} from 'react';


const ApiDocs = () => {

    const {user}  = useUser();
    const [userData, setUserData] = useState<any >(null);
  
    useEffect(() => {
      const fetchPosts = async () => {
        if (user) {
          const fetchedUser = await getByClerkId(user.id);
         if(fetchedUser){
  
         
          setUserData(fetchedUser);
  
         }
  
        }
      };
  
      fetchPosts();
    }, [user]);
  
  
    if (!userData) {
      return <div>Loading...</div>;
    }

  return (
    <div className="container mx-auto mt-[70px] p-6">
      <h1 className="text-4xl font-bold mb-6">API Documentation</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          Welcome to the API documentation. This API allows you to fetch posts
          from our site using your unique API key. Follow the instructions
          below to integrate our API with your application.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
        <p>
          You need to authenticate your requests using your API key. Include the
          API key in the headers of your HTTP requests as shown below.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p><strong>API Key:</strong> <span className="mx-6">{userData.apiKey}</span></p>
          <p>Use this API key to fetch your posts from other sites.</p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Endpoints</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">GET /api/posts</h3>
          <p>
            Fetch a list of posts. The request must include your API key in the
            headers.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <pre>
{`GET https://nextjs-cms1.vercel.app/api/posts
Headers:
  x-api-key: ${userData.apiKey}`}
            </pre>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Response</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <pre>
{`{
  "data": [
    {
      "id": "1",
      "title": "Post Title",
      "author": "Author Name",
      "created_at": "2024-07-13T12:34:56.789Z",
      "content": "Post content here...",
      "image": "https://example.com/image.jpg"
    },
    {
      "id": "2",
      "title": "Another Post Title",
      "author": "Another Author",
      "created_at": "2024-07-13T12:34:56.789Z",
      "content": "More post content here...",
      "image": "https://example.com/image2.jpg"
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Invalid API Key</h3>
          <p>
            If the API key is missing or invalid, the server will respond with
            an error message.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <pre>
{`{
  "error": "API key is required"
}`}
            </pre>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Server Error</h3>
          <p>
            If there is an issue on the server, you may receive a server error
            message.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <pre>
{`{
  "error": "Internal server error"
}`}
            </pre>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p>
          If you have any questions or need further assistance, please contact
          our support team at <a href="mailto:coinocrypt6@gmail.com" className="text-blue-500">support@example.com</a>.
        </p>
      </section>
    </div>
  );
};

export default ApiDocs;
