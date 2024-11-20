import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./Dashboard.scss";
import Cookies from "js-cookie";
import { endpoint } from "../../../data";
import {
  PersonOutline,
  Category,
  ShoppingCart,
  Book,
  AttachMoney,
} from "@mui/icons-material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần biểu đồ cần dùng
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    genres: 0,
    orders: 0,
    books: 0,
    totalRevenue: 0,
    topBook: [],
  });
  const [revenueData, setRevenueData] = useState([]); // Thêm state cho doanh thu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${endpoint}/admin/stats`, {
          method: "GET",
          headers: {
            authorization: Cookies.get("authToken"),
          },
        });

        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu");
        }

        const data = await response.json();
        setStats({
          ...data,
          topBook: data.topBook || [],
        });
        setRevenueData(data.revenueByMonth || []); // Lưu dữ liệu doanh thu
      } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []); // Chạy 1 lần khi component mount

  // Chuẩn bị dữ liệu cho biểu đồ doanh thu
  const chartData = {
    labels: revenueData.length
      ? revenueData.map((item) => item.month)
      : ["Không có dữ liệu"],
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: revenueData.length ? revenueData.map((item) => item.total) : [0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
        position: "top",
      },
      title: {
        display: true,
        text: "Doanh thu theo từng tháng",
        font: {
          size: 18,
        },
      },
    },
  };

  // Biểu đồ sách bán chạy nhất
  const topBooksChartData = {
    labels: stats.topBook.slice(0, 5).map((book) => book.title), // Lấy 5 sách bán chạy nhất
    datasets: [
      {
        label: "Số lượng bán",
        data: stats.topBook.slice(0, 5).map((book) => book.totalSold),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const topBooksChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
        position: "top",
      },
      title: {
        display: true,
        text: "Top 5 sách bán chạy nhất",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false, // Tắt tính năng tự động bỏ qua tên sách
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-stats">
          <div className="dashboard-card">
            <PersonOutline className="dashboard-icon user-icon" />
            <Link to={"/admin/users"} className="no-underline">
              <h2>{stats.users}</h2>
              <p>Người dùng</p>
            </Link>
          </div>

          <div className="dashboard-card">
            <Category className="dashboard-icon genre-icon" />
            <Link to={"/admin/categories"} className="no-underline">
              <h2>{stats.genres}</h2>
              <p>Thể loại</p>
            </Link>
          </div>
          <div className="dashboard-card">
            <Book className="dashboard-icon book-icon" />
            <Link to={"/admin/books"} className="no-underline">
              <h2>{stats.books}</h2>
              <p>Sản phẩm</p>
            </Link>
          </div>
          <div className="dashboard-card">
            <ShoppingCart className="dashboard-icon order-icon" />
            <Link to={"/admin/order/all"} className="no-underline">
              <h2>{stats.orders}</h2>
              <p>Đơn hàng</p>
            </Link>
          </div>

          <div className="dashboard-card">
            <AttachMoney className="dashboard-icon order-icon" />
            <Link to={"/admin/dashboard"} className="no-underline">
              <h2>{stats.totalRevenue.toLocaleString()} VNĐ</h2>
              <p>Tổng doanh thu</p>
            </Link>
          </div>
        </div>

        {/* Biểu đồ doanh thu */}
        <div className="dashboard-chart">
          <Bar data={chartData} options={chartOptions} />
        </div>
        {/* Biểu đồ sách bán chạy nhất */}
        <div className="dashboard-card">
          <Bar data={topBooksChartData} options={topBooksChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
