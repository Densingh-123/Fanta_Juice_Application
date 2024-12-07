import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Starfield from '../Starfield/Starfield'; // Adjust path as needed

const RegisterForm = () => {
  const navigate = useNavigate();  // Initialize the navigate function
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate form inputs
  const validateForm = () => {
    let formErrors = {};
    const { name, email, phone } = formData;

    if (!name) formErrors.name = "Name is required";
    if (!email || !/\S+@\S+\.\S+/.test(email)) formErrors.email = "Please enter a valid email";
    if (!phone || !/^\d{10}$/.test(phone)) formErrors.phone = "Phone number must be 10 digits";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Save user data to localStorage (or any preferred method)
      localStorage.setItem('user', JSON.stringify(formData)); // Save user data to localStorage

      // If validation passes, navigate to the homepage
      navigate('/');  // Navigate to the homepage
    }
  };

  return (
    <div className="relative">
      <Starfield />
      <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black bg-opacity-20 p-8 rounded-xl shadow-lg max-w-lg w-full relative">

          {/* Circular Yellow Section at the top */}
          <div 
            className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
            onClick={() => document.getElementById('image-input').click()}
          >
            {formData.image ? (
              <img 
                src={URL.createObjectURL(formData.image)} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-white text-2xl">+</span>
            )}
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
            </div>

            {/* Hidden Image Input Field */}
            <input
              type="file"
              id="image-input"
              name="image"
              onChange={handleChange}
              className="hidden"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-400 text-white p-3 rounded-md hover:bg-gray-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
