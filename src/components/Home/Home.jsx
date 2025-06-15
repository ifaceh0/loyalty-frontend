import React from 'react';

function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="https://media.istockphoto.com/id/2163991744/photo/gas-station-worker-holding-a-loyalty-card.jpg?s=612x612&w=0&k=20&c=Ew8_f_FDXedVbqTbeEMzI94Wi4-LhSU_HB4s4fluzus="
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
