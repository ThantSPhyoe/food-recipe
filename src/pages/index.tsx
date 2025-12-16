import CategoriesSection from "@/components/home/categoriesSection";
import FeaturedRecipes from "@/components/home/featuredRecipes";
import HeroSection from "@/components/home/heroSection";
import NewsLetterSection from "@/components/home/newsLetterSection";
import Layout from "@/components/layout/layout";
import type { NextPageWithLayout } from "@/pages/_app";
import { PAGE_LIST } from "@/utils/constant/common";
import { useEffect, useState } from "react";
import { api } from "@/utils/providers/api/api";
import { API_URL } from "@/utils/providers/constants/api";
import { HomePageInfo } from "@/types/homePageInfo";

type Props = {
  error: string;
  csrfToken: string;
  token: string;
};

const TopPage: NextPageWithLayout<Props> = () => {

  const [homePageInfo, setHomePageInfo]  = useState<HomePageInfo | null>(null);
  const fetchData = async () => {
      try {
        const res = await api.getWithoutAuth({ endPoint: API_URL.HOME_PAGE});
        const json = await res.json();
        setHomePageInfo(json.data);
      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {

    fetchData();
  }, []);

  return <>
    <Layout>
      <HeroSection count={homePageInfo?.count} />
      <CategoriesSection categories={homePageInfo?.category}/>
      <FeaturedRecipes featuredRecipes={homePageInfo?.recipes}/>
      {/* <NewsLetterSection /> */}
    </Layout>
  </>;
};

TopPage.pageId = PAGE_LIST.USER.TOP.ID;
TopPage.auth = PAGE_LIST.USER.TOP.AUTH;

export default TopPage;
