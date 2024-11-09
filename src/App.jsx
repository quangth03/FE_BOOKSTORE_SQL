import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ChangeProfile from "./pages/ChangeProfile";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import PaymentSuccessful from "./pages/PaymentSuccessful";
import ChangePassword from "./pages/ChangePassword";
import Cart from "./pages/Cart";
import UserOrders from "./pages/UserOrders";
import OrderDetails from "./pages/OrderDetails";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails/AdminOrderDetails/AdminOrderDetails";
import CategiryBooks from "./pages/CategoryBooks";
import Search from "./pages/Search";

import AdminUsers from "./pages/admin/UserManagement/userList/List";
import AdminProducts from "./pages/admin/ProductManagement/productList/List";
import AdminOrders from "./pages/admin/OrderManagement/orderList/List";
import AdminCategories from "./pages/admin/CategoryManagement/categoryList/List";
import AdminAddProduct from "./pages/admin/ProductManagement/AddProduct";
import AdminAddCategory from "./pages/admin/CategoryManagement/AddCategory";
import AdminUpdateCategory from "./pages/admin/CategoryManagement/UpdateCategory";
import AdminUpdateProduct from "./pages/admin/ProductManagement/UpdateProduct";
import AddCategoryBook from "./pages/admin/ProductManagement/AddCategoriesToProduct";
import DeleteCategoryBook from "./pages/admin/ProductManagement/DeleteCategoriesToProduct";

const UserAuthentication = ({ children }) => {
  if (!Cookies.get("authToken")) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

const AdminAuthentication = ({ children }) => {
  if (!Cookies.get("authToken") || !Cookies.get("isAdmin")) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/search/:title" Component={Search} />
        <Route exact path="/books" Component={ProductsPage} />
        <Route exact path="/books/:id" Component={ProductDetail} />
        <Route exact path="/category/:id" Component={CategiryBooks} />

        <Route
          exact
          path="/admin/users"
          element={
            <AdminAuthentication>
              <AdminUsers />
            </AdminAuthentication>
          }
        />
        <Route
          exact
          path="/admin/books"
          element={
            <AdminAuthentication>
              <AdminProducts />
            </AdminAuthentication>
          }
        />
        <Route
          exact
          path="/admin/order/all"
          element={
            <AdminAuthentication>
              <AdminOrders />
            </AdminAuthentication>
          }
        />
        <Route
          exact
          path="/admin/order/:orderIdParam"
          element={
            <AdminAuthentication>
              <AdminOrderDetails />
            </AdminAuthentication>
          }
        />
        <Route
          exact
          path="/admin/categories"
          element={
            <AdminAuthentication>
              <AdminCategories />
            </AdminAuthentication>
          }
        />

        <Route
          exact
          path="/admin/category/update/:id"
          element={
            <AdminAuthentication>
              <AdminUpdateCategory />
            </AdminAuthentication>
          }
        />
        <Route
          exact
          path="/admin/book/update/:id"
          element={
            <AdminAuthentication>
              <AdminUpdateProduct />
            </AdminAuthentication>
          }
        />
        <Route
          exact
          path="/admin/book/add"
          element={
            <AdminAuthentication>
              <AdminAddProduct />
            </AdminAuthentication>
          }
        />
        <Route
          exact
          path="/admin/category/add"
          element={
            <AdminAuthentication>
              <AdminAddCategory />
            </AdminAuthentication>
          }
        />
        <Route
          exact
          path="/admin/books/:id/categories/add"
          element={
            <AdminAuthentication>
              <AddCategoryBook />
            </AdminAuthentication>
          }
        />

        <Route
          exact
          path="/admin/books/:id/categories/delete"
          element={
            <AdminAuthentication>
              <DeleteCategoryBook />
            </AdminAuthentication>
          }
        />

        <Route exact path="/" Component={Home} />
        <Route
          exact
          path="/profile"
          element={
            <UserAuthentication>
              <Profile />
            </UserAuthentication>
          }
        />
        <Route
          exact
          path="/change-password"
          element={
            <UserAuthentication>
              <ChangePassword />
            </UserAuthentication>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <UserAuthentication>
              <UserOrders />
            </UserAuthentication>
          }
        />
        <Route
          exact
          path="/orders/:orderIdParam"
          element={
            <UserAuthentication>
              <OrderDetails />
            </UserAuthentication>
          }
        />
        <Route
          exact
          path="/update-profile"
          element={
            <UserAuthentication>
              <ChangeProfile />
            </UserAuthentication>
          }
        />
        <Route
          exact
          path="/logout"
          element={
            <UserAuthentication>
              <Logout />
            </UserAuthentication>
          }
        />
        <Route
          exact
          path="/payment-successful"
          element={
            <UserAuthentication>
              <PaymentSuccessful />
            </UserAuthentication>
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <UserAuthentication>
              <Cart />
            </UserAuthentication>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
