import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import GraphicInfo from "../sections/PostPregnancy/GraphicInfo/GraphicInfo";
import PostPregnancyTabContainer from "../sections/PostPregnancy/PostPregnancyTabContainer";
import PostPregnancyHeader from "../sections/PostPregnancy/PregnancyHeader";
import { constants } from "../utils/constants";

class PostPregnancy extends Component {
  state = {
    postPregnancyData: null,
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Post Pregnancy",
        active: true,
        link: `/${this.props.global.activeLanguage}/post-pregnancy`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "ما بعد الحمل",
        active: true,
        link: `/${this.props.global.activeLanguage}/post-pregnancy`,
      },
    ],
  };

  componentDidMount() {
    API.get(`/pages`)
      .then((response) => {
        if (
          response.status === 200 ||
          response.status === 201
        ) {
          let currentPage = response.data.find(
            (x) => x.slug === "post-pregnancy"
          );
          this.setState({ currentPage });

          API.get(`/all_widgets/${currentPage._id}`)
            .then((res) => {
              let widget_content =
                res.data?.[res.data?.length - 1]
                  ?.widget_content;
              this.setState({
                postPregnancyData: widget_content,
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { global } = this.props;
    return (
      <div className="post-pregnancy-page">
        <Helmet>
          <title>
            {this.state.currentPage?.meta_details?.title ||
              constants.site_name}
          </title>
          <meta
            name="description"
            content={
              this.state.currentPage?.meta_details
                ?.description || constants.seo_description
            }
          />
           <link rel="canonical" href={window.location.href} />
        </Helmet>
        <BreadCrumbs
          breadCrumbItems={
            global?.activeLanguage === "en"
              ? this.state.breadCrumbItemsEnglish
              : this.state.breadCrumbItemsArabic
          }
          language = {global?.activeLanguage}
        />
        <PostPregnancyHeader
          data={
            global?.activeLanguage === "ar"
              ? this.state.postPregnancyData?.arabic
              : this.state.postPregnancyData
          }
          language={global?.activeLanguage}
        />
        {/* <PostPregnancyTabContainer /> */}
        <GraphicInfo
          data={
            global?.activeLanguage === "ar"
              ? this.state.postPregnancyData?.arabic
                  ?.pregnancy
              : this.state.postPregnancyData?.pregnancy
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(PostPregnancy);
