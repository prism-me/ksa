import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import BabyCareTabContainer from "../sections/BabyCare/BabyCareTabContainer";
import { constants } from "../utils/constants";

class BabyCare extends Component {
  state = {
    currentPage: null,
    babyCareData: null,
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Mother & Baby World",
        active: true,
        link: `/${this.props.global?.activeLanguage}/baby-care`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "عالم الأم والطفل",
        active: true,
        link: `/${this.props.global?.activeLanguage}/baby-care`,
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
            (x) => x.slug === "baby-care"
          );
          this.setState({ currentPage });

          API.get(`/all_widgets/${currentPage._id}`)
            .then((res) => {
              let widget_content =
                res.data?.[res.data?.length - 1]
                  ?.widget_content;
              // debugger;
              this.setState({
                babyCareData: widget_content,
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
      <div className="baby-care-page">
        <Helmet>
          <title>
            {this.state.currentPage?.meta_details?.title ||
              constants.site_name}
          </title>
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
        <BabyCareTabContainer
          image={this.state.babyCareData?.featured_img}
          babyCareData={
            global?.activeLanguage === "ar"
              ? this.state.babyCareData?.arabic
              : this.state.babyCareData
          }
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

export default connect(mapStateToProps)(BabyCare);
