import type { NextPage } from "next";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Layout } from "../components/layouts/Layout";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h1" color="primary">
        Hola
      </Typography>
    </Layout>
  );
};

export default HomePage;
