import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import AdvisorHeader from "../sections/BreastFeedingAdvisor/AdvisorHeader";
import FeedbackForm from "../sections/BreastFeedingAdvisor/FeedbackForm";
import MilkDrinks from "../sections/BreastFeedingAdvisor/MilkDrinks";
import MoreDetails from "../sections/BreastFeedingAdvisor/MoreDetails";
import { constants } from "../utils/constants";
import {
  articleCategories,
  articleDetailsList,
} from "../utils/data";

class ArticleDetailPage extends Component {
  scrollPosRef = React.createRef();
  state = {
    articleDetailsList: articleDetailsList,
    articleCategories: articleCategories,
    selectedCategory: null,
    currentCategorySlug: null,
    currentArticleIndex: 0,
    articles: [],
    activeArticle: null,
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
      {
        text: "",
        active: true,
        link: "/a",
      },
    ],
    breadCrumbItemsArabic: [
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
      {
        text: "",
        active: true,
        link: "/a",
      },
    ]
  };

  async componentDidMount() {
    let categoryRoute = this.props.match.params?.category;
    let articleRoute = this.props.match.params?.article;
    // getting all the articles
    const response = await API.get(
      `/article_category/${categoryRoute}`
    );
    const articles = response.data.sort((a,b) => a.currentIndex - b.currentIndex);

    // selecting current article bsed on url parameter
    const activeArticle = articles?.find(
      (x) => x.route === articleRoute
    );
    // if url is corrupted, redirect to home
    if (!categoryRoute) {
      this.props.history.push("/");
    }

    // finding index position for current article, to be used for navigation
    let currentArticleIndex = articles.findIndex(
      (x) => x.route === articleRoute
    );

    //setting up breadcrumb items
    let breadCrumbItemsEnglish = [...this.state.breadCrumbItemsEnglish];
    let breadCrumbItemsArabic = [...this.state.breadCrumbItemsArabic];

    breadCrumbItemsEnglish[2].link = `/${this.props.global?.activeLanguage}/breastfeeding-advisor/` + categoryRoute + "/" + articleRoute;
    breadCrumbItemsArabic[2].link = `/${this.props.global?.activeLanguage}/breastfeeding-advisor/` + categoryRoute + "/" + articleRoute;
    breadCrumbItemsEnglish[2].text = activeArticle?.title;
    breadCrumbItemsArabic[2].text = activeArticle?.arabic.title;

    this.setState({
      selectedCategory: categoryRoute,
      articles,
      currentArticleIndex,
      currentCategorySlug: categoryRoute,
      breadCrumbItemsArabic,
      breadCrumbItemsEnglish,
      activeArticle,
    });
  }

  // will handle if article is changed (next,prev button), URL update handling
  async componentDidUpdate(prevProps) {
    if (
      this.props.match.params?.article !==
      prevProps.match.params?.article
    ) {
      let categoryRoute = this.props.match.params?.category;
      let articleRoute = this.props.match.params?.article;

      // getting all the articles of specific category
      const response = await API.get(
        `/article_category/${categoryRoute}`
      );

      const articles = response.data.sort((a,b) => a.currentIndex - b.currentIndex);

      // selecting current article bsed on url parameter
      const activeArticle = articles?.find(
        (x) => x.route === articleRoute
      );

      // if url is corrupted, redirect to home
      if (!categoryRoute) {
        this.props.history.push("/");
      }

      // finding index position for current article, to be used for navigation
      let currentArticleIndex = articles.findIndex(
        (x) => x.route === articleRoute
      );

      let breadCrumbItemsEnglish = [...this.state.breadCrumbItemsEnglish];
      let breadCrumbItemsArabic = [...this.state.breadCrumbItemsArabic];

      breadCrumbItemsEnglish[2].link = `/${this.props.global?.activeLanguage}/breastfeeding-advisor/` + categoryRoute + "/" + articleRoute;
      breadCrumbItemsArabic[2].link = `/${this.props.global?.activeLanguage}/breastfeeding-advisor/` + categoryRoute + "/" + articleRoute;

      breadCrumbItemsEnglish[2].text = activeArticle?.title;
      breadCrumbItemsArabic[2].text = activeArticle?.arabic.title;

      this.setState({
        selectedCategory: categoryRoute,
        articles,
        currentArticleIndex,
        currentCategorySlug: categoryRoute,
        breadCrumbItemsArabic,
        breadCrumbItemsEnglish,
        activeArticle,
      });
    }
  }

  render() {
    const {
      articles,
      currentArticleIndex,
      breadCrumbItems,
      activeArticle,
    } = this.state;
    const { global } = this.props;

    return (
      <div className="breast-feeding-advisor-page">
        <Helmet>
          <title>
            {this.state.activeArticle?.meta_details
              ?.title || constants.site_name}
          </title>
          <meta
            name="description"
            content={
              this.state.activeArticle?.meta_details
                ?.description || constants.seo_description
            }
          />
           <link rel="canonical" href={window.location.href} />
        </Helmet>
        <AdvisorHeader />
        <BreadCrumbs 
        breadCrumbItems={
          global?.activeLanguage === "en"
          ? this.state.breadCrumbItemsEnglish
          : this.state.breadCrumbItemsArabic
          }
          language = {global?.activeLanguage}
        />
        <div ref={this.scrollPosRef} />
        <MilkDrinks
          {...(global?.activeLanguage === "ar"
            ? { ...activeArticle }.arabic
            : { ...activeArticle })}
          language = {global?.activeLanguage}
          arabiCatename = {this.state.activeArticle }
          index={currentArticleIndex}
        // {...activeArticle}
        />
        <MoreDetails
          activeArticle={
            this.state.activeArticle
          }
          currentCategorySlug={
            this.state.currentCategorySlug
          }
          previousLink={
            currentArticleIndex - 1 >= 0
              ? articles[currentArticleIndex - 1]?.route
              : null
          }
          nextLink={
            currentArticleIndex + 1 < articles?.length
              ? articles[currentArticleIndex + 1]?.route
              : null
          }
          previousTitle={
            global?.activeLanguage === "ar"
              ? currentArticleIndex - 1 >= 0
                ? articles[currentArticleIndex - 1]?.arabic
                  ?.title
                : null
              : currentArticleIndex - 1 >= 0
                ? articles[currentArticleIndex - 1]?.title
                : null
          }
          nextTitle={
            global?.activeLanguage === "ar"
              ? currentArticleIndex + 1 < articles?.length
                ? articles[currentArticleIndex + 1]?.arabic
                  ?.title
                : null
              : currentArticleIndex + 1 < articles?.length
                ? articles[currentArticleIndex + 1]?.title
                : null
          }
          handlePreviousClick={(title) => {
            this.props.history.push(
              `/${global?.activeLanguage
              }/breastfeeding-advisor/${this.state.currentCategorySlug
              }/${title.replace(/\s+/g, "-")}`
            );
            this.scrollPosRef.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
          handleNextClick={(title) => {
            this.props.history.push(
              `/${global?.activeLanguage
              }/breastfeeding-advisor/${this.state.currentCategorySlug
              }/${title.replace(/\s+/g, "-")}`
            );
            this.scrollPosRef.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
        />
        {/* <FeedbackForm /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(ArticleDetailPage);
