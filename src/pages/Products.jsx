import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Help from "../sections/Products/Help/Help";
// import OurProduct from "../sections/Products/OurProduct";
import RelatedArticle from "../sections/Products/RelatedArticle";
import ProductSlider from "../sections/Home/ProductSlider/ProductSlider";
import VideoSection from "../sections/Products/VideoSection";
import ProductDetails from "../sections/Products/ProductDetails/ProductDetails";
import ProductGrid from "../sections/Products/ProductGrid";
import BreadCrumbs from "../components/BreadCrumbs";
import ProductHeader from "../sections/Products/ProductHeader";
import { Col, Container, Row } from "react-bootstrap";
import ClipLoader from "react-spinners/BounceLoader";

import {
  categories,
  defaultContentProducts,
  articleDetailsList,
} from "../utils/data";
import { connect } from "react-redux";
import {
  getCategories,
  getCategoryProducts,
  getProducts,
} from "../redux/products";
import { API } from "../http/API";
import { Helmet } from "react-helmet";
import { constants } from "../utils/constants";

const optionStyle = {
  color: "#666"
}
const selectedOptionStyle = {
  color: "#333",
  backgroundColor: "#f2f9fc"
}

const selectStyle = {
  width: "50%", border: "1px solid #e65550", color: "#e65550", height: 'calc(1.5em + 0.75rem + 5px) !important'
}
const selectStyle2 = {
  width: "55%", border: "1px solid #e65550", color: "#e65550", height: 'calc(1.5em + 0.75rem + 5px) !important'
}

class Products extends Component {
  productsGridRef = React.createRef();
  state = {
    currentPage: 1,
    totalProducts: this.props.totalProducts || 0,
    currentArticleIndex: Math.floor(
      Math.random() * articleDetailsList.length
    ),
    selectedCategory: null,
    selectedSubCategory: null,

    selectedCategoryEnglish: null,
    selectedSubCategoryEnglish: null,

    selectedCategoryArabic: null,
    selectedSubCategoryArabic: null,

    selectedSortingEnglish: "",
    selectedSortingArabic: "",

    subCategoryPlaceholderEnglish: "Select Subcategory",
    subCategoryPlaceholderArabic: "يرجى اختيار الفئة الفرعية",

    categoryPlaceholderEnglish: "Select Category",
    categoryPlaceholderArabic: "يرجى اختيار الفئة",

    products: this.props.products?.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    }),
    categoriesEnglish: [
      {
        value: "all",
        label: "All",
      },
      ...categories.map((x) => {
        return {
          value: x.id,
          label: x.name,
          order: x.order,
        };
      }),
    ],
    categoriesArabic: [
      {
        value: "all",
        label: "الكل",
      },
      ...categories.map((x) => {
        return {
          value: x.id,
          label: x.name,
          order: x.order,
        };
      }),
    ],
    subCategoriesEnglish: [],
    subCategoriesArabic: [],

    categoryProducts: [],
    recommendedProducts: [],
    productsPage: null,

    breadCrumbItemsEnglish: [
      {
        text: "Home",
        active: false,
        link: "/",
      },
      {
        text: "Products",
        active: true,
        link: `/${this.props.global.activeLanguage}/products`,
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
        active: true,
        link: `/${this.props.global.activeLanguage}/products`,
      },
    ],
    sortingListEnglish: [
      {
        value: "",
        label: "All",
      },
      {
        value: "Popularity",
        label: "Popularity",
      },
      {
        value: "Recommended",
        label: "Recommended",
      },
      {
        value: "Best Seller",
        label: "Best Seller",
      },
    ],
    sortingListArabic: [
      {
        value: "",
        label: "الكل",
      },
      {
        value: "Popularity",
        label: "الأكثر رواجاً",
      },
      {
        value: "Recommended",
        label: "موصى به",
      },
      {
        value: "Best Seller",
        label: "الأكثر مبيعاً",
      },
    ],
  };


  componentDidMount() {
    this.props.getCategories();
    API.get(
      `/filteredProduct/${null}/${null}/${"Recommended"}?page=all`
    )
      .then((response) => {
        this.setState({ recommendedProducts: response.data?.data, });
      })
      .then(() => {
        API.get(`/pages`).then((response) => {
          if (response.status === 200 || response.status === 201) {
            let productsPage = response.data.find((x) => x.slug === "products");
            this.setState({ productsPage });
          }
        });
      })
      .catch((err) => console.log(err));

    if (this.props.match.params.id && this.props.match.params.sub && this.props.match.params.sub !== "") {
      this.props.getCategoryProducts(this.props.match.params.id, 1, this.props.match.params.sub);
    } else if (this.props.match.params.id && this.props.match.params.id !== "") {
      this.props.getCategoryProducts(this.props.match.params.id);
    } else {
      this.props.getProducts(this.state.currentPage);
    }
    this.setState({ totalProducts: this.props.totalProducts, });
  }

  componentDidUpdate(prevProps) {
    // debugger;
    if (this.props.products !== prevProps.products) {
      //filtering only parent categories
      let categories = [...this.props.categories?.filter((x) => x.parent_id === null && !x.name.toLowerCase().includes("latest")),];

      //mapping for select dropdown with addition "ALL" category option
      // hard-coded first value "all" as its not coming from db
      let mappedCategoriesEnglish = [
        {
          value: "all",
          label: "All",
        },

        ...categories.map((x) => {
          return {
            //using _id instead of id as its coming from db
            value: x.route,
            label: x.name,
            order: x.order,
          };
        }),
      ];
      this.setState({
        categoriesEnglish: mappedCategoriesEnglish,
      });

      let mappedCategoriesArabice = [
        // hard-coded first value "all" as its not coming from db
        {
          value: "all",
          label: "الكل",
        },

        ...categories.map((x) => {
          return {
            //using _id instead of id as its coming from db
            value: x.route,
            label: x.arabic.name,
            order: x.order,
          };
        }),
      ];
      this.setState({
        categoriesArabic: mappedCategoriesArabice,
      });

      // *************************
      // handling subcategory route
      // *************************

      if (
        this.props.match.params.id &&
        prevProps.match.params.sub
      ) {
        // finding the parent category by its 'route' and then selecting its 'children' array which has its subcategories
        // we are doing this because we don't have any thing to compare and find just by route name directly
        let filteredCategory = this.props.categories?.find(
          (x) => x.route === this.props.match.params.id
        );
        let filteredSubcategoriesEnglish;
        let paramSubCategoryEnglish;

        // checking if children exists and then mapping to populate subcategories dropdown
        if (filteredCategory?.children.length > 0) {
          filteredSubcategoriesEnglish =
            filteredCategory?.children?.map((x) => {
              return {
                value: x.route,
                label: x.name,
                order: x.order,
              };
            });
        }
        filteredSubcategoriesEnglish.unshift({
          value: "all",
          label: "All",
        });

        let filteredSubcategoriesArabic;
        let paramSubCategoryArabic;

        // checking if children exists and then mapping to populate subcategories dropdown
        if (filteredCategory?.children.length > 0) {
          filteredSubcategoriesArabic =
            filteredCategory?.children?.map((x) => {
              return {
                value: x.route,
                label: x.arabic.name,
                order: x.order,
              };
            });
        }
        filteredSubcategoriesArabic.unshift({
          value: "all",
          label: "الكل",
        });


        let paramCategory = categories.find(
          (x) => x.route === this.props.match.params.id
        );

        if (filteredSubcategoriesEnglish?.length > 0) {
          paramSubCategoryEnglish = filteredSubcategoriesEnglish?.find(
            (x) => x.value === this.props.match.params.sub
          );
        }

        if (filteredSubcategoriesArabic?.length > 0) {
          paramSubCategoryArabic = filteredSubcategoriesArabic?.find(
            (x) => x.value === this.props.match.params.sub
          );
        }

        // setting selected category and filtered subcategories
        this.setState({
          subCategoriesEnglish:
            filteredSubcategoriesEnglish?.sort(
              (a, b) => a.order - b.order
            ) || [],
          selectedSubCategoryEnglish: paramSubCategoryEnglish
            ? {
              value: paramSubCategoryEnglish?.value,
              label: paramSubCategoryEnglish?.label,
            }
            : null,
          selectedCategoryEnglish: {
            value: paramCategory?.route,
            label: paramCategory?.name,
          }
        });

        this.setState({
          subCategoriesArabic:
            filteredSubcategoriesArabic?.sort(
              (a, b) => a.order - b.order
            ) || [],
          selectedSubCategoryArabic: paramSubCategoryArabic
            ? {
              value: paramSubCategoryArabic?.value,
              label: paramSubCategoryArabic?.label,
            }
            : null,
          selectedCategoryArabic: {
            value: paramCategory?.route,
            label: paramCategory?.arabic.name,
          },
        });

      }

      // *************************
      // handling main category route
      // *************************

      //populating subcategories and setting selected value when we have category id in url (/category/{id})
      if (
        this.props.match.params.id &&
        prevProps.match.params.id !== "" &&
        !this.props.match.params.sub
      ) {
        // finding the parent category by its 'route' and then selecting its 'children' array which has its subcategories
        // we are doing this because we don't have any thing to compare and find just by route name directly
        let filteredCategory = this.props.categories?.find(
          (x) => x.route === this.props.match.params.id
        );


        // checking if children exists and then mapping to populate subcategories dropdown
        let filteredSubcategoriesEnglish;
        if (filteredCategory?.children.length > 0) {
          filteredSubcategoriesEnglish =
            filteredCategory?.children?.map((x) => {
              return {
                value: x.route,
                label: x.name,
                order: x.order,
              };
            });
        }
        //!
        filteredSubcategoriesEnglish?.unshift({
          value: "all",
          label: "All",
        });

        let filteredSubcategoriesArabic;
        if (filteredCategory?.children.length > 0) {
          filteredSubcategoriesArabic =
            filteredCategory?.children?.map((x) => {
              return {
                value: x.route,
                label: x.arabic.name,
                order: x.order,
              };
            });
        }
        //!
        filteredSubcategoriesArabic?.unshift({
          value: "all",
          label: "الكل",
        });

        //!
        let paramCategory = categories.find(
          (x) => x.route === this.props.match.params.id
        );
        // setting selected category and filtered subcategories
        this.setState({
          subCategoriesEnglish:
            filteredSubcategoriesEnglish?.sort(
              (a, b) => a.order - b.order
            ) || [],
          selectedSubCategoryEnglish: null,
          selectedCategoryEnglish: {
            value: paramCategory?.route,
            label: paramCategory?.name,
          },
        });

        this.setState({
          subCategoriesArabic:
            filteredSubcategoriesArabic?.sort(
              (a, b) => a.order - b.order
            ) || [],
          selectedSubCategoryArabic: null,
          selectedCategoryArabic: {
            value: paramCategory?.route,
            label: paramCategory?.arabic.name,
          },
        });

      }
    }

    // handle category route update issue
    if (
      this.props.match.params.id !==
      prevProps.match.params.id &&
      !this.props.match.params.sub
    ) {
      this.props.getCategoryProducts(
        this.props.match.params.id
      );
    }

    //setting products if different
    if (this.props.products !== prevProps.products) {
      this.setState({
        products: this.props.products?.sort(
          (a, b) => a.order - b.order
        ),
      });
    }
    if (
      this.props.totalProducts !== prevProps.totalProducts
    ) {
      this.setState({
        totalProducts: this.props.totalProducts,
      });
    }
  }

  handleCategoryChange = (category) => {

    category = JSON.parse(category.target.value)

    let filteredCategory;
    let filteredSubcategoriesEnglish = [];
    let filteredSubcategoriesArabic = [];
    if (category.value !== "all") {
      filteredCategory = this.props.categories?.find(
        (x) => x.route === category.value
      );
      if (filteredCategory?.children?.length > 0) {
        filteredSubcategoriesEnglish =
          filteredCategory?.children?.map((x) => {
            return {
              value: x.route,
              label: x.name,
              order: x.order,
            };
          });
      }
      filteredSubcategoriesEnglish?.unshift({
        value: "all",
        label: "All",
      });

      if (filteredCategory?.children?.length > 0) {
        filteredSubcategoriesArabic =
          filteredCategory?.children?.map((x) => {
            return {
              value: x.route,
              label: x.arabic.name,
              order: x.order,
            };
          });
      }
      filteredSubcategoriesArabic?.unshift({
        value: "all",
        label: "الكل",
      });

      this.props.history.push(
        `/${this.props.global.activeLanguage}/products/${category?.value}`
      );

      this.setState({
        selectedCategoryEnglish: category,
        subCategoriesEnglish: filteredSubcategoriesEnglish
          ? filteredSubcategoriesEnglish?.sort(
            (a, b) => a.order - b.order
          )
          : [],
        selectedSubCategoryEnglish: null,
      });
      this.setState({
        selectedCategoryArabic: category,
        subCategoriesArabic: filteredSubcategoriesArabic
          ? filteredSubcategoriesArabic?.sort(
            (a, b) => a.order - b.order
          )
          : [],
        selectedSubCategoryArabic: null,
      });

    } else {
      this.props.history.push(
        `/${this.props.global.activeLanguage}/products`
      );
      this.props.getProducts(this.state.currentPage);
      this.setState({
        selectedCategoryEnglish: category,
        subCategoriesEnglish: [],
        selectedSubCategoryEnglish: null,
      });
      this.setState({
        selectedCategoryArabic: category,
        subCategoriesArabic: [],
        selectedSubCategoryArabic: null,
      });
    }
  };

  handleSubCategoryChange = (subcategory) => {
    subcategory = JSON.parse(subcategory.target.value)
    const { selectedCategoryEnglish, selectedCategoryArabic, selectedSortingEnglish, selectedSortingArabic } =
      this.state;
    if (subcategory.value === "all") {
      this.props.getCategoryProducts(
        selectedCategoryEnglish?.value, 1,
        null,
        selectedSortingEnglish?.value || null
      );
      this.setState({
        currentPage: 1,
        selectedSubCategoryEnglish: subcategory,
      });
      this.props.history.push(
        `/${this.props.global.activeLanguage}/products/${selectedCategoryEnglish?.value}`
      );
    } else {
      this.props.getCategoryProducts(
        selectedCategoryEnglish?.value,
        1,
        subcategory?.value,
        selectedSortingEnglish?.value || null
      );
      this.setState({
        currentPage: 1,
        selectedSubCategoryEnglish: subcategory,
      });

      this.props.history.push(
        `/${this.props.global.activeLanguage}/products/${selectedCategoryEnglish?.value}/${subcategory.value}`
      );
    }

    if (subcategory.value === "all") {
      this.props.getCategoryProducts(
        selectedCategoryArabic?.value, 1,
        null,
        selectedSortingArabic?.value || null
      );
      this.setState({
        currentPage: 1,
        selectedSubCategoryArabic: subcategory,
      });
      this.props.history.push(
        `/${this.props.global.activeLanguage}/products/${selectedCategoryArabic?.value}`
      );
    } else {
      this.props.getCategoryProducts(
        selectedCategoryArabic?.value,
        1,
        subcategory?.value,
        selectedSortingArabic?.value
      );
      this.setState({
        currentPage: 1,
        selectedSubCategoryArabic: subcategory,
      });

      this.props.history.push(
        `/${this.props.global.activeLanguage}/products/${selectedCategoryArabic?.value}/${subcategory.value}`
      );
    }
    // this.filterProducts(this.state.selectedCategory.value, subcategory.value);
  };

  filterProducts = (cat_id, sub_id) => {
    let products = this.state.categoryProducts?.filter(
      (x) => x.category === cat_id
    );
    if (sub_id) {
      products = products.filter(
        (x) => x.sub_category === sub_id
      );
    }
    this.setState({
      products,
      totalProducts: products.length,
      currentPage: 1,
    });
  };

  handleSortFilter = (sortFilter) => {
    sortFilter = JSON.parse(sortFilter.target.value)

    //destructuring state variables
    const {
      selectedCategoryEnglish,
      selectedCategoryArabic,
      selectedSubCategoryEnglish,
      selectedSubCategoryArabic,
      currentPage,
    } = this.state;
    //check if value is "All", in which case, get show all products
    if (!sortFilter.value || sortFilter.value === "") {
      this.props.getCategoryProducts(
        selectedCategoryEnglish?.value,
        currentPage,
        selectedSubCategoryEnglish?.value,
        null
      );
    } else {
      this.props.getCategoryProducts(
        selectedCategoryEnglish?.value,
        1,
        selectedSubCategoryEnglish?.value,
        sortFilter?.value
      );
      this.setState({ currentPage: 1 });
    }
    if (!sortFilter.value || sortFilter.value === "") {
      this.props.getCategoryProducts(
        selectedCategoryArabic?.value,
        currentPage,
        selectedSubCategoryArabic?.value,
        null
      );
    } else {
      this.props.getCategoryProducts(
        selectedCategoryArabic?.value,
        1,
        selectedSubCategoryArabic?.value,
        sortFilter?.value
      );
      this.setState({ currentPage: 1 });
    }
    //setting selected sort filter to state
    // if (this.props.global?.activeLanguage === "en") {
    //   this.setState({ selectedSortingEnglish: sortFilter });
    // } else {
    //   this.setState({ selectedSortingArabic: sortFilter });
    // }
    this.setState({ selectedSortingEnglish: sortFilter });
    this.setState({ selectedSortingArabic: sortFilter });

  };

  getPropertyValue(key, isArabic) {
    if (this.state.selectedSubCategoryEnglish?.value &&
      this.props.categories?.find((x) => x.route === this.state.selectedSubCategoryEnglish?.value)?.short_description !== "<p>null</p>" &&
      this.state.selectedSubCategoryArabic?.value &&
      this.props.categories?.find((x) => x.route === this.state.selectedSubCategoryArabic?.value)?.short_description !== "<p>null</p>") {
      return isArabic
        ? this.props.categories?.find((x) => x.route === this.state.selectedSubCategoryArabic?.value)?.arabic?.[key]
        : this.props.categories?.find((x) => x.route === this.state.selectedSubCategoryEnglish?.value)?.[key];
    } else if (this.state.selectedSubCategoryEnglish?.value &&
      this.props.categories?.find((x) => x.route === this.state.selectedSubCategoryEnglish?.value)?.short_description === "<p>null</p>" &&
      this.state.selectedSubCategoryArabic?.value &&
      this.props.categories?.find((x) => x.route === this.state.selectedSubCategoryArabic?.value)?.short_description === "<p>null</p>") {
      return isArabic
        ? this.props.categories?.find((x) => x.route === this.state.selectedCategoryArabic?.value)?.arabic?.[key]
        : this.props.categories?.find((x) => x.route === this.state.selectedCategoryEnglish?.value)?.[key];
    } else if (this.state.selectedCategoryEnglish?.value && this.state.selectedCategoryEnglish?.value !== "all" &&
      this.state.selectedCategoryArabic?.value && this.state.selectedCategoryArabic?.value !== "all") {
      return isArabic
        ? this.props.categories?.find(
          (x) =>
            x.route === this.state.selectedCategoryArabic?.value
        )?.arabic?.[key]
        : this.props.categories?.find(
          (x) =>
            x.route === this.state.selectedCategoryEnglish?.value
        )?.[key];
    } else {
      return defaultContentProducts[key];
    }
  }


  render() {

    const { global } = this.props;
    return (
      <div className="products-page">
        <Helmet>
          <title>
            {this.state.productsPage?.meta_details?.title ||
              constants.site_name}
          </title>
          <meta
            name="description"
            content={
              this.state.productsPage?.meta_details
                ?.description || constants.seo_description
            }
          />
           <link rel="canonical" href={window.location.href} />
        </Helmet>
        <ProductHeader
          language={this.props.activeLanguage}
        />
        <BreadCrumbs
          breadCrumbItems={
            this.props.global?.activeLanguage === "en"
              ? this.state.breadCrumbItemsEnglish
              : this.state.breadCrumbItemsArabic
          }
          language={this.props.global?.activeLanguage}
        />
        <div
          className="p-3 p-sm-4"
          style={{ position: "relative" }}
          ref={this.productsGridRef}
        >
          <div
            className={`${this.props.showSpinner ? "d-flex" : "d-none"
              } flex-column text-center align-items-center justify-content-center`}
            style={{
              position: "absolute",
              zIndex: 999,
              height: "100vh",
              width: "100%",
              background: "rgba(255,255,255,0.8)",
            }}
          >
            <ClipLoader
              color={"#e65550"}
              loading={true}
              size={80}
            />
          </div>
          <Container>
            <Row
              style={{ justifyContent: "space-between" }}
            >
              <Col sm={7}>
                <div
                  className="d-flex category-filters"
                  style={{
                    justifyContent: "space-between",
                    columnGap: "30px"
                  }}
                >
                  {/* <Dropdown
                    options={
                      global?.activeLanguage === "en"
                        ? this.state.categoriesEnglish
                        : this.state.categoriesArabic
                    }
                    onChange={this.handleCategoryChange}
                    value={
                      global?.activeLanguage === "en"
                        ? this.state.selectedCategoryEnglish
                        : this.state.selectedCategoryArabic
                    }
                    placeholder={
                      global?.activeLanguage === 'en'
                        ? this.state.categoryPlaceholderEnglish
                        : this.state.categoryPlaceholderArabic
                    }
                    style={{ width: "50%" }}
                  /> */}
                  <select style={selectStyle} onChange={this.handleCategoryChange}>
                    <option value="all" disabled selected>
                      {global?.activeLanguage === 'en'
                        ? this.state.categoryPlaceholderEnglish : this.state.categoryPlaceholderArabic}
                    </option>
                    {global?.activeLanguage === 'en'
                      ? (
                        // console.log(this.state.subCategoriesEnglish,)
                        this.state.categoriesEnglish?.map((data) => {
                          let selectedCat = this.state.selectedCategoryEnglish?.value == data.value ? "selected" : ""
                          return <option value={JSON.stringify(data)} selectedCat style={this.state.selectedCategoryEnglish?.value == data.value ? selectedOptionStyle : optionStyle}>{data.label}</option>
                        })
                      ) :
                      (
                        this.state.categoriesArabic?.map((data) => {
                          let selectedCat = this.state.selectedCategoryArabic?.value == data.value ? "selected" : ""
                          return <option value={JSON.stringify(data)} selectedCat style={this.state.selectedCategoryArabic?.value == data.value ? selectedOptionStyle : optionStyle}>{data.label}</option>
                        })
                      )
                    }
                  </select>

                  {/* <Dropdown
                    options={
                      global?.activeLanguage === "en"
                        ? this.state.subCategoriesEnglish
                        : this.state.subCategoriesArabic
                    }
                    onChange={this.handleSubCategoryChange}
                    value={
                      global?.activeLanguage === "en"
                        ? this.state.selectedSubCategoryEnglish
                        : this.state.selectedSubCategoryArabic
                    }
                    placeholder={
                      global?.activeLanguage === 'en'
                        ? this.state.subCategoryPlaceholderEnglish
                        : this.state.subCategoryPlaceholderArabic
                    }
                  /> */}
                  <select style={selectStyle} onChange={this.handleSubCategoryChange}>
                    <option value="all" disabled selected>
                      {global?.activeLanguage === 'en'
                        ? "Select Subcategory" : "يرجى اختيار الفئة الفرعية"}
                    </option>
                    {global?.activeLanguage === 'en'
                      ? (
                        // console.log(this.state.subCategoriesEnglish,)
                        this.state.subCategoriesEnglish?.map((data) => {
                          let selectedSubCat = this.state.selectedSubCategoryEnglish?.value == data.value ? "selected" : ""
                          return <option value={JSON.stringify(data)} selectedSubCat style={this.state.selectedSubCategoryEnglish?.value == data.value ? selectedOptionStyle : optionStyle}>{data.label}</option>
                        })
                      ) :
                      (
                        this.state.subCategoriesArabic.map((data) => {
                          let selectedSubCat = this.state.selectedSubCategoryArabic?.value == data.value ? "selected" : ""
                          return <option value={JSON.stringify(data)} selectedSubCat style={this.state.selectedSubCategoryArabic?.value == data.value ? selectedOptionStyle : optionStyle}>{data.label}</option>
                        })
                      )
                    }
                  </select>

                </div>
              </Col>
              <Col sm={4}>
                <div
                  className="d-flex sort-filters"
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className={`item-count text-secondary text-right small ${this.props.global?.activeLanguage === "ar" ? "item-count-Arabic" : ""
                      }`}
                  >
                    {this.state.totalProducts || 0} {this.props.global?.activeLanguage === "en" ? 'Items' : 'الاصناف'}
                  </span>
                  {/* <Dropdown
                    options={
                      global?.activeLanguage === "en"
                        ? this.state.sortingListEnglish
                        : this.state.sortingListArabic
                    }
                    onChange={this.handleSortFilter}
                    value={
                      global?.activeLanguage === "en"
                        ? this.state.selectedSortingEnglish
                        : this.state.selectedSortingArabic
                    }
                    placeholder={
                      global?.activeLanguage === 'en'
                        ? "Select an option"
                        : "حدد إختيار"
                    }
                  /> */}

                  <select style={selectStyle2} onChange={this.handleSortFilter}>
                    <option value="all" disabled selected>
                      {global?.activeLanguage === 'en'
                        ? "Select an option" : "حدد إختيار"}
                    </option>
                    {global?.activeLanguage === 'en'
                      ? (
                        // console.log(this.state.subCategoriesEnglish,)
                        this.state.sortingListEnglish?.map((data) => {
                          let selectedSort = this.state.selectedSortingEnglish?.value == data.value ? "selected" : ""
                          return <option value={JSON.stringify(data)} selectedSort style={this.state.selectedSortingEnglish?.value == data.value ? selectedOptionStyle : optionStyle}>{data.label}</option>
                        })
                      ) :
                      (
                        this.state.sortingListArabic?.map((data) => {
                          let selectedSort = this.state.selectedSortingEnglish?.value == data.value ? "selected" : ""
                          return <option value={JSON.stringify(data)} selectedSort style={this.state.selectedSortingArabic?.value == data.value ? selectedOptionStyle : optionStyle}>{data.label}</option>
                        })
                      )
                    }
                  </select>

                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <ProductGrid
          products={this.state.products}
          isArabic={this.props.global?.activeLanguage === "ar"}
          totalProducts={this.state.totalProducts}
          currentPage={this.state.currentPage}
          bannerType={
            global?.activeLanguage === "en"
              ? this.state.selectedSortingEnglish
              : this.state.selectedSortingArabic
          }
          handlePageClick={(currentPage) => {
            this.setState({ currentPage });
            if (
              this.state.selectedCategoryEnglish !== null &&
              this.state.selectedCategoryEnglish?.value !== "all" &&
              this.state.selectedCategoryArabic !== null &&
              this.state.selectedCategoryArabic?.value !== "all"
            ) {
              this.props.getCategoryProducts(
                this.state.selectedCategoryEnglish?.value,
                currentPage,
                this.state.selectedSubCategoryEnglish?.value,
                this.state.selectedSortingEnglish?.value,
              );
            } else if (
              this.state.selectedSortingEnglish?.value !== null &&
              this.state.selectedSortingEnglish?.value !== "" &&
              this.state.selectedSortingArabic?.value !== null &&
              this.state.selectedSortingArabic?.value !== ""
            ) {
              this.props.getCategoryProducts(
                this.state.selectedCategoryEnglish?.value,

                currentPage,
                this.state.selectedSubCategoryEnglish?.value,
                this.state.selectedSortingEnglish?.value,
              );
            } else {
              this.props.getProducts(currentPage);
            }
            this.productsGridRef.current.scrollIntoView({
              behavior: "smooth",
            });
            // window.scrollTo({ top: 300, behavior: "smooth" });
          }}
        />
        <VideoSection
          videoTitle={this.getPropertyValue("videoTitle", this.props.global?.activeLanguage === "ar")}
          videoLink={this.getPropertyValue("video_link")}
          videoDescription={this.getPropertyValue("video_description", this.props.global?.activeLanguage === "ar")}
          activeLanguage={this.props.global?.activeLanguage}
          productUrl={`/${this.props.global.activeLanguage}/products`}
        />
        <ProductDetails
          heading={this.getPropertyValue("name", this.props.global?.activeLanguage === "ar")}
          image={this.getPropertyValue("featured_img", false)}
          text={this.getPropertyValue("short_description", this.props.global?.activeLanguage === "ar")}
          productImage={this.getPropertyValue("banner_images_list", false)?.[0]}
          detailText={this.getPropertyValue("long_description", this.props.global?.activeLanguage === "ar")}
          activeLanguage={this.props.global?.activeLanguage}
          productUrl={`/${this.props.global.activeLanguage}/products`}
        />
        <ProductSlider
          products={this.state.recommendedProducts}
          language={this.props.global?.activeLanguage}
          isArabic={this.props.global?.activeLanguage === "ar"}
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
    getCategoryProducts: (
      category,
      page,
      subcategory,
      filter
    ) =>
      dispatch(
        getCategoryProducts(
          category,
          page,
          subcategory,
          filter
        )
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
