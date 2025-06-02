import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { endpoint } from "../data";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Info,
  Total,
  TotalTitle,
  TotalItem,
  TotalText,
  TotalPrice,
  TotalPrices,
  Products,
} from "./Cart";

import CartItem from "../components/CartItem";

const DiscountSelect = styled.select`
  width: 70%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
`;

const Payment = styled.img`
  width: 100%;
`;
const Shipping = () => {
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null); //gop vo luon
  const [fee, setFee] = useState(0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    ward: "",
    addressDetail: "",
    note: "",
    paymentMethod: "cash",
  });

  const paymentMethods = [
    {
      label: "Thanh toán khi giao hàng (COD)",
      value: "cash",
      img: "https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6",
    },
    // { label: "Chuyển khoản qua ngân hàng", value: "bank" },
    // { label: "Thẻ ATM nội địa qua cổng OnePay", value: "atm" },
    // { label: "Visa/Master/JCB/Amex/CUP qua OnePay", value: "visa" },
    {
      label: "Ví MoMo",
      value: "online",
      img: "https://hstatic.net/0/0/global/design/seller/image/payment/momo.svg?v=6",
    },
  ];

  useEffect(() => {
    fetch(`${endpoint}/user/province`)
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!form.province) return; // Nếu chưa chọn tỉnh thì không gọi API
    fetch(`${endpoint}/user/district/${form.province}`)
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch(console.error);
  }, [form.province]);

  useEffect(() => {
    if (!form.district) return;
    fetch(`${endpoint}/user/ward/${form.district}`)
      .then((res) => res.json())
      .then(setWards)
      .catch(console.error);
  }, [form.district]);

  useEffect(() => {
    if (!form.district) return;
    fetch(`${endpoint}/user/shippingFee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weight: 2000,
        to_district_id: form.district,
        service_type_id: 2,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // console.log("total", data.data.total);
        setFee(data.data.total);
      })
      .catch(console.error);
  }, [form.district]);

  useEffect(() => {
    handleGetCart();
    handleGetDiscounts();
    handleGetUser();
  }, []);

  const handleGetCart = () => {
    fetch(`${endpoint}/user/cart`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedBooks = data.books.sort(
          (a, b) =>
            new Date(b.cart_details.createdAt) -
            new Date(a.cart_details.createdAt)
        );

        setCartItems(sortedBooks);
        setTotalAmount(data.total);
      })
      .catch((error) => console.error(error));
  };

  const updateCart = () => {
    handleGetCart();
  };

  const handleGetDiscounts = () => {
    fetch(`${endpoint}/user/discounts/valid`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDiscounts(data);
        } else {
          console.error("Dữ liệu mã giảm giá không hợp lệ");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleGetUser = () => {
    fetch(`${endpoint}/user/profile`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm((pre) => ({
          ...pre,
          name: data.full_name || "",
          phone: data.phone_number || "",
          email: data.email || "",
        }));
        // setUser(data);
        // setName(data.full_name);
        // setPhone(data.phone_number);
        // setEmail(data.email);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.ward ||
      !form.addressDetail
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!", { autoClose: 2000 });
      return;
    }
    const orderData = {
      value: selectedDiscount?.value ?? 0,
      payment_method: form.paymentMethod, // Phương thức thanh toán
      status: form.paymentMethod === "online" ? 1 : 2, // Trạng thái đơn hàng
      note: form.note, //khong bat buoc
      to_name: form.name,
      to_phone: form.phone,
      to_address: form.addressDetail,
      to_ward_code: String(form.ward),
      to_district_id: form.district,
      // to_province_name: bình định,
      service_type_id: 2, //2: hang nhe  5: hang nang
      payment_type_id: form.paymentMethod === "online" ? 1 : 2, //Mã người thanh toán phí dịch vụ.
      required_note: "KHONGCHOXEMHANG", //Ghi chú bắt buộc, Bao gồm: CHOTHUHANG, CHOXEMHANGKHONGTHU, KHONGCHOXEMHANG
      cod_amount:
        form.paymentMethod === "cash"
          ? selectedDiscount &&
            totalAmount >= selectedDiscount.minimumOrderValue
            ? Number(totalAmount - selectedDiscount.value)
            : Number(totalAmount)
          : 0, // không có cũng được, đơn đưa tiền khi nhận hàng thì bỏ vô giá đơn hàng
      weight: 2000,
      // "length": 1, của order nếu k có mặc định là 10
      // "width": 19,
      // "height": 10,
      items: cartItems.map((item) => ({
        name: item.title,
        quantity: item.cart_details.quantity,
        weight: 500,
      })),
      ghn_fee: fee,
    };

    console.log(orderData);

    fetch(`${endpoint}/user/order`, {
      method: "POST",
      headers: {
        authorization: Cookies.get("authToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (form.paymentMethod === "online") {
          console.log(data);
          window.location.href = data.payUrl; // Chuyển hướng nếu là thanh toán online
        } else {
          toast.success("Đặt hàng thành công!", { autoClose: 2000 });
          setTimeout(() => {
            navigate("/orders");
          }, 2100);
        }
      })
      .catch((error) => console.error(error));
  };

  const isVip = Cookies.get("isVip");

  const discountedProduct = cartItems.reduce((total, item) => {
    const discountRate = isVip ? item.discount * 2 : item.discount;
    const itemDiscount =
      (item.price * discountRate * item.cart_details.quantity) / 100;
    return total + itemDiscount;
  }, 0);

  const priceProduct = cartItems.reduce((total, item) => {
    const itemPrice = item.price * item.cart_details.quantity;
    return total + itemPrice;
  }, 0);

  return (
    <div className="flex container mx-auto my-5">
      <Info>
        <form className="mr-5">
          <h2 className="my-3">XÁC NHẬN THANH TOÁN</h2>
          <div className="info my-6">
            <h2>Địa chỉ nhận hàng</h2>
            <div className="flex my-4 gap-8">
              <div className="flex flex-column gap-2 w-5">
                <label htmlFor="name">Họ và tên</label>
                <InputText
                  className="p-inputtext-lg"
                  id="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((pre) => ({ ...pre, name: e.target.value }))
                  }
                />
              </div>

              <div className="flex flex-column gap-2 w-5">
                <label htmlFor="phone">Số điện thoại</label>
                <InputText
                  className="p-inputtext-lg"
                  id="phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((pre) => ({ ...pre, phone: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex flex-column gap-2 w-11">
              <label htmlFor="email">Email</label>
              <InputText
                className="p-inputtext-lg"
                id="email"
                value={form.email}
                onChange={(e) =>
                  setForm((pre) => ({ ...pre, email: e.target.value }))
                }
              />
            </div>

            <div className="flex w-11 justify-content-between my-5 ">
              <Dropdown
                className="p-inputtext-lg"
                value={form.province}
                options={provinces}
                optionLabel="provinceName"
                optionValue="provinceId"
                onChange={(e) =>
                  setForm((pre) => ({ ...pre, province: e.value }))
                }
                filter
                placeholder="Tỉnh / Thành"
              />
              <Dropdown
                className="p-inputtext-lg"
                value={form.district}
                options={districts}
                optionLabel="districtName"
                optionValue="districtId"
                onChange={(e) =>
                  setForm((pre) => ({ ...pre, district: e.value }))
                }
                filter
                placeholder="Quận / Huyện"
                // className="w-8"
              />
              <Dropdown
                className="p-inputtext-lg"
                value={form.ward}
                options={wards}
                optionLabel="wardName"
                optionValue="wardCode"
                onChange={(e) => {
                  setForm((pre) => ({ ...pre, ward: e.value }));
                }}
                filter
                placeholder="Phường / Xã"
                // className="w-8"
              />
            </div>

            <div className="flex flex-column gap-2 w-11 mb-5">
              <label htmlFor="address-details">
                Địa chỉ chi tiết (Vui lòng nhập chính xác địa chỉ)
              </label>
              <InputText
                className="p-inputtext-lg"
                id="address-details"
                value={form.addressDetail}
                onChange={(e) =>
                  setForm((pre) => ({ ...pre, addressDetail: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-column gap-2 w-11 mb-5">
              <label htmlFor="note">Ghi chú</label>
              <InputText
                className="p-inputtext-lg"
                id="note"
                value={form.note}
                onChange={(e) =>
                  setForm((pre) => ({ ...pre, note: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="products my-7">
            <h2 className="mb-5">Sản phẩm</h2>
            <Products>
              {cartItems
                ? cartItems.map((cartItem, index) => {
                    return (
                      <CartItem
                        cartItem={cartItem}
                        key={`cart-item-${index}`}
                        updateCart={updateCart}
                        hidden={true}
                      />
                    );
                  })
                : ""}
            </Products>
            <h3 className="mt-5">Đơn vị vận chuyển: GiaoHangNhanh</h3>
            <h3>
              Vận chuyển từ{" "}
              <i className="text-yellow-500">Quận Thủ Đức, TP. Hồ Chí Minh</i>{" "}
              đến{" "}
              <i className="text-yellow-500">
                {
                  districts.find((d) => d.districtId === form.district)
                    ?.districtName
                }
                , TP.
                {
                  provinces.find((p) => p.provinceId === form.province)
                    ?.provinceName
                }
              </i>
            </h3>
          </div>

          <div className="payment mt-7">
            <h2>Phương thức thanh toán</h2>
            <div className="flex flex-column gap-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.value}
                  className="flex align-items-center gap-2 border p-2 rounded"
                >
                  <RadioButton
                    inputId={method.value}
                    name="paymentMethod"
                    value={method.value}
                    onChange={(e) =>
                      setForm((pre) => ({ ...pre, paymentMethod: e.value }))
                    }
                    checked={form.paymentMethod === method.value}
                  />
                  <label
                    htmlFor={method.value}
                    className="flex align-items-center"
                  >
                    <img
                      src={method.img}
                      alt=""
                      className="w-5rem h-5rem mr-3"
                    />
                    {method.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </Info>

      <Total>
        <TotalTitle>THÔNG TIN ĐƠN HÀNG</TotalTitle>
        <TotalItem>
          <TotalText>Tổng tiền các sản phẩm</TotalText>
          <TotalPrice>
            {/* {Number(totalAmount).toLocaleString()} VND */}
            {Number(priceProduct).toLocaleString()} VND
          </TotalPrice>
        </TotalItem>
        <TotalItem>
          <TotalText>Giảm giá sản phẩm</TotalText>
          <TotalPrice>
            -{Number(parseInt(discountedProduct)).toLocaleString()} VND
          </TotalPrice>
        </TotalItem>
        <TotalItem>
          <TotalText>Voucher của BookStore</TotalText>
          <TotalPrice>
            {selectedDiscount
              ? (-parseInt(selectedDiscount.value)).toLocaleString()
              : 0}{" "}
            VND
          </TotalPrice>
        </TotalItem>
        <TotalItem>
          <TotalText>Phí vận chuyển</TotalText>
          <TotalPrice>{!fee ? "0" : fee.toLocaleString()} VND</TotalPrice>
        </TotalItem>
        <hr />
        <TotalItem type="total">
          <TotalText>Tổng thanh toán</TotalText>
          <TotalPrices>
            {selectedDiscount &&
            totalAmount >= selectedDiscount.minimumOrderValue
              ? Number(
                  fee + totalAmount - selectedDiscount.value
                ).toLocaleString()
              : Number(fee + totalAmount).toLocaleString()}{" "}
            VND
          </TotalPrices>
        </TotalItem>
        <TotalItem>
          <TotalText>Chọn mã giảm giá</TotalText>
          <DiscountSelect
            onChange={(e) => {
              const selectedValue = e.target.value;
              // Kiểm tra nếu không phải "null" thì mới parse
              if (selectedValue !== "null") {
                setSelectedDiscount(JSON.parse(selectedValue));
              } else {
                setSelectedDiscount(null); // Đặt lại selectedDiscount nếu chọn "Chọn mã giảm giá"
              }
            }}
          >
            <option value="null">Chọn mã giảm giá</option>
            {discounts.map((discount) => {
              const isDisabled = totalAmount < discount.minimumOrderValue; // Kiểm tra điều kiện disable
              return (
                <option
                  key={discount.id}
                  value={JSON.stringify(discount)}
                  disabled={isDisabled} // Disable nếu không đủ giá trị đơn hàng
                >
                  {discount.description} -{" "}
                  {Number(discount.value).toLocaleString()}{" "}
                  {isDisabled && "(Không áp dụng)"}
                </option>
              );
            })}
          </DiscountSelect>
        </TotalItem>
        <Payment className="" src="https://i.ibb.co/Qfvn4z6/payment.png" />
        <div className="flex justify-content-center mt-6">
          {/* <Button label="Giỏ hàng" severity="secondary" /> */}
          <Button
            className="w-full"
            label="Thanh toán"
            severity="warning"
            onClick={handleSubmit}
          />
        </div>
      </Total>
    </div>
  );
};

export default Shipping;
