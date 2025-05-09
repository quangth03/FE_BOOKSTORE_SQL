export const ProductService = {
  getProductsData() {
    return [
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image:
          "https://theme.hstatic.net/200000845405/1001223012/14/brand_img1.png?v=354",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1001",
        code: "nvklal433",
        name: "Black Watch",
        description: "Product Description",
        image:
          "https://theme.hstatic.net/200000845405/1001223012/14/brand_img2.png?v=354",
        price: 72,
        category: "Accessories",
        quantity: 61,
        inventoryStatus: "INSTOCK",
        rating: 4,
      },
      {
        id: "1002",
        code: "zz21cz3c1",
        name: "Blue Band",
        description: "Product Description",
        image:
          "https://theme.hstatic.net/200000845405/1001223012/14/brand_img3.png?v=354",
        price: 79,
        category: "Fitness",
        quantity: 2,
        inventoryStatus: "LOWSTOCK",
        rating: 3,
      },
      {
        id: "1003",
        code: "244wgerg2",
        name: "Blue T-Shirt",
        description: "Product Description",
        image:
          "https://theme.hstatic.net/200000845405/1001223012/14/brand_img4.png?v=354",
        price: 29,
        category: "Clothing",
        quantity: 25,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1004",
        code: "h456wer53",
        name: "Bracelet",
        description:
          "https://theme.hstatic.net/200000845405/1001223012/14/brand_img5.png?v=354",
        image:
          "https://theme.hstatic.net/200000845405/1001223012/14/brand_img5.png?v=354",
        price: 15,
        category: "Accessories",
        quantity: 73,
        inventoryStatus: "INSTOCK",
        rating: 4,
      },
      {
        id: "1005",
        code: "av2231fwg",
        name: "Brown Purse",
        description: "Product Description",
        image:
          "https://theme.hstatic.net/200000845405/1001223012/14/brand_img6.png?v=354",
        price: 120,
        category: "Accessories",
        quantity: 0,
        inventoryStatus: "OUTOFSTOCK",
        rating: 4,
      },
      {
        id: "1006",
        code: "bib36pfvm",
        name: "Chakra Bracelet",
        description: "Product Description",
        image:
          "https://theme.hstatic.net/200000845405/1001223012/14/brand_img7.png?v=354",
        price: 32,
        category: "Accessories",
        quantity: 5,
        inventoryStatus: "LOWSTOCK",
        rating: 3,
      },
      {
        id: "1007",
        code: "mbvjkgip5",
        name: "Galaxy Earrings",
        description: "Product Description",
        image:
          "https://theme.hstatic.net/200000845405/1001223012/14/brand_img8.png?v=354",
        price: 34,
        category: "Accessories",
        quantity: 23,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1008",
        code: "vbb124btr",
        name: "Game Controller",
        description: "Product Description",
        image:
          "https://theme.hstatic.net/200000845405/1001223012/14/brand_img9.png?v=354",
        price: 99,
        category: "Electronics",
        quantity: 2,
        inventoryStatus: "LOWSTOCK",
        rating: 4,
      },
    ];
  },

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  },

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  },

  getProducts() {
    return Promise.resolve(this.getProductsData());
  },

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  },

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  },
};
