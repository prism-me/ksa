import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs";
import AdvisorCategoryGrid from "../sections/BreastFeedingAdvisor/AdvisorCategoryGrid/AdvisorCategoryGrid";
import AdvisorHeader from "../sections/BreastFeedingAdvisor/AdvisorHeader";
import { constants } from "../utils/constants";
import { useSelector } from "react-redux";

const BreastFeedingAdvisor = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const pages = useSelector((state) => state.allPages.pages);
  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find((x) => x.slug === "breastfeeding-advisor");
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
      text: "Breastfeeding Advisor",
      active: true,
      link: `/${global?.activeLanguage}/breastfeeding-advisor`,
    },
  ];
  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "مستشار الرضاعة الطبيعية",
      active: true,
      link: `/${global.activeLanguage}/breastfeeding-advisor`,
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
      <AdvisorHeader language={global?.activeLanguage} />
      <BreadCrumbs
        breadCrumbItems={
          global?.activeLanguage === "en"
            ? breadCrumbItemsEnglish
            : breadCrumbItemsArabic
        }
        language={global?.activeLanguage}
      />
      <AdvisorCategoryGrid language={global?.activeLanguage} />
    </div>
  );
};

export default BreastFeedingAdvisor;
