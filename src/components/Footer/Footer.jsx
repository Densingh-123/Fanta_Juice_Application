import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaPhone,
  FaTelegram,
} from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import CardsImg from "../../assets/credit-cards.webp";
import Logo from "../../assets/logo.png";
import { motion } from "framer-motion";

const Footer = () => {
  const [bgColor, setBgColor] = React.useState("#1a202c"); // Default background color
  const navigate = useNavigate();

  // Product background colors
  const backgroundColors = [
    "#ff7f32", // Orange
    "#000000", // Black
    "#ff1f20", // Red
  ];

  // Function to cycle through background colors every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prevColor) => {
        const currentIndex = backgroundColors.findIndex((color) => color === prevColor);
        return backgroundColors[(currentIndex + 1) % backgroundColors.length];
      });
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <motion.footer
      initial={{ backgroundColor: bgColor }}
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.8 }}
      className="pt-12 pb-8 text-white"
    >
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Company Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            className="space-y-6"
          >
            <img src={Logo} alt="Company Logo" className="max-w-[100px] invert" />
            <div>
              <p className="flex items-center gap-2">
                <FaPhone />
                +(91) 95665 - 85043
              </p>
              <p className="flex items-center gap-2 mt-2">
                <FaMapLocation /> India, TamilNadu
              </p>
            </div>
          </motion.div>
          {/* Footer Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
            }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold">Quick Links</h1>
            <div className="grid grid-cols-2 gap-3">
              <ul className="space-y-2">
                <li
                  onClick={() => navigate("/")}
                  role="button"
                  tabIndex="0"
                  className="cursor-pointer hover:text-gray-300"
                >
                  Home
                </li>
                <li
                  onClick={() => navigate("/stock")}
                  role="button"
                  tabIndex="0"
                  className="cursor-pointer hover:text-gray-300"
                >
                  Product
                </li>
                <li
                  onClick={() => navigate("/cart")}
                  role="button"
                  tabIndex="0"
                  className="cursor-pointer hover:text-gray-300"
                >
                  Cart
                </li>
                <li
                  onClick={() => navigate("/about")}
                  role="button"
                  tabIndex="0"
                  className="cursor-pointer hover:text-gray-300"
                >
                  About
                </li>
              </ul>
              <ul className="space-y-2">
                <li
                  onClick={() => navigate("/auth")}
                  role="button"
                  tabIndex="0"
                  className="cursor-pointer hover:text-gray-300"
                >
                  Register
                </li>
                <li
                  onClick={() => navigate("/user")}
                  role="button"
                  tabIndex="0"
                  className="cursor-pointer hover:text-gray-300"
                >
                  User
                </li>
                <li
                  onClick={() => navigate("/like")}
                  role="button"
                  tabIndex="0"
                  className="cursor-pointer hover:text-gray-300"
                >
                  Like
                </li>
                <li className="cursor-pointer hover:text-gray-300">Privacy Policy</li>
              </ul>
            </div>
          </motion.div>
          {/* Social Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.6,
            }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold">Follow us</h1>
            <div className="flex items-center gap-3">
              <FaFacebook
                className="text-3xl cursor-pointer hover:scale-105 duration-300"
                onClick={() => window.open("https://www.facebook.com/", "_blank")}
              />
              <FaInstagram
                className="text-3xl cursor-pointer hover:scale-105 duration-300"
                onClick={() => window.open("https://www.instagram.com/", "_blank")}
              />
              <FaTelegram
                className="text-3xl cursor-pointer hover:scale-105 duration-300"
                onClick={() => window.open("https://www.telegram.com/", "_blank")}
              />
              <FaGoogle
                className="text-3xl cursor-pointer hover:scale-105 duration-300"
                onClick={() => window.open("https://www.google.com/", "_blank")}
              />
            </div>
            <div className="space-y-2">
              <p>Payment Methods</p>
              <img
                src={CardsImg}
                alt="Payment Options"
                className="cursor-pointer"
                onClick={() => navigate("/payment")}
              />
            </div>
          </motion.div>
        </div>
        {/* Copyright Section */}
        <p className="text-center mt-8 border-t-2 border-white/40 pt-8">
          Copyright &copy; 2024. All Rights Reserved
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
