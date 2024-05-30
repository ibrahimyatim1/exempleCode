import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./components/Table";
import Weather from "./components/Weather";
import styled, { createGlobalStyle } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { DataItem } from "./types";

const Container = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const InnerContainer = styled.div`
  padding: 20px;
`;

const App: React.FC = () => {
  const [data, setData] = useState<DataItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://apitest.likewatt-infra.com/entry-test/2"
        );
        response.data.data.forEach((item: DataItem) => {
          !item.id ? (item.id = uuidv4()) : item.id;
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container />
      <InnerContainer>
        <Weather />
        <Table dataProp={data} />
      </InnerContainer>
    </>
  );
};

export default App;
