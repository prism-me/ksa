import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { API } from "../http/API";
import BabyCare from "../sections/MotherBabyWorld/BabyCare";
import Pregnancy from "../sections/MotherBabyWorld/Pregnancy";
import QuestionsAndAnswers from "../sections/MotherBabyWorld/QuestionsAndAnswers";
import { constants } from "../utils/constants";


class MotherBabyWorld extends Component {
    state = {
        currentPage: null,
        breadCrumbItemsEnglish : [
            {
                text: "Home",
                active: false,
                link: "/",
            },
            {
                text: "Mother & Baby World",
                active: true,
                link: `/${this.props.global.activeLanguage}/mother-baby-world`,
            },
        ],
        breadCrumbItemsArabic : [
            {
                text: "الرئيسية",
                active: false,
                link: "/",
            },
            {
                text: "عالم الأم والطفل",
                active: true,
                link: `/${this.props.global.activeLanguage}/mother-baby-world`,
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
                        (x) => x.slug === "mother-baby-world"
                    );
                    this.setState({ currentPage });
                }
            })
            .catch((err) => console.log(err));
    }
    render() {
        const { global } = this.props;
        return (
            <div className="mother-baby-page">
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
                <QuestionsAndAnswers
                    language={global?.activeLanguage}
                />
                <BabyCare language={global?.activeLanguage} />
                <Pregnancy language={global?.activeLanguage} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        global: state.globalReducer,
    };
};
export default connect(mapStateToProps)(MotherBabyWorld);
