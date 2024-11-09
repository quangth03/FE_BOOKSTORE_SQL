export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "avatar",
    headerName: "Ảnh đại diện",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.avatar === "avatar"
                ? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                : params.row.avatar
            }
            alt="avatar"
          />
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Tên người dùng",
    width: 125,
  },
  {
    field: "email",
    headerName: "Địa chỉ email",
    width: 150,
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
    width: 100,
  },
  {
    field: "isAdmin",
    headerName: "Quyền quản trị",
    width: 120,
    renderCell: (params) => {
      return <div>{params.row.isAdmin ? "Quản trị viên" : "Người dùng"}</div>;
    },
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 100,
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 100,
  },
];

export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "image",
    headerName: "Ảnh bìa",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="image" />
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 200,
  },
  {
    field: "author",
    headerName: "Tác giả",
    width: 150,
  },
  {
    field: "price",
    headerName: "Giá tiền",
    width: 100,
  },

  {
    field: "publication_date",
    headerName: "Ngày xuất bản",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 150,
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 150,
  },
];

export const orderColumns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "user_id",
    headerName: "ID người mua",
    width: 200,
  },
  {
    field: "total",
    headerName: "Tổng tiền (VNĐ)",
    width: 150,
  },
  {
    field: "total_quantity",
    headerName: "Số lượng sản phẩm",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 200,
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 200,
  },
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
    width: 300,
  },

  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 200,
  },
  {
    field: "updatedAt",
    headerName: "Ngày cập nhật",
    width: 200,
  },
];
