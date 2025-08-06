import React from 'react';
import Card from '../components/Card'; // Adjust path if necessary
import poonImg from "../assets/poonhill.jpeg";
import amayangriImg from "../assets/amayangri.jpeg";
import balthaliImg from "../assets/balthali.jpeg";
import chepangImg from "../assets/chepang.jpeg";
import ghaleImg from "../assets/ghalegaun.jpeg";
import khumaiImg from "../assets/khumai.jpeg";
import panchaseImg from "../assets/panchase.jpeg";
import pathibharaImg from "../assets/pathibhara.jpeg";
import pikeyImg from "../assets/pikeypeak.jpeg";
import siklesImg from "../assets/sikles.jpeg";
import Navbar from '../components/Navbar';




const shortTreks = [
  {
    name: 'Ghorepani Poon Hill',
    description: 'A short and scenic trek with sunrise views over the Annapurna range.',
    image: poonImg,
  },
  {
    name: 'Ghale Gaun Trek',
    description: 'Perfect for beginners, with panoramic views of the Himalayas near Kathmandu.',
    image: ghaleImg,
  },
  {
    name: 'Balthali Village Trek',
    description: 'A quick escape near Pokhara offering village culture and mountain vistas.',
    image: balthaliImg,
  },
  {
    name: 'Ama Yangri Trek',
    description: 'An easy day hike through a national park with views and monastery visits.',
    image: amayangriImg,
  },
  {
    name: 'Khumai Dada Trek',
    description: 'A popular day hike from Kathmandu with a rewarding hilltop view.',
    image: khumaiImg,
  },
  {
    name: 'Panchase Trek',
    description: 'An easy trek from Pokhara with cozy lodges and spectacular scenery.',
    image: panchaseImg,
  },
  {
    name: 'Chepang Village Trek',
    description: 'An easy day hike through a national park with views and monastery visits.',
    image: chepangImg,
  },
  {
    name: 'Pathibhara Temple Trek',
    description: 'A popular day hike from Kathmandu with a rewarding hilltop view.',
    image: pathibharaImg,
  },
  {
    name: 'Pikey Peak Trek',
    description: 'An easy trek from Pokhara with cozy lodges and spectacular scenery.',
    image: pikeyImg,
  },
  {
    name: 'Sikles Trek',
    description: 'An easy trek from Pokhara with cozy lodges and spectacular scenery.',
    image: siklesImg,
  }
];

const Shorttrek = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#f5f5f5] px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">Short Treks in Nepal</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {shortTreks.map((trek) => (
          <Card
            key={trek.name}
            name={trek.name}
            description={trek.description}
            image={trek.image}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Shorttrek;
