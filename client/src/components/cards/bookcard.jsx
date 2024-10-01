import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';  // Import the icons

const BookCard = ({ book }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto relative">
      <img src={`http://localhost:8080/${book.image_url}`} alt={book.title} className="w-full h-60 object-cover" />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
        <p className="text-gray-600 mt-2">by {book.author}</p>

        <div className="flex items-center justify-between mt-3">
          <p className='text-sm text-gray-500 mt-3 flex justify-center items-center text-center gap-1'>Price:  <p className="text-lg font-semibold text-pink-500">${book.price}</p></p>
        
          <span className="text-gray-600">⭐ {book.rating}</span>
        </div>

        <p className="text-sm text-gray-500 mt-3">Published: {book.published_date}</p>

        {/* Add to Cart and Buy Now Buttons */}
        <div className="mt-4 flex justify-between items-center">
          <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 flex items-center">
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
          <button className=" bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600">
            Buy Now
          </button>
        </div>
      </div>

      {/* Favorite Button (absolute positioning to top-right corner) */}
      <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-pink-100">
        <FaHeart className="text-pink-500" />
      </button>
    </div>
  );
};

export default BookCard;
