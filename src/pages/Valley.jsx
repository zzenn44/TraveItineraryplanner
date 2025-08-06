import React from 'react';
import Card from '../components/Card'; // Adjust the import path based on your project structure
import rubyImg from "../assets/ruby.jpeg" 
import rolwalingImg from "../assets/rolwaling.jpeg"
import tsumImg from "../assets/tsum.jpeg"
import sailungImg from "../assets/sailung.jpeg"
import narphuImg from "../assets/narphu.jpeg"
import gokyoImg from "../assets/gokyo.jpeg"
import Navbar from '../components/Navbar';

const valleys = [
  {
    name: 'Ruby Valley',
    description: 'Cultural and historical heart of Nepal, filled with ancient temples and palaces.',
    image: rubyImg,
  },
  {
    name: 'Rolwaling Valley',
    description: 'Tourist haven with lakes, caves, and spectacular views of the Annapurna range.',
    image: rolwalingImg,
  },
  {
    name: 'Tsum Valley',
    description: 'A serene Himalayan valley offering Tamang culture and mountain landscapes.',
    image: tsumImg,
  },
  {
    name: 'Sailing',
    description: 'A hidden valley near Manaslu, rich in Tibetan Buddhist heritage.',
    image: sailungImg,
  },
  {
    name: 'Nar Phu Valley',
    description: 'The deepest valley in the world between Everest and Makalu massifs.',
    image: narphuImg,
  },
  {
    name: 'Gokyo Valley',
    description: 'The world’s deepest gorge between Dhaulagiri and Annapurna mountains.',
    image: gokyoImg,
  }
];

const Valley = () => {
  return (
  <>
  <Navbar/>
    <div className="min-h-screen bg-[#f5f5f5] px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">Famous Valleys in Nepal</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {valleys.map((valley) => (
          <Card
            key={valley.name}
            name={valley.name}
            description={valley.description}
            image={valley.image}
          />
        ))}
      </div>
    </div>
  </>
  );
};

export default Valley;
