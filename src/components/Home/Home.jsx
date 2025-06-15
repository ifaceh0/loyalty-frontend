import React from 'react';

function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="images/loyalty.jpg" 
        alt="Home Banner"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <h1 className="text-white text-3xl font-bold">Get your points</h1>
      </div>
    </div>
  );
}

export default Home;
