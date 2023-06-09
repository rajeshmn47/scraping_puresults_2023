import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import styled from "@emotion/styled";
import Tablepu from "@/components/Tablepu";
import { ListItemAvatar } from "@mui/material";
import Loader from "@/components/loader";

const inter = Inter({ subsets: ["latin"] });

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 200px;
`;

const Input = styled.input`
  width: 200px;
  box-sizing: border-box;
  padding: 3px 0;
`;

const SubmitBtn = styled.button`
  background-color: blue;
  color: #ffffff;
  height: 30px;
  width: 200px;
  outline: none;
  border: none;
  padding: 5px 0;
  border-radius: 5px;
  margin-top: 15px;
`;
const Title = styled.h3`
  text-align: center;
  margin-top: 40px;
`;
const Results = styled.div`
  margin-top: 15px;
  padding: 0 5px;
`;

const Td = styled.td`
  font-size: 12px;
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
`;
const Result = styled.tr``;
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchvalue, setSearchValue] = useState();
  const [results, setResults] = useState([]);
  useEffect(() => {
    async function getresults() {
      console.log(searchvalue);
    }

    getresults();
  }, []);

  const handleSubmit = async () => {
    if (searchvalue.length > 3) {
      setLoading(true);
      const data = await axios.get(
        `https://backendforpuand-dream11.onrender.com/getallresults/${searchvalue.toLowerCase()}`
      );
      let unique = [];
      let akk = data.data.data;
      let s = akk.map((x) =>
        unique.filter((a) => a.regno == x.regno).length > 0
          ? null
          : unique.push(x)
      );
      console.log(s, "s");
      setLoading(false);
      setResults([...unique]);
    }
  };

  const table = () => {
    return (
      <Results>
        <Table>
          <thead>
            <tr>
              <th>name</th>
              <th>regno</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0
              ? results.map((r) => (
                  <Result>
                    <Td>{r.name}</Td>
                    <Td>{r.regno}</Td>
                    <Td>{r.total}</Td>
                  </Result>
                ))
              : null}
          </tbody>
        </Table>
      </Results>
    );
  };
  return (
    <>
      <Head>
        <title>2023 karntaka pu board results namewise</title>
        <meta
          name="description"
          content="2023 karntaka pu board results namewise"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>2023 karntaka pu board results namewise</Title>
      <Container>
        <Input
          value={searchvalue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SubmitBtn onClick={() => handleSubmit()}>submit</SubmitBtn>
      </Container>
      {loading ? <Loader /> : <Tablepu rows={results} />}
    </>
  );
}
