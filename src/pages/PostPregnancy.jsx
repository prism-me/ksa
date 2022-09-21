import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import GraphicInfo from "../sections/PostPregnancy/GraphicInfo/GraphicInfo";
import PostPregnancyHeader from "../sections/PostPregnancy/PregnancyHeader";
import { constants } from "../utils/constants";
import { useSelector } from "react-redux";

const PostPregnancy = () => {
  const pages = useSelector((state) => state.allPages.pages);
  const global = useSelector((state) => state.globalReducer);
  const [currentPage, setCurrentPage] = useState(null);
  const [postPregnancyData, setPostPregnancyData] = useState(null);

  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.find((x) => x.slug === "post-pregnancy");
      setCurrentPage(pageData);

      API.get(`/all_widgets/${pageData._id}`)
        .then((res) => {
          let widget_content = res.data?.[res.data?.length - 1]?.widget_content;
          // debugger;
          setPostPregnancyData(widget_content);
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
      text: "Post Pregnancy",
      active: true,
      link: `/${global.activeLanguage}/post-pregnancy`,
    },
  ];
  const breadCrumbItemsArabic = [
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "ما بعد الحمل",
      active: true,
      link: `/${global.activeLanguage}/post-pregnancy`,
    },
  ];
  return (
    <div className="post-pregnancy-page">
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
      <PostPregnancyHeader
        data={
          global?.activeLanguage === "ar"
            ? postPregnancyData?.arabic
            : postPregnancyData
        }
        language={global?.activeLanguage}
      />
      <GraphicInfo
        data={
          global?.activeLanguage === "ar"
            ? postPregnancyData?.arabic?.pregnancy
            : postPregnancyData?.pregnancy
        }
      />
    </div>
  );
};

export default PostPregnancy;
