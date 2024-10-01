import React from 'react';
import contactImage from '../assets/contact-us.png'; // Adjust path to your image

const ContactUs = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-0 ">
      <div className="flex flex-col md:flex-row justify-between items-center  p-8 ">
        
        {/* Left side - Form */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-pink-500 mb-4">Get in touch</h2>
          <p className="text-gray-600 mb-8">We are here for you! How can we help?</p>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                className="w-full p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Your Message"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right side - Contact details */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img src={contactImage} alt="Contact Us" className="w-3/4 mb-8" />
          
          <div className="text-gray-600 space-y-4">
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-pink-500 mr-3"></i>
              <p>Mogadishu</p>
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone text-pink-500 mr-3"></i>
              <p>+252 612910628</p>
            </div>
            <div className="flex items-center">
              <i className="fas fa-envelope text-pink-500 mr-3"></i>
              <p>abdullahiyususfahmed@gmail.com</p>
            </div>

            <div className="flex space-x-3 mt-6">
              <a href="#" className="text-pink-500 hover:text-pink-600"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-pink-500 hover:text-pink-600"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-pink-500 hover:text-pink-600"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
