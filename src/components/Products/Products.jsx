import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import P1 from "../../assets/fanta1.png";
import P2 from "../../assets/fanta2.png";
import P3 from "../../assets/fanta3.png";
import { motion } from "framer-motion";

export const fadeUp = (delay) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
      },
    },
  };
};

const ProductsData = [
  {
    id: 1,
    title: "Orange Fanta",
    image: P1,
    desc: "Experience the vibrant tanginess of fresh oranges with every sip of Orange Fanta.",
    delay: 0.5,
  },
  {
    id: 2,
    title: "Lemon Fanta",
    image: P2,
    desc: "Enjoy a refreshing burst of zesty lemons in every sparkling drop of Lemon Fanta.",
    delay: 0.8,
  },
  {
    id: 3,
    title: "Cola Zero",
    image: P3,
    desc: "Savor the classic cola flavor with zero sugar and maximum refreshment in Cola Zero.",
    delay: 1.1,
  },
];

const Products = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="bg-gray-100 py-8">
      <div className="container py-14">
        <motion.h1
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="show"
          className="text-4xl font-bold text-center pb-10 font-bold font-handwriting"
        >
          Our Products
        </motion.h1>
        {/* card section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ProductsData.map((item) => (
            <motion.div
              variants={fadeUp(item.delay)}
              key={item.id}
              initial="hidden"
              whileInView={"show"}
              className="flex flex-col items-center justify-center p-5 max-w-[300px] mx-auto shadow-lg rounded-xl bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[100px] mb-4 hover:rotate-12 hover:scale-110 duration-300"
              />
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold font-handwriting text-center">
                  {item.title}
                </h1>
                <p className="text-center text-sm text-gray-600">{item.desc}</p>
               <button
                  className="!mt-5 border-2 border-primary text-primary px-6 py-2 rounded-md hover:bg-primary hover:text-white duration-200"
                  onClick={() => navigate("/stock")} // Navigate to cart
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
