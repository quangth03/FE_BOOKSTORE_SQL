import "./list.scss";
import Sidebar from "../../../../components/sidebar/Sidebar";
import OrderDetails from "../../../../pages/OrderDetails";

const AdminOrderDetails = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <OrderDetails />
      </div>
    </div>
  );
};

export default AdminOrderDetails;
