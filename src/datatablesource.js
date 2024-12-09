import moment from "moment";
import { formatMoney } from "./utils/table-pagination";

export const userColumns = [
  { field: "id", headerName: "ID", width: 150 },
  // {
  //   field: "avatar",
  //   headerName: "Ảnh đại diện",
  //   width: 100,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img
  //           className="cellImg"
  //           src={
  //             params.row.avatar === "avatar"
  //               ? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
  //               : params.row.avatar
  //           }
  //           alt="avatar"
  //         />
  //       </div>
  //     );
  //   },
  // },
  {
    field: "username",
    headerName: "Tài khoản",
    width: 125,
  },
  {
    field: "email",
    headerName: "Địa chỉ email",
    width: 230,
  },
  {
    field: "full_name",
    headerName: "Họ và tên",
    width: 180,
  },

  {
    field: "phone_number",
    headerName: "Số điện thoại",
    width: 100,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 220,
    renderCell: (params) => {
      return (
        <div style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
          {params.row.address}
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 100,
    renderCell: (params) => {
      return moment(params.row.createdAt).format("DD-MM-YYYY");
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 100,
    renderCell: (params) => {
      return moment(params.row.updatedAt).format("DD-MM-YYYY");
    },
  },
  {
    field: "isDelete",
    headerName: "Trạng thái",
    width: 100,
    renderCell: (params) => {
      return (
        <div style={{ color: params.row.isDelete ? "red" : "green" }}>
          {params.row.isDelete ? "Đã bị chặn" : "Khả dụng"}
        </div>
      );
    },
  },
];

export const productColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "image",
    headerName: "Bìa sách",
    width: 100,
    renderCell: (params) => {
      return (
        // <div className="cellWithImg">
        //   <img className="cellImg" src={params.row.image} alt="image" />
        // </div>
        <div>
          <img
            src={params.row.image}
            alt="Sách"
            style={{ width: "50px", objectFit: "cover" }}
          />
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Tựa sách",
    width: 150,
    renderCell: (params) => {
      return (
        <div style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "author",
    headerName: "Tác giả",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    width: 100,
  },
  {
    field: "price",
    headerName: "Giá tiền",
    width: 100,
  },
  {
    field: "discount",
    headerName: "Khuyến mãi",
    width: 100,
    renderCell: (params) => {
      return params.row.discount + " %";
    },
  },

  {
    field: "publication_date",
    headerName: "Ngày xuất bản",
    width: 120,
    renderCell: (params) => {
      return moment(params.row.publication_date).format("DD-MM-YYYY");
    },
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 100,
    renderCell: (params) => {
      return moment(params.row.createdAt).format("DD-MM-YYYY");
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 120,
    renderCell: (params) => {
      return moment(params.row.updatedAt).format("DD-MM-YYYY");
    },
  },
  {
    field: "isDelete",
    headerName: "Trạng thái",
    width: 100,
    renderCell: (params) => {
      return (
        <div style={{ color: params.row.isDelete ? "red" : "green" }}>
          {params.row.isDelete ? "Đã ẩn" : "Khả dụng"}
        </div>
      );
    },
  },
];

export const orderColumns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "user_id",
    headerName: "Tên người mua",
    width: 150,
    renderCell: (params) => {
      return params.row.user.full_name;
    },
  },
  {
    field: "total",
    headerName: "Tổng tiền (VNĐ)",
    width: 150,

    renderCell: (params) => {
      return formatMoney(params.row.total, "");
    },
  },
  {
    field: "total_quantity",
    headerName: "Số lượng sản phẩm",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 100,
    renderCell: (params) => {
      return moment(params.row.createdAt).format("DD-MM-YYYY");
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 120,
    renderCell: (params) => {
      return moment(params.row.updatedAt).format("DD-MM-YYYY");
    },
  },
];
export const getColor = (id) => {
  switch (id) {
    case 1:
      return "red"; // Red color for id 1
    case 2:
      return "orange"; // Orange color for id 2
    case 3:
      return "Magenta"; // Yellow color for id 3
    case 4:
      return "blue"; // Blue color for id 4
    case 5:
      return "green"; // Green color for id 5
    default:
      return "black"; // Default color
  }
};

export const listOrderStatus = [
  { id: 1, name: "Chờ thanh toán" },
  { id: 2, name: "Chờ xác nhận" },
  { id: 3, name: "Đã xác nhận" },
  { id: 4, name: "Đang giao hàng" },
  { id: 5, name: "Đã giao hàng" },
];
export const categoryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "image",
    headerName: "Hình ảnh",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="image" />
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Tên thể loại",
    width: 200,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 500,
    renderCell: (params) => {
      return (
        <div style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
          {params.row.description}
        </div>
      );
    },
  },

  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 100,
    renderCell: (params) => {
      return moment(params.row.createdAt).format("DD-MM-YYYY");
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 120,
    renderCell: (params) => {
      return moment(params.row.updatedAt).format("DD-MM-YYYY");
    },
  },
  // {
  //   field: "isDelete",
  //   headerName: "Trạng thái",
  //   width: 100,
  //   renderCell: (params) => {
  //     return (
  //       <div style={{ color: "red" }}>
  //         {params.row.isDelete ? "Đã xóa" : ""}
  //       </div>
  //     );
  //   },
  // },
];
export const commentColumns = [
  { field: "id", headerName: "ID", width: 60 },

  {
    field: "book_img",
    headerName: "Bìa sách",
    width: 80,
    renderCell: (params) => {
      if (params.row.book.image) {
        return (
          <div>
            <img
              src={params.row.book.image}
              alt="Sách"
              style={{ width: "50px", objectFit: "cover" }}
            />
          </div>
        );
      } else {
        <></>;
      }
    },
  },
  {
    field: "book_mane",
    headerName: "Tựa sách",
    width: 250,
    renderCell: (params) => {
      return (
        <div style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
          {params.row.book.title}
        </div>
      );
    },
  },
  {
    field: "userame",
    headerName: "Tài khoản",
    width: 100,
    renderCell: (params) => {
      return params.row.user.username;
    },
  },
  {
    field: "name",
    headerName: "Họ và tên",
    width: 150,
    renderCell: (params) => {
      return params.row.user.full_name;
    },
  },
  {
    field: "value",
    headerName: "Nội dung",
    width: 350,
    renderCell: (params) => {
      return (
        <div style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
          {params.row.value}
        </div>
      );
    },
  },
  {
    field: "rate",
    headerName: "Đánh giá",
    width: 140,
    renderCell: (params) => {
      const rate = parseInt(params.row.rate);
      return <div className="cellWithImg">{"⭐".repeat(rate)}</div>;
    },
  },
  {
    field: "createdAt",
    headerName: "Ngày bình luận",
    width: 150,
    renderCell: (params) => {
      return moment(params.row.createdAt).format("HH:mm DD-MM-YYYY ");
    },
  },
  // {
  //   field: "updatedAt",
  //   headerName: "Ngày cập nhật",
  //   width: 120,
  //   renderCell: (params) => {
  //     return moment(params.row.updatedAt).format("DD-MM-YYYY");
  //   },
  // },
];

export const discountColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "value",
    headerName: "Giá trị",
    width: 120,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 400,
  },
  {
    field: "minimumOrderValue",
    headerName: "Đơn hàng tối thiểu",
    width: 180,
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 100,
    renderCell: (params) => {
      return moment(params.row.createdAt).format("DD-MM-YYYY");
    },
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 120,
    renderCell: (params) => {
      return moment(params.row.updatedAt).format("DD-MM-YYYY");
    },
  },
  {
    field: "expiredAt",
    headerName: "Ngày hết hạn",
    width: 100,
    renderCell: (params) => {
      return moment(params.row.expiredAt).format("DD-MM-YYYY");
    },
  },
];
