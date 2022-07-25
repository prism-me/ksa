import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import AdvisorCategoryGrid from "../sections/BreastFeedingAdvisor/AdvisorCategoryGrid/AdvisorCategoryGrid";
import AdvisorHeader from "../sections/BreastFeedingAdvisor/AdvisorHeader";
import { constants } from "../utils/constants";
import QuestionsAndAnswers from "../sections/MotherBabyWorld/QuestionsAndAnswers";

// const breadCrumbItems = [
//   {
//     text: "Home",
//     active: false,
//     link: "/",
//   },
//   {
//     text: "Breastfeeding Advisor",
//     active: true,
//     link: "/breastfeeding-advisor",
//   },
// ];

class BreastFeedingAdvisor extends Component {
  state = {
    currentPage: null,
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Breastfeeding Advisor",
        active: true,
        link: `/${this.props.global?.activeLanguage}/breastfeeding-advisor`,
      },
    ],
    breadCrumbItemsArabic :[
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "مستشار الرضاعة الطبيعية",
        active: true,
        link: `/${this.props.global.activeLanguage}/breastfeeding-advisor`,
      },

    ]
  };
  componentDidMount() {
    API.get(`/pages`)
      .then((response) => {
        if (
          response.status === 200 ||
          response.status === 201
        ) {
          let currentPage = response.data.find(
            (x) => x.slug === "breastfeeding-advisor"
          );
          this.setState({ currentPage });
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { global } = this.props;
    return (
      <div className="breast-feeding-advisor-page">
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
        <AdvisorHeader language={global?.activeLanguage} />
        <BreadCrumbs
          breadCrumbItems={
            global?.activeLanguage === "en"
            ? this.state.breadCrumbItemsEnglish
            : this.state.breadCrumbItemsArabic
            }
          language={global?.activeLanguage}
        />
        <AdvisorCategoryGrid
            language={global?.activeLanguage}
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

export default connect(mapStateToProps)(
  BreastFeedingAdvisor
);
