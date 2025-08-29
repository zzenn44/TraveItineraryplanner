import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import TripList from "./TripList";
import { AuthContext } from "../context/AuthContext";
import everestImg from "../assets/everestbase.jpeg";
import dolpoImg from "../assets/dolpo.jpeg";
import phoksundoImg from "../assets/phoksundo.jpeg";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [sliderRef] = useKeenSlider({
    loop: true,
    rtl: true,
    slides: {
      perView: 1,
      spacing: 20,
    },
    created(s) {
      setInterval(() => {
        s.next();
      }, 3000);
    },
  });

  const phoksundoImages = [everestImg, dolpoImg, phoksundoImg];

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans">
      {/* Navbar */}
      <nav className="bg-[#CABA9C] p-4 shadow-md flex justify-between items-center">
        <div className="text-[#4c6444] font-bold text-2xl">TripPal</div>
        <div className="space-x-6 text-[#4c6444] font-medium flex items-center">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#categories" className="hover:underline">Categories</a>
          <Link to="/saved-itineraries" className="text-[#4c6444]">Saved</Link>
            <>
              <button
                onClick={logout}
                className="bg-[#4c6444] text-white px-3 py-1 rounded hover:bg-[#3e5338]"
              >
                Logout
              </button>
            </>
          
        </div>
      </nav>

      {/* Hero Section with Slider */}
      <div className="h-[50vh] w-full flex items-center justify-center">
        <div className="h-[80%] flex-1">
          <div className="p-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#4c6444]">
              Find Your Perfect Trekking Adventure
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
              Discover hidden trails, personalize your trekking route and experience the Himalayas like never before.
            </p>
            <button
              onClick={() => navigate("/preferences")}
              className="mt-6 bg-[#4c6444] text-white px-6 py-2 rounded hover:bg-[#3e5338]"
            >
              Get Started
            </button>
          </div>
        </div>
        <div
          ref={sliderRef}
          className="keen-slider h-[80%] flex-1 ml-8 rounded-xl shadow-md overflow-hidden"
        >
          {phoksundoImages.map((img, idx) => (
            <div
              key={idx}
              className="keen-slider__slide flex justify-center items-center"
            >
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="h-full w-auto rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Categories Preview */}
      <section id="categories" className="bg-[#e9ebd5] py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-[#4c6444] mb-8">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-[95vw] h-[60vh] mx-auto">
          {[
            {
              name: "Lake",
              image:
                "https://media.istockphoto.com/id/1466769843/photo/scenic-view-of-tilicho-lake-amidst-himalayas-mountains.webp?a=1&b=1&s=612x612&w=0&k=20&c=n-AxzBcNSryOHwFTRzljnAUVwyku9kXg1283PVlJaJw=",
              navigationID: "lake",
            },
            {
              name: "Circuit",
              image:
                "https://images.unsplash.com/photo-1723829864446-1254de6547b6?w=900&auto=format&fit=crop&q=60",
              navigationID: "circuit",
            },
            {
              name: "Base Camp",
              image:
                "https://images.unsplash.com/photo-1504701365486-b44b67f99439?w=900&auto=format&fit=crop&q=60",
              navigationID: "basecamp",
            },
            {
              name: "Peak",
              image:
                "https://media.istockphoto.com/id/1195458582/photo/aerial-view-of-misty-mountains-at-sunrise.webp?a=1&b=1&s=612x612&w=0&k=20&c=BRdUrBGcJ80x_DeNDBZZP8jUIOdISzhR05mLZK5I7As=",
              navigationID: "mountain",
            },
            {
              name: "Short Trek",
              image:
                "https://plus.unsplash.com/premium_photo-1691591182467-b5ffdf32c1d7?w=900&auto=format&fit=crop&q=60",
              navigationID: "shorttrek",
            },
            {
              name: "Valley",
              image:
                "https://images.unsplash.com/photo-1589891685391-b37508e8df4c?w=900&auto=format&fit=crop&q=60",
              navigationID: "valley",
            },
          ].map((cat) => (
            <div
              key={cat.name}
              className="relative m-4 text-white p-4 rounded-3xl overflow-hidden text-center shadow-lg hover:brightness-110 h-[90%] w-[30vw] flex items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage: `url(${cat.image})`,
              }}
            >
              <div className="px-4 py-2 rounded">
                <button
                  onClick={() => navigate(`/${cat.navigationID}`)}
                  className="bg-gray-800 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-md shadow-md transition duration-300"
                >
                  {cat.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Trips */}
      <section className="bg-[#f5f5f5] py-12" id="features">
        <h2 className="text-3xl font-bold text-center text-[#4c6444] mb-8">
          Featured Treks
        </h2>
        <TripList />
      </section>

      {/* Footer */}
      <footer className="bg-[#7f4710] text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} TripPal. All rights reserved.</p>
      </footer>
    </div>
 
  );
}

