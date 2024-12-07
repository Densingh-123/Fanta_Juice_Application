import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

const LikedProducts = () => {
  const { id } = useParams();
  const [likedProducts, setLikedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const savedLikedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedProducts(savedLikedProducts);
  }, []);

  useEffect(() => {
    if (id) {
      const selected = likedProducts.find((product) => product.id === parseInt(id));
      setSelectedProduct(selected);
    }
  }, [id, likedProducts]);

  const handleRemoveFromLikes = (productId) => {
    const updatedLikedProducts = likedProducts.filter(
      (product) => product.id !== productId
    );
    setLikedProducts(updatedLikedProducts);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));

    // Toast notification for product removal
    const removedProduct = likedProducts.find((product) => product.id === productId);
    if (removedProduct) {
      toast.error(`${removedProduct.title} removed from liked products`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { backgroundColor: "#f87171", color: "#fff" }, // Red background for error
      });
    }
  };

  if (selectedProduct) {
    return (
      <div className="bg-gray-100 py-8">
        <div className="container py-14">
          <Link
            to="/liked-products"
            className="absolute top-5 left-5 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Back to Liked Products
          </Link>

          <h1 className="text-4xl font-bold text-center pb-10 font-handwriting">Product Details</h1>

          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-[300px] h-[300px] object-cover rounded-lg mb-6 md:mb-0 md:mr-10 transition-transform transform hover:scale-105"
            />
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold mb-4">{selectedProduct.title}</h2>
              <p className="text-gray-500 mb-4">{selectedProduct.desc}</p>
              <p className="text-lg font-bold text-green-600 mb-4">{selectedProduct.price}</p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="container py-14">
        <Link
          to="/"
          className="absolute top-5 left-5 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-center pb-10 font-handwriting">Liked Products</h1>

        {likedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {likedProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center justify-center p-5 w-[300px] mx-auto shadow-lg rounded-xl bg-white relative transition-all transform hover:scale-105 min-h-[450px] max-w-[300]" // Increased card height
              >
                {/* Remove Button at the Top Left */}
                <button
                  onClick={() => handleRemoveFromLikes(product.id)}
                  className="absolute top-2 left-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 z-10"
                >
                  Remove
                </button>

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[250px] object-cover mb-4 rounded-lg transition-all transform"
                />
                <h4 className="text-xl font-semibold text-center mb-2">{product.title}</h4>
                <p className="text-gray-500 text-center mb-4">{product.desc}</p>

                {/* Price and View Details in the same row */}
                <div className="absolute bottom-0 right-0 w-full p-4 flex justify-between items-center mt-10">
                  {/* Price */}
                  <p className="text-lg font-bold text-green-600">{product.price}</p>

                  {/* View Details Button */}
                  <Link
                    to={`/liked-products/${product.id}`}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl">No liked products yet.</p>
        )}
      </div>
    </div>
  );
};

export default LikedProducts;
