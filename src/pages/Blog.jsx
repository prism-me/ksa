import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs";
import BlogHeader from "../sections/Blog/BlogHeader/BlogHeader";
import { constants } from "../utils/constants";
import BlogCategoryGrid from "../sections/Blog/BlogCategoryGrid/BlogCategoryGrid";
import { useSelector } from "react-redux";

const BreastFeedingAdvisor = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const pages = useSelector((state) => state.allPages.pages);
  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find((x) => x.slug === "blog");
      setCurrentPage(pageData);
    }
  }, [pages]);

  const global = useSelector((state) => state.globalReducer);

  const breadCrumbItemsEnglish = [
    {
      text: "Home",
      active: false,
      link: "/",
    },
    {
      text: "Blog",
      active: true,
      link: `/${global?.activeLanguage}/blog`,
    },
  ];
  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "المدونة",
      active: true,
      link: `/${global.activeLanguage}/blog`,
    },
  ];
  return (
    <div className="breast-feeding-advisor-page">
      <Helmet>
        <title>{currentPage?.meta_details?.title || constants.site_name}</title>
        <meta
          name="description"
          content={
            currentPage?.meta_details?.description || constants.seo_description
          }
        />

        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <BlogHeader language={global?.activeLanguage} />
      <BreadCrumbs
        breadCrumbItems={
          global?.activeLanguage === "en"
            ? breadCrumbItemsEnglish
            : breadCrumbItemsArabic
        }
        language={global?.activeLanguage}
      />

      <BlogCategoryGrid
        isArabic={global?.activeLanguage === "ar"}
        language={global?.activeLanguage}
      />
    </div>
  );
};

export default BreastFeedingAdvisor;
