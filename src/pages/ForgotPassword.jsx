import styled from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { mobile } from "../responsive";
import background from "../assets/bg-login.avif";
import CustomNavLink from "../components/CustomNavLink";
import Logo from "../components/Logo";
import { useEffect, useState, useRef } from "react";
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
  ${mobile({ width: "75%" })};
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

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ForgotButton = styled.div`
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
  const errorMessageRef = useRef();

  const handleForgotPassword = () => {
    if (email.trim() === "") {
      setErrorMessage("Vui lòng nhập email");
    } else {
      setErrorMessage("");
      setSuccessMessage("");
      setIsLoading(true);
      setIsRequestSent(false);

      const data = { email };

      fetch(`${endpoint}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          setIsLoading(false);
          if (response.status === 200) {
            setSuccessMessage(
              "Chúng tôi đã gửi mật khẩu mới đến email của bạn."
            );
            setIsRequestSent(true);
            setIsButtonDisabled(true); 
          } else {
            setErrorMessage("Đã xảy ra lỗi, vui lòng thử lại.");
          }
        })
        .catch(() => {
          setIsLoading(false);
          setErrorMessage("Đã xảy ra lỗi, vui lòng thử lại.");
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
        <Title>Quên mật khẩu</Title>
        <Message ref={errorMessageRef}>
          <ErrorOutlineIcon />
          {` ${errorMessage}`}
        </Message>
        {successMessage && (
          <Message style={{ color: "#4CAF50", display: "flex" }}>
            <ErrorOutlineIcon />
            {` ${successMessage}`}
          </Message>
        )}
        <Form>
          <Input
            placeholder="Email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <ForgotButton>
            <Button
              onClick={handleForgotPassword}
              disabled={isLoading || isButtonDisabled} 
            >
              {isLoading
                ? "Đang gửi yêu cầu..."
                : isRequestSent
                ? "Gửi lại yêu cầu"
                : "Gửi yêu cầu"}
            </Button>
          </ForgotButton>
          <TextDiv>
            <Text>Quay lại </Text>
            <CustomNavLink to={"/login"}>
              <Link>Đăng nhập</Link>
            </CustomNavLink>
          </TextDiv>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ForgotPassword;
