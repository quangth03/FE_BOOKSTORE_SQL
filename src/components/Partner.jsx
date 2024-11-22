import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { ProductService } from "../services/ProductService";

export default function Partner() {
  const [products, setProducts] = useState([]);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    ProductService.getProductsSmall().then((data) =>
      setProducts(data.slice(0, 9))
    );
  }, []);

  const productTemplate = (product) => {
    return (
      <div className="p-4 text-center">
        <img
          className="w-7rem h-7rem"
          src={`${product.image}`}
          alt={product.name}
        />
      </div>
    );
  };

  return (
    <div>
      <Carousel
        value={products}
        numVisible={5}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        circular
        autoplayInterval={3000}
        itemTemplate={productTemplate}
        showIndicators={false}
      />
    </div>
  );
}
