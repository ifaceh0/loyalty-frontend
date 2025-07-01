import React from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { Carousel } from 'antd';
import 'antd/dist/reset.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="https://media.istockphoto.com/id/2163991744/photo/gas-station-worker-holding-a-loyalty-card.jpg?s=612x612&w=0&k=20&c=Ew8_f_FDXedVbqTbeEMzI94Wi4-LhSU_HB4s4fluzus="
        alt="Home Banner"
        className="absolute top-0 left-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
          🎁 Welcome to Our Loyalty Rewards Program
        </h1>
        <p className="text-white text-lg sm:text-xl mb-6 max-w-2xl drop-shadow-md">
          Earn points with every purchase. Redeem rewards. Refer and rise on the leaderboard.
        </p>
        <button
          onClick={() => navigate('/signup-user')}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition duration-300 mb-8"
        >
          Join Now & Start Earning
        </button>

        <div className="bg-white bg-opacity-90 rounded-xl p-6 max-w-3xl w-full shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <h2 className="text-2xl font-bold text-fuchsia-700">
                <CountUp end={5000} duration={3} separator="," />+
              </h2>
              <p className="text-gray-700">Happy Members</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-fuchsia-700">
                <CountUp end={150} duration={3} />+
              </h2>
              <p className="text-gray-700">Partner Shops</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-fuchsia-700">
                ₹<CountUp end={1000000} duration={3} separator="," />
              </h2>
              <p className="text-gray-700">Rewards Redeemed</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl mt-10">
          <Carousel autoplay dotPosition="bottom">
            <div>
              <h3 className="text-white text-xl">🌟 Earn points with every purchase you make.</h3>
            </div>
            <div>
              <h3 className="text-white text-xl">🎉 Redeem rewards like vouchers, discounts, and more.</h3>
            </div>
            <div>
              <h3 className="text-white text-xl">👥 Invite friends and climb the referral leaderboard.</h3>
            </div>
            <div>
              <h3 className="text-white text-xl">📊 Track your activity in your dashboard.</h3>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Home;
