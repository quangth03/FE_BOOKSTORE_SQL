import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="banner bg-green-600">
      <div className="container flex justify-content-between py-3 mx-auto">
        {/* <div className="flex gap-4 "> */}
        <div className="phone flex align-items-center">
          <Link
            to="tel:0326332869"
            className="flex gap-3 no-underline text-white font-semibold"
          >
            <i className="pi pi-phone"></i> 19008386
          </Link>
        </div>

        <div className="email flex align-items-center">
          <Link
            to="mailto:quangth2201@gmail.com"
            className="flex gap-3 no-underline text-white font-semibold"
          >
            <i className="pi pi-envelope"></i>bookstore@gmail.com
          </Link>
        </div>

        <div className="location flex align-items-center">
          <Link
            to="/"
            className="flex gap-3 no-underline text-white font-semibold"
          >
            <i className="pi pi-map-marker"></i>Số 1 Võ Văn Ngân, Phường Linh
            Trung, Quận Thủ Đức, TP. Thủ Đức TP. Hồ Chí Minh
          </Link>
        </div>
      </div>
    </div>
  );
}
