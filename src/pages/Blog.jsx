import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import AdvisorCategoryGrid from "../sections/BreastFeedingAdvisor/AdvisorCategoryGrid/AdvisorCategoryGrid";
// import AdvisorHeader from "../sections/BreastFeedingAdvisor/AdvisorHeader";
import BlogHeader from "../sections/Blog/BlogHeader/BlogHeader";
import { constants } from "../utils/constants";
import BlogCategoryGrid from "../sections/Blog/BlogCategoryGrid/BlogCategoryGrid";
import Overview from "../sections/ProductDetails/Overview/Overview";
import ProductsGrid from "../sections/Home/ProductsGrid";


class BreastFeedingAdvisor extends Component {
    state = {
        currentPage: null,
        breadCrumbItemsEnglish: [
            {
                text: "Home",
                active: false,
                link: "/",
            },
            {
                text: "Blog",
                active: true,
                link: `/${this.props.global?.activeLanguage}/blog`,
            },
        ],
        breadCrumbItemsArabic: [
            {
                text: "الرئيسية",
                active: false,
                link: "/",
            },
            {
                text: "المدونة",
                active: true,
                link: `/${this.props.global.activeLanguage}/blog`,
            },
        ]
    };
    componentDidMount() {
        API.get(`/pages`)
            .then((response) => {
                if (
                    response.status === 200 ||
                    response.status === 201
                ) {
                    let currentPage = response.data.find(
                        (x) => x.slug === "blog"
                    );
                    this.setState({ currentPage });
                }
            })
            .catch((err) => console.log(err));
    }
    render() {
        const { global } = this.props;
        return (
            <div className="breast-feeding-advisor-page">
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
                <BlogHeader language={global?.activeLanguage} />
                <BreadCrumbs
                    // breadCrumbItems={this.state.breadCrumbItems}
                    breadCrumbItems={
                        global?.activeLanguage === "en"
                            ? this.state.breadCrumbItemsEnglish
                            : this.state.breadCrumbItemsArabic
                    }
                    language={global?.activeLanguage}
                />

                <BlogCategoryGrid
                    isArabic={
                        this.props.global?.activeLanguage === "ar"
                    }
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

export default connect(mapStateToProps)(
    BreastFeedingAdvisor
);
