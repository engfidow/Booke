import React, { useEffect, useState } from 'react';
import BookCard from '../components/cards/bookcard'; // Import your BookCard component
import axios from "axios";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/books`);
      console.log("Fetched books:", response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  // Filter books based on the search term
  const filteredBooks = books.filter((book) => {
    const title = book.title?.toLowerCase() || '';
    const author = book.author?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();

    return title.includes(search) || author.includes(search);
  });

  return (
    <div className="container mx-auto py-12 px-4 mt-10">
      <h1 className="text-4xl font-bold text-center mb-6">Our Books Collection</h1>
      <div className="flex justify-center mb-8">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search books..."
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      {/* Book List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center text-gray-600 col-span-full">Loading books...</p>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <BookCard key={book.id || index} book={book} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Books;
