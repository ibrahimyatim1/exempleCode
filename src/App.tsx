import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./components/Table";
import Weather from "./components/Weather";
import styled, { createGlobalStyle } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { DataItem } from "./types";
const api_url = import.meta.env.VITE_API_URL;

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
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api_url}/entry-test/2`);
        const updatedData = response.data.data.map((item: DataItem) => ({
          ...item,
          id: item.id || uuidv4(),
        }));
        setData(updatedData);
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
        <Table dataProp={data} onUpdate={setData} />
      </InnerContainer>
    </>
  );
};

export default App;
