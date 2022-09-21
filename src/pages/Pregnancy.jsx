import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import PregnancyTabContainer from "../sections/Pregnancy/PregnancyTabContainer";
import FirstTrimester from "../sections/Pregnancy/Trimester/FirstTrimester";
import SecondTrimester from "../sections/Pregnancy/Trimester/SecondTrimester";
import ThirdTrimester from "../sections/Pregnancy/Trimester/ThirdTrimester";
import { constants } from "../utils/constants";
import { useSelector } from "react-redux";

const Pregnancy = () => {
  const pages = useSelector((state) => state.allPages.pages);
  const global = useSelector((state) => state.globalReducer);
  const [currentPage, setCurrentPage] = useState(null);
  const [pregnancyData, setPregnancyData] = useState(null);

  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find((x) => x.slug === "pregnancy");
      setCurrentPage(pageData);

      API.get(`/all_widgets/${pageData._id}`)
        .then((res) => {
          let widget_content = res.data?.[res.data?.length - 1]?.widget_content;
          setPregnancyData(widget_content);
        })
        .catch((err) => console.log(err));
    }
  }, [pages]);

  const breadCrumbItemsEnglish = [
    {
      text: "Home",
      active: false,
      link: "/",
    },
    {
      text: "Pregnancy",
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
      text: "الحمل",
      active: true,
      link: `/${global?.activeLanguage}/blog`,
    },
  ];
  return (
    <div className="pregnancy-page">
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
      <BreadCrumbs
        breadCrumbItems={
          global?.activeLanguage === "en"
            ? breadCrumbItemsEnglish
            : breadCrumbItemsArabic
        }
        language={global?.activeLanguage}
      />
      <PregnancyTabContainer
        data={
          global?.activeLanguage === "ar"
            ? pregnancyData?.arabic?.pregnancy
            : pregnancyData?.pregnancy
        }
        language={global?.activeLanguage}
      />
      <FirstTrimester
        image={pregnancyData?.firstTrimester?.image}
        trimesterData={
          global?.activeLanguage === "ar"
            ? pregnancyData?.arabic?.firstTrimester
            : pregnancyData?.firstTrimester
        }
        language={global?.activeLanguage}
      />
      <SecondTrimester
        trimesterData={
          global?.activeLanguage === "ar"
            ? pregnancyData?.arabic?.secondTrimester
            : pregnancyData?.secondTrimester
        }
        language={global?.activeLanguage}
      />
      <ThirdTrimester
        trimesterData={
          global?.activeLanguage === "ar"
            ? pregnancyData?.arabic?.thirdTrimester
            : pregnancyData?.thirdTrimester
        }
        language={global?.activeLanguage}
      />
    </div>
  );
};

export default Pregnancy;
