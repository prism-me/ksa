import React, { Component } from "react";
import { Helmet } from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { API } from "../http/API";
import FeatureTabs from "../sections/ProductDetails/FeaturesTabs/FeatureTabs";
import Overview from "../sections/ProductDetails/Overview";
import ProductReviews from "../sections/ProductDetails/ProductReviews";
import RecommendedSlider from "../sections/ProductDetails/RecommendedSlider";
import { connect } from "react-redux";
import { getCategoryProducts } from "../redux/products";
import { constants } from "../utils/constants";

class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.letsSetState = this.letsSetState.bind(this);
  }

  state = {
    id: "",
    product: "",
    currentPage: 1,
    products: this.props.products,
    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Products",
        active: false,
        link: "/en/mother-baby-products",
      },
      {
        text: "",
        active: false,
        link: "/category",
      },
      {
        text: "",
        active: false,
        link: "/category",
      },
      {
        text: "",
        active: true,
        link: "/en/mother-baby-products",
      },
    ],
    breadCrumbItemsArabic: [
      {
        text: "الرئيسية",
        active: false,
        link: "/",
      },
      {
        text: "المنتجات",
        active: false,
        link: "/en/mother-baby-products",
      },
      {
        text: "",
        active: false,
        link: "/category",
      },
      {
        text: "",
        active: false,
        link: "/category",
      },
      {
        text: "",
        active: true,
        link: "/en/mother-baby-products",
      },
    ],
  };

  letsSetState = (data) => {
    this.setState({
      product: data,
    });
  }
  componentDidMount() {
    if (this.props.match.params.id && this.props.match.params.id !== "") {
      API.get(`/products/${this.props.match.params.id}`)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            if (response.data) {
              this.letsSetState(response.data)
            }
            this.props.getCategoryProducts(
              response.data?.categories?.route,
              "all",
              this.props.categories?.find(
                (x) => x._id === response.data?.sub_category
              )?.route,
              null
            );
            let breadCrumbItemsEnglish = [...this.state.breadCrumbItemsEnglish];
            let breadCrumbItemsArabic = [...this.state.breadCrumbItemsArabic];


            let prod_category = this.props.categories?.find(
              (x) => x._id === response.data.category
            );
            let prod_sub_category = prod_category?.children?.find(
              (x) => x._id === response.data.sub_category
            );

            //setting category name
            breadCrumbItemsEnglish[2].text = prod_category?.name;
            breadCrumbItemsEnglish[2].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}`;

            breadCrumbItemsArabic[2].text = prod_category?.arabic.name;
            breadCrumbItemsArabic[2].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}`;

            //setting subcategory name
            breadCrumbItemsEnglish[3].text = prod_sub_category?.name;
            breadCrumbItemsEnglish[3].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}/${prod_sub_category?.route}`;

            breadCrumbItemsArabic[3].text = prod_sub_category?.arabic.name;
            breadCrumbItemsArabic[3].link = `/${this.props.global?.activeLanguage}/products/${prod_category?.route}/${prod_sub_category?.route}`;

            //setting product name
            breadCrumbItemsEnglish[4].text = response.data?.name;
            breadCrumbItemsEnglish[4].link = `/${this.props.global?.activeLanguage}/product/` + encodeURIComponent(response.data?.route);
            this.setState({ breadCrumbItemsEnglish });

            breadCrumbItemsArabic[4].text = response.data?.arabic?.name;
            breadCrumbItemsArabic[4].link = `/${this.props.global?.activeLanguage}/product/` + encodeURIComponent(response.data?.route);
            this.setState({ breadCrumbItemsArabic });


          } else {
          }
        })
        .catch((error) => {
          console.log("Something went wrong");
        });
    }
  }

  componentDidUpdate(prevProps) {
    //setting products
    // debugger;
    if (this.props.products !== prevProps.products) {
      this.setState({
        products: this.props.products,
      });
    }
    if (this.props.categoryProducts !== prevProps.categoryProducts) {
      this.setState({
        products: this.props.products,
      });
    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      // debugger;
      API.get(`/products/${this.props.match.params.id}`)
        .then((response) => {
          // debugger;
          if (response.status === 200 || response.status === 201) {
            // debugger;
            this.setState({
              product: response.data,
            });
            this.props.getCategoryProducts(
              response.data?.categories?.route,
              "all",
              this.props.categories?.find(
                (x) => x._id === response.data?.sub_category
              )?.route,
              null
            );

            let breadCrumbItemsEnglish = [...this.state.breadCrumbItemsEnglish];
            let breadCrumbItemsArabic = [...this.state.breadCrumbItemsArabic];
            breadCrumbItemsEnglish[breadCrumbItemsEnglish.length - 1].text = response.data?.name;
            breadCrumbItemsEnglish[breadCrumbItemsEnglish.length - 1].link = `/${this.props.global?.activeLanguage}/product/` + encodeURIComponent(response.data?.route);
            this.setState({ breadCrumbItemsEnglish });

            breadCrumbItemsArabic[breadCrumbItemsArabic.length - 1].text = response.data?.arabic?.name;
            breadCrumbItemsArabic[breadCrumbItemsArabic.length - 1].link = `/${this.props.global?.activeLanguage}/product/` + encodeURIComponent(response.data?.route);
            this.setState({ breadCrumbItemsArabic });
          }
        })

        .catch((error) => {
          console.log("Something went wrong");
        });
    }
  }


  render() {
    return (
      <div className="product-details-page">
        <Helmet>
          <title>
            {this.state.product?.meta_details?.title || constants.site_name}
          </title>
          <meta
            name="description"
            content={
              this.state.product?.meta_details?.description ||
              constants.seo_description
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
          language={this.props.global?.activeLanguage}
        />

        <Overview
          {...this.state.product}
          isArabic={this.props.global?.activeLanguage === "ar"}
          language={this.props.global?.activeLanguage}
        />
        <FeatureTabs
          {...this.state.product}
          isArabic={this.props.global?.activeLanguage === "ar"}
          language={this.props.global?.activeLanguage}
        />
        <RecommendedSlider
          currentProduct={this.state.product}
          products={this.props.categoryProducts}
          isArabic={this.props.global?.activeLanguage === "ar"}
          language={this.props.global?.activeLanguage}
        />
        {this.state.product?.reviews?.filter((x) => x.is_approved === true)
          ?.length > 0 && (
            <ProductReviews
              reviews={this.state.product?.reviews?.filter(
                (x) => x.is_approved === true
              )}
              language={this.props.global?.activeLanguage}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state?.productReducer?.products,
    categoryProducts: state?.productReducer?.categoryProducts,
    categories: state?.productReducer?.categories,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryProducts: (category, page, subcategory, filter) =>
      dispatch(getCategoryProducts(category, page, subcategory, filter)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
