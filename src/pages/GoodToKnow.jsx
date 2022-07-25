import React, { Component } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import GoodToKnowCard from "../sections/GoodToKnow/GoodToKnowCard";
import { Container } from "react-bootstrap";
import { API } from "../http/API";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { constants } from "../utils/constants";

class GoodToKnow extends Component {
  state = {
    goodToKnowData: [],
    currentPage: null,
    breadCrumbItemsEnglish: [

      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text:"Good to Know" ,
        active: true,
        link: `/${this.props.global.activeLanguage}/good-to-know`,
      },
  ],
  breadCrumbItemsArabic :[
    {
      text: "الرئيسية",
      active: false,
      link: "/",
    },
    {
      text: "من الجيد معرفة",
      active: true,
      link: `/${this.props.global.activeLanguage}/good-to-know`,
    },

  ],
  };
  componentDidMount() {
    API.get("/good_to_know")
      .then((response) => {
        // debugger;
        this.setState({ goodToKnowData: response.data.sort((a,b) => a.currentIndex - b.currentIndex) });
      })
      .then(() => {
        API.get(`/pages`).then((response) => {
          if (
            response.status === 200 ||
            response.status === 201
          ) {
            let currentPage = response.data.find(
              (x) => x.slug === "good-to-know"
            );
            this.setState({ currentPage });
          }
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { global } = this.props;
    return (
      <div className="good-to-know-page">
        <Helmet>
          <title>
            {this.state.currentPage?.meta_details?.title ||
              constants.site_name}
          </title>
          <link rel="canonical" href={window.location.href} />
          <meta
            name="description"
            content={
              this.state.currentPage?.meta_details
                ?.description || constants.seo_description
            }
          />
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
          <h1>
            {
              constants.site_content.good_to_know[
                this.props.global?.activeLanguage
              ]
            }
          </h1>
        </Container>
        {this.state.goodToKnowData?.map((x, index) => (
          <GoodToKnowCard
            textOrder={index % 2}
            goodToKnowData={
              global?.activeLanguage === "ar"
                ? { ...x }.arabic
                : { ...x }
            }
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showSpinner: state?.globalReducer?.showSpinner,
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(GoodToKnow);
