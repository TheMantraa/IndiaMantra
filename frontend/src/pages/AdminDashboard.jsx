import React, { useState } from "react";

import ManageBlogs from "../components/ManageBlogs";
import ManageProducts from "../components/ManageProducts";
import ManageRecipes from "../components/ManageRecipes";
import axios from "axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/adminlogin";
  };
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/sendemail/download-emails`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "emails.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="lg:w-64 bg-gradient-to-b from-blue-600 to-blue-400 text-white p-6 shadow-lg flex flex-col justify-between">
        <div>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-sm text-blue-300 mt-2">Manage Your Platform</p>
          </div>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => handleTabChange("products")}
                className={`w-full text-center py-3 px-4 rounded-lg hover:bg-blue-800 focus:outline-none ${
                  activeTab === "products" ? "bg-blue-800 shadow-md" : ""
                } transition-all duration-300`}
              >
                Manage Products
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("blogs")}
                className={`w-full text-center py-3 px-4 rounded-lg hover:bg-blue-800 focus:outline-none ${
                  activeTab === "blogs" ? "bg-blue-800 shadow-md" : ""
                } transition-all duration-300`}
              >
                Manage Blogs
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("recipes")}
                className={`w-full text-center py-3 px-4 rounded-lg hover:bg-blue-800 focus:outline-none ${
                  activeTab === "recipes" ? "bg-blue-800 shadow-md" : ""
                } transition-all duration-300`}
              >
                Manage Recipes
              </button>
            </li>
          </ul>
        </div>
        <div className="border-t border-blue-600 pt-6 space-y-2">
          <button
            onClick={handleDownload}
            className="w-full py-3 px-4 rounded-lg bg-green-600 hover:bg-green-700 focus:outline-none transition-all duration-300 text-center"
          >
            Download Email list
          </button>
          <button
            onClick={handleLogout}
            className="w-full  py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none transition-all duration-300 text-center"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        {activeTab === "products" && <ManageProducts />}
        {activeTab === "blogs" && <ManageBlogs />}
        {activeTab === "recipes" && <ManageRecipes />}
      </div>
    </div>
  );
};

export default AdminDashboard;
