import React from "react";

function FoodCategory({ category, onClick }) {
  return (
    <div
      onClick={() => onClick(category.CategoryName)}
      className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105 px-2 py-1"
    >
      <img
        src={category.image}
        alt={category.CategoryName}
        className="sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover shadow-md"
        style={{ width: 72, height: 72 }}
        onError={(e)=>{e.currentTarget.src='data:image/svg+xml;utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2772%27 height=%2772%27%3E%3Crect width=%27100%25%27 height=%27100%25%27 fill=%27%23f3f4f6%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%23959e9f%27 font-family=%27Arial, Helvetica, sans-serif%27 font-size=%2710%27%3ENo%20Image%3C/text%3E%3C/svg%3E'}}
      />
      <span className="mt-2 text-sm sm:text-base font-medium text-center">
        {category.CategoryName}
      </span>
    </div>
  );
}

export default FoodCategory;
