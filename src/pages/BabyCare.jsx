import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import BabyCareTabContainer from "../sections/BabyCare/BabyCareTabContainer";
import { constants } from "../utils/constants";
import { useSelector } from "react-redux";

const BabyCare = () => {
  const pages = useSelector((state) => state.allPages.pages);
  const [currentPage, setCurrentPage] = useState(null);
  const [babyCareData, setBabyCareData] = useState(null);

  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find((x) => x.slug === "baby-care");
      setCurrentPage(pageData);

      API.get(`/all_widgets/${pageData._id}`)
        .then((res) => {
          let widget_content = res.data?.[res.data?.length - 1]?.widget_content;
          setBabyCareData(widget_content);
        })
        .catch((err) => console.log(err));
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
      text: "Mother & Baby World",
      active: true,
      link: `/${global?.activeLanguage}/baby-care`,
    },
  ];

  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "عالم الأم والطفل",
      active: true,
      link: `/${global?.activeLanguage}/baby-care`,
    },
  ];
  return (
    <div className="baby-care-page">
      <Helmet>
        <title>{currentPage?.meta_details?.title || constants.site_name}</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <BreadCrumbs
        breadCrumbItems={
          global?.activeLanguage === "en"
            ? breadCrumbItemsEnglish
            : breadCrumbItemsArabic
        }
        language={global?.activeLanguage}
      />
      <BabyCareTabContainer
        image={babyCareData?.featured_img}
        babyCareData={
          global?.activeLanguage === "ar" ? babyCareData?.arabic : babyCareData
        }
        language={global?.activeLanguage}
      />
    </div>
  );
};

export default BabyCare;
