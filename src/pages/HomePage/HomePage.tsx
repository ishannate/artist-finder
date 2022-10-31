import type { FC } from "react";
import { HomeApp } from "../../components/Home/HomeApp";
import { Layout } from "../Layout/Layout";

const HomePage: FC = () => {
  return (
    <Layout>
      <HomeApp />
    </Layout>
  );
};

export { HomePage };
