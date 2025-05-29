import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// import Partner from "./Partner";
export default function Footer() {
  return (
    <div className="footer">
      {/* <div className="partner container mx-auto">
        <Partner />
      </div> */}

      <div className="input-email" style={{ backgroundColor: "#ffc107" }}>
        <div className="container flex justify-content-between align-items-center mx-auto py-3">
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
          <div className="col-5 grid text-600">
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

          <div className="grid col-7">
            <div className="col-4 ">
              <h4>CHẤP NHẬN THANH TOÁN</h4>
              <div className="flex flex-wrap  align-items-center gap-1 py-2 mb-2">
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
              <div className="flex flex-wrap  align-items-center gap-2 py-2">
                <img
                  style={{ width: "5rem" }}
                  src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png"
                  alt=""
                />
                <img
                  style={{ width: "2rem" }}
                  src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/momopay.png"
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
