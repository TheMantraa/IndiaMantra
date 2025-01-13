import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import ContactUs from "./pages/ContactUs";
import StoryAndVision from "./pages/StoryAndVision";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import BlogDetails from "./pages/BlogDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useLocation } from "react-router-dom";
import Marque from "./components/Marque";
import ProductCategories from "./components/ProductCategories";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetail";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/ScrollToTop";

function Layout() {
  const location = useLocation();

  const hideNavbarRoutes = ["/admin/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Marque />}
      {!shouldHideNavbar && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blogs/" element={<Blogs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/our-story-vision" element={<StoryAndVision />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route
          path="/productscategory/:category"
          element={<ProductCategories />}
        />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!shouldHideNavbar && <Footer />}
      <Analytics />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
