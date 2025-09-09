// const products = [
//     { id: 1, name: "Nike Air Max", price: 120, brand: "Nike", img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/76e54683-5822-464c-a8cf-8b366b629675/AIR+MAX+DN.png", rating: 4 },
//     { id: 2, name: "Adidas Ultraboost", price: 140, brand: "Adidas", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRuFHvGIzxWGk9wnHtrCz6K3Yj6PqS4Nn2yw0wysT4g87psUBpOTMOOxdaQcsmU4BG69qMffYW7xfgpskESnavR9OHngtL59nAaUkcJZolzxeYrCl8SCSevAg", rating: 5 },
//     { id: 3, name: "Puma RS-X", price: 100, brand: "Puma", img: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/391962/01/sv01/fnd/IND/fmt/png/RS-X-Drip-Men's-Sneakers", rating: 3 },
//     { id: 4, name: "New Balance 550", price: 110, brand: "New Balance", img: "https://nb.scene7.com/is/image/NB/bb550wt1_nb_02_i?$pdpflexf2$", rating: 4 },
//   ];
const products = [
  { id: 1, name: "Nike Air Max", price: 120, brand: "Nike", img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/76e54683-5822-464c-a8cf-8b366b629675/AIR+MAX+DN.png", rating: 4, stock: 15 },
  { id: 2, name: "Adidas Ultraboost", price: 140, brand: "Adidas", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRuFHvGIzxWGk9wnHtrCz6K3Yj6PqS4Nn2yw0wysT4g87psUBpOTMOOxdaQcsmU4BG69qMffYW7xfgpskESnavR9OHngtL59nAaUkcJZolzxeYrCl8SCSevAg", rating: 5, stock: 0 },
  { id: 3, name: "Puma RS-X", price: 100, brand: "Puma", img: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/391962/01/sv01/fnd/IND/fmt/png/RS-X-Drip-Men's-Sneakers", rating: 3, stock: 12 },
  { id: 4, name: "New Balance 550", price: 110, brand: "New Balance", img: "https://nb.scene7.com/is/image/NB/bb550wt1_nb_02_i?$pdpflexf2$", rating: 4, stock: 8 },
  { id: 5, name: "Converse Chuck Taylor", price: 70, brand: "Converse", img: "https://www.converse.in/media/catalog/product/1/6/168817c_02x1.jpg", rating: 4, stock: 25 },
  { id: 6, name: "Reebok Club C 85", price: 90, brand: "Reebok", img: "https://reebok.bynder.com/transform/c2cd6ee1-46a7-4f84-84ee-d1f2c5a2be62/100032493_01_standard", rating: 3, stock: 10 },
  { id: 7, name: "Vans Old Skool", price: 80, brand: "Vans", img: "https://images.vans.com/is/image/VansEU/VN000D3HY28-HERO", rating: 5, stock: 18 },
  { id: 8, name: "Jordan 1 Retro High", price: 170, brand: "Jordan", img: "https://cdn.flightclub.com/1000/TEMPLATE/314731/1.jpg", rating: 5, stock: 7 },
  { id: 9, name: "Nike Dunk Low", price: 110, brand: "Nike", img: "https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto,q_auto/32c0e4b4-b086-4f8b-9f4f-5dd0f8f6f157/dunk-low-retro-shoes.png", rating: 4, stock: 14 },
  { id: 10, name: "Adidas Yeezy Boost 350", price: 220, brand: "Adidas", img: "https://sneakernews.com/wp-content/uploads/2021/12/adidas-Yeezy-Boost-350-V2-MX-Oat-GW3773-1.jpg", rating: 5, stock: 5 },
  { id: 11, name: "Puma Suede Classic", price: 75, brand: "Puma", img: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/352634/03/sv01/fnd/IND/fmt/png/Suede-Classic-XXI-Sneakers", rating: 4, stock: 16 },
  { id: 12, name: "New Balance 990v5", price: 180, brand: "New Balance", img: "https://nb.scene7.com/is/image/NB/m990gl5_nb_02_i?$pdpflexf2$", rating: 5, stock: 6 },
  { id: 13, name: "Fila Disruptor II", price: 65, brand: "Fila", img: "https://filadownloads.com/images/disruptor-ii-premium-womens-shoes.jpg", rating: 3, stock: 22 },
  { id: 14, name: "Asics Gel-Lyte III", price: 110, brand: "Asics", img: "https://asics.scene7.com/is/image/asics/1201A482_020_SR_RT_GLB", rating: 4, stock: 11 },
  { id: 15, name: "Saucony Jazz Original", price: 70, brand: "Saucony", img: "https://www.saucony.com/on/demandware.static/-/Sites-saucony_us-Library/default/dwaf9d5f48/images/jazz-original.jpg", rating: 4, stock: 19 },
  { id: 16, name: "Under Armour Curry Flow 9", price: 160, brand: "Under Armour", img: "https://underarmour.scene7.com/is/image/Underarmour/3025684-100_DEFAULT?wid=640&hei=640&fmt=jpg", rating: 5, stock: 9 },
  { id: 17, name: "Nike Blazer Mid", price: 100, brand: "Nike", img: "https://static.nike.com/a/images/t_default/c3e54d4f-4f6f-4d4d-bd6f-25ab5fae1b4b/blazer-mid-77-vintage-shoes.png", rating: 4, stock: 13 },
  { id: 18, name: "Adidas Gazelle", price: 90, brand: "Adidas", img: "https://assets.adidas.com/images/w_600,f_auto,q_auto/2c8e5e8f7e544c5e8d29ab9a00adf9db_9366/Gazelle_Shoes_Blue_BB5478_01_standard.jpg", rating: 4, stock: 21 },
  { id: 19, name: "Nike LeBron 20", price: 200, brand: "Nike", img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/3bb2cb73-09b2-4a1b-bfbb-42261f92e8bc/lebron-20-ep-basketball-shoes.png", rating: 5, stock: 4 },
  { id: 20, name: "Adidas Forum Low", price: 100, brand: "Adidas", img: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4f53aefb94f348e99134abf200f918b2_9366/Forum_Low_Shoes_White_GZ8960_01_standard.jpg", rating: 4, stock: 17 }
];

  export default products;