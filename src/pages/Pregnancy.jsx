import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import PregnancyTabContainer from "../sections/Pregnancy/PregnancyTabContainer";
import FirstTrimester from "../sections/Pregnancy/Trimester/FirstTrimester";
import SecondTrimester from "../sections/Pregnancy/Trimester/SecondTrimester";
import ThirdTrimester from "../sections/Pregnancy/Trimester/ThirdTrimester";
import { constants } from "../utils/constants";

class Pregnancy extends Component {
    state = {
        currentPage: null,
        pregnancyData: null,
        breadCrumbItemsEnglish: [
            {
                text: "Home",
                active: false,
                link: "/",
            },
            {
                text: "Pregnancy",
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
                text: "الحمل",
                active: true,
                link: `/${this.props.global?.activeLanguage}/blog`,
            },
        ],
    };
    componentDidMount() {
        API.get(`/pages`)
            .then((response) => {
                if (
                    response.status === 200 ||
                    response.status === 201
                ) {
                    let currentPage = response.data.find(
                        (x) => x.slug === "pregnancy"
                    );
                    this.setState({ currentPage });

                    API.get(`/all_widgets/${currentPage._id}`)
                        .then((res) => {
                            let widget_content =
                                res.data?.[res.data?.length - 1]
                                    ?.widget_content;
                            // debugger;
                            this.setState({
                                pregnancyData: widget_content,
                            });
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    }

    render() {
        const { global } = this.props;
        return (
            <div className="pregnancy-page">
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
                <PregnancyTabContainer
                    data={
                        global?.activeLanguage === "ar"
                            ? this.state.pregnancyData?.arabic?.pregnancy
                            : this.state.pregnancyData?.pregnancy
                    }
                    language={global?.activeLanguage}
                />
                <FirstTrimester
                    image={
                        this.state.pregnancyData?.firstTrimester?.image
                    }
                    trimesterData={
                        global?.activeLanguage === "ar"
                            ? this.state.pregnancyData?.arabic
                                ?.firstTrimester
                            : this.state.pregnancyData?.firstTrimester
                    }
                    language={global?.activeLanguage}
                />
                <SecondTrimester
                    trimesterData={
                        global?.activeLanguage === "ar"
                            ? this.state.pregnancyData?.arabic
                                ?.secondTrimester
                            : this.state.pregnancyData?.secondTrimester
                    }
                    language={global?.activeLanguage}
                />
                <ThirdTrimester
                    trimesterData={
                        global?.activeLanguage === "ar"
                            ? this.state.pregnancyData?.arabic
                                ?.thirdTrimester
                            : this.state.pregnancyData?.thirdTrimester
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
export default connect(mapStateToProps)(Pregnancy);
