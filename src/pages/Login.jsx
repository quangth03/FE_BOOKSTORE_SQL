import styled from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { mobile } from "../responsive";
import background from "../assets/dog_background.jpg";
import CustomNavLink from "../components/CustomNavLink";
import Logo from "../components/Logo";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../data";

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

  @import url("https://fonts.googleapis.com/css2?family=Knewave&family=Nunito:wght@400;600;700&display=swap");
  font-family: "Nunito", sans-serif;
  font-family: "Knewave", cursive;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
  ${mobile({ width: "75%" })}
  position: relative;
`;

const Title = styled.h1`
  font-family: Nunito, sans-serif;
  display: block;
  font-size: 30px;
  font-weight: 300;
  line-height: 1.2;
  text-align: center;
`;

const Form = styled.form`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 15px;
  color: black;
  line-height: 1.5;
  border: none;
  display: block;
  border-bottom: 2px solid #adadad;
  margin-bottom: 20px;

  &:focus {
    outline: none;
  }
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

const LoginButon = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 13px;
`;

const TextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Text = styled.span`
  font-size: 14px;
  color: #7a7676;
  line-height: 1.5;
  padding-right: 5px;
`;
const Link = styled.span`
  font-size: 14px;
  color: #ef5f45;
  line-height: 1.5;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
`;

const LogoWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Message = styled.div`
  padding: 5px 0px 0px 0px;
  width: 100%;
  color: #d06262;
  display: flex;
  align-items: center;
  display: none;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const errorMessageRef = useRef();

  const handleLogin = () => {
    if (username.trim() === "") setErrorMessage("Vui lòng nhập Username");
    else if (password.trim() === "") setErrorMessage("Vui lòng nhập mật khẩu");
    else {
      setErrorMessage("");

      const data = {
        username: username,
        password: password,
      };

      fetch(`${endpoint}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            setErrorMessage("Username hoặc mật khẩu không chính xác");
            return;
          }
        })
        .then((data) => {
          Cookies.set("authToken", data.authToken);

          fetch(`${endpoint}/user/profile`, {
            headers: { authorization: Cookies.get("authToken") },
          })
            .then((response) => {
              if (response.status === 200) {
                return response.json();
              }
            })
            .then((data) => {
              const isAdmin = data["isAdmin"];
              if (isAdmin) {
                Cookies.set("isAdmin", true);
                window.location = "http://localhost:3000/admin/users";
              } else window.location = "http://localhost:3000";
            });
        })
        .catch((error) => {
          setErrorMessage("Username hoặc mật khẩu không chính xác");
        });
    }
  };

  useEffect(() => {
    if (errorMessage !== "") {
      errorMessageRef.current.style.display = "flex";
    } else errorMessageRef.current.style.display = "none";
  }, [errorMessage]);

  return (
    <Container>
      <Wrapper>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Title>Đăng nhập</Title>
        <Message ref={errorMessageRef}>
          <ErrorOutlineIcon />
          {` ${errorMessage}`}
        </Message>
        <Form>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButon>
            <Button onClick={handleLogin}>Đăng nhập</Button>
          </LoginButon>
          <Link>Quên mật khẩu?</Link>
          <TextDiv>
            <Text>Bạn chưa có tài khoản?</Text>
            <CustomNavLink to={"/register"}>
              <Link>Tạo tài khoản</Link>
            </CustomNavLink>
          </TextDiv>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
