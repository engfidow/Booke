import React, { useEffect, useState } from "react";
import MUIDatatable from "mui-datatables";
import axios from "axios";
import { MdPostAdd, MdRefresh } from "react-icons/md";
import Modal from "react-modal";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Circles } from "react-loader-spinner";

function BookTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["token"]);
  const usertoken = cookies.token; // Retrieve user info from cookies

  // Fetch books data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/books`, {
        
      });
      console.log("error getting data", response.data)
      setBooks(response.data);
    } catch (error) {
      toast.error("Error fetching books");
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Modal state and form data
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    price: "",
    publishedDate: "",
    description:"",
    coverImage: null,
    pdfFile: null,
  });

  const [btnUpdate, setBtnUpdate] = useState(false);
  const [btnSave, setBtnSave] = useState(true);
  const [errors, setErrors] = useState({});

  // Handle row click to edit a book
  const handleRowClick = (rowData, rowMeta) => {
    const selectedBook = books[rowMeta.dataIndex];
    setFormData({
      id: selectedBook.id || selectedBook._id,
      title: selectedBook.title,
      author: selectedBook.author,
      price: selectedBook.price,
      publishedDate: new Date(selectedBook.published_date).toISOString().split("T")[0],
      description: selectedBook.description,
      coverImage: null, // Reset file inputs
      pdfFile: null,
    });
    setBtnUpdate(true);
    setBtnSave(false);
    setIsModalOpen(true);
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle file input changes with validation for image and PDF file types
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (name === "coverImage") {
      const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (file && !allowedImageTypes.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          coverImage: "Please upload a valid image file (JPG, PNG, JPEG).",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, coverImage: null }));
        setFormData({ ...formData, [name]: file });
      }
    } else if (name === "pdfFile") {
      if (file && file.type !== "application/pdf") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pdfFile: "Please upload a valid PDF file.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, pdfFile: null }));
        setFormData({ ...formData, [name]: file });
      }
    }
  };

  const handleAddNewBook = () => {
    setFormData({
      id: "",
      title: "",
      author: "",
      price: "",
      publishedDate: "",
      description:"",
      coverImage: null,
      pdfFile: null,
    });
    setBtnSave(true);
    setBtnUpdate(false);
    setIsModalOpen(true);
  };

  // Form validation logic
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.title) validationErrors.title = "Title is required";
    if (!formData.description) validationErrors.description = "description is required";
    if (!formData.author) validationErrors.author = "Author is required";
    if (!formData.price || isNaN(formData.price)) validationErrors.price = "Price must be a valid number";
    if (!formData.publishedDate) validationErrors.publishedDate = "Published date is required";
    if (!btnUpdate && !formData.coverImage) validationErrors.coverImage = "Cover image is required";
    if (!btnUpdate && !formData.pdfFile) validationErrors.pdfFile = "PDF file is required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("publishedDate", formData.publishedDate);

    if (formData.coverImage) {
      formDataToSend.append("coverImage", formData.coverImage);
    }
    if (formData.pdfFile) {
      formDataToSend.append("pdfFile", formData.pdfFile);
    }

    const userId = cookies.user?.id;
    if (!userId) {
      toast.error("User ID not found. Please log in.");
      return;
    }

    formDataToSend.append("user_id", userId);
    setLoading(true);

    try {
      if (btnSave) {
        await axios.post("http://localhost:8080/books", formDataToSend, {
          headers: {
            Authorization: `Bearer ${usertoken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Book added successfully!");
      } else {
        await axios.put(`http://localhost:8080/books/${formData.id}`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${usertoken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Book updated successfully!");
      }
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error saving book");
      console.error("Error saving book:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!formData.id) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/books/${formData.id}`, {
        
        headers: {
          Authorization: `Bearer ${usertoken}`, // Bearer token
        },
      });
      toast.success("Book deleted successfully!");
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error deleting book");
      console.error("Error deleting book:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { name: "id", label: "Book ID" },
    { name: "title", label: "Title" },
    { name: "author", label: "Author" },
    { name: "price", label: "Price" },
    { name: "publishedDate", label: "Published Date" },
  ];

  const options = {
    onRowClick: handleRowClick,
    responsive: "standard",
    selectableRows: "none",
  };

  return (
    <div className="container mx-auto py-12">
      <ToastContainer />
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading-indicator" />
        </div>
      )}

      {/* Add new book button */}
      <div className="flex gap-10 justify-between mb-10">
        <button
          type="button"
          className="flex gap-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={handleAddNewBook}
        >
          <MdPostAdd className="text-lg" /> Add New Book
        </button>
        <button
          className="flex bg-red-600 rounded-full shadow-inner px-3 items-center justify-center text-center text-white hover:bg-red-300 duration-75 hover:shadow-2xl"
          onClick={fetchData}
        >
          <MdRefresh />
        </button>
      </div>

      {/* Book table */}
      <MUIDatatable
        title={"Book List"}
        data={books.map((book) => ({
          id: book.id || book._id,
          title: book.title,
          author: book.author,
          price: book.price,
          publishedDate: new Date(book.published_date).toISOString().split("T")[0],
        }))}
        columns={columns}
        options={options}
      />

      {/* Modal for adding/editing book */}
      <Modal
        className="bg-white rounded mx-auto p-4 fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Book Modal"
        style={{ overlay: { zIndex: 51 }, content: { width: "600px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" } }}
      >
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-lg font-bold mb-4">{btnSave ? "Add New Book" : "Update Book"}</h2>

          {/* Form fields for book details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">Published Date</label>
              <input
                type="date"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.publishedDate && <p className="text-red-500 text-sm">{errors.publishedDate}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">Cover Image</label>
              <input
                type="file"
                name="coverImage"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">PDF File</label>
              <input
                type="file"
                name="pdfFile"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.pdfFile && <p className="text-red-500 text-sm">{errors.pdfFile}</p>}
            </div>
          </div>

          <div className="flex justify-end">
            {btnUpdate && (
              <button className="bg-brand-500 text-white px-4 py-2 rounded mr-2" type="button" onClick={handleDelete}>
                Delete
              </button>
            )}

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {btnSave ? "Save" : "Update"}
            </button>

            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2" type="button" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default BookTable;
