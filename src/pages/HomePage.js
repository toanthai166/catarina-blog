import React, { Fragment } from "react";
import Layout from "../components/layout/Layout";
import LayoutPost from "../components/layout/LayoutPost";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";

const HomePage = () => {
  return (
    <Fragment>
      <Layout>
        <HomeBanner></HomeBanner>

        <LayoutPost>
          <HomeFeature></HomeFeature>
        </LayoutPost>
      </Layout>
    </Fragment>
  );
};

export default HomePage;
