import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
    const selectedProduct = savedProducts.find((prod) => prod.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="container py-14">
        <h1 className="text-4xl font-bold text-center pb-10 font-handwriting">Product Details</h1>

        <div className="flex flex-col md:flex-row justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-[300px] h-[300px] object-cover rounded-lg mb-6 md:mb-0 md:mr-10"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
            <p className="text-gray-500 mb-4">{product.desc}</p>
            <p className="text-lg font-bold text-green-600 mb-4">{product.price}</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
