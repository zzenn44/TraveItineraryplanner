import React from 'react';
import Card from '../components/Card'; // Adjust the path based on your file structure
import chuluImg from "../assets/chulu.jpeg"; 
import islandImg from "../assets/island.jpeg";
import lobucheImg from "../assets/lobuche.jpeg";
import meraImg from "../assets/mera.jpeg";
import nayakangaImg from "../assets/nayakanga.jpeg";
import pikeypeakImg from "../assets/pikeypeak.jpeg";
import pisangImg from "../assets/pisang.jpeg";
import yalaImg from "../assets/yala.jpeg";
import Navbar from '../components/Navbar';



const mountains = [
  {
    name: 'Chulu West Peak',
    description: 'The tallest mountain in the world at 8,848m, also known as Sagarmatha.',
    image: chuluImg,
  },
  {
    name: 'Island Peak',
    description: 'A deadly yet majestic peak, part of the Annapurna massif.',
    image:islandImg ,
  },
  {
    name: 'Lobuche Peak',
    description: 'The seventh highest mountain in the world, known for its massive bulk.',
    image: lobucheImg,
  },
  {
    name: 'Mera Peak',
    description: 'Fifth highest peak, famous for its perfect pyramid shape.',
    image: meraImg,
  },
  {
    name: 'Naya Kanga Peak',
    description: 'Eighth tallest peak, offering remote and adventurous trekking routes.',
    image:  nayakangaImg,
  },
  {
    name: 'Pikey Peak',
    description: 'Third highest mountain in the world, located in far-eastern Nepal.',
    image: pikeypeakImg ,
  },
  {
    name: 'Pisang Peak',
    description: 'Third highest mountain in the world, located in far-eastern Nepal.',
    image: pisangImg ,
  },
  {
    name: 'Yala Peak',
    description: 'Third highest mountain in the world, located in far-eastern Nepal.',
    image: yalaImg ,
  }
];

const Mountain = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#f5f5f5] px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">Famous Mountains in Nepal</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {mountains.map((mountain) => (
          <Card
            key={mountain.name}
            name={mountain.name}
            description={mountain.description}
            image={mountain.image}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Mountain;
