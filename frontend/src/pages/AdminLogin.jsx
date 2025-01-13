import React, { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors
    setLoading(true); // Set loading state

    if (!email || !password) {
      setError("Please fill in both fields.");
      setLoading(false);
      return;
    }

    try {
      // Make the API call to the login endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/api_login`,
        {
          email,
          password,
        }
      );
      console.log(response);

      if (response.data && response.data.token) {
        // Store the auth token in local storage
        localStorage.setItem("authToken", response.data.token);
        // Optionally, redirect to the admin dashboard or home page
        window.location.href = "/admin/dashboard"; // Update this path based on your routing
      } else {
        setError("Invalid credentials.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="my-10 flex items-center justify-center ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          ADMIN LOGIN
        </h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading} // Disable button during loading
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/" className="text-blue-600 hover:underline text-sm">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
