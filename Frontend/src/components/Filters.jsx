export default function Filters() {

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (updated[type].includes(value)) {
        updated[type] = updated[type].filter((item) => item !== value);
      } else {
        updated[type].push(value);
      }
      return updated;
    });
  };

  return (    
      <aside className="w-64 bg-gray-100 rounded-xl p-5 hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Categories */}
        <div className="mb-5">
          <h3 className="font-medium mb-2">Category</h3>
          <label className="block">
            <input
              type="checkbox"
              onChange={() => toggleFilter("category", "Sneakers")}
            />{" "}
            Sneakers
          </label>
          <label className="block">
            <input
              type="checkbox"
              onChange={() => toggleFilter("category", "Running")}
            />{" "}
            Running Shoes
          </label>
          <label className="block">
            <input
              type="checkbox"
              onChange={() => toggleFilter("category", "Casual")}
            />{" "}
            Casual
          </label>
        </div>

        {/* Ratings */}
        <div className="mb-5">
          <h3 className="font-medium mb-2">Ratings</h3>
          <label className="block">
            <input
              type="checkbox"
              onChange={() => toggleFilter("rating", "4")}
            />{" "}
            ⭐ 4 & above
          </label>
          <label className="block">
            <input
              type="checkbox"
              onChange={() => toggleFilter("rating", "3")}
            />{" "}
            ⭐ 3 & above
          </label>
        </div>

        {/* Brands */}
        <div className="mb-5">
          <h3 className="font-medium mb-2">Brands</h3>
          <label className="block">
            <input
              type="checkbox"
              onChange={() => toggleFilter("brand", "Nike")}
            />{" "}
            Nike
          </label>
          <label className="block">
            <input
              type="checkbox"
              onChange={() => toggleFilter("brand", "Adidas")}
            />{" "}
            Adidas
          </label>
          <label className="block">
            <input
              type="checkbox"
              onChange={() => toggleFilter("brand", "Puma")}
            />{" "}
            Puma
          </label>
          <label className="block">
            <input
              type="checkbox"
              onChange={() => toggleFilter("brand", "New Balance")}
            />{" "}
            New Balance
          </label>
        </div>
      </aside>
  );
}