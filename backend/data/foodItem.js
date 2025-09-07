const foodItems = [
  // ---------- BIRYANI / RICE ----------
  {
    _id: "68611aebe34ec71af7cd5be4",
    CategoryName: "Biryani/Rice",
    name: "Prawns Fried Rice",
    img: "https://cdn.pixabay.com/photo/2018/03/23/08/27/thai-fried-rice-3253027__340.jpg",
    options: [{ half: "120", full: "220" }],
    description: "Made using Indian masalas and Basmati rice. Barbequed pieces of Prawns mixed with fried rice."
  },
  {
    _id: "68611aebe34ec71af7cd5be7",
    CategoryName: "Biryani/Rice",
    name: "Veg Fried Rice",
    img: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVnJTIwZnJpZWQlMjByaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    options: [{ half: "110", full: "200" }],
    description: "Simple and flavorful fried rice made with fresh vegetables and Indian spices."
  },
  {
    _id: "68611aebe34ec71af7cd5be8",
    CategoryName: "Biryani/Rice",
    name: "Fish Biryani",
    img: "https://media.istockphoto.com/photos/king-fish-biryani-with-raita-served-in-a-golden-dish-isolated-on-dark-picture-id1409942571?b=1&k=20&m=1409942571&s=170667a&w=0&h=ozlMJf5hsDmS2sSdEdBWnoSZOEITef4qGMeWeq2lyTc=",
    options: [{ half: "200", full: "320" }],
    description: "Aromatic basmati rice layered with spicy fish masala cooked in traditional style."
  },
  {
    _id: "68611aebe34ec71af7cd5bea",
    CategoryName: "Biryani/Rice",
    name: "Chicken Fried Rice",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGZyaWVkJTIwcmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    options: [{ half: "130", full: "220" }],
    description: "Classic fried rice with tender chicken pieces and mild spices."
  },
  {
    _id: "68611aebe34ec71af7cd5bee",
    CategoryName: "Biryani/Rice",
    name: "Veg Biryani",
    img: "https://holycowvegan.net/wp-content/uploads/2023/01/veg-biryani-21.jpg",
    options: [{ half: "150", full: "260" }],
    description: "Aromatic basmati rice cooked with seasonal vegetables and spices."
  },
  {
    _id: "68611aebe34ec71af7cd5bef",
    CategoryName: "Biryani/Rice",
    name: "Chicken Biryani",
    img: "https://cdn.pixabay.com/photo/2019/11/04/12/16/rice-4601049__340.jpg",
    options: [{ half: "170", full: "300" }],
    description: "Hyderabadi-style chicken biryani slow-cooked with layers of rice and chicken."
  },
  {
    _id: "68611aebe34ec71af7cd5bf0",
    CategoryName: "Biryani/Rice",
    name: "Mutton Biryani",
    img: "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/Gosht-Biryani-1300x868.jpeg?v=1625193165",
    options: [{ half: "220", full: "380" }],
    description: "Fragrant biryani made with succulent mutton pieces and saffron-flavored rice."
  },

  // ---------- STARTERS ----------
  {
    _id: "68611aebe34ec71af7cd5be5",
    CategoryName: "Starter",
    name: "Paneer Tikka",
    img: "https://as2.ftcdn.net/v2/jpg/14/81/77/57/1000_F_1481775703_wuwGwp5zKcpsmXccpNx5N3kaWlLeDkK4.jpg",
    options: [{ half: "170", full: "250" }],
    description: "Chunks of paneer marinated in spices and grilled to perfection."
  },
  {
    _id: "68611aebe34ec71af7cd5beb",
    CategoryName: "Starter",
    name: "Paneer 65",
    img: "https://as1.ftcdn.net/v2/jpg/02/89/79/00/1000_F_289790056_XK0szVbvBbtwbpxyktPavVpZ1J4rpvZD.jpg",
    options: [{ half: "150", full: "260" }],
    description: "Crispy fried paneer cubes tossed in a spicy tangy sauce."
  },
  {
    _id: "68611aebe34ec71af7cd5bec",
    CategoryName: "Starter",
    name: "Chilli Paneer",
    img: "https://as2.ftcdn.net/v2/jpg/16/22/46/83/1000_F_1622468332_5xVOTRlFcV11C9x0WG0Ofp1y6sBVffnk.jpg",
    options: [{ half: "120", full: "200" }],
    description: "Paneer cubes stir-fried with bell peppers, onions, and spicy sauces."
  },
  {
    _id: "68611aebe34ec71af7cd5bed",
    CategoryName: "Starter",
    name: "Chicken Tikka",
    img: "",
    options: [{ half: "170", full: "300" }],
    description: "Boneless chicken pieces marinated in yogurt and spices, grilled in tandoor."
  },
  {
    _id: "68611aebe34ec71af7cd5bf1",
    CategoryName: "Starter",
    name: "Veg Spring Rolls",
    img: "",
    options: [{ plate: "140" }],
    description: "Crispy rolls stuffed with sautéed vegetables, served with spicy dip."
  },
  {
    _id: "68611aebe34ec71af7cd5bf2",
    CategoryName: "Starter",
    name: "Chicken Lollipop",
    img: "",
    options: [{ half: "160", full: "280" }],
    description: "Crispy fried chicken wings coated with spicy batter."
  },

  // ---------- PIZZA ----------
  {
    _id: "68611aebe34ec71af7cd5be6",
    CategoryName: "Pizza",
    name: "Mix Veg Pizza",
    img: "",
    options: [{ regular: "100", medium: "200", large: "300" }],
    description: "Loaded with fresh veggies and cheese on a soft crust."
  },
  {
    _id: "68611aebe34ec71af7cd5be9",
    CategoryName: "Pizza",
    name: "Chicken Cheese Pizza",
    img: "",
    options: [{ regular: "120", medium: "230", large: "350" }],
    description: "Topped with juicy chicken and extra cheese."
  },
  {
    _id: "68611aebe34ec71af7cd5bf3",
    CategoryName: "Pizza",
    name: "Margherita Pizza",
    img: "",
    options: [{ regular: "90", medium: "170", large: "250" }],
    description: "Classic pizza topped with tomato sauce, mozzarella cheese, and basil."
  },
  {
    _id: "68611aebe34ec71af7cd5bf4",
    CategoryName: "Pizza",
    name: "Pepperoni Pizza",
    img: "",
    options: [{ regular: "150", medium: "260", large: "380" }],
    description: "Cheesy pizza topped with spicy pepperoni slices."
  },

  // ---------- DESSERT ----------
  {
    _id: "68611aebe34ec71af7cd5bf5",
    CategoryName: "Dessert",
    name: "Gulab Jamun",
    img: "",
    options: [{ piece: "30", plate: "100" }],
    description: "Soft fried milk solids soaked in sugar syrup."
  },
  {
    _id: "68611aebe34ec71af7cd5bf6",
    CategoryName: "Dessert",
    name: "Chocolate Brownie",
    img: "",
    options: [{ piece: "80", withIceCream: "130" }],
    description: "Rich and fudgy chocolate brownie served warm."
  },
  {
    _id: "68611aebe34ec71af7cd5bf7",
    CategoryName: "Dessert",
    name: "Ice Cream Sundae",
    img: "",
    options: [{ single: "90", double: "150" }],
    description: "A scoop (or two) of ice cream topped with nuts and chocolate syrup."
  },

  // ---------- DRINKS ----------
  {
    _id: "68611aebe34ec71af7cd5bf8",
    CategoryName: "Drinks",
    name: "Coca Cola",
    img: "",
    options: [{ can: "40", bottle: "60" }],
    description: "Chilled soft drink."
  },
  {
    _id: "68611aebe34ec71af7cd5bf9",
    CategoryName: "Drinks",
    name: "Fresh Lime Soda",
    img: "",
    options: [{ sweet: "50", salty: "50", mixed: "60" }],
    description: "Refreshing soda drink with fresh lime juice."
  },
  {
    _id: "68611aebe34ec71af7cd5bfa",
    CategoryName: "Drinks",
    name: "Cold Coffee",
    img: "",
    options: [{ glass: "90" }],
    description: "Chilled coffee with milk and ice cubes."
  },
  {
    _id: "68611aebe34ec71af7cd5bfb",
    CategoryName: "Drinks",
    name: "Mojito",
    img: "",
    options: [{ glass: "120" }],
    description: "Classic mint-lime mojito with soda."
  }
];

export default foodItems;
