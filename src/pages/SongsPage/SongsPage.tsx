import type { FC } from "react";
import { SongsApp } from "../../components/Songs/SongsApp";
import { Layout } from "../Layout/Layout";

const SongsPage: FC = () => {
  return (
    <Layout>
      <SongsApp />
    </Layout>
  );
};

export { SongsPage };
