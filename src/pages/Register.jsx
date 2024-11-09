import styled from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect, useRef, useState } from "react";
import { mobile } from "../responsive";
import dogBackground from "../assets/dog_background.jpg";
import { endpoint } from "../data";
import CustomNavLink from "../components/CustomNavLink";
import Logo from "../components/Logo";

const Container = styled.div`
  width: 100vw;
  background: url(${dogBackground});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0px;
`;

const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  margin: 20px 10px 0px 0px;
  padding: 7px;
  font-size: 12pt;
  border-radius: 10px;
`;

const Agreement = styled.span`
  font-size: 11pt;
  margin: 20px 0px;
`;

const Button = styled.div`
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background: teal;
  background: -webkit-linear-gradient(to left, #ffc3a1, #ff6e31);
  background: -o-linear-gradient(to left, #ffc3a1, #ff6e31);
  background: -moz-linear-gradient(to left, #ffc3a1, #ff6e31);
  background: linear-gradient(to left, #ffc3a1, #ff6e31);
  cursor: pointer;
`;

const AlreadyAccount = styled.div`
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-size: 12pt;
`;

const Message = styled.div`
  padding: 5px 0px 0px 0px;
  width: 100%;
  color: #d06262;
  display: flex;
  align-items: center;
  display: none;
`;

const Register = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const errorMessageRef = useRef();

  const handleCreateAccount = () => {
    if (userName.trim() === "") setErrorMessage("Vui lòng nhập username");
    else if (fullName.trim() === "") setErrorMessage("Vui lòng nhập họ tên");
    else if (email.trim() === "") setErrorMessage("Vui lòng nhập email");
    else if (address.trim() === "") setErrorMessage("Vui lòng nhập địa chỉ");
    else if (password.trim() === "") setErrorMessage("Vui lòng nhập mật khẩu");
    else if (confirmPassword.trim() === "")
      setErrorMessage("Vui lòng xác nhận mật khẩu");
    else if (confirmPassword.trim() !== password.trim())
      setErrorMessage("Mật khẩu không khớp");
    else {
      setErrorMessage("");
      const data = {
        username: userName,
        email: email,
        password: password,
        full_name: fullName,
        address: address,
      };

      fetch(`${endpoint}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 200) {
            setErrorMessage("Đăng ký thành công");
            return response.json();
          } else if (response.status === 400) {
            response.json().then((error) => {
              const message = error.message;

              if (message.indexOf("Email") !== -1)
                setErrorMessage("Email đã tồn tại");
              else if (message.indexOf("Username") !== -1)
                setErrorMessage("Username đã tồn tại");
            });
          }
        })
        .catch((error) => {
          setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
        });
    }
  };

  useEffect(() => {
    if (errorMessage !== "") {
      errorMessageRef.current.style.display = "flex";

      if (errorMessage.indexOf("thành công") !== -1)
        errorMessageRef.current.style.color = "#37cf60";
      else errorMessageRef.current.style.color = "#d06262";
    } else errorMessageRef.current.style.display = "none";
  }, [errorMessage]);

  return (
    <Container>
      <Wrapper>
        <Logo />
        <Title>Tạo tài khoản mới</Title>
        <Message ref={errorMessageRef}>
          {errorMessage.indexOf("") === -1 ? (
            <ErrorOutlineIcon />
          ) : (
            <CheckCircleOutlineIcon />
          )}
          {` ${errorMessage}`}
        </Message>
        <Form>
          <Input
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="Họ tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Xác nhận lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Agreement>
            Bằng cách tạo tài khoản, bạn đã đồng ý với{" "}
            <b>Chính sách quyền riêng tư</b> của chúng tôi
          </Agreement>
          <Button onClick={handleCreateAccount}>Tạo tài khoản</Button>
          <AlreadyAccount>
            Bạn đã có tài khoản?{" "}
            <CustomNavLink to={"/login"}>
              <b>Đăng nhập</b>
            </CustomNavLink>
          </AlreadyAccount>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
