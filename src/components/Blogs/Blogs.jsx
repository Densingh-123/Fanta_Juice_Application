import { useState } from "react";
import { UpdateFollower } from "react-mouse-follower";
import '../../index.css'

// Blog data
const BlogsData = [
  {
    id: 1,
    title: "Refreshing Your Day with 7UP!",
    desc: "Discover how 7UP adds a burst of freshness to your day. Perfect for any occasion!",
    fullDesc:
      "7UP is your ultimate companion for staying refreshed and energized. Whether it’s a family gathering or a solo moment, this lemon-lime drink is here to uplift your spirits.",
    link: "https://www.7up.com/",
    img: "https://api.freelogodesign.org/assets/blog/thumb/4d422f79f0274913aeb31571270b9ea2_1176x840.jpg?t=638369671740000000",
    blobColor: "green",
  },
  {
    id: 2,
    title: "Creative Recipes Using Fanta",
    desc: "Learn how to use Fanta in fun and unique recipes. Transform your drinks and desserts!",
    fullDesc:
      "Unlock the vibrant flavors of Fanta in your kitchen! From refreshing mocktails to delightful desserts, find inspiration to create magical recipes with its fizzy essence.",
    link: "https://www.fanta.com/",
    img: "https://wowmart.vn/wp-content/uploads/2016/01/thung-nuoc-ngot-fanta-cam-my-loc-12-lon-3.jpg",
    blobColor: "orange",
  },
  {
    id: 3,
    title: "Cola: The Classic Experience",
    desc: "Dive into the rich taste of cola. The ultimate blend of flavor and tradition!",
    fullDesc:
      "Cola’s classic flavor is an enduring favorite. Experience the bold taste and heritage that makes cola a drink for every generation.",
    link: "https://www.coca-cola.com/",
    img: "https://i.pinimg.com/736x/a1/63/36/a16336cc9b54714c494d6191fb338931.jpg",
    blobColor: "brown",
  },
  {
    id: 4,
    title: "Mountain Dew: Dare to Be Bold",
    desc: "Unleash your adventurous side with Mountain Dew. A drink for the bold and fearless!",
    fullDesc:
      "Mountain Dew is all about taking risks and living life to the fullest. Its bold flavor inspires creativity and adventure in every sip.",
    link: "https://www.mountaindew.com/",
    img: "https://rukminim2.flixcart.com/image/850/1000/xif0q/aerated-drink/g/a/f/-original-imah3bg5fngnyuje.jpeg?q=90&crop=false",
    blobColor: "lightgreen",
  },
];

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleClose = () => setSelectedBlog(null);

  return (
    <section className="bg-gray-50">
      <div className={`container py-14 ${selectedBlog ? "blur-sm" : ""}`}>
        <h1 className="text-4xl font-bold text-center pb-8 font-bold font-handwriting">Drink Blogs</h1>
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BlogsData.map((item) => (
            <UpdateFollower
              key={item.id}
              mouseOptions={{
                backgroundColor: item.blobColor,
                zIndex: 999,
                followSpeed: 1.5,
                text: "Read More",
                textFontSize: "10px",
                scale: 2,
              }}
            >
              <div
                className="relative flex flex-col items-center justify-center gap-6 p-5 md:p-6
                max-w-[300px] mx-auto shadow-lg rounded-md bg-white hover:-translate-y-2 hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                onClick={() => setSelectedBlog(item)}
              >
                {/* Blobs */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <span
                      key={index}
                      className={`absolute w-8 h-8 bg-${item.blobColor} opacity-30 rounded-full animate-blob`}
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                      }}
                    />
                  ))}
                </div>
                {/* Card Content */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-48 rounded-md object-cover"
                />
                <div className="space-y-2 text-center">
                  <h1 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {item.title}
                  </h1>
                  <p className="text-gray-600 line-clamp-2">{item.desc}</p>
                </div>
              </div>
            </UpdateFollower>
          ))}
        </div>
      </div>

      {/* Modal for Expanded Blog */}
      {selectedBlog && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-lg max-w-sm md:max-w-md lg:max-w-lg w-full p-6 relative h-[600px] overflow-y-auto scrollbar-hidden shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <img
              src={selectedBlog.img}
              alt={selectedBlog.title}
              className="w-full rounded-md mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedBlog.title}
            </h1>
            <p className="text-base text-gray-700 mb-4">{selectedBlog.fullDesc}</p>
            <a
              href={selectedBlog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 underline hover:text-orange-700"
            >
              Learn More
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;
