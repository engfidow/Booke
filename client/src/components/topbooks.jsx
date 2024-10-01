import React, { useEffect, useState } from 'react';
import BookCard from './cards/bookcard';  // Import the BookCard component
import daalibaan from "../assets/books/daalibaan.jpeg"
import digniin from "../assets/books/digniin.jpeg"
import godday from "../assets/books/godday.jpeg"
import inankey from "../assets/books/inankey.jpeg"
import waxyaalo from "../assets/books/waxyaalo.jpeg"
import dmaca from "../assets/books/dmaca.jpeg"
import xirfadaha from "../assets/books/xirfadaha.jpeg"
import xoriyada  from "../assets/books/xoriyada .jpeg"
import axios from 'axios';

// const topBooks = [
  // Add the books data here, or import it from a separate file
//   {
//     id: 1,
//     image: daalibaan,
//     name: "Book One",
//     price: "$12.99",
//     rating: 4.5,
//     author: "John Doe",
//     date: "2023-09-15",
//   },
//   {
//     id: 2,
//     image: digniin,
//     name: "Book Two",
//     price: "$15.50",
//     rating: 4.2,
//     author: "Jane Smith",
//     date: "2023-09-12",
//   },
//   {
//     id: 3,
//     image: godday,
//     name: "Book Two",
//     price: "$15.50",
//     rating: 4.2,
//     author: "Jane Smith",
//     date: "2023-09-12",
//   },
//   {
//     id: 4,
//     image: inankey,
//     name: "Book Two",
//     price: "$15.50",
//     rating: 4.2,
//     author: "Jane Smith",
//     date: "2023-09-12",
//   },
//   {
//     id: 5,
//     image: waxyaalo,
//     name: "Book Two",
//     price: "$15.50",
//     rating: 4.2,
//     author: "Jane Smith",
//     date: "2023-09-12",
//   },
//   {
//     id: 6,
//     image: dmaca,
//     name: "Book Two",
//     price: "$15.50",
//     rating: 4.2,
//     author: "Jane Smith",
//     date: "2023-09-12",
//   },
//   {
//     id: 7,
//     image: xirfadaha,
//     name: "Book Two",
//     price: "$15.50",
//     rating: 4.2,
//     author: "Jane Smith",
//     date: "2023-09-12",
//   },
//   {
//     id: 8,
//     image: xoriyada ,
//     name: "Book Two",
//     price: "$15.50",
//     rating: 4.2,
//     author: "Jane Smith",
//     date: "2023-09-12",
//   },
//   // Add other books here...
// ];


const TopBooksSection = () => {
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
  return (
    <section className="bg-blue-50 py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Top 8 Books
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBooksSection;
