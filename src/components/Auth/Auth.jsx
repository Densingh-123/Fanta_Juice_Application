import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JuiceShopAuth() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const toggleAuthMode = () => setIsRegister((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isRegister ? "/api/register" : "/api/login";
  

    try {
      const response = await axios.post(`http://localhost:5000${url}`, formData);
      alert(response.data.message);

      if (!isRegister) navigate("/"); // Navigate after login
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: url('https://png.pngtree.com/png-vector/20240407/ourmid/pngtree-fresh-fruit-juices-drinks-3d-png-image_12270313.png') center/cover no-repeat;
          padding: 20px;
          background-size: cover;
          position: relative;
        }

        .container {
          position: relative;
          width: 100%;
          max-width: 850px;
          height: 100%;
          max-height: 600px;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: row;
          overflow: hidden;
          transition: all 0.5s ease-in-out;
          padding: 10px;
        }

        .form-box {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: black;
          z-index: 2;
        }

        .form-box h1 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: orange;
          text-align: center;
        }

        .input-box {
          margin: 20px 0;
          width: 100%;
        }

        .input-box input {
          width: 100%;
          padding: 15px;
          font-size: 1rem;
          border: 2px solid orange;
          border-radius: 8px;
          outline: none;
          transition: border 0.3s ease-in-out;
        }

        .input-box input:focus {
          border-color: orange;
        }

        .btn {
          background: linear-gradient(135deg, #E4973FFF, #FFAB52FF);
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          color: #fff;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          width: 100%;
        }

        .btn:hover {
          transform: scale(1.05);
          background: linear-gradient(135deg, #F48D17FF, #FFCC75FF);
        }

        .toggle-section {
          flex: 1;
          background: url('https://img.pikbest.com/origin/09/43/42/83apIkbEsTDfp.jpg!w700wp') center/cover no-repeat;
          background-size: cover;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
          padding: 30px;
          z-index: 1;
          backdrop-filter: blur(15px);
          position: relative;
          border-radius: 20px;
        }

        .toggle-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: -1;
          border-radius: 20px;
        }

        .toggle-section h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
        }

        .toggle-section button {
          background: #fff;
          color: orange;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          font-weight: bold;
        }

        .toggle-section button:hover {
          background: #FFF1D5FF;
        }

        .container.register-mode .form-box {
          order: 2;
        }

        @media screen and (max-width: 768px) {
          .container {
            flex-direction: column;
            max-width: 100%;
            height: auto;
          }

          .form-box {
            padding: 30px;
          }

          .toggle-section {
            padding: 20px;
          }

          .form-box h1 {
            font-size: 2rem;
          }

          .toggle-section h2 {
            font-size: 1.5rem;
          }

          .btn {
            font-size: 1rem;
            padding: 10px;
          }
        }
        `}
      </style>
      <div className={`container ${isRegister ? "register-mode" : ""}`}>
        <div className="form-box">
          <h1>{isRegister ? "Register" : "Login"}</h1>
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="input-box">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn">
              {isRegister ? "Register" : "Login"}
            </button>
          </form>
        </div>
        <div className="toggle-section">
          <h2>{isRegister ? "Already have an account?" : "New to Juice Shop?"}</h2>
          <button onClick={toggleAuthMode}>
            {isRegister ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </>
  );
}

export default JuiceShopAuth;
