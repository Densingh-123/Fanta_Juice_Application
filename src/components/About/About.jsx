import React, { useState, useEffect, useRef } from "react";

// Starfield component
const Starfield = () => {
  const canvasRef = useRef(null);
  const layerCount = 3; // 3 layers for parallax
  const speeds = [0.05, 0.1, 0.2]; // Slower speeds for distant stars
  const baseStarCount = 50; // Base count of stars per layer
  let shootingStar = null;

  let stars = [];

  // Generate a random gray color for stars
  const getRandomGrayColor = () => {
    const grayValue = Math.floor(Math.random() * 256);
    return `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
  };

  // Resize the canvas
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
  };

  // Create the starfield
  const createStars = () => {
    stars = [];
    const canvas = canvasRef.current;
    const scalingFactor = Math.max(canvas.width, canvas.height) / 1000; // Scale star count
    for (let i = 0; i < layerCount; i++) {
      const starCount = Math.floor(baseStarCount * scalingFactor * (i + 1));
      for (let j = 0; j < starCount; j++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (i + 1) + 0.5, // Larger stars for closer layers
          speed: speeds[i],
          opacity: Math.random(),
          baseOpacity: Math.random() * 0.5 + 0.5, // Base opacity for twinkling
          layer: i, // Track which layer the star belongs to
        });
      }
    }
  };

  // Update star positions and simulate twinkling
  const updateStars = () => {
    stars.forEach((star) => {
      star.y -= star.speed; // All stars move upward
      star.opacity = star.baseOpacity + Math.sin(Date.now() * 0.001 * star.speed) * 0.3; // Smooth twinkle

      // Reset star position when it goes off-screen
      if (star.y < 0) {
        star.y = canvasRef.current.height;
        star.x = Math.random() * canvasRef.current.width;
      }
    });
  };

  // Draw the stars
  const drawStars = (ctx) => {
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add a dark radial blur gradient background
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 8, // Start small for a blur effect
      canvas.width / 2,
      canvas.height / 2,
      canvas.width // Expand to the edges
    );
    gradient.addColorStop(0, "orange"); // Deep dark blue at the center
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)"); // Black at the edges
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars with parallax effect
    stars.forEach((star) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });
  };

  // Initialize a shooting star
  const createShootingStar = () => {
    const startX = Math.random() * canvasRef.current.width;
    const startY = Math.random() * canvasRef.current.height;
    const angle = Math.random() * Math.PI * 2; // Random direction
    const length = Math.random() * 300 + 100; // Random trail length
    const speed = Math.random() * 4 + 2;

    shootingStar = {
      x: startX,
      y: startY,
      length: length,
      speed: speed,
      opacity: 1,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
    };

    // Schedule the next shooting star (20–40 seconds for rare appearance)
    const nextAppearance = Math.random() * 20000 + 20000;
    setTimeout(createShootingStar, nextAppearance);
  };

  // Update shooting star position
  const updateShootingStar = () => {
    if (!shootingStar) return;

    shootingStar.x += shootingStar.dx;
    shootingStar.y += shootingStar.dy;
    shootingStar.opacity -= 0.01;

    if (
      shootingStar.opacity <= 0 ||
      shootingStar.x < 0 ||
      shootingStar.x > canvasRef.current.width ||
      shootingStar.y < 0 ||
      shootingStar.y > canvasRef.current.height
    ) {
      shootingStar = null; // Remove shooting star
    }
  };

  // Draw the shooting star
  const drawShootingStar = (ctx) => {
    if (!shootingStar) return;

    const gradient = ctx.createLinearGradient(
      shootingStar.x,
      shootingStar.y,
      shootingStar.x - shootingStar.dx * shootingStar.length,
      shootingStar.y - shootingStar.dy * shootingStar.length
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.moveTo(shootingStar.x, shootingStar.y);
    ctx.lineTo(
      shootingStar.x - shootingStar.dx * shootingStar.length,
      shootingStar.y - shootingStar.dy * shootingStar.length
    );
    ctx.stroke();
    ctx.closePath();
  };

  // Animation loop
  const animate = () => {
    const ctx = canvasRef.current.getContext("2d");
    updateStars();
    updateShootingStar();
    drawStars(ctx);
    drawShootingStar(ctx);
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    resizeCanvas();
    createStars();
    setTimeout(createShootingStar, Math.random() * 20000 + 20000); // Rare shooting stars
    animate();

    // Handle resizing
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }} />;
};

// DrinksApp component
const DrinksApp = () => {
  const [selectedDrink, setSelectedDrink] = useState(null);

  const handleDrinkClick = (drink) => {
    setSelectedDrink(drink);
  };

  const handleBack = () => {
    setSelectedDrink(null);
  };

  const DrinksData = [
    {
      id: 1,
      title: "Orange Fanta",
      image: "https://img.freepik.com/premium-photo/glass-orange-juice-oranges-with-leaves_159938-2736.jpg?w=740",
      desc: "Experience a burst of tangy citrus flavor with every sip of Orange Fanta. Perfectly balanced with sweetness and a zesty orange kick, this refreshing drink is a must-have for hot summer days. Its vibrant color and effervescent bubbles make it visually appealing and satisfying. Whether paired with a meal or enjoyed on its own, Orange Fanta provides an invigorating experience that brightens your mood.",
      delay: 0.5,
      price: "$1.99",
    },
    {
      id: 2,
      title: "Lemon Fanta",
      image: "https://img.freepik.com/premium-photo/refreshing-lemonade-isolated-white_128582-9.jpg?w=740",
      desc: "Indulge in the tangy and zesty delight of Lemon Fanta, a drink designed to quench your thirst and uplift your spirits. Bursting with the citrusy goodness of fresh lemons, it offers a sharp yet refreshing taste that tantalizes your taste buds. The effervescent bubbles enhance its vibrant flavor, making every sip a fizzy treat.",
      delay: 0.7,
      price: "$2.49",
    },
    {
      id: 3,
      title: "Cola Zero",
      image: "https://img.freepik.com/free-photo/fresh-ice-tea-glass-with-lime_144627-6588.jpg?t=st=1733309449~exp=1733313049~hmac=d6d0bae3db7c774d2d0303a6d447530d5de087f7dc1f005920fdc4da0c16a0ea&w=740",
      desc: "Enjoy the classic cola flavor you love, now with zero sugar. Cola Zero combines the iconic taste of cola with a healthier twist, making it the perfect choice for the health-conscious. The bold flavor and bubbly texture offer a satisfying experience that doesn’t compromise on taste.",
      delay: 0.9,
      price: "$1.79",
    },
    {
      id: 4,
      title: "Berry Fanta",
      image: "https://img.freepik.com/free-photo/raspberry-smoothie_1150-18529.jpg?t=st=1733309498~exp=1733313098~hmac=d517710e333d87a7f05e4032b02e94fa3e3026819f99d3ebc38c19b91c21019f&w=740",
      desc: "Savor the delightful medley of wild berries with Berry Fanta, a drink crafted for berry enthusiasts. Packed with the rich flavors of raspberries, strawberries, and blueberries, it delivers a refreshing taste that’s both sweet and tangy. The vibrant red hue and effervescent bubbles create a visually stunning and flavorful treat.",
      delay: 1.1,
      price: "$2.69",
    },
    {
      id: 5,
      title: "Grape Fanta",
      image: "https://img.freepik.com/free-photo/arrangement-with-forest-fruits-smoothie_23-2148545365.jpg?t=st=1733309544~exp=1733313144~hmac=f0729019ee32e55721cfd57e887011750d59819d5093366ac746db784a51f62e&w=740",
      desc: "Delight in the rich, fruity flavor of Grape Fanta. Packed with the essence of sun-ripened grapes, this drink offers a bold, sweet taste with a slight tart finish. Its vivid purple color and effervescent bubbles make it a standout choice for celebrations or a simple indulgence.",
      delay: 1.3,
      price: "$2.29",
    },
    {
      id: 6,
      title: "Pineapple Fanta",
      image: "https://img.freepik.com/premium-photo/fresh-summer-pineapple-juice_221774-2586.jpg?w=740",
      desc: "Take a sip of paradise with Pineapple Fanta. This tropical delight combines the tangy sweetness of ripe pineapples with a fizzy kick to deliver a refreshing and invigorating experience. Perfect for sunny afternoons or as a tropical twist to your favorite meal.",
      delay: 1.5,
      price: "$2.99",
    },
    {
      id: 7,
      title: "Strawberry Fanta",
      image: "https://img.freepik.com/premium-photo/fresh-summer-strawberry-smoothie_107389-64.jpg?w=740",
      desc: "Dive into the sweet and juicy flavor of Strawberry Fanta. Crafted with the essence of fresh strawberries, this drink offers a delightful combination of sweetness and fizz. Its cheerful pink hue makes it perfect for celebrations or as a mood booster.",
      delay: 1.7,
      price: "$2.39",
    },
    {
      id: 8,
      title: "Apple Fanta",
      image: "https://img.freepik.com/free-photo/front-view-fresh-apple-juice-with-fresh-apples-dark-photo-color-cocktail-fruit-drink_140725-92830.jpg?t=st=1733309748~exp=1733313348~hmac=5849b23af3912eb30796b2dd0ebb698973475e37d6172daf07381359a50d4d51&w=740",
      desc: "Crisp, fresh, and irresistibly fizzy, Apple Fanta brings the natural sweetness of apples to life. Its golden hue and refreshing bubbles make it the perfect drink for any occasion, offering a flavor as satisfying as biting into a freshly picked apple.",
      delay: 1.9,
      price: "$2.89",
    },
    {
      id: 9,
      title: "Peach Fanta",
      image: "https://img.freepik.com/free-photo/high-angle-milkshake-glass-with-peach-strawberries_23-2148707767.jpg?t=st=1733309821~exp=1733313421~hmac=26ee7d497efc14241d4cb8d7aadd96a71461e1bff098ce1a66742304055f9da9&w=740",
      desc: "Enjoy the smooth, luscious flavor of ripe peaches in every sip of Peach Fanta. Its gentle sweetness, paired with a fizzy sparkle, makes it a delightful treat for those who love the comforting taste of stone fruits.",
      delay: 2.1,
      price: "$3.19",
    },
    {
      id: 10,
      title: "Mango Fanta",
      image: "https://img.freepik.com/premium-photo/glass-splashing-mango-smoothie-isolated-white_1004890-3205.jpg?w=740",
      desc: "Transport yourself to tropical bliss with Mango Fanta. Bursting with the exotic sweetness of mangoes and a bubbly twist, this drink is a perfect way to beat the heat and indulge in a luscious flavor escape.",
      delay: 2.3,
      price: "$2.79",
    },
    
  ];

  const companyOverview = {
    description:
      "Fanta is a global leader in refreshing drinks, offering a wide variety of fizzy beverages bursting with vibrant flavors. With decades of experience and a passion for innovation, Fanta ensures every sip is an experience in itself.",
    experience: "Over 50 years of experience in providing refreshing drinks.",
    customerRatings: 4.8, // Average rating out of 5
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Starfield />
      <div
        style={{
          zIndex: 1,
          position: "relative",
          padding: "20px",
        }}
      >
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: 30,
            marginTop: 20,
            fontWeight: "bold",
            fontStyle: "italic",
            color: "#fff",
          }}
        >
          About Us
        </h1>

        {selectedDrink ? (
          // Full-Screen Details View
          <div
          style={{
            display: "flex",
            flexDirection: "row", // Keep it row for side-by-side layout
            alignItems: "center", // Vertically align the items in the center
            justifyContent: "center",
            minHeight: "80vh",
            backgroundColor: "rgba(0,0,0, 0.6)", // Semi-transparent background
            padding: "20px",
            textAlign: "left", // Align text to the left
            color: "white",
            borderRadius: 10,
          }}
        >
          <img
            src={selectedDrink.image}
            alt={selectedDrink.title}
            style={{
              width: "350px",
              height: "auto",
              borderRadius: "10px",
              marginRight: "20px", // Add space between the image and the text
            }}
          />
          
          <div>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {selectedDrink.title}
            </h2>
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              {selectedDrink.desc}
            </p>
            <p style={{ fontSize: "20px", color: "#ff5722" }}>
              Price: {selectedDrink.price}
            </p>
            <button
              onClick={handleBack}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#ff5722",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "160px",
                marginLeft:720
              }}
            >
              Back
            </button>
          </div>
        </div>
        
        ) : (
          // Drinks List
          <div>
            <h2 style={{ textAlign: "center", color: "#fff" }}>Our Drinks</h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              {DrinksData.map((drink) => (
                <div
                  key={drink.id}
                  onClick={() => handleDrinkClick(drink)}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "200px",
                    margin: "10px",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={drink.image}
                    alt={drink.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "15px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {drink.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "#777" }}>{drink.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrinksApp;
