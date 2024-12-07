  import React, { useEffect } from "react";
  import Fanta1 from "../assets/fanta1.png";
  import Fanta2 from "../assets/fanta2.png";
  import Fanta3 from "../assets/fanta3.png";
  import { AnimatePresence, motion } from "framer-motion";
  import Navbar from "../components/Navbar";
  import { useNavigate } from "react-router-dom";

  // Animation configuration
  const SlideRight = (delay) => ({
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, delay, ease: "easeInOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2, ease: "easeInOut" } },
  });

  // Product data
  const productData = [
    {
      id: 1,
      image: Fanta1,
      title: "Orange Fanta",
      subtitle: "Revitalize your senses with the zesty goodness of Orange Fanta.",
      price: "$40",
      modal: "Orange",
      bgColor: "#ff7f32", // Orange
    },
    {
      id: 2,
      image: Fanta2,
      title: "Cola Zero",
      subtitle: "Enjoy the bold taste of Cola Zero without the sugar.",
      price: "$100",
      modal: "Zero",
      bgColor: "#000000", // Black
    },
    {
      id: 3,
      image: Fanta3,
      title: "Coca Cola",
      subtitle: "Coca Cola, the timeless classic.",
      price: "$100",
      modal: "Cola",
      bgColor: "#ff1f20", // Red
    },
  ];

  const Hero = () => {
    const [activeData, setActiveData] = React.useState(productData[0]);
    const navigate = useNavigate();

    // Function to cycle through products every 5 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveData((prev) => {
          const currentIndex = productData.findIndex((item) => item.id === prev.id);
          return productData[(currentIndex + 1) % productData.length];
        });
      }, 5000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const handleOrderNowClick = () => navigate("/stock");

    // Dynamically determine the button gradient colors based on the background color
    const getButtonColors = (bgColor) => {
      switch (bgColor) {
        case "#ff7f32": // Orange
          return "bg-gradient-to-r from-orange-500 to-orange-700 text-white";
        case "#000000": // Black
          return "bg-gradient-to-r from-black to-gray-800 text-white";
        case "#ff1f20": // Red
          return "bg-gradient-to-r from-red-500 to-red-700 text-white";
        default:
          return "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white";
      }
    };

    return (
      <motion.section
        initial={{ backgroundColor: activeData.bgColor }}
        animate={{ backgroundColor: activeData.bgColor }}
        transition={{ duration: 0.8 }}
        className="min-h-screen text-white flex flex-col"
      >
        <Navbar />
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-5 md:p-10 flex-grow">
          {/* Product Info Section */}
          <div className="flex flex-col justify-center space-y-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeData.id}
                variants={SlideRight(0.2)}
                initial="hidden"
                animate="show"
                exit="exit"
                className="text-4xl lg:text-6xl font-bold text-shadow"
              >
                {activeData.title}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeData.id}
                variants={SlideRight(0.4)}
                initial="hidden"
                animate="show"
                exit="exit"
                className="text-lg text-white/80 leading-relaxed"
              >
                {activeData.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* Order Now Button with Neomorphic and Hover Effects */}
            <AnimatePresence mode="wait">
              <motion.button
                key={activeData.id}
                variants={SlideRight(0.6)}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={handleOrderNowClick}
                className={`w-[250px] px-8 py-4 ${getButtonColors(activeData.bgColor)} text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 
                  /* Neomorphic effect */
                  shadow-lg inset-4 bg-[#ffffff20] border border-[#ffffff60] `}
              >
                Order Now
              </motion.button>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-8">
              <div className="h-[1px] w-20 bg-white"></div>
              <p className="text-sm uppercase">Top Recommendation</p>
              <div className="h-[1px] w-20 bg-white"></div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-6">
              {productData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveData(item)}
                  className={`cursor-pointer p-4 rounded-lg ${
                    activeData.id === item.id ? "bg-white/20 scale-105" : "bg-white/10"
                  } transition-all`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-20 mx-auto ${activeData.id === item.id ? "opacity-100" : "opacity-60"}`}
                  />
                  <p className="text-center text-sm mt-3">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Image Section */}
          <div className="flex justify-center items-center relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeData.id}
                src={activeData.image}
                alt={activeData.title}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="h-auto max-h-[300px] md:max-h-[380px] xl:max-h-[470px] img-shadow"
              />
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    );
  };

  export default Hero;
