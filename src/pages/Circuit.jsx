import React from 'react';
import Card from '../components/Card'; // Adjust path as necessary
import annapurnaImg from "../assets/annapurnabase.jpeg";
import manasluImg from "../assets/manaslubase.jpeg";
import threeImg from "../assets/three.jpeg";
import gosainkundaImg from "../assets/gosainkunda.jpeg";
import dhaulagiriImg from "../assets/dhaulagiribase.jpeg";
import rolwalingImg from "../assets/rolwaling.jpeg";
import Navbar from '../components/Navbar';




const circuits = [
  {
    name: 'Annapurna Circuit',
    description: 'A classic trek that circles the Annapurna Massif with varied landscapes.',
    image: annapurnaImg,
  },
  {
    name: 'Manaslu Circuit',
    description: 'A less-crowded alternative to Annapurna with off-the-beaten-path experience.',
    image: manasluImg,
  },
  {
    name: 'Three Passes Trek',
    description: 'Explore the ancient kingdom of Lo with desert-like terrain and Tibetan culture.',
    image: threeImg,
  },
  {
    name: 'Langtang Gosainkunda Trek',
    description: 'Remote trekking through high-altitude valleys and Buddhist villages.',
    image: gosainkundaImg,
  },
  {
    name: 'Dhaulagiri Circuit',
    description: 'A cultural and spiritual trek connecting Langtang Valley and holy Gosaikunda Lake.',
    image: dhaulagiriImg,
  },
  {
    name: 'Rolwaling Circuit',
    description: 'A challenging and wild trek with views of Gauri Shankar and hidden valleys.',
    image: rolwalingImg,
  }
];

const Circuit = () => {
  return (
    <>
    <Navbar/>
       <div className="min-h-screen bg-[#f5f5f5] px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">Trekking Circuits in Nepal</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {circuits.map((circuit) => (
          <Card
            key={circuit.name}
            name={circuit.name}
            description={circuit.description}
            image={circuit.image}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Circuit;
