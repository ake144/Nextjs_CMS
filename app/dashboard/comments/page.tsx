import React from 'react';

function Comments() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">All Comments</h1>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-xl w-full">
        <p className="text-2xl text-gray-600 mb-4">
          We&apos;re working hard on this feature.
        </p>
        <p className="text-3xl font-bold text-red-600">
          Coming Soon
        </p>
        <p className="text-gray-500 mt-4">
          Stay tuned! The comments section will be available soon, and we can&apos;t wait to hear your thoughts.
        </p>
      </div>
    </div>
  );
}

export default Comments;
