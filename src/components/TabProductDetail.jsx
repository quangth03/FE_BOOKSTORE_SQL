import styled from "styled-components";
import { useState } from "react";
import { colors } from "../data";

const TabOption = styled.button`
  border: none;
  color: #888888;
  color: ${(props) => (props.disabled ? "white" : "whitegrey")};
  cursor: pointer;
  padding: 25px;
  width: 100%;
  background-color: ${(props) => (props.disabled ? colors.color1 : "white")};
  transition: all 0.5s ease;
  font-size: 20px;
  &:hover {
    color: white;
    background-color: ${colors.color2};
  }
`;

const DetailContainer = styled.ul`
  flex: 1;
`;

const DetailItem = styled.li``;

const TabContainer = styled.div``;

const ContentContainer = styled.div``;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  flex: 1;
`;

const TabProductDetail = ({ book }) => {
  const [currentTab, setCurrentTab] = useState("1");

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  const dateObj = new Date(book.publication_date);
  const publication_date = `
    ${String(dateObj.getDate()).padStart(2, "0")}/${String(
    dateObj.getMonth() + 1
  ).padStart(2, "0")}/${dateObj.getFullYear()}
  `;
  return (
    <div>
      <TabContainer>
        <Tabs>
          <TabOption
            id="1"
            disabled={currentTab === "1"}
            onClick={handleTabClick}
          >
            Mô tả
          </TabOption>
          <TabOption
            id="2"
            disabled={currentTab === "2"}
            onClick={handleTabClick}
          >
            Chi tiết sản phẩm
          </TabOption>
        </Tabs>
        <ContentContainer>
          <Desc key="1">
            {" "}
            {currentTab === "1" && (
              <span style={{ textAlign: "justify" }}>{book.description}</span>
            )}
          </Desc>

          <DetailContainer key="2">
            {currentTab === "2" && (
              <div>
                <DetailItem>Tác giả: {book.author}</DetailItem>
                <DetailItem>Thể loại: { book.categories && book.categories.length > 0 ? book.categories.map((item) => <p>- {item.name} </p>) : ""}</DetailItem>
                <DetailItem>Ngày xuất bản: {publication_date}</DetailItem>
              </div>
            )}
          </DetailContainer>
        </ContentContainer>
      </TabContainer>
    </div>
  );
};

export default TabProductDetail;
