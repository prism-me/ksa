import React, { useState, useEffect } from "react";
import FAQList from "../sections/FAQList";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "./../http/API";
import { Helmet } from "react-helmet";
import { constants } from "../utils/constants";
import { useSelector } from "react-redux";

const FAQ = () => {
  const pages = useSelector((state) => state.allPages.pages);
  const [currentPage, setCurrentPage] = useState(null);
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find((x) => x.slug === "faq");
      setCurrentPage(pageData);

      API.get(`/all_widgets/${pageData._id}`)
        .then((res) => {
          let widget_content = res.data?.[res.data?.length - 1]?.widget_content;
          setFaqData(widget_content);
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
      text: "Questions And Answers",
      active: true,
      link: `/${global.activeLanguage}/faq`,
    },
  ];
  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "أسئلة وأجوبة",
      active: true,
      link: `/${global.activeLanguage}/faq`,
    },
  ];
  return (
    <div className="faq-page">
      <Helmet>
        <title>{faqData?.meta_details?.title || constants.site_name}</title>
        <meta
          name="description"
          content={
            faqData?.meta_details?.description || constants.seo_description
          }
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <BreadCrumbs
        breadCrumbItems={
          global.activeLanguage === "en"
            ? breadCrumbItemsEnglish
            : breadCrumbItemsArabic
        }
        language={global?.activeLanguage}
      />
      <FAQList
        faqData={
          global?.activeLanguage === "ar" ? faqData?.arabic?.faq : faqData?.faq
        }
        language={global?.activeLanguage}
        isArabic={global?.activeLanguage === "ar"}
      />
    </div>
  );
};

export default FAQ;
