import React from 'react';

function Media() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-7'>
      <div className='text-center mb-10'>
        <h1 className='text-5xl font-extrabold mb-4'>Media Page</h1>
        <p className='text-xl font-medium'>
          Something exciting is coming soon! Stay tuned for our Media section.
        </p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white bg-opacity-20 p-6 rounded-lg'>
          <h2 className='text-2xl font-bold'>Media 1</h2>
          <p className='text-lg mt-2'>Amazing content will be here soon.</p>
        </div>
        <div className='bg-white bg-opacity-20 p-6 rounded-lg'>
          <h2 className='text-2xl font-bold'>Media 2</h2>
          <p className='text-lg mt-2'>Stay tuned for more updates!</p>
        </div>
        <div className='bg-white bg-opacity-20 p-6 rounded-lg'>
          <h2 className='text-2xl font-bold'>Media 3</h2>
          <p className='text-lg mt-2'>We are working hard to bring you something special.</p>
        </div>
      </div>
      
      <div className='mt-10'>
        <p className='text-lg'>
          Our Media page will be available soon. Get ready to explore!
        </p>
      </div>
    </div>
  );
}

export default Media;
