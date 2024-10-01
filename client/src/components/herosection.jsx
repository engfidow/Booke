import React from 'react';
import { FaSearch, FaPlayCircle } from 'react-icons/fa'; // Import the icons
import here1 from "../assets/hero1.png";

const HeroSection = () => {
  return (
    <section className="bg-[#F5FFFF] py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-900 leading-snug">
            Buy and sell your <br /> 
            textbooks for the <span className="text-pink-500">best price.</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Discover the best prices for buying and selling textbooks in our marketplace. Buy and sell with confidence today!
          </p>
          <div className="mt-6 flex justify-center md:justify-start">
            {/* Search Book Button with Icon */}
            <button className="bg-pink-500 text-white py-3 px-6 rounded-full mr-4 hover:bg-pink-600 flex items-center">
              <FaSearch className="mr-2" /> {/* Search Icon */}
              Search Book
            </button>

            {/* How it works Button with Icon */}
            <button className="bg-transparent text-pink-500 py-3 px-6 border border-pink-500 rounded-full hover:bg-pink-100 flex items-center">
              <FaPlayCircle className="mr-2" /> {/* Play Icon */}
              How it works
            </button>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2">
          <img src={here1} alt="Books Illustration" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
