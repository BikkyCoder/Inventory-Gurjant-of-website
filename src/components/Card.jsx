import React from "react";

const Card = ({ title, description, image, buttonText, onButtonClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 w-80">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="bg-blue-600 text-slate-900 px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
