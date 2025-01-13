import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/getAllProduct`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/products/addProduct`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProducts((prevProducts) => [...prevProducts, response.data.product]);
      setIsModalOpen(false);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/products/updateProduct/${updatedProduct._id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? response.data.product : product
        )
      );
      setIsUpdateModalOpen(false);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/products/deleteProduct/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <div className="container mx-auto px-6 lg:px-12 ">
      <div className="flex justify-end ">
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>
      <div className="mb-8 flex justify-center">
        <button
          className={`px-4 py-2 mx-2 rounded-full text-sm font-semibold transition ${
            filter === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-full text-sm font-semibold transition ${
            filter === "Herbal Tea"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("HerbalTea")}
        >
          Herbal Tea
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-full text-sm font-semibold transition ${
            filter === "Green Tea"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("GreenTea")}
        >
          Green Tea
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-full text-sm font-semibold transition ${
            filter === "Black Tea"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("BlackTea")}
        >
          Black Tea
        </button>
      </div>

      {loading ? (
        <p className="text-center text-lg font-medium text-gray-600">
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer border border-gray-200 overflow-hidden relative"
            >
              <div className="relative w-full h-64">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-50 transition duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Category:</strong> {product.category}
                </p>
                <p className="text-gray-700 text-base mb-4">
                  {product.description.slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  {/* Edit Icon */}
                  <button
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                    onClick={() => {
                      setIsUpdateModalOpen(true);
                      setEditingProduct(product);
                    }}
                  >
                    <FaEdit className="inline-block mr-2" />
                    Edit
                  </button>

                  {/* Delete Icon */}
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <FaTrashAlt className="inline-block mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onAddProduct={handleAddProduct}
      />
      <UpdateProductModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        productData={editingProduct}
        onUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
};

export default ManageProducts;
