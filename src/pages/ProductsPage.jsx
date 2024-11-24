import React, { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { endpoint } from "../data";
import PageNavigation from "../components/PageNavigation";
import { Checkbox } from 'primereact/checkbox';
import { Slider } from 'primereact/slider';
import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import { formatMoney } from "../utils/table-pagination";
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { InputSwitch } from 'primereact/inputswitch';


const ProductsPage = () => {

  const fild = [
    {
      value: "price",
      name: "giá cả"
    },
    {
      value: "publication_date",
      name: "ngày xuất bản"
    }
  ]
  const contrain = [
    {
      value: "ASC",
      name: "Tăng dần"
    },
    {
      value: "DESC",
      name: "Giảm dần"
    }
  ]
  const query = new URLSearchParams(window.location.search);
  var current = query.get("page");
  const [books, setPopularProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState("price");
  const [sort, setSort] = useState("ASC");


  const updateBook = () => {
    fetch(`${endpoint}/user/books?limit=12&page=${Number(current) + 1}&from=${priceRange[0]}&to=${priceRange[1]}&sort=${sortBy}&sortD=${sort}&cat=${selectedCategories.join('-')}`)
      .then((response) => response.json())
      .then((data) => {
        setPopularProducts(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    updateBook()
  }, [current]);

  useEffect(() => {
    fetch(`${endpoint}/user/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setSelectedCategories(data.map(item => item.id))
        updateBook()
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.value;
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{
          width: '25%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Card title="Tùy chọn" style={{ width: '80%' }}>
            <div style={{ margin: '25px 5px' }}>
              <h4 style={{ alignItems: 'center', marginBottom: '15px' }}>Thể loại</h4>
              {categories.map(item => (
                <div style={{ margin: '5px 0px' }}>
                  <Checkbox
                    inputId={item.id}
                    value={item.id}
                    onChange={handleCategoryChange}
                    checked={selectedCategories.includes(item.id)}
                  />
                  <label htmlFor={item.id} style={{ marginLeft: '5px' }}>{item.name}</label>
                </div>
              ))}
            </div>
            <div style={{ margin: '25px 5px' }}>
              <h4 style={{ alignItems: 'center', marginBottom: '15px' }}>Khoảng giá</h4>
              <Slider
                value={priceRange}
                onChange={(e) => setPriceRange(e.value)}
                range
                min={0}
                max={1000000}
                step={1000}
              />
              <div style={{ marginTop: '15px' }}>
                {formatMoney(priceRange[0], "")} - {formatMoney(priceRange[1], "")} VNĐ
              </div>
            </div>
            <div style={{ margin: '25px 5px' }}>
              <h4 style={{ alignItems: 'center', marginBottom: '15px' }}>Xắp xếp</h4>
              <SelectButton
                value={sortBy}
                onChange={(e) => setSortBy(e.value)}
                optionLabel="name"
                options={fild}
                style={{ margin: '10px 0px' }} />
              <SelectButton
                value={sort}
                onChange={(e) => setSort(e.value)}
                optionLabel="name"
                options={contrain}
                style={{ margin: '10px 0px' }} />
            </div>
            <div style={{ margin: '25px 5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                label="Áp dụng"
                outlined
                rounded
                onClick={updateBook} />
            </div>
          </Card>
        </div>
        <div style={{ width: '85%' }}>
          <ProductsList books={books} title="Tất cả sản phẩm" />
          <PageNavigation current={Number(current)} total={100} urlPattern="/books" />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
