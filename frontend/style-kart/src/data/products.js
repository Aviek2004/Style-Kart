const products = [
  {
    id: 1,
    name: "Classic Black T-Shirt",
    brand: "StyleKart",
    category: "T-Shirts",
    price: 999,
    rating: 4.5,
    description:
      "A premium everyday black t-shirt made for comfort and effortless style.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",

    variants: [
      {
        id: 101,
        size: "S",
        color: "Black",
        stock: 5,
      },
      {
        id: 102,
        size: "M",
        color: "Black",
        stock: 8,
      },
      {
        id: 103,
        size: "L",
        color: "Black",
        stock: 0,
      },
    ],
  },

  {
    id: 2,
    name: "Premium White Shirt",
    brand: "UrbanFit",
    category: "Shirts",
    price: 1499,
    rating: 4.3,
    description:
      "A clean premium white shirt suitable for both casual and formal occasions.",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab",

    variants: [
      {
        id: 201,
        size: "S",
        color: "White",
        stock: 3,
      },
      {
        id: 202,
        size: "M",
        color: "White",
        stock: 7,
      },
      {
        id: 203,
        size: "L",
        color: "White",
        stock: 4,
      },
    ],
  },

  {
    id: 3,
    name: "Classic Denim Jeans",
    brand: "DenimCo",
    category: "Jeans",
    price: 1999,
    rating: 4.7,
    description:
      "Classic denim jeans with a comfortable fit for everyday wear.",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d",

    variants: [
      {
        id: 301,
        size: "30",
        color: "Blue",
        stock: 6,
      },
      {
        id: 302,
        size: "32",
        color: "Blue",
        stock: 10,
      },
      {
        id: 303,
        size: "34",
        color: "Blue",
        stock: 0,
      },
    ],
  },

  {
    id: 4,
    name: "Casual Jacket",
    brand: "UrbanFit",
    category: "Jackets",
    price: 2499,
    rating: 4.6,
    description:
      "A stylish jacket designed for a modern casual look.",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",

    variants: [
      {
        id: 401,
        size: "M",
        color: "Brown",
        stock: 4,
      },
      {
        id: 402,
        size: "L",
        color: "Brown",
        stock: 2,
      },
      {
        id: 403,
        size: "XL",
        color: "Brown",
        stock: 0,
      },
    ],
  },

  {
    id: 5,
    name: "Oversized Hoodie",
    brand: "StreetWear",
    category: "Hoodies",
    price: 1799,
    rating: 4.4,
    description:
      "A comfortable oversized hoodie for a relaxed streetwear look.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",

    variants: [
      {
        id: 501,
        size: "M",
        color: "Grey",
        stock: 8,
      },
      {
        id: 502,
        size: "L",
        color: "Grey",
        stock: 5,
      },
      {
        id: 503,
        size: "XL",
        color: "Grey",
        stock: 2,
      },
    ],
  },

  {
    id: 6,
    name: "Slim Fit Shirt",
    brand: "FormalEdge",
    category: "Shirts",
    price: 1299,
    rating: 4.2,
    description:
      "A slim-fit shirt designed for a sharp and modern appearance.",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",

    variants: [
      {
        id: 601,
        size: "S",
        color: "Blue",
        stock: 5,
      },
      {
        id: 602,
        size: "M",
        color: "Blue",
        stock: 3,
      },
      {
        id: 603,
        size: "L",
        color: "Blue",
        stock: 0,
      },
    ],
  },
];

export default products;