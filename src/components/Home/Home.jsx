import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { Collapse } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "antd/dist/reset.css";

// --- Import images from src/assets ---
import carousel1 from "../../assets/carousel1.jpg";
import carousel2 from "../../assets/carousel2.jpg";
import carousel3 from "../../assets/carousel3.jpg";
import carousel4 from "../../assets/carousel4.jpg";
import carousel5 from "../../assets/carousel5.jpg";

const { Panel } = Collapse;

function Home() {
  const navigate = useNavigate();
  const heroImages = [carousel1, carousel2, carousel3, carousel4, carousel5];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // auto-slide every 5s
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section
        className="relative w-full h-[600px] flex justify-center items-center text-white cursor-pointer group overflow-hidden pt-2"
        onClick={() => navigate("/signup-user")}
      >
        <div className="relative w-full h-full">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Background Image */}
              <img
                src={img}
                alt={`Hero slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

              {/* Caption */}
              {idx === currentIndex && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center px-6">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                    Automated Referral Workflows
                  </h2>
                  <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
                    Simplify your referral processes with automated workflows that save you time and effort.
                  </p>

                  {/* Dots */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {heroImages.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`w-3 h-3 rounded-full cursor-pointer transition ${
                          dotIdx === currentIndex
                            ? "bg-emerald-500"
                            : "bg-white/50 hover:bg-emerald-500"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(dotIdx);
                        }}
                      ></span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Left Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-100 px-4 text-center">
        <h2 className="text-3xl font-bold text-emerald-700 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { icon: "📝", title: "Sign Up", desc: "Create a free account in seconds." },
            { icon: "🛍️", title: "Shop & Earn", desc: "Earn points at thousands of US retailers." },
            { icon: "🎁", title: "Redeem Rewards", desc: "Redeem points for vouchers, deals, or gifts." },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-emerald-700">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            { icon: "👥", label: "Members", value: 5000 },
            { icon: "🏬", label: "Partner Stores", value: 150 },
            { icon: "💵", label: "Rewards Claimed", value: 100000 },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-5xl mb-2">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-emerald-600">
                <CountUp end={stat.value} duration={3} separator="," />
                {stat.label === "Rewards Claimed" ? " $" : "+"}
              </h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-700">
          Why Our Members Love Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            "No membership fees",
            "Nationwide partners",
            "Exclusive local deals",
            "Fast & easy rewards",
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="bg-emerald-50 p-6 rounded-xl text-center shadow hover:shadow-lg transition"
            >
              <p className="text-lg font-medium text-emerald-900">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-20 bg-white text-center px-4">
        <h2 className="text-3xl font-bold text-emerald-700 mb-6">
          🏆 Referral Leaderboard (Top 3)
        </h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Emma", points: 890 },
            { name: "Jacob", points: 765 },
            { name: "Sophia", points: 702 },
          ].map((user, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold text-emerald-700">
                {user.name}
              </h4>
              <p className="text-gray-600">Referral Points</p>
              <div className="text-2xl font-bold mt-2 text-blue-500">
                {user.points}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100 px-4 text-center">
        <h2 className="text-3xl font-bold text-emerald-700 mb-6">
          What Our Members Say
        </h2>
        <Collapse accordion>
          <Panel header="📥 How do I earn points?" key="1">
            <p>Simply shop at any of our partner stores and present your member code.</p>
          </Panel>
          <Panel header="🎁 Where can I redeem rewards?" key="2">
            <p>You can redeem rewards in your dashboard or use them at checkout in participating stores.</p>
          </Panel>
          <Panel header="💸 Is this program free?" key="3">
            <p>Yes! Joining and earning is 100% free for all users.</p>
          </Panel>
        </Collapse>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Ready to Earn with Every Purchase?</h2>
        <p className="mb-6 text-lg">
          Join thousands already redeeming rewards across the U.S.
        </p>
        <button
          onClick={() => navigate("/signup-user")}
          className="bg-white text-emerald-700 font-bold px-10 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Join Loyalty Rewards Free
        </button>
      </section>
    </div>
  );
}

export default Home;
