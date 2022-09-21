import React, { useState, useEffect } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import GoodToKnowCard from "../sections/GoodToKnow/GoodToKnowCard";
import { Container } from "react-bootstrap";
import { API } from "../http/API";
import { Helmet } from "react-helmet";
import { constants } from "../utils/constants";
import ClipLoader from "react-spinners/BounceLoader";
import { useSelector } from "react-redux";

const GoodToKnow = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const pages = useSelector((state) => state.allPages.pages);

  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find((x) => x.slug === "good-to-know");
      setCurrentPage(pageData);
    }
  }, [pages]);

  const [goodToKnowData, setGoodToKnowData] = useState([]);

  const getGoodtoKnowsData = () => {
    API.get(`/good_to_know`)
      .then((response) => {
        const allData = response.data.sort(
          (a, b) => a.currentIndex - b.currentIndex
        );
        setGoodToKnowData(allData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGoodtoKnowsData();
  }, []);

  const global = useSelector((state) => state.globalReducer);

  const breadCrumbItemsEnglish = [
    {
      text: "Home",
      active: false,
      link: "/",
    },
    {
      text: "Good to Know",
      active: true,
      link: `/${global.activeLanguage}/good-to-know`,
    },
  ];
  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "من الجيد معرفة",
      active: true,
      link: `/${global.activeLanguage}/good-to-know`,
    },
  ];
  return (
    <div className="good-to-know-page">
      <Helmet>
        <title>{currentPage?.meta_details?.title || constants.site_name}</title>
        <link rel="canonical" href={window.location.href} />
        <meta
          name="description"
          content={
            currentPage?.meta_details?.description || constants.seo_description
          }
        />
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
        <h1>{constants.site_content.good_to_know[global?.activeLanguage]}</h1>
      </Container>
      {goodToKnowData.length > 0 ? (
        goodToKnowData?.map((x, index) => (
          <GoodToKnowCard
            textOrder={index % 2}
            goodToKnowData={
              global?.activeLanguage === "ar" ? { ...x }.arabic : { ...x }
            }
          />
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "300px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <ClipLoader color={"#e65550"} loading={true} size={80} />
        </div>
      )}
    </div>
  );
};

export default GoodToKnow;
