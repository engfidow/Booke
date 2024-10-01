import React from 'react';
import { FaPenNib, FaObjectUngroup, FaPuzzlePiece, FaStar } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto flex flex-col items-center md:flex-row">
        {/* Left Content */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-pink-600">LUXE</span> IS HERE TO BE YOUR ASSISTANCE
          </h1>
          <p className="text-gray-700 mb-6">
            I am here ready to help you in making creative digital products
          </p>
          <button className="bg-pink-600 text-white py-3 px-6 rounded-full font-medium hover:bg-pink-500">
            Let’s Discuss
          </button>
        </div>

        {/* Right Image */}
        <div className="relative mt-10 md:mt-0 md:w-1/2">
          <img 
            src="https://via.placeholder.com/350" 
            alt="Product Designer" 
            className="mx-auto w-3/4" 
          />
          {/* Floating Card Elements */}
          <div className="absolute top-0 left-0 bg-white shadow-lg p-3 rounded-xl transform -translate-y-12 -translate-x-10">
            <p className="text-sm font-bold">2K+ Projects</p>
          </div>
          <div className="absolute top-1/4 right-0 bg-white shadow-lg p-3 rounded-xl transform translate-x-8">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <p className="text-sm font-bold">4.8 Satisfaction</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/4 bg-white shadow-lg p-3 rounded-xl transform translate-y-8 -translate-x-10">
            <p className="text-sm font-bold">Product Designer</p>
            <span className="text-gray-600 text-xs">5 Years</span>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Our Service</h2>
        <div className="flex justify-around mt-6">
          <div className="flex flex-col items-center">
            <div className="bg-pink-600 p-3 rounded-full text-white mb-2">
              <FaPenNib className="text-2xl" />
            </div>
            <p className="font-bold">branding</p>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-pink-600 p-3 rounded-full text-white mb-2">
              <FaObjectUngroup className="text-2xl" />
            </div>
            <p className="font-bold">UI/UX</p>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-pink-600 p-3 rounded-full text-white mb-2">
              <FaPuzzlePiece className="text-2xl" />
            </div>
            <p className="font-bold">Product Design</p>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
