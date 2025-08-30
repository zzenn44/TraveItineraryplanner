// // import React from "react";
// // import TripCard from "./TripCard";
// // import axios from "axios";
// // import { useAuth } from "../context/AuthContext";
// // import "keen-slider/keen-slider.min.css";
// // import { useKeenSlider } from "keen-slider/react";
// // import everestImg from "../assets/Everest.jpeg";
// // import everestbase from "../assets/everestbase.jpeg";


// // import dolpoImg from "../assets/dolpo.jpeg";
// // import phoksundoImg from "../assets/phoksundo.jpeg";
// // import gosaikundaImg from "../assets/gosainkunda.jpeg";

// // const trips = [
// //   {
// //     id: "684bd407b1f9cbf5329bc78d",
// //     name: "Everest Base Camp",
// //     description: "Trek to the world’s tallest peak base",
// //     image: "https://media.istockphoto.com/id/157334698/photo/many-tents-at-the-snowy-mountain-everest-base-camp.webp?a=1&b=1&s=612x612&w=0&k=20&c=vyztYMpG90mtvpUM71PUaH3O1vklDXEri3GRe4AXxzo=",
// //     rating: 5
// //   },
// //   {
// //     id: "684bd407b1f9cbf5329bc786",
// //     name: "Upper Dolpo",
// //     description: "Remote and culturally rich trekking region",
// //     image: "https://media.istockphoto.com/id/824659554/photo/ancient-bon-stupa-in-saldang-village-dolpo-nepal.webp?a=1&b=1&s=612x612&w=0&k=20&c=TIIhKDFnXBUZyUsI4Z_YwGNO_8V3f9xFd7K_RaF0MB0=",
// //     rating: 5
// //   },
// //   {
// //     id: "687552e3ddaf996268014e12",
// //     name: "Phoksundo Lake",
// //     description: "Stunning turquoise lake in Upper Dolpo",
// //     image: "https://media.istockphoto.com/id/476335378/photo/phoksundo-lake-in-dolpo-nepal.webp?a=1&b=1&s=612x612&w=0&k=20&c=jpxtMaR_XL02RJQCKopEXR6yDFQ72co-v699bMODPKA=",
// //     rating: 5
// //   },
// //   {
// //     name: "Gosaikunda",
// //     description: "A sacred alpine lake in Langtang",
// //     image: gosaikundaImg,
// //     rating: 4,
// //   },
// // ];

// // export default function TripList() {
// //   const [sliderRef] = useKeenSlider({
// //     loop: true,
// //     slides: {
// //       perView: 3,
// //       spacing: 30,
// //     },
// //     created(s) {
// //       setTimeout(() => {
// //         setInterval(() => {
// //           if (s) s.prev();
// //         }, 2500);
// //       }, 500);
// //     }
// //   });
// //   const { user } = useAuth();

// //   const handleSave = async (tripId) => {
// //     try {
// //       if (!user) {
// //         alert("Please log in to save itineraries.");
// //         return;
// //       }

// //       await axios.post(`http://localhost:8000/saved/add/${user.id}/${tripId}`);
// //       alert("Itinerary saved!");
// //     } catch (error) {
// //       console.error("Error saving itinerary:", error);
// //       alert("Failed to save itinerary.");
// //     }
// //   };

// //   const handleUnsave = async (tripId) => {
// //     try {
// //       if (!user) {
// //         alert("Please log in to remove itineraries.");
// //         return;
// //       }

// //       await axios.delete(`http://localhost:8000/saved/remove/${user.id}/${tripId}`);
// //       alert("Itinerary removed!");
// //     } catch (error) {
// //       console.error("Error removing itinerary:", error);
// //       alert("Failed to remove itinerary.");
// //     }
// //   };

// //   return (
// //     <div className="flex flex-row items-center justify-center gap-8 px-6 py-12 bg-[#e9ebd5]">
// //       <div ref={sliderRef} className="flex items-center justify-around gap-8">

// //         {trips.map((trip) => (
// //           <TripCard
// //             key={trip.id}
// //             trip={trip}
// //             onSave={() => handleSave(trip.id)}
// //             onUnsave={() => handleUnsave(trip.id)}
// //             user={user}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import React from "react";
// import TripCard from "./TripCard";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const trips = [
//   {
//     id: "684bd407b1f9cbf5329bc78d",
//     name: "Everest Base Camp",
//     description: "Trek to the world’s tallest peak base",
//     image: "https://media.istockphoto.com/id/157334698/photo/many-tents-at-the-snowy-mountain-everest-base-camp.webp?a=1&b=1&s=612x612&w=0&k=20&c=vyztYMpG90mtvpUM71PUaH3O1vklDXEri3GRe4AXxzo=",
//     rating: 5
//   },
//   {
//     id: "684bd407b1f9cbf5329bc786",
//     name: "Upper Dolpo",
//     description: "Remote and culturally rich trekking region",
//     image: "https://media.istockphoto.com/id/824659554/photo/ancient-bon-stupa-in-saldang-village-dolpo-nepal.webp?a=1&b=1&s=612x612&w=0&k=20&c=TIIhKDFnXBUZyUsI4Z_YwGNO_8V3f9xFd7K_RaF0MB0=",
//     rating: 5
//   },
//   {
//     id: "687552e3ddaf996268014e12",
//     name: "Phoksundo Lake",
//     description: "Stunning turquoise lake in Upper Dolpo",
//     image: "https://media.istockphoto.com/id/476335378/photo/phoksundo-lake-in-dolpo-nepal.webp?a=1&b=1&s=612x612&w=0&k=20&c=jpxtMaR_XL02RJQCKopEXR6yDFQ72co-v699bMODPKA=",
//     rating: 5
//   }
// ];

// export default function TripList() {
//   const { user } = useAuth();

//   const handleSave = async (tripId) => {
//     try {
//       if (!user) {
//         alert("Please log in to save itineraries.");
//         return;
//       }

//       await axios.post(`http://localhost:8000/saved/add/${user.id}/${tripId}`);
//       alert("Itinerary saved!");
//     } catch (error) {
//       console.error("Error saving itinerary:", error);
//       alert("Failed to save itinerary.");
//     }
//   };

//   const handleUnsave = async (tripId) => {
//     try {
//       if (!user) {
//         alert("Please log in to remove itineraries.");
//         return;
//       }

//       await axios.delete(`http://localhost:8000/saved/remove/${user.id}/${tripId}`);
//       alert("Itinerary removed!");
//     } catch (error) {
//       console.error("Error removing itinerary:", error);
//       alert("Failed to remove itinerary.");
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 py-12 bg-[#e9ebd5]">
//       {trips.map((trip) => (
//         <TripCard
//           key={trip.id}
//           trip={trip}
//           onSave={() => handleSave(trip.id)}
//           onUnsave={() => handleUnsave(trip.id)}
//           user={user}
//         />
//       ))}
//     </div>
//   );
// }
import React from "react";
import TripCard from "./TripCard";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import everestImg from "../assets/Everest.jpeg";
import everestbase from "../assets/everestbase.jpeg";

import dolpoImg from "../assets/dolpo.jpeg";
import phoksundoImg from "../assets/phoksundo.jpeg";
import gosaikundaImg from "../assets/gosainkunda.jpeg";
const trips = [
  {
    name: "Everest Base Camp",
    description: "Trek to the world’s tallest peak base",
    image: everestbase,
    rating: 5,
  },
  {
    name: "Upper Dolpo",
    description: "Remote and culturally rich trekking region",
    image: dolpoImg,
    rating: 5,
  },
  {
    name: "Phoksundo Lake",
    description: "Stunning turquoise lake in Upper Dolpo",
    image: phoksundoImg,
    rating: 5,
  },
  {
    name: "Gosaikunda",
    description: "A sacred alpine lake in Langtang",
    image: gosaikundaImg,
    rating: 4,
  },
];


export default function TripList() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 30,
    },
    created(s) {
      setInterval(() => {
        s.prev();
      }, 2500); 
    },
  });

  return (
    <div className="bg-[#e9ebd5] px-10 py-16">
      <div ref={sliderRef} className="keen-slider">
        {trips.map((trip) => (
          <div key={trip.name} className="keen-slider__slide h-full">
            <TripCard trip={trip} />
          </div>
        ))}
      </div>
    </div>
  );
}