import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import ContactForm from "../sections/Contact/ContactForm";
import OfficeInfo from "../sections/Contact/OfficeInfo";
import { constants } from "../utils/constants";

class Contact extends Component {
  state = {
    officeInfo: [],
    currentPage: null,
    breadCrumbItemsEnglish: [

        {
          text: "Home",
          active: false,
          link: "/",
        },
        {
          text:"Contact Us" ,
          active: true,
          link: `/${this.props.global.activeLanguage}/contact`,
        },
    ],
    breadCrumbItemsArabic :[
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "اتصل بنا",
        active: true,
        link: `/${this.props.global.activeLanguage}/contact`,
      },

    ]
  };
  componentDidMount() {
    API.get(`/pages`)
      .then((response) => {
        // debugger;
        if (
          response.status === 200 ||
          response.status === 201
        ) {
          let currentPage = response.data.find(
            (x) => x.slug === "office-info"
          );
          this.setState({ currentPage });

          API.get(`/all_widgets/${currentPage._id}`)
            .then((res) => {
              // debugger;
              let widget_content =
                res.data[res.data.length - 1]
                  .widget_content;
              this.setState({ officeInfo: widget_content });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { global } = this.props;
    return (
      <div className="contact-page">
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
        <ContactForm language={global.activeLanguage} />
        <OfficeInfo
          data={
            global?.activeLanguage === "ar"
              ? this.state.officeInfo?.arabic
              : this.state.officeInfo
          }
          language ={global?.activeLanguage}
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
export default connect(mapStateToProps)(Contact);
