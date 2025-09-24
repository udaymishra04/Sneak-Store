const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 120,
    brand: "Nike",
    category: "Running Shoes",
    img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/76e54683-5822-464c-a8cf-8b366b629675/AIR+MAX+DN.png",
    rating: 4
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 140,
    brand: "Adidas",
    category: "Running Shoes",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRuFHvGIzxWGk9wnHtrCz6K3Yj6PqS4Nn2yw0wysT4g87psUBpOTMOOxdaQcsmU4BG69qMffYW7xfgpskESnavR9OHngtL59nAaUkcJZolzxeYrCl8SCSevAg",
    rating: 5
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 100,
    brand: "Puma",
    category: "Sneakers",
    img: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/391962/01/sv01/fnd/IND/fmt/png/RS-X-Drip-Men's-Sneakers",
    rating: 3
  },
  {
    id: 4,
    name: "New Balance 550",
    price: 110,
    brand: "New Balance",
    category: "Casual",
    img: "https://nb.scene7.com/is/image/NB/bb550wt1_nb_02_i?$pdpflexf2$",
    rating: 4
  },
  {
    id: 5,
    name: "Nike Revolution 6",
    price: 75,
    brand: "Nike",
    category: "Running Shoes",
    img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/5677273b-0135-493e-a3f4-8db634967351/W+NIKE+REVOLUTION+6+NN.png",
    rating: 4
  },
  {
    id: 6,
    name: "Adidas Duramo SL",
    price: 90,
    brand: "Adidas",
    category: "Running Shoes",
    img: "https://assets.adidas.com/images/w_600,f_auto,q_auto/02f4a25a32484a9f931e3db98026e32c_9366/Duramo_SL_Shoes_Black_IE4034_01_standard.jpg",
    rating: 3
  },
  {
    id: 7,
    name: "Puma Smash V2",
    price: 80,
    brand: "Puma",
    category: "Casual",
    img: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/365215/12/sv01/fnd/SEA/fmt/png/PUMA-Smash-V2-Sneaker",
    rating: 5
  },
  {
    id: 8,
    name: "Nike Air Jordan 1 Low",
    price: 170,
    brand: "Nike",
    category: "Sneakers",
    img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/19df9d98-c16a-423d-9e1e-3e126dae0e77/AIR+JORDAN+1+LOW+SE.png",
    rating: 5
  },
  {
    id: 9,
    name: "Nike Dunk Low",
    price: 110,
    brand: "Nike",
    category: "Sneakers",
    img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/NIKE+DUNK+LOW+RETRO.png",
    rating: 4
  },
  {
    id: 10,
    name: "Adidas Yeezy Boost 350",
    price: 220,
    brand: "Adidas",
    category: "Sneakers",
    img: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/31249963/2024/10/29/8f3d25c4-6fe7-479a-9e60-ad73c0b4b3fd1730197263143-ADIDAS-Originals-Men-Yeezy-Boost-350-V2-Sneakers-60317301972-2.jpg",
    rating: 5
  },
  {
    id: 11,
    name: "Puma Suede Classic",
    price: 75,
    brand: "Puma",
    category: "Casual",
    img: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/352634/03/sv01/fnd/IND/fmt/png/Suede-Classic-XXI-Sneakers",
    rating: 4
  },
  {
    id: 12,
    name: "New Balance 990v5",
    price: 180,
    brand: "New Balance",
    category: "Running Shoes",
    img: "https://nb.scene7.com/is/image/NB/m990gl5_nb_02_i?$pdpflexf2$",
    rating: 5
  },
  {
    id: 13,
    name: "Nike Court Vision",
    price: 65,
    brand: "Nike",
    category: "Casual",
    img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/44f222ab-96b6-43b9-82e7-9a1bd888611d/NIKE+COURT+VISION+LO.png",
    rating: 3
  },
  {
    id: 14,
    name: "Adidas Runfalcon",
    price: 110,
    brand: "Adidas",
    category: "Running Shoes",
    img: "https://assets.adidas.com/images/w_600,f_auto,q_auto/2d2249871d004e4e91c0af34014a7c8f_9366/Runfalcon_3.0_Shoes_White_HQ3789_01_standard.jpg",
    rating: 4
  },
  {
    id: 15,
    name: "New Balance Fresh Foam 1080",
    price: 150,
    brand: "New Balance",
    category: "Running Shoes",
    img: "https://nb.scene7.com/is/image/NB/m1080k12_nb_02_i?$pdpflexf2$",
    rating: 4
  },
  {
    id: 16,
    name: "Nike Pegasus 40",
    price: 160,
    brand: "Nike",
    category: "Running Shoes",
    img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/f91a5813-295d-4043-9d43-7e4f226c1238/NIKE+AIR+ZOOM+PEGASUS+40+PRM.png",
    rating: 5
  },
  {
    id: 17,
    name: "Nike Blazer Mid",
    price: 100,
    brand: "Nike",
    category: "Casual",
    img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/BLAZER+MID+%2777+VNTG.png",
    rating: 4
  },
  {
    id: 18,
    name: "Adidas Gazelle",
    price: 90,
    brand: "Adidas",
    category: "Casual",
    img: "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/37dcf18c4e89486ab408a8da01828572_9366/gazelle-shoes.jpg",
    rating: 4
  },
  {
    id: 19,
    name: "Nike LeBron 20",
    price: 200,
    brand: "Nike",
    category: "Sneakers",
    img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/73151037-b72c-4eb1-be13-453315b61199/LEBRON+XX+EP.png",
    rating: 5
  },
  {
    id: 20,
    name: "New Balance 327",
    price: 100,
    brand: "New Balance",
    category: "Sneakers",
    img: "https://www.superkicks.in/cdn/shop/files/1_8444e3c9-f4df-4e32-852b-31f14e77f2f3.jpg?v=1752740262",
    rating: 4
  }
];

export default products;
