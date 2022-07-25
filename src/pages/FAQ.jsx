import React, { Component } from "react";
import FAQList from "../sections/FAQList";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "./../http/API";
import { Helmet } from "react-helmet";
import { constants } from "../utils/constants";
import { connect } from "react-redux";

// const breadCrumbItems = [
//   {
//     text: "Home",
//     active: false,
//     link: "/",
//   },
//   {
//     text: "Questions And Answers",
//     active: true,
//     link: "/contact",
//   },
// ];

class FAQ extends Component {
  state = {
    currentPage: null,
    faqData: [],
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Questions And Answers",
        active: true,
        link: `/${this.props.global.activeLanguage}/faq`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "أسئلة وأجوبة",
        active: true,
        link: `/${this.props.global.activeLanguage}/faq`,
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
            (x) => x.slug === "faq"
          );
          this.setState({ currentPage });
          API.get(`/all_widgets/${currentPage._id}`)
            .then((res) => {
              let widget_content =
                res.data?.[res.data.length - 1]
                  ?.widget_content;
              this.setState({ faqData: widget_content });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="faq-page">
        <Helmet>
          <title>
            {this.state.faqData?.meta_details?.title ||
              constants.site_name}
          </title>
          <meta
            name="description"
            content={
              this.state.faqData?.meta_details
                ?.description || constants.seo_description
            }
          />
           <link rel="canonical" href={window.location.href} />
        </Helmet>
        <BreadCrumbs
          breadCrumbItems={
            this.props.global.activeLanguage === "en"
            ? this.state.breadCrumbItemsEnglish
            : this.state.breadCrumbItemsArabic
            }
            language = {this.props.global?.activeLanguage}
        />
        <FAQList
          faqData={
            this.props.global?.activeLanguage === "ar"
              ? this.state.faqData?.arabic?.faq
              : this.state.faqData?.faq
          }
          language={this.props.global?.activeLanguage}
          isArabic={
            this.props.global?.activeLanguage === "ar"
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

const mapDispatchToProps = (dispatch) => {
  return;
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FAQ);
