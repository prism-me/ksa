import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import FatherCommunicate from "../sections/FirstTimeFather/FatherCommunicate/FatherCommunicate";
import FirstTrimester from "../sections/FirstTimeFather/FirstTrimester";
import SecondTrimester from "../sections/FirstTimeFather/SecondTrimester";
import ThirdTrimester from "../sections/FirstTimeFather/ThirdTrimester";
import { constants } from "../utils/constants";

class FirstTimeFather extends Component {
  state = {
    firstTimeFatherData: [],
    currentPage: null,
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "First Time Father",
        active: true,
        link: `/${this.props.global.activeLanguage}/first-time-father`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "أب لأول مرة",
        active: true,
        link: `/${this.props.global.activeLanguage}/first-time-father`,
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
            (x) => x.slug === "first-time-father"
          );
          this.setState({ currentPage });

          API.get(`/all_widgets/${currentPage._id}`)
            .then((res) => {
              let widget_content =
                res.data?.[res.data.length - 1]
                  ?.widget_content;
              // debugger;
              this.setState({
                firstTimeFatherData: widget_content,
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
      <div className="first-time-father-page">
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
        <Container>
          <h1 className="first-time-father-heading">
          {global?.activeLanguage === "en" ? "First Time Father" : "أب لأول مرة" }
          </h1>
        </Container>
        {global?.activeLanguage === "ar"
          ? this.state.firstTimeFatherData?.arabic?.father?.map(
              (x, index) => (
                <FirstTrimester
                  textOrder={index % 2}
                  data={x}
                />
              )
            )
          : this.state.firstTimeFatherData?.father?.map(
              (x, index) => (
                <FirstTrimester
                  textOrder={index % 2}
                  data={x}
                />
              )
            )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(FirstTimeFather);
