import React from 'react';

const Card = ({ name, description, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm hover:shadow-lg transition duration-300">
      <div className="h-48 w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-[#4c6444] mb-2">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Card;
