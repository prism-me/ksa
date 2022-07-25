import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import ProfileTabContainer from "../sections/UserProfile/ProfileTabContainer";
import { constants } from "../utils/constants";

class UserProfile extends Component {
  state = {
    activeTab: null,
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Profile",
        active: true,
        link: `/${this.props.global?.activeLanguage}/profile`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "ملف التعريف",
        active: true,
        link: `/${this.props.global?.activeLanguage}/profile`,
      },
    ],
  };
  componentDidMount() {
    const query = new URLSearchParams(
      this.props.location.search
    );
    this.setState({ activeTab: query.get("active") });
  }
  render() {
    return (
      <div className="user-profile-page">
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
            this.props.global?.activeLanguage === "en"
              ? this.state.breadCrumbItemsEnglish
              : this.state.breadCrumbItemsArabic
          }
          language = {this.props.global?.activeLanguage}
        />
        <ProfileTabContainer
          activeTab={this.state.activeTab}
          activeLanguage = {this.props.global?.activeLanguage}
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
export default connect(mapStateToProps)(UserProfile);
