import type { NextPage } from "next";

import { Card, CardContent, CardHeader, Grid } from "@mui/material";

import { Layout } from "../components/layouts/Layout";

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: "calc(100vh - 100px)",
            }}
          >
            <CardHeader title="Pendientes" />
            <CardContent>
              {/* agregar entrada */}
              {/* listado de entradas */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: "calc(100vh - 100px)",
            }}
          >
            <CardHeader title="En Progreso" />
            <CardContent></CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: "calc(100vh - 100px)",
            }}
          >
            <CardHeader title="Completadas" />
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
