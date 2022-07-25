import React, { Component } from "react";
import VideoGrid from "../sections/VideoGrid";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
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
//     text: "Video",
//     active: true,
//     link: "/video",
//   },
// ];

class Video extends Component {
  state = {
    videos: [],
    currentPage: null,
    breadCrumbItemsEnglish: [
      {
        text: "Home" ,
        active: false,
        link: "/",
      },
      {
        text: "Video",
        active: true,
        link: `/${this.props.global?.activeLanguage}/video`,
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text:"فيديوهات",
        active: true,
        link: `/${this.props.global?.activeLanguage}/video`,
      },
    ],
  };
  componentDidMount() {
    API.get("/video")
      .then((response) => {
        this.setState({ videos: response.data });
      })
      .then(() => {
        API.get(`/pages`).then((response) => {
          if (
            response.status === 200 ||
            response.status === 201
          ) {
            let currentPage = response.data.find(
              (x) => x.slug === "video"
            );
            this.setState({ currentPage });
          }
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="video-page">
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
        <VideoGrid
          videos={this.state.videos}
          isArabic={
            this.props.global?.activeLanguage === "ar"
          }
          language={this.props.global?.activeLanguage}
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

export default connect(mapStateToProps)(Video);
