import React from 'react';


const Footer = () => {
  return (
    <footer className="relative bg-blue-900 text-white py-12">
      

      {/* Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#about" className="hover:text-pink-300">About Us</a></li>
              <li><a href="#services" className="hover:text-pink-300">Books</a></li>
              <li><a href="#contact" className="hover:text-pink-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#faq" className="hover:text-pink-300">FAQ</a></li>
              <li><a href="#help" className="hover:text-pink-300">Help Center</a></li>
              <li><a href="#terms" className="hover:text-pink-300">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Subscribe</h3>
            <p className="mt-4">Get our latest updates and offers.</p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-full w-full text-gray-800"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-pink-500 text-white rounded-r-full hover:bg-pink-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-12 text-gray-400">
          <p>&copy; 2024 Booke. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
