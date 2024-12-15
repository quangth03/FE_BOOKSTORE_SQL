import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import background from "../assets/background.jpg";
import Logo from "../components/Logo";
import { endpoint } from "../data";

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${background}) center;
  background-size: cover;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-family: Nunito, sans-serif;
  font-size: 30px;
  font-weight: 300;
  text-align: center;
`;

const Message = styled.p`
  font-size: 16px;
  color: ${(props) => (props.status === "error" ? "#d06262" : "green")};
  text-align: center;
`;

const MessageContainer = styled.div`
  padding: 5px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // Thay thế error và success bằng một state duy nhất
  const [status, setStatus] = useState(null); // `success` hoặc `error`
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setMessage("Token không hợp lệ.");
      setStatus("error");
      setLoading(false);
      return;
    }

    fetch(`${endpoint}/auth/verify-email?token=${token}`, {
      method: "GET",
    })
      .then((data) => {
        setMessage(data.message || "Email đã được xác thực thành công.");
        setStatus("success");
        setTimeout(() => navigate("/login"), 4000);
      })
      .catch((err) => {
        setMessage(err.message || "Đã có lỗi xảy ra trong quá trình xác thực.");
        setStatus("error");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  useEffect(() => {
    // Gọi toast theo trạng thái, đảm bảo không hiển thị cả 2 cùng lúc
    if (status === "success") {
      toast.success(message, { autoClose: 3000 });
    } else if (status === "error") {
      toast.error(message, { autoClose: 3000 });
    }
  }, [status, message]);

  return (
    <Container>
      <Wrapper>
        <Logo />
        <Title>Xác thực Email</Title>
        {loading ? (
          <Message>Đang xử lý xác thực email...</Message>
        ) : (
          <MessageContainer>
            {status === "error" && <ErrorOutlineIcon />}
            <Message status={status}>{message}</Message>
          </MessageContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export default VerifyEmail;
