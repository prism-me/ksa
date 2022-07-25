import React, { Component } from "react";
import ImageMenu from "../sections/Home/ImageMenu/ImageMenu";
import ProductsGrid from "../sections/Home/ProductsGrid/ProductsGrid";
// import ProductSlider from "../sections/Home/ProductSlider/ProductSlider";
import PromoBanner from "../sections/Home/PromoBanner";
import Slider from "../sections/Home/Slider";
import RelatedArticle from "../sections/Products/RelatedArticle";
// import Collection from '../sections/Home/Slider/Slider'
import Welcome from "../sections/Home/Welcome/Welcome";
import { connect } from "react-redux";
import {
  getCategories,
  getCategoryProducts,
  getProducts,
} from "../redux/products";
import { API } from "../http/API";

// import { articleCategories, articleDetailsList } from "../utils/data";
import Help from "../sections/Products/Help/Help";
import { Helmet } from "react-helmet";
import { constants } from "../utils/constants";

class Home extends Component {
  state = {
    currentPage: null,
    products: [],
    currentArticleIndex: 0,
    categories: this.props.categories?.filter(
      (x) => x.parent_id === null
    ),
    widget_content: null,
    articles: [],
  };
  componentDidMount() {
    // document.title = notFound.pageTitle;
    let currentPage = null;
    API.get(
      `/filteredProduct/${null}/${null}/${"Recommended"}?page=all`
    )
      .then((response) => {
        this.setState({ products: response.data?.data });
      })
      .then(() => {
        API.get(`/pages`).then((response) => {
          if (
            response.status === 200 ||
            response.status === 201
          ) {
            currentPage = response.data.find(
              (x) => x.slug === "home-page"
            );
            this.setState({ currentPage });
          }
        });
        // .then(() => {
        //   API.get(`/all_widgets/${currentPage._id}`).then(
        //     (response) => {
        //       if (response.data) {
        //         // debugger;
        //         this.setState({
        //           widget_content:
        //             response.data[
        //               response.data?.length - 1
        //             ]?.widget_content,
        //         });
        //       }
        //     }
        //   );
        // });
      })
      .catch((err) => console.log(err));

    API.get("/articles").then((response) => {
      if (response.data) {
        this.setState({
          articles: response.data.sort((a,b) => a.currentIndex - b.currentIndex),
          currentArticleIndex: Math.floor(
            Math.random() * response.data.length
          ),
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.categories !== prevProps.categories) {
      //filtering only parent categories
      let categories = [
        ...this.props.categories?.filter(
          (x) => x.parent_id === null
        ),
      ];
      this.setState({
        categories,
      });
    }
  }
  render() {
    const {
      widget_content,
      articles,
      currentArticleIndex,
    } = this.state;
    const { global } = this.props;
    // debugger;
    return (
      <div>
        <Helmet htmlAttributes>
          <html lang="en" />
          {/* <head> */}
          <title>{global?.activeLanguage === "ar" ?
            this.state.currentPage?.arabic?.meta_details?.title :
            this.state.currentPage?.meta_details?.title}
          </title>
          {/* </head> */}
          <meta
            property="og:title"
            // data-react-helmet="true"
            content={global?.activeLanguage === "ar" ?
            this.state.currentPage?.arabic?.meta_details?.title :
            this.state.currentPage?.meta_details?.title}
          />
          <link rel="canonical" href={window.location.href} />
          <meta
            name="description"
            // data-react-helmet="true"
            content={global?.activeLanguage === "ar" ?
              this.state.currentPage?.arabic?.meta_details?.description :
              this.state.currentPage?.meta_details?.description}
          />
          <script type="application/ld+json">
            {global?.activeLanguage === "ar" ?
              this.state.currentPage?.arabic?.meta_details?.schema_markup :
              this.state.currentPage?.meta_details?.schema_markup}
          </script>
        </Helmet>
        <Slider
          // sliderOne={
          //   global?.activeLanguage === "ar"
          //     ? widget_content?.arabic?.sliderOne
          //     : widget_content?.sliderOne
          // }
          // sliderTwo={
          //   global?.activeLanguage === "ar"
          //     ? widget_content?.arabic?.sliderTwo
          //     : widget_content?.sliderTwo
          // }
          // sliderThree={
          //   global?.activeLanguage === "ar"
          //     ? widget_content?.arabic?.sliderThree
          //     : widget_content?.sliderThree
          // }
          activeLanguage={global?.activeLanguage}
        />
        <Welcome
          // tagSection={
          //   global?.activeLanguage === "ar"
          //     ? widget_content?.arabic?.tagSection
          //     : widget_content?.tagSection
          // }
          // welcomeSection={
          //   global?.activeLanguage === "ar"
          //     ? widget_content?.arabic?.welcomeSection
          //     : widget_content?.welcomeSection
          // }
          language={global?.activeLanguage}
        />
        <ImageMenu language={global?.activeLanguage} />
        <ProductsGrid
          categories={this.state.categories}
          isArabic={global?.activeLanguage === "ar"}
          language={global?.activeLanguage}
        />
        {/* <ProductSlider products={this.state.products} /> */}
        <PromoBanner
          language={global?.activeLanguage}
        // banner_image={widget_content?.promoSection?.map(
        //   (x) => x.images_detail?.background_image
        // )}
        // promo_details={widget_content}
        />
        <RelatedArticle
          language={global?.activeLanguage}
          articleTitle={
            global?.activeLanguage === "ar"
              ? articles?.[currentArticleIndex]?.arabic
                ?.title
              : articles?.[currentArticleIndex]?.title
          }
          articleDescription={
            global?.activeLanguage === "ar"
              ? articles?.[currentArticleIndex]?.arabic
                ?.exert
              : articles?.[currentArticleIndex]?.exert
          }
          articleImage={
            articles?.[currentArticleIndex]?.banner_img
          }
          articleRoute={`/${global?.activeLanguage}/breastfeeding-advisor/${articles?.[currentArticleIndex]?.category_route}/${articles?.[currentArticleIndex]?.route}`}
        />
        <Help
          isArabic={global?.activeLanguage === "ar"}
          language={global?.activeLanguage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state?.productReducer?.products,
    categoryProducts:
      state?.productReducer?.categoryProducts,
    totalProducts: state?.productReducer?.totalProducts,
    categories: state?.productReducer?.categories,
    showSpinner: state?.globalReducer?.showSpinner,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (page) => dispatch(getProducts(page)),
    getCategories: () => dispatch(getCategories()),
    getCategoryProducts: (category) =>
      dispatch(getCategoryProducts(category)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
