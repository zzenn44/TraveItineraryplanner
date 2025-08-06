import React from 'react';
import Card from '../components/Card'; // Adjust the path if needed
import everestImg from "../assets/everestbase.jpeg" 
import annapurnaImg from "../assets/annapurnabase.jpeg"
import makaluImg from "../assets/makalubase.jpeg"
import manasluImg from "../assets/manaslubase.jpeg"
import kanchenjungaImg from "../assets/kangchenjungabase.jpeg"
import dhaulagiriImg from "../assets/dhaulagiribase.jpeg"
import apiImg from "../assets/api.jpeg"
import mardiImg from "../assets/mardi.jpeg"
import Navbar from '../components/Navbar';
// 
// import everestImg from "../assets/Everest.jpeg"

const baseCamps = [
  {
    name: 'Everest Base Camp',
    description: 'The world-famous trek to the base of the tallest mountain on Earth.',
    image: everestImg,
  },
  {
    name: 'Annapurna Base Camp',
    description: 'A scenic trek through diverse terrain to the foot of Annapurna I.',
    image: annapurnaImg,
  },
  {
    name: 'Makalu Base Camp',
    description: 'A remote base camp trek offering views of Makalu, the fifth-highest peak.',
    image: makaluImg,
  },
  {
    name: 'Manaslu Base Camp',
    description: 'Less-traveled but rewarding trek to the base of Manaslu, the eighth-highest mountain.',
    image: manasluImg,
  },
  {
    name: 'Kanchenjunga Base Camp',
    description: 'A challenging and remote trek to the base of the third-highest mountain.',
    image: kanchenjungaImg,
  },
  {
    name: 'Dhaulagiri Base Camp',
    description: 'A tough trek leading to the base of Dhaulagiri, Nepal’s seventh-highest peak.',
    image: dhaulagiriImg,
  },
  {
    name: 'Mardi Base Camp',
    description: 'A challenging and remote trek to the base of the third-highest mountain.',
    image: mardiImg,
  },
  {
    name: 'Api Base Camp',
    description: 'A tough trek leading to the base of Dhaulagiri, Nepal’s seventh-highest peak.',
    image: apiImg,
  }
];

const BaseCamp = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#f5f5f5] px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">Base Camps of Nepal</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {baseCamps.map((camp) => (
          <Card
            key={camp.name}
            name={camp.name}
            description={camp.description}
            image={camp.image}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default BaseCamp;
