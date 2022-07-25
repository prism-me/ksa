import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GoPlay } from "react-icons/go";
// import { FaLongArrowAltRight } from "react-icons/fa";
// import articleImage from "./../../../assets/images/banner1.jpg";
import ModalVideo from "react-modal-video";
// import banner2 from "./../../../assets/images/banner2.jpeg";
// import { BiCheck } from "react-icons/bi";
// import SimpleButton from "../../../components/SimpleButton/SimpleButton";
import { API } from "../../../http/API";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";


function AboutUsTab(props) {
  const [aboutusData, setAboutusData] = useState([]);
  const [openVideo, setOpenVideo] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const researchRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const splitSrc =
    aboutusData?.sectionTwo?.video_url?.split("/");

  useEffect(() => {
    API.get(`/pages`)
      .then((response) => {
        if (
          response.status === 200 ||
          response.status === 201
        ) {
          // debugger;
          let currentPage = response.data.find(
            (x) => x.slug === "about-us-active"
          );
          setCurrentPage(currentPage);
          API.get(`/all_widgets/${currentPage._id}`)
            .then((res) => {
              // debugger;
              let widget_content =
                res.data[res.data.length - 1]
                  .widget_content;
              setAboutusData(widget_content);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const { global } = props;
  return (
    <div className="about-us-tab">
      <Helmet>
        <title>{global?.activeLanguage === "ar" ? aboutusData?.arabic?.meta_details?.title : aboutusData?.meta_details?.title}</title>
        <meta property="og:title" content={global?.activeLanguage === "ar" ? aboutusData?.arabic?.meta_details?.title : aboutusData?.meta_details?.title} />
        <meta
          name="description"
          content={global?.activeLanguage === "ar" ? aboutusData?.arabic?.meta_details?.description : aboutusData?.meta_details?.description}
        />
        <script type="application/ld+json">
          {global?.activeLanguage === "ar" ? aboutusData?.arabic?.meta_details?.schema_markup : aboutusData?.meta_details?.schema_markup}
        </script>
      </Helmet>

      <div
        className="section-header"
        style={{
          backgroundImage: `url(${aboutusData?.sectionOne?.banner_image})`,
        }}
      ></div>
      <Container>
        <Row>
          <Col sm={4}>
            <div className="image-column">
              <div className="article-image">
                <img
                  src={
                    aboutusData?.sectionOne?.featured_image
                  }
                  alt=""
                />
              </div>
            </div>
          </Col>
          <Col sm={8}>
            <div className="article-content">
              {/* <h2 className="article-title">What is Pigeon ?</h2> */}
              <p
                className="description mt-sm-4"
                dangerouslySetInnerHTML={{
                  __html: `${global?.activeLanguage === "ar"
                    ? aboutusData?.arabic?.sectionOne
                      ?.content
                    : aboutusData?.sectionOne?.content
                    }`,
                }}
              ></p>
              {/* <div
                className="learn-more m-btn-simple"
                onClick={() => {
                  videoRef.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <span>Learn More</span>
              </div> */}
              {/* <SimpleButton
                style={{ float: "right" }}
                onClick={() => {
                  videoRef.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Learn More
              </SimpleButton> */}
            </div>
          </Col>
        </Row>
        <div className="about-video-section" ref={videoRef}>
          <Row>
            <Col sm={12}>
              <h3 className="video-title">
                {/* {aboutusData?.sectionTwo?.title} */}
                {global?.activeLanguage === "ar"
                  ? aboutusData?.arabic?.sectionTwo?.title
                  : aboutusData?.sectionTwo?.title}
              </h3>
            </Col>
            <Col sm={6}>
              <div
                className="video-thumbnail"
                style={{
                  backgroundImage: `url(${aboutusData?.sectionTwo?.video_thumbnail})`,
                }}
              >
                <GoPlay
                  color="#fff"
                  onClick={() => setOpenVideo(true)}
                  className="video-icon"
                />
                <h2>About Pigeon</h2>
              </div>
            </Col>
            <Col sm={6}>
              <div className="video-content">
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${global?.activeLanguage === "ar"
                      ? aboutusData?.arabic?.sectionTwo
                        ?.content
                      : aboutusData?.sectionTwo?.content
                      }`,
                  }}
                ></p>
              </div>
            </Col>
          </Row>
        </div>
        <div
          className="research-info-section"
          ref={researchRef}
        >
          <Row>
            <Col sm={{ span: 12 }}>
              {/* <Col sm={{ span: 10, offset: 2 }}> */}
              <h3 className="research-title">
                {global?.activeLanguage === "ar"
                  ? aboutusData?.arabic?.sectionThree?.title
                  : aboutusData?.sectionThree?.title}
                {/* {aboutusData?.sectionThree?.title} */}
              </h3>
            </Col>
            <Col sm={{ span: 12 }}>
              {/* <Col sm={{ span: 10, offset: 2 }}> */}
              <div
                // className="research-content"
                className={`research-content ${props.language === "ar"
                  ? "research-content-Arabic"
                  : ""
                  }`}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${global?.activeLanguage === "ar"
                      ? aboutusData?.arabic?.sectionThree
                        ?.content
                      : aboutusData?.sectionThree?.content
                      }`,
                  }}
                ></p>
              </div>
            </Col>
          </Row>
        </div>
        <ModalVideo
          channel="youtube"
          isOpen={openVideo}
          videoId={splitSrc?.[3]}
          onClose={() => setOpenVideo(false)}
        />
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showSpinner: state?.globalReducer?.showSpinner,
    global: state.globalReducer,
  };
};
export default connect(mapStateToProps)(AboutUsTab);

// export default AboutUsTab;
