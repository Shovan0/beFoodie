import React from "react";

function FoodCategory({ category, onClick }) {
  return (
    <div
      onClick={() => onClick(category.CategoryName)}
      className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      <img
        src={category.image}
        alt={category.CategoryName}
        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-md"
      />
      <span className="mt-2 text-sm md:text-base font-medium">
        {category.CategoryName}
      </span>
    </div>
  );
}

export default FoodCategory;
