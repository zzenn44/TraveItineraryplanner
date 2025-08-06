import React, { useState } from 'react';
import Card from '../components/Card'; // Adjust path if needed
import phoksundoImg from "../assets/phoksundo.jpeg";
import gosaikundaImg from "../assets/gosainkunda.jpeg";
import raraImg from "../assets/rara.jpeg";
import panchpokhariImg from "../assets/panchpokhari.jpeg";
import tilichoImg from "../assets/tilicho.jpeg";
import kapucheImg from "../assets/kapuche.jpeg";
import tshorolpaImg from "../assets/tshorolpa.jpeg";
import Navbar from '../components/Navbar';

const lakes = [
  {
    name: 'Gosaikunda Lake',
    description: 'A sacred alpine lake in Langtang, visited by pilgrims during Janai Purnima.',
    image: gosaikundaImg,
  },
  {
    name: 'Tilicho Lake',
    description: 'One of the world’s highest lakes, located in the Annapurna region at 4,919m.',
    image: tilichoImg,
    itinerary: {
      duration: '5-7 days',
      difficulty: 'Intermediate',
      maxElevation: '4,919 meters',
      cost: '10,000 NPR to 12,000 NPR',
      details: [
        'Day 1: Drive from Kathmandu to Chame',
        'Day 2: Drive from Chame to Khangsar',
        'Day 3: Trek from Khangsar to Tilicho Base Camp',
        'Day 4: Trek to Tilicho Lake and back to Tilicho Base Camp',
        'Day 5: Trek to Khangsar or Manang Village',
        'Day 6: Drive back to Kathmandu',
      ],
      permitRequired: 'YES',
      permitFee: '100 NPR',
      emergencyContacts: [
        {
          name: 'Nepal Tourist Police',
          tel: '+977-1-4247041, 1144',
          email: 'policetourist@nepalpolice.gov.np',
        },
        {
          name: 'Himalayan Rescue Association (HRA)',
          tel: '+977-1-4440292 / 4440293',
          email: 'hra@mail.com.np',
        },
      ],
    },
  },
  {
    name: 'Rara Lake',
    description: 'Nepal’s largest lake, known for its deep blue color and serene beauty.',
    image: raraImg,
    itinerary: {
      duration: '7–10 days',
      difficulty: 'Moderate',
      maxElevation: '3,200 meters (Rara Lake)',
      cost: '12,000 NPR to 20,000 NPR (depending on transport and accommodation)',
      details: [
        'Day 1: Flight or night bus from Kathmandu to Nepalgunj',
        'Day 2: Flight from Nepalgunj to Talcha Airport, trek to Rara Lake (2,990m)',
        'Day 3: Explore Rara Lake and surrounding area (boating, photography, short ridge hike)',
        'Day 4: Optional extra day for exploration or rest at Rara Lake',
        'Day 5: Trek back to Talcha Airport',
        'Day 6: Flight from Talcha to Nepalgunj',
        'Day 7: Drive or fly back to Kathmandu',
      ],
      permitRequired: 'NO',
      emergencyContacts: [
        {
          name: 'Nepal Tourist Police',
          tel: '+977-1-4247041, 1144',
          email: 'policetourist@nepalpolice.gov.np',
        },
        {
          name: 'Himalayan Rescue Association (HRA)',
          tel: '+977-1-4440292 / 4440293',
          email: 'hra@mail.com.np',
        },
      ],
    },
  },
  {
    name: 'Phoksundo Lake',
    description: 'A turquoise-blue glacial lake in Dolpo region, sacred to the Bonpo religion.',
    image: phoksundoImg,
  },
  {
    name: 'Kapuche Lake',
    description: 'Nepal’s lowest glacial lake, nestled at 2,546m in the Annapurna region.',
    image: kapucheImg,
  },
  {
    name: 'Panch Pokhari Lake',
    description: 'A peaceful trek to five sacred lakes, surrounded by alpine beauty and spiritual charm.',
    image: panchpokhariImg,
  },
  {
    name: 'Tsho Rolpa Lake',
    description: 'A peaceful trek to five sacred lakes, surrounded by alpine beauty and spiritual charm.',
    image: tshorolpaImg,
  }
];

const Lake = () => {
  const [selectedLake, setSelectedLake] = useState(null);

  const openModal = (lake) => {
    if (lake.itinerary) {
      setSelectedLake(lake);
    }
  };

  const closeModal = () => {
    setSelectedLake(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f5f5f5] px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-10">Lakes of Nepal</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {lakes.map((lake) => (
            <div key={lake.name} onClick={() => openModal(lake)} className="cursor-pointer">
              <Card
                name={lake.name}
                description={lake.description}
                image={lake.image}
              />
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedLake && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white max-w-3xl w-[90vw] max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-[#4c6444] font-bold text-2xl hover:text-[#3e5338]"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-4xl font-bold text-[#4c6444] mb-6">{selectedLake.name} Trek Itinerary</h2>

              {/* Themed Box for itinerary details */}
              <div className="bg-[#e9ebd5] rounded-2xl p-6 space-y-4">
                <p><strong>Duration:</strong> {selectedLake.itinerary.duration}</p>
                <p><strong>Difficulty level:</strong> {selectedLake.itinerary.difficulty}</p>
                <p><strong>Maximum elevation:</strong> {selectedLake.itinerary.maxElevation}</p>
                <p><strong>Cost:</strong> {selectedLake.itinerary.cost}</p>

                <h3 className="font-semibold text-[#4c6444] text-lg">Itinerary Details:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedLake.itinerary.details.map((day, idx) => (
                    <li key={idx}>{day}</li>
                  ))}
                </ul>

                <p><strong>Permit Required for Nepalese?</strong> {selectedLake.itinerary.permitRequired}</p>
                {selectedLake.itinerary.permitFee && (
                  <p><strong>Permit Fee:</strong> {selectedLake.itinerary.permitFee}</p>
                )}

                <h3 className="font-semibold text-[#4c6444] text-lg">Emergency Contact Details:</h3>
                <ul className="list-none space-y-1">
                  {selectedLake.itinerary.emergencyContacts.map((contact, idx) => (
                    <li key={idx}>
                      <strong>{contact.name}:</strong> Tel: {contact.tel}, Email: {contact.email}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Lake;