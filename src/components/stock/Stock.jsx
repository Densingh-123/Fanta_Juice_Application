import { useCart } from '../Cart/CartContext';
import { FaHeart, FaShareAlt, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify'; 

const DrinksData = [
  { id: 1, title: "Orange Fanta", image: "https://img.freepik.com/premium-photo/glass-orange-juice-oranges-with-leaves_159938-2736.jpg?w=740", desc: "Refresh yourself with a tangy taste.", delay: 0.5, price: "$1.99" },
  { id: 2, title: "Lemon Fanta", image: "https://img.freepik.com/premium-photo/refreshing-lemonade-isolated-white_128582-9.jpg?w=740", desc: "A citrus burst to quench your thirst.", delay: 0.7, price: "$2.49" },
  { id: 3, title: "Cola Zero", image: "https://img.freepik.com/free-photo/fresh-ice-tea-glass-with-lime_144627-6588.jpg?t=st=1733309449~exp=1733313049~hmac=d6d0bae3db7c774d2d0303a6d447530d5de087f7dc1f005920fdc4da0c16a0ea&w=740", desc: "Enjoy the classic taste with zero sugar.", delay: 0.9, price: "$1.79" },
  { id: 4, title: "Berry Fanta", image: "https://img.freepik.com/free-photo/raspberry-smoothie_1150-18529.jpg?t=st=1733309498~exp=1733313098~hmac=d517710e333d87a7f05e4032b02e94fa3e3026819f99d3ebc38c19b91c21019f&w=740", desc: "Taste the wild berry flavors.", delay: 1.1, price: "$2.69" },
  { id: 5, title: "Grape Fanta", image: "https://img.freepik.com/free-photo/arrangement-with-forest-fruits-smoothie_23-2148545365.jpg?t=st=1733309544~exp=1733313144~hmac=f0729019ee32e55721cfd57e887011750d59819d5093366ac746db784a51f62e&w=740", desc: "Rich and fruity grape goodness.", delay: 1.3, price: "$2.29" },
  { id: 6, title: "Pineapple Fanta", image: "https://img.freepik.com/premium-photo/fresh-summer-pineapple-juice_221774-2586.jpg?w=740", desc: "Tropical delight with a pineapple twist.", delay: 1.5, price: "$2.99" },
  { id: 7, title: "Strawberry Fanta", image: "https://img.freepik.com/premium-photo/fresh-summer-strawberry-smoothie_107389-64.jpg?w=740", desc: "A sweet strawberry treat to refresh you.", delay: 1.7, price: "$2.39" },
  { id: 8, title: "Apple Fanta", image: "https://img.freepik.com/free-photo/front-view-fresh-apple-juice-with-fresh-apples-dark-photo-color-cocktail-fruit-drink_140725-92830.jpg?t=st=1733309748~exp=1733313348~hmac=5849b23af3912eb30796b2dd0ebb698973475e37d6172daf07381359a50d4d51e&w=740", desc: "Crisp apple flavor in every sip.", delay: 1.9, price: "$2.89" },
  { id: 9, title: "Peach Fanta", image: "https://img.freepik.com/free-photo/high-angle-milkshake-glass-with-peach-strawberries_23-2148707767.jpg?t=st=1733309821~exp=1733313421~hmac=26ee7d497efc14241d4cb8d7aadd96a71461e1bff098ce1a66742304055f9da9&w=740", desc: "A smooth peach flavor to indulge your taste buds.", delay: 2.1, price: "$3.19" },
  { id: 10, title: "Mango Fanta", image: "https://img.freepik.com/premium-photo/glass-splashing-mango-smoothie-isolated-white_1004890-3205.jpg?w=740", desc: "A tropical mango burst for your palate.", delay: 2.3, price: "$2.79" },
  { id: 11, title: "Cherry Fanta", image: "https://img.freepik.com/free-photo/front-view-fresh-cherries-sour-mellow-along-with-cherry-juice-white_140725-20691.jpg?t=st=1733309883~exp=1733313483~hmac=f84219dbc0ceefbb0c96ac4a4ad40e575e0cbbba34cef32ffa2edf6cef7e9ab8&w=740", desc: "Sweet cherry flavor with a fizzy kick.", delay: 2.5, price: "$2.69" },
  { id: 12, title: "Lime Fanta", image: "https://img.freepik.com/free-photo/icy-mojito-cocktail-cup-with-limes-mint-straw-side-view-wooden-plaster-wall_176474-6665.jpg?t=st=1733309907~exp=1733313507~hmac=9aa028a6298a6603436f7c0eb474f68de0cdf5fd7dabb3ca244bd49cfa119a8c&w=740", desc: "Zesty lime flavor to refresh you.", delay: 2.7, price: "$2.59" },
  { id: 13, title: "Fruit Punch Fanta", image: "https://img.freepik.com/free-photo/kunefe-with-ice-cream-with-milk-shake_140725-7365.jpg?t=st=1733309968~exp=1733313568~hmac=836c3cf832ac94718afbe529d300ac642fde94a0f752a905471dc0b2bb2424bc&w=740", desc: "A blend of fruity flavors in one drink.", delay: 2.9, price: "$3.49" },
  { id: 14, title: "Coconut Fanta", image: "https://img.freepik.com/free-photo/side-view-red-fruit-smoothie-with-tubules-beverages-dried-lemon-drops-serving-napkins_176474-3199.jpg?t=st=1733310013~exp=1733313613~hmac=fbe11ef6dd6caf2d9328830838a82dbaa159f7e214142fd65419fa5feb111f45&w=740", desc: "A tropical coconut twist with a fizzy edge.", delay: 3.1, price: "$2.99" },
  { id: 15, title: "Watermelon Fanta", image: "https://img.freepik.com/free-photo/close-up-watermelon-juice-glass-plate_23-2148293839.jpg?t=st=1733310046~exp=1733313646~hmac=388a8975cb6507f2b6e5d1a56993fe0d33105f5a16710c5749b25610d7b33b4e&w=740", desc: "Fresh watermelon flavor to cool you off.", delay: 3.3, price: "$3.29" },
];

const Stocks = () => {
  const { addToCart } = useCart(); // Access addToCart from context
  const navigate = useNavigate(); // For navigation
  const [likedProducts, setLikedProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("likedProducts")) || [];
  });

  const handleLike = (product) => {
    let updatedLikes;
    if (likedProducts.some(item => item.id === product.id)) {
      updatedLikes = likedProducts.filter(item => item.id !== product.id);
      toast.info("Removed from liked products"); // Toast for removal
    } else {
      updatedLikes = [...likedProducts, product];
      toast.success("Added to liked products"); // Toast for adding to liked
    }

    setLikedProducts(updatedLikes);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
  };

  const handleShare = (product) => {
    const shareText = `Check out this product: ${product.title} - ${product.price}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    const mailtoLink = `mailto:?subject=Check out this product&body=${encodeURIComponent(shareText)}`;

    const shareChoice = prompt("Share via: 1. WhatsApp, 2. Email (Enter 1 or 2)");

    if (shareChoice === "1") {
      window.open(whatsappLink, "_blank");
      toast.success("Product shared via WhatsApp"); // Toast for sharing via WhatsApp
    } else if (shareChoice === "2") {
      window.location.href = mailtoLink;
      toast.success("Product shared via Email"); // Toast for sharing via Email
    }
  };

  return (
    <div className="bg-gray-100 py-8 relative">
      <div className="container py-14">
        <Link
          to="/"
          className="absolute top-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-center pb-10 font-handwriting">Our Drinks</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {DrinksData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center p-5 max-w-[300px] mx-auto shadow-lg rounded-xl bg-white relative"
              style={{ width: "280px", height: "460px" }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[250px] object-cover mb-4 rounded-lg"
              />
              <h4 className="text-xl font-semibold text-center">{item.title}</h4>
              <p className="text-gray-500 text-center mb-4">{item.desc}</p>
              <p className="text-lg font-bold text-green-600 mt-80 absolute left-52 pt-14">{item.price}</p>

              <button
                className="btn bg-yellow-500 text-white px-6 py-2 rounded-[10px] absolute bottom-6 left-24 transform -translate-x-1/2 flex items-center space-x-2"
                onClick={() => {
                  addToCart(item);
                  toast.success("Added to cart successfully"); // Toast for adding to cart
                }}
              >
                <span>Add to Cart</span>
                <FaShoppingCart />
              </button>

              <div className="absolute top-2 left-2 flex">
                <div className="relative">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(item)}
                    className={`absolute top-2 left-52 p-3 rounded-full ${likedProducts.some(like => like.id === item.id) ? 'bg-red-600 text-white' : 'bg-white text-red-600 border border-red-600'}`}
                  >
                    {likedProducts.some(like => like.id === item.id) ? <FaHeart /> : <FaHeart />}
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => handleShare(item)}
                    className="absolute top-16 left-52 p-3 rounded-full bg-white text-blue-500 border border-blue-500"
                  >
                    <FaShareAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stocks;
