import React, { useState, useEffect } from "react";
import KnowProduct from "../components/KnowProduct";
import Categories from "../components/Categories";
import Bestsellers from "../components/Bestsellers";
import Videointro from "../components/Videointro";
import WhyUs from "../components/WhyUs";
import TestimonialCarousel from "../components/TestimonialCarousel";
import EmailModal from "../components/EmailModal";
import axios from "axios";
import TeaFinder from "../components/TeaFinder";
import SocialIcons from "../components/SocialIcons";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isModalShown = localStorage.getItem("isModalShown");
    if (!isModalShown) {
      setShowModal(true);
      localStorage.setItem("isModalShown", "true");
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEmailSubmit = (email) => {
    // Send the email to the backend for saving in Excel
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/sendemail/save-email`, {
        email,
      })
      .then((response) => {
        console.log("Email saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving email:", error);
      });

    // Close the modal after submission
    handleCloseModal();
  };

  return (
    <div>
      {showModal && (
        <EmailModal onClose={handleCloseModal} onSubmit={handleEmailSubmit} />
      )}
      <Videointro />
      <Bestsellers />
      <Categories />
      <TeaFinder />
      <WhyUs />
      <KnowProduct />
      <TestimonialCarousel />
      <SocialIcons />
    </div>
  );
};

export default Home;
