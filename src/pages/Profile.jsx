import React, { useEffect, useState } from "react";
import styled from "styled-components";
import avatarIcon from "../assets/avatar.jpg";
import ProfileLeft from "../components/ProfileLeft";
import { endpoint } from "../data";
import Cookies from "js-cookie";

export const Container = styled.div`
  width: 100%;
  padding: 50px;
  z-index: 1;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 80%;
  flex-direction: row;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;
export const Right = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  src: ${(props) => props.src};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InfoItem = styled.div`
  display: flex;
  width: 100%;
  margin: 10px;
`;
export const InfoItemLabel = styled.span`
  font-weight: bold;
  flex: 2;
`;
const InfoItemContent = styled.span`
  flex: 8;
`;

const Profile = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${endpoint}/user/profile`, {
      headers: {
        authorization: Cookies.get("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Container>
        <Wrapper>
          <ProfileLeft index={0} />
          <Right>
            <Avatar src={avatarIcon} />
            <Info>
              <InfoItem>
                <InfoItemLabel>Họ tên</InfoItemLabel>
                <InfoItemContent>
                  {data.full_name === "tên" ? "" : data.full_name}
                </InfoItemContent>
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Username</InfoItemLabel>
                <InfoItemContent>{data.username}</InfoItemContent>
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Email</InfoItemLabel>
                <InfoItemContent>{data.email}</InfoItemContent>
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Số điện thoại</InfoItemLabel>
                <InfoItemContent>
                  {data.phone_number === "0" ? "" : data.phone_number}
                </InfoItemContent>
              </InfoItem>
              <InfoItem>
                <InfoItemLabel>Địa chỉ</InfoItemLabel>
                <InfoItemContent>
                  {data.address === "địa chỉ"
                    ? "1 Võ Văn Ngân, Linh Chiểu, TP Thủ Đức, TP HCM"
                    : data.address}
                </InfoItemContent>
              </InfoItem>
            </Info>
          </Right>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Profile;
