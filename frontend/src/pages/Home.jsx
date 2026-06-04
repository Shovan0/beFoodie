import { useState, useEffect } from "react";
import "./Home.css";
import Card from "../components/Card";
import FoodCategory from "../components/FoodCategory";

function Home() {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const BASE = import.meta.env.VITE_BACKEND_URL;
  const [selectedCategory, setSelectedCategory] = useState("");

  const loadData = async () => {
    try {
      let response = await fetch(`${BASE}/api/fooddata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCategory(response[1]);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const getReorderedCategories = () => {
    if (!search.trim() && !selectedCategory) return foodCategory;

    const lowerSearch = search.toLowerCase();

    if (search.trim()) {
      const matchedCategory = foodCategory.filter((cat) =>
        cat.CategoryName.toLowerCase().includes(lowerSearch)
      );

      const matchedByFood = foodCategory.filter((cat) =>
        foodItem.some(
          (item) =>
            item.CategoryName === cat.CategoryName &&
            item.name.toLowerCase().includes(lowerSearch)
        )
      );

      const matched = Array.from(new Set([...matchedCategory, ...matchedByFood]));
      const others = foodCategory.filter((cat) => !matched.includes(cat));

      return [...matched, ...others];
    }

    if (selectedCategory) {
      const clicked = foodCategory.filter(
        (cat) => cat.CategoryName === selectedCategory
      );
      const others = foodCategory.filter(
        (cat) => cat.CategoryName !== selectedCategory
      );
      return [...clicked, ...others];
    }

    return foodCategory;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src="https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Food"
              className="w-full h-[38vh] sm:h-[48vh] md:h-[52vh] lg:h-[70vh] object-cover"
              style={{ animationName: "fadeIn", animationDuration: "1s" }}
            />
          </div>
        </div>

        <div className="flex justify-center mt-3 sm:mt-5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by category or food item..."
            className="border border-gray-300 rounded-lg px-4 py-3 w-full sm:w-11/12 md:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>

        {loading ? (
          <div className="py-12 flex items-center justify-center">
            <div role="status" aria-live="polite" className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <p className="mt-3 text-sm text-gray-600">Loading food data...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 gap-3 justify-items-center my-5">
            {foodCategory && foodCategory.length > 0 ? (
              getReorderedCategories().map((category, index) => (
                <FoodCategory
                  key={index}
                  category={category}
                  onClick={handleCategoryClick}
                />
              ))
            ) : (
              <div className="text-center col-span-full">No categories found</div>
            )}
          </div>
        )}

        <div>
          {foodCategory && foodCategory.length > 0 ? (
            getReorderedCategories().map((category, index) => (
              <div key={index} className="my-6">
                <div className="text-center text-2xl font-bold mb-3 text-lg sm:text-2xl">
                  {category.CategoryName}
                </div>
                <hr className="mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
                  {foodItem && foodItem.length > 0 ? (
                    foodItem
                      .filter((item) => item.CategoryName === category.CategoryName)
                      .map((filterItem) => (
                        <div
                          key={filterItem._id}
                          className="p-2 flex"
                        >
                          <Card
                            foodItem={filterItem}
                            options={filterItem.options[0]}
                          />
                        </div>
                      ))
                  ) : (
                    <div className="w-full text-center">No such data found</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No categories found</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
