import Sidebar from "../../../components/sidebar/Sidebar";
import Datatable from "../../../components/commentDatatable/Datatable";
export default function Comment() {
  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Datatable />
        </div>
      </div>
    </div>
  );
}
