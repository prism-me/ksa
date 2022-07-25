import React, { Component } from "react";
import AboutTabsContainer from "../sections/About/AboutTabsContainer/AboutTabsContainer";
import BreadCrumbs from "../components/BreadCrumbs";
import ImageMenu from "../sections/Home/ImageMenu/ImageMenu";
import {
  getCategories,
  getCategoryProducts,
  getProducts,
} from "../redux/products";
import { connect } from "react-redux";
import { API } from "../http/API";

class About extends Component {
  state = {
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "من نحن",
        active: false,
        link: `/${this.props.global?.activeLanguage}/about`,
      },
      {
        text: "بيجون",
        active: true,
        link: `/${this.props.global?.activeLanguage}/about`,
      },
    ],

    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "About",
        active: false,
        link: `/${this.props.global?.activeLanguage}/about`,
      },
      {
        text: "Pigeon",
        active: true,
        link: `/${this.props.global?.activeLanguage}/about`,
      },
    ],

    activeTab: null,
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    // alert(query.get("active"));
    this.setState({ activeTab: query.get("active") });
  }

  setBreadCrumbs = (text, link) => {
    let breadCrumbItemsEnglish = [...this.state.breadCrumbItemsEnglish];
    breadCrumbItemsEnglish[breadCrumbItemsEnglish.length - 1].text = text;
    breadCrumbItemsEnglish[
      breadCrumbItemsEnglish.length - 1
    ].link = `/${this.props.global?.activeLanguage}${link}`;
    // let filteredbreadCrumbItemsEnglish = breadCrumbItems.filter(
    //   (x) => x.text != null
    // );
    // filteredBreadCrumbItems[filteredBreadCrumbItems.length - 1].active = true;
    this.setState({ breadCrumbItemsEnglish });


    let breadCrumbItemsArabic = [...this.state.breadCrumbItemsArabic];
    breadCrumbItemsArabic[breadCrumbItemsArabic.length - 1].text = text;
    breadCrumbItemsArabic[
      breadCrumbItemsArabic.length - 1
    ].link = `/${this.props.global?.activeLanguage}${link}`;

    this.setState({ breadCrumbItemsArabic });

  };

  render() {
    const { global } = this.props;
    return (
      <div className="about-page">

        <BreadCrumbs breadCrumbItems={
          global?.activeLanguage === "en"
            ? this.state.breadCrumbItemsEnglish
            : this.state.breadCrumbItemsArabic
        }
          language={global?.activeLanguage}
        />
        <AboutTabsContainer
          activeTab={this.state.activeTab}
          setBreadCrumbs={this.setBreadCrumbs}
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

export default connect(mapStateToProps)(About);
