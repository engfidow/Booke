import React from 'react';
import leftIllustration from '../assets/hero2.png';  // Replace with the left image path
import babyImage from '../assets/boy.png';  // Replace with the baby image path

const AuthorTrendingSection = () => {
  return (
    <section className="bg-[#EBF3FF] ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section - Our Exclusive Author */}
        <div className="md:w-1/2 flex items-center">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={leftIllustration}
              alt="Exclusive Author Illustration"
              className="w-40 h-auto"
            />
            <div className="ml-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Our Exclusive Author
              </h2>
              <div className="flex items-center mt-4">
                {/* Example Avatars */}
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar 1"
                  className="w-10 h-10 rounded-full"
                />
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar 2"
                  className="w-10 h-10 rounded-full -ml-2"
                />
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar 3"
                  className="w-10 h-10 rounded-full -ml-2"
                />
                <span className="ml-4 text-gray-500">More than 5k Authors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Trending Books */}
        <div className="md:w-1/2 flex flex-row items-center justify-center mt-8 md:mt-0">
          {/* Baby Image */}
          <div className="mr-2">
            <img
              src={babyImage}
              alt="Baby Image"
              className="w-48 h-auto"
            />
          </div>
          
          {/* Text and Button as Column */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold text-gray-900">
              Trending Books
            </h2>
            <p className="mt-2 text-gray-600 text-center md:text-left">
              Explore trending books of this week
            </p>
            <button className="mt-4 bg-pink-500 text-white py-2 px-6 rounded-full hover:bg-pink-600">
              Shop Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AuthorTrendingSection;
