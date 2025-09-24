import { CartState } from "../context/CartProvider";


export default function Filters() {

  const {productState: {sort, category, rating, brand, searchQuery}, productDispatch } = CartState();
  console.log(sort)
  return (    
      <aside className="w-64 bg-gray-100 rounded-xl p-5 hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <div className="mb-5">
          <h3 className="font-medium mb-2">Sort</h3>
          <label className="block pd-3">
            <input
              type="radio"
              onChange={
                () => {productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "lowToHigh",
                })}
              }
              checked = {sort === "lowToHigh"? true:false}
              />
            Price: Low to High
              </label>        
        <label className="block pd-3">
            <input
              type="radio"
              onChange={
                () => {productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "highToLow",
                })}
              }
              checked = {sort === "highToLow"? true:false}
              />
            Price: High to Low
              </label>
        </div>
        {/* Categories */}
        <div className="mb-5">
          <h3 className="font-medium mb-2">Category</h3>
          <label className="block pd-3">
            <input
              type="checkbox"
              onChange={
                () => {productDispatch({
                  type: "FILTER_BY_CATEGORY",
                  payload: "sneakers",
                })}
              }
              checked = {category.includes("sneakers")? true:false}
            />{" "}
            Sneakers
          </label>
          <label className="block pd-3">
            <input
              type="checkbox"
              onChange={
                () => {productDispatch({
                  type: "FILTER_BY_CATEGORY",
                  payload: "running",
                })}
              }
              checked = {category.includes("running")? true:false}
            />{" "}
            Running Shoes
          </label>
          <label className="block pd-3">
            <input
              type="checkbox"
              onChange={
                () => {productDispatch({
                  type: "FILTER_BY_CATEGORY",
                  payload: "casual",
                })}
              }
              checked = {category.includes("casual")? true:false}
            />{" "}
            Casual
          </label>
        </div>

        {/* Ratings */}
        <div className="mb-5">
          <h3 className="font-medium mb-2">Ratings</h3>
          <label className="block pd-3">
            <input
              type="radio"
              name="rating"
              onChange={
                () => {productDispatch({
                  type: "FILTER_BY_RATING",
                  payload: "4",
                })}
              }
              checked = {rating.includes("4")? true:false
              }
            />{" "}
            ⭐ 4 & above
          </label>
          <label className="block pd-3">
            <input
              type="radio"
              name="rating"
              onChange={
                () => {productDispatch({
                  type: "FILTER_BY_RATING",
                  payload: "3",
                })}
              }
              checked = {rating.includes("3")? true:false
              }
            />{" "}
            ⭐ 3 & above
          </label>
        </div>

        {/* Brands */}
        <div className="mb-5">
          <h3 className="font-medium mb-2">Brands</h3>
          <label className="block pd-3">
            <input
              type="checkbox"
              onChange={
                () => {productDispatch({
                  type: "FILTER_BY_BRAND",
                  payload: "Nike",
                })}
              }
              checked = {brand.includes("Nike")? true:false
              }
            />{" "}
            Nike
          </label>
          <label className="block pd-3">
            <input
              type="checkbox"
              onChange={
                () => {productDispatch({
                  type: "FILTER_BY_BRAND",
                  payload: "Adidas",
                })}
              }
              checked = {brand.includes("Adidas")? true:false
              }
            />{" "}
            Adidas
          </label>
          <label className="block pd-3">
            <input
              type="checkbox"
              onChange={
                () => {productDispatch({
                  type: "FILTER_BY_BRAND",
                  payload: "Puma",
                })}
              }
              checked = {brand.includes("Puma")? true:false
              }
            />{" "}
            Puma
          </label>
          <label className="block pd-3">
            <input
              type="checkbox"
              onChange={
                () => {productDispatch({
                  type: "FILTER_BY_BRAND",
                  payload: "New Balance",
                })}
              }
              checked = {brand.includes("New Balance")? true:false
              }
            />{" "}
            New Balance
          </label>
            <button className="clear-filters-button mt-10 w-full pd-10"
            onClick={() => productDispatch({type: "CLEAR_FILTERS"})}
            >
              Clear Filters
            </button>
        </div>
      </aside>
  );
}