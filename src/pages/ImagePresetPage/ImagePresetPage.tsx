import { FC } from "react";
import { ImagePresetApp } from "../../components/ImagePreset/ImagePresetApp";
import { Layout } from "../Layout/Layout";

const ImagePresetPage: FC = () => {
  return (
    <Layout>
      <ImagePresetApp />
    </Layout>
  );
};

export { ImagePresetPage };
