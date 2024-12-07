import { useCart } from './CartContext'; // Import the context
import { useNavigate } from 'react-router-dom'; // Import useNavigate to navigate to the product page
import { toast } from 'react-toastify'; // Import toast for notifications

const Cart = () => {
  const { cart, removeFromCart } = useCart(); // Access cart and removeFromCart from context
  const navigate = useNavigate(); // Initialize useNavigate

  // Calculate the total price of all items in the cart
  const totalPrice = cart
    .reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0)
    .toFixed(2);

  // Toast notifications
  const notifyRemoveFromCart = (itemName) => {
    toast.error(`${itemName} removed from Cart`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: { backgroundColor: "#f87171", color: "#fff" }, // Red background for error
    });
  };

  const notifyProceedToCheckout = () => toast.success("Proceeding to Checkout");

  return (
    <div className="bg-gray-100 py-8">
      <div className="container">
        <h1 className="text-4xl font-bold text-center pb-10">Your Cart</h1>
        <button
          onClick={() => navigate('/like')} // Navigate to the liked products page
          className="absolute top-0 right-0 mt-4 mr-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 z-10"
        >
          Liked Products
        </button>

        {/* If the cart is empty, show the image and back to product page button */}
        {cart.length === 0 ? (
          <div className="w-full h-screen relative flex flex-col justify-center items-center">
            <img
              src="https://adasglobal.com/img/empty-cart.png"
              alt="Cart Empty"
              className="object-cover w-full h-full mb-8"
            />
            <button
              onClick={() => navigate('/stock')} // Navigate to the product page
              className="absolute z-10 mt-36 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              style={{ zIndex: 10 }}
            >
              Back to Product Page
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center p-5 max-w-[300px] mx-auto shadow-lg rounded-xl bg-white"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[300px] h-[250px] object-cover mb-4 rounded-lg"
                />
                <h4 className="text-xl font-semibold text-center">{item.name}</h4>
                <p className="text-gray-500 text-center mb-4">{item.price}</p>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    notifyRemoveFromCart(item.name); // Trigger toast notification
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Display Total Price */}
        {cart.length > 0 && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold">Total Price: ${totalPrice}</h2>
            <button
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={() => {
                notifyProceedToCheckout(); // Trigger toast notification
                navigate('/payment'); // Navigate to payment page
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
