import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import FirstTrimester from "../sections/FirstTimeFather/FirstTrimester";
import { constants } from "../utils/constants";
import { useSelector } from "react-redux";

const FirstTimeFather = () => {
  const pages = useSelector((state) => state.allPages.pages);
  const [currentPage, setCurrentPage] = useState(null);
  const [firstTimeFatherData, setFirstTimeFatherData] = useState([]);

  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find((x) => x.slug === "first-time-father");
      setCurrentPage(pageData);

      API.get(`/all_widgets/${pageData._id}`)
        .then((res) => {
          let widget_content = res.data?.[res.data?.length - 1]?.widget_content;
          setFirstTimeFatherData(widget_content);
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
      text: "First Time Father",
      active: true,
      link: `/${global.activeLanguage}/first-time-father`,
    },
  ];
  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "أب لأول مرة",
      active: true,
      link: `/${global.activeLanguage}/first-time-father`,
    },
  ];
  return (
    <div className="first-time-father-page">
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
      <Container>
        <h1 className="first-time-father-heading">
          {global?.activeLanguage === "en"
            ? "First Time Father"
            : "أب لأول مرة"}
        </h1>
      </Container>
      {global?.activeLanguage === "ar"
        ? firstTimeFatherData?.arabic?.father?.map((x, index) => (
            <FirstTrimester textOrder={index % 2} data={x} />
          ))
        : firstTimeFatherData?.father?.map((x, index) => (
            <FirstTrimester textOrder={index % 2} data={x} />
          ))}
    </div>
  );
};

export default FirstTimeFather;
