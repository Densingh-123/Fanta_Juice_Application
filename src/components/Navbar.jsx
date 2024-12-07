import { useState } from "react";
import Logo from "../assets/logo.png";
import { MdMenu } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Import `useNavigate` for navigation

const NavbarMenu = [
  {
    id: 2,
    title: "Products",
    link: "/stock", // Update the link to navigate to the /stock page
  },
  {
    id: 3,
    title: "Cart",
    link: "/cart",
  },
  {
    id: 4,
    title: "About",
    link: "/about",
  },
  {
    id: 5,
    title: "Register",
    link: "/auth",
  },
];

const Navbar = () => {
  const [user, setUser] = useState(null); // State to hold user data
  const [image, setImage] = useState(null); // State to hold user image
  const navigate = useNavigate(); // Initialize the navigate function

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Image uploaded:", reader.result); // Log the base64 string
        setImage(reader.result); // Set the uploaded image as base64
      };
      reader.readAsDataURL(file); // Read the file as a base64 string
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="text-white py-3 md:py-8 mt-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="container flex justify-between items-center"
      >
        {/* logo section */}
        <div>
          <img src={Logo} alt="Logo" className="max-w-[100px] invert" />
        </div>
        {/* Menu section */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-4 relative z-40">
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link} // Use `Link` for routing
                  className="inline-block text-base font-semibold py-2 px-3 uppercase"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            {/* User Profile Button */}
            {user ? (
              <li className="flex items-center gap-2">
                <img
                  src={image || URL.createObjectURL(user.image)} // Show uploaded image or the default user image
                  alt="User Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  style={{ zIndex: 10 }} // Set z-index for the uploaded image
                />
                <span>{user.name}</span>
              </li>
            ) : (
              <button
                className="text-xl ps-14"
                onClick={() => document.getElementById("fileInput").click()}
                style={{ position: "relative", zIndex: 5 }} // Make sure the button is beneath the uploaded image
              >
                <FaRegUser />
              </button>
            )}
          </ul>
        </div>
        {/* Hamburger Icon */}
        <div className="md:hidden">
          <MdMenu className="text-4xl" />
        </div>
      </motion.div>

      {/* Hidden file input for uploading an image */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="fileInput"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default Navbar;
