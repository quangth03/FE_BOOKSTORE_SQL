// import {
//   Facebook,
//   Instagram,
//   MailOutline,
//   Phone,
//   Pinterest,
//   Room,
//   Twitter,
// } from "@mui/icons-material";
// import styled from "styled-components";
// import { mobile } from "../responsive";

// const Container = styled.div`
//   display: flex;
//   ${mobile({ flexDirection: "column" })}
// `;

// const Left = styled.div`
//   flex: 2;
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
// `;

// const Logo = styled.h1``;

// const Desc = styled.p`
//   margin: 20px 0px;
//   text-align: justify;
// `;

// const SocialContainer = styled.div`
//   display: flex;
// `;

// const SocialIcon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   color: white;
//   background-color: #${(props) => props.color};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 20px;
// `;

// const Title = styled.h3`
//   margin-bottom: 30px;
// `;
// const Right = styled.div`
//   flex: 1;
//   padding: 20px;
//   ${mobile({ backgroundColor: "#fff8f8" })}
// `;

// const ContactItem = styled.div`
//   margin-bottom: 20px;
//   display: flex;
//   align-items: center;
// `;

// const Payment = styled.img`
//   width: 50%;
// `;

// const Footer = () => {
//   return (
//     <Container>
//       <Left>
//         <Logo>Book Store</Logo>
//         <Desc>
//           {" "}
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius officia
//           magni, doloribus architecto ducimus deleniti. Soluta quidem ipsum,
//           similique nisi et, neque nam maxime necessitatibus voluptatem nulla
//           voluptates tenetur, eius incidunt esse rem aperiam doloribus saepe
//           impedit odio quaerat. Nemo et ipsam earum perferendis officiis
//           impedit? Mollitia unde in est!{" "}
//         </Desc>
//         <SocialContainer>
//           <SocialIcon color="3B5999">
//             <Facebook />
//           </SocialIcon>
//           <SocialIcon color="E4405F">
//             <Instagram />
//           </SocialIcon>
//           <SocialIcon color="55ACEE">
//             <Twitter />
//           </SocialIcon>
//           <SocialIcon color="E60023">
//             <Pinterest />
//           </SocialIcon>
//         </SocialContainer>
//       </Left>
//       <Right>
//         <Title>Contact</Title>
//         <ContactItem>
//           <Room style={{ marginRight: "10px" }} /> 1 Võ Văn ngân, phường Linh
//           Chiểu, TP.Thủ Đức, TP.HCM
//         </ContactItem>
//         <ContactItem>
//           <Phone style={{ marginRight: "10px" }} /> +84 123 456 789
//         </ContactItem>
//         <ContactItem>
//           <MailOutline style={{ marginRight: "10px" }} /> contact@bookstore.com
//         </ContactItem>
//         <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
//       </Right>
//     </Container>
//   );
// };

// export default Footer;

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Partner from "./Partner";
export default function Footer() {
  return (
    <div className="footer mt-5">
      <div className="partner container mx-auto">
        <Partner />
      </div>

      <div className="input-email bg-orange-500 ">
        <div className="container flex justify-content-between align-items-center mx-auto py-5">
          <div className=" justify-content-between align-items-center text-100">
            <h2 className="mb-3">ĐĂNG KÝ NHẬN EMAIL</h2>
            <p style={{ margin: "13px 0" }}>
              Đăng ký nhận thông tin sách mới, sách bán
            </p>
          </div>

          <div className="flex gap-3">
            <InputText
              style={{ width: "40rem" }}
              placeholder="Nhập email của bạn vào đây"
            />
            <Button
              style={{
                backgroundColor: "#f8f9fa",
                color: "orange",
                borderColor: "orange",
              }}
              label="ĐĂNG KÝ NGAY"
            />
          </div>
        </div>
      </div>

      <div className="about py-5">
        <div className="container justify-content-between mx-auto grid">
          <div className="col-6 grid text-600">
            <div className="col-4 ">
              <h4 className="text-900">VỀ CÔNG TY</h4>
              <p style={{ margin: "13px 0" }}>Giới thiệu công ty</p>
              <p style={{ margin: "13px 0" }}>Tuyển dụng</p>
              <p style={{ margin: "13px 0" }}>Chương trình đại lý</p>
              <p style={{ margin: "13px 0" }}>Chính sách bảo mật</p>
              <p style={{ margin: "13px 0" }}>Chính sách đổi trả</p>
            </div>

            <div className="col-4">
              <h4 className="text-900">TRỢ GIÚP</h4>
              <p style={{ margin: "13px 0" }}>Quy định sử dụng</p>
              <p style={{ margin: "13px 0" }}>Hướng dẫn mua hàng</p>
              <p style={{ margin: "13px 0" }}>Phương thức thanh toán</p>
              <p style={{ margin: "13px 0" }}>Phương thức vận chuyển</p>
              <p style={{ margin: "13px 0" }}>Ứng dụng đọc ebook</p>
            </div>

            <div className="col-4">
              <h4 className="text-900">TIN TỨC SÁCH</h4>
              <p style={{ margin: "13px 0" }}>Tin tức</p>
              <p style={{ margin: "13px 0" }}>Chân dung</p>
              <p style={{ margin: "13px 0" }}>Điểm sách</p>
              <p style={{ margin: "13px 0" }}>Phê bình</p>
            </div>
          </div>

          <div className="grid col-6">
            <div className="col-4">
              <h4>CHẤP NHẬN THANH TOÁN</h4>
              <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                <img
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_payment_1.png?v=354"
                  alt=""
                />
                <img
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_payment_2.png?v=354"
                  alt=""
                />
                <img
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_payment_3.png?v=354"
                  alt=""
                />
                <img
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_payment_4.png?v=354"
                  alt=""
                />
                <img
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_payment_5.png?v=354"
                  alt=""
                />
                <img
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_payment_6.png?v=354"
                  alt=""
                />
              </div>

              <h4>THANH TOÁN AN TOÀN</h4>
              <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                <img
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_payment_7.png?v=354"
                  alt=""
                />
                <img
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_payment_8.png?v=354"
                  alt=""
                />
                <img
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_payment_9.png?v=354"
                  alt=""
                />
              </div>
            </div>

            <div className="col-4">
              <h4>ĐỐI TÁC VẬN CHUYỂN</h4>
              <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                <img
                  className="w-full h-4rem"
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_shipment_2.png?v=354"
                  alt=""
                />
                <img
                  className="w-full h-4rem"
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_shipment_3.png?v=354"
                  alt=""
                />
              </div>
            </div>
            <div className="col-4 ">
              <h4>ĐỐI TÁC BÁN HÀNG</h4>
              <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                <img
                  className="w-full h-4rem"
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_seller_1.png?v=354"
                  alt=""
                />
                <img
                  className="w-full h-4rem"
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_seller_2.png?v=354"
                  alt=""
                />
                <img
                  className="w-full h-4rem"
                  src="https://theme.hstatic.net/200000845405/1001223012/14/footer_logo_seller_3.png?v=354"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
