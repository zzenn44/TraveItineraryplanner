
import React from 'react';

const Card = ({ name, description, image }) => {
  // If image is a filename, load from assets
  const defaultImage = new URL('../assets/api.jpeg', import.meta.url).href;
  let imageUrl = defaultImage;
  if (image) {
    if (image.startsWith('http') || image.startsWith('/')) {
      imageUrl = image;
    } else {
      try {
        imageUrl = new URL(`../assets/${image}`, import.meta.url).href;
      } catch (e) {
        console.warn(`Image not found in assets: ${image}`);
        imageUrl = defaultImage;
      }
    }
  }
  console.log('Card imageUrl:', imageUrl, 'original image prop:', image);

  const handleImgError = (e) => {
    if (e.target.src !== defaultImage) {
      console.warn(`Failed to load image: ${imageUrl}, using default.`);
      e.target.src = defaultImage;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm hover:shadow-lg transition duration-300">
      <div className="h-48 w-full">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={handleImgError}
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