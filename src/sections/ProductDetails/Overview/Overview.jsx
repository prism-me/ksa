import React, { useEffect, useReducer, useState } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import Toast from "react-bootstrap/Toast";
import { Nav } from "react-bootstrap";
import { IoIosHeartEmpty } from "react-icons/io";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import ButtonTheme from "../../../components/ButtonTheme";
import OverviewSlider from "./Slider";
import Login from "../../../components/Modals/Login/Login";
import Register from "../../../components/Modals/Register/Register";
import { useHistory } from "react-router-dom";
import {
  FacebookShareButton,
  PinterestShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { API } from "../../../http/API";
import Review from "../../../components/Modals/Review/Review";
import { constants } from "../../../utils/constants";
import { Helmet } from "react-helmet";
import { LinkContainer } from "react-router-bootstrap";

function Overview(props) {
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [activeVariant, setActiveVariant] = useState(null);
  const [metaTags, setMetaTags] = useState({
    title: "",
    url: "",
    image: "",
    description: "",
  });
  
  useEffect(() => {
    if (!props.isArabic) {
      if (props.variations?.length > 0) {
        setActiveVariant(props.variations[0]);
      } else {
        setActiveVariant(null);
      }
    } else {
      if (props?.arabic?.variations?.length > 0 && props.is_new == 1) {
        setActiveVariant(props.arabic.variations[0]);
      } else {
        if (props.variations?.length > 0) {
          setActiveVariant(props.variations[0]);
        } else {
          setActiveVariant(null);
        }
      }
    }

  }, [props.variations, props.language]);

  useEffect(() => {
    setMetaTags({
      ...metaTags,
      title: props.name || "Pigeon Global",
      url: `https://www.pigeonarabia.com/${props.global.activeLanguage
        }/product/${props.route || ""}`,
      image: props.featured_img || "",
      description: props.short_description || "",
    });
  }, [props]);

  const addToWishlist = () => {
    API.post(
      "/auth/wishlist",
      {
        user_id: props.user?.loggedInUser?._id,
        product_id: props._id,
      },
      {
        headers: {
          Authorization: `Bearer ${props.user?.accessToken}`,
        },
      }
    ).then((response) => {
      API.get(`/auth/wishlist`, {
        headers: {
          Authorization: `Bearer ${props.user?.accessToken}`,
        },
      }).then((response) => {
        props.wishlistSuccess(response.data);
      });
    });
  };


  const getSliderImages = () => {
    if (!props.isArabic) {
      if (activeVariant?.name && props.is_new != 1) {
        return activeVariant?.variation_images?.reverse()
          .map((x) => {
            return {
              original: x.image,
              thumbnail: x.image,
              thumbnailClass: "thumbnail-override",
              originalClass: "image-override",
              description: "",
            };
          });
      } else if (activeVariant?.name && props.is_new == 1) {
        // let temp = props.variations
        //   ?.filter((x) => x.name === activeVariant.name)
        return activeVariant?.variation_images?.sort(function (a, b) {
          return a.is_default || false - b.is_default || false;
        })
          ?.reverse().map((x) => {
            return {
              original: x.image,
              thumbnail: x.image,
              thumbnailClass: "thumbnail-override",
              originalClass: "image-override",
              description: "",
            };
          });
      } else {
        return props.single_default_images
          ?.sort(function (a, b) {
            return a.is_default - b.is_default;
          })
          ?.reverse()
          ?.map((x) => {
            // console.log("else xx : ", x)
            return {
              original: x.image,
              thumbnail: x.image,
              thumbnailClass: "thumbnail-override",
              originalClass: "image-override",
              description: "",
            };
          });
      }
    } else {
      if (activeVariant?.arabic_name && props.is_new != 1) {
        return activeVariant.variation_images
          ?.sort(function (a, b) {
            return a.is_default || false - b.is_default || false;
          })
          ?.reverse()
          .map((x) => {

            return {
              original: x.image,
              thumbnail: x.image,
              thumbnailClass: "thumbnail-override",
              originalClass: "image-override",
              description: "",
            };
          });
      } else if (activeVariant?.arabic_name && props.is_new == 1) {
        let temp = props.arabic.variations
          ?.filter((x) => x.arabic_name === activeVariant.arabic_name)

        return activeVariant.variation_images?.sort(function (a, b) {
          return a.is_default || false - b.is_default || false;
        })
          ?.reverse().map((x) => {
            return {
              original: x.image,
              thumbnail: x.image,
              thumbnailClass: "thumbnail-override",
              originalClass: "image-override",
              description: "",
            };
          });
      } else {
        if (props.arabic?.images_list) {
          return props.arabic?.images_list
            ?.sort(function (a, b) {
              return a.is_default - b.is_default;
            })
            ?.reverse()
            ?.map((x) => {
              return {
                original: x.image,
                thumbnail: x.image,
                thumbnailClass: "thumbnail-override",
                originalClass: "image-override",
                description: "",
              };
            });
        } else {

          return props.single_default_images
            ?.sort(function (a, b) {
              return a.is_default - b.is_default;
            })
            ?.reverse()
            ?.map((x) => {
              // console.log("else xx : ", x)
              return {
                original: x.image,
                thumbnail: x.image,
                thumbnailClass: "thumbnail-override",
                originalClass: "image-override",
                description: "",
              };
            });
        }
      }

    }

  };
  return (

    <div className="overview">
      <Helmet>
        <meta
          property="og:url"
          content={`https://www.pigeonarabia.com/${props.global.activeLanguage}/product/${props.route}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Your Website Title" />
        <meta property="og:description" content="Your description" />
        <meta
          property="og:image"
          content="https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FBreast%20Pump%20pro%20new%201.jpeg"
        />
      </Helmet>
      <Container fluid>
        <Row>
          <Col sm={7}>
            <OverviewSlider
              featureImage={props.featured_img}
              sliderImages={getSliderImages()}
              video={props.video_link}
            />
          </Col>
          <Col sm={5}>
            <div className="pr-sm-4">
              <div className="text-wrap">
                {props.isArabic ?
                  <h3>{`${props.isArabic ? props.arabic?.name || "" : props.name || ""
                    } ${activeVariant?.arabic_name ? "-" : ""}  ${activeVariant?.arabic_name || ""
                    }`}
                  </h3>
                  :
                  <h3>{`${props.isArabic ? props.arabic?.name || "" : props.name || ""
                    } ${activeVariant?.name ? "-" : ""}  ${activeVariant?.name || ""
                    }`}</h3>
                }
                <div className="d-flex align-items-center">
                  {(props.avg_rating || props.rating) && (
                    <ReactStars
                      count={5}
                      value={Math.round((props.avg_rating || 0) * 2) / 2}
                      onChange={() => { }}
                      size={20}
                      activeColor="gold"
                      color="#eaeaea"
                      edit={false}
                      isHalf
                      key={new Date().getTime()}
                    />
                  )}
                  <span
                    onClick={() => {
                      if (!props.user?.isAuthenticated) {
                        setLoginModal(true);
                      } else {
                        setReviewModal(true);
                      }
                    }}
                    className="write-review"
                  >
                    {
                      constants.site_content.write_review[
                      props.language || "en"
                      ]
                    }
                  </span>
                </div>
                <div
                  className="short-desc"
                  dangerouslySetInnerHTML={{
                    __html: props.isArabic
                      ? props.arabic?.short_description
                      : props.short_description,
                  }}
                ></div>
              </div>
              <div className="image-wrap">
                {props.language === "ar" ?
                  activeVariant?.name
                    ? activeVariant?.arabic_sortings?.map((x) => (
                      <React.Fragment>
                        <div
                          className={`text-logo ${props.language === "ar"
                            ? "text-logo-Arabic"
                            : ""
                            }`}
                        >
                          <span>{x}</span>
                        </div>
                      </React.Fragment>
                    ))
                    : props.arabic_tags?.map((x) => (
                      <React.Fragment>
                        <div
                          className={`text-logo ${props.language === "ar"
                            ? "text-logo-Arabic"
                            : ""
                            }`}
                        >
                          <span>{x}</span>
                        </div>
                      </React.Fragment>
                    )) :
                  activeVariant?.name
                    ? activeVariant?.sortings?.map((x) => (
                      <React.Fragment>
                        <div
                          className={`text-logo ${props.language === "ar"
                            ? "text-logo-Arabic"
                            : ""
                            }`}
                        >
                          <span>{x}</span>
                        </div>
                      </React.Fragment>
                    ))
                    : props.tags?.map((x) => (
                      <React.Fragment>
                        <div
                          className={`text-logo ${props.language === "ar"
                            ? "text-logo-Arabic"
                            : ""
                            }`}
                        >
                          <span>{x}</span>
                        </div>
                      </React.Fragment>
                    ))}
              </div>
              <div className="variations mt-3 d-flex">
                {props.isArabic ?
                  props.arabic?.variations?.length > 0 &&
                  props.arabic.variations
                    ?.filter((x) => x.arabic_name != null)
                    ?.map((y) => (
                      <div
                        className={`variation-item ${activeVariant?.arabic_name === y.arabic_name ? "active" : ""
                          }`}
                        onClick={() => setActiveVariant(y)}
                      >
                        <small>{props.language === "ar" ? y.arabic_name : y.name}</small>

                      </div>
                    )) :
                  props.variations
                    ?.filter((x) => x.name != null)
                    ?.map((y) => (
                      <div
                        className={`variation-item ${activeVariant?.name === y.name ? "active" : ""
                          }`}
                        onClick={() => setActiveVariant(y)}
                      >
                        <small>{props.language === "ar" ? y.arabic_name : y.name}</small>
                      </div>
                    ))
                }
              </div>
              <div className="buttons-wrap">
                <div className="buy-favorite-btn">
                  {/* {activeVariant?.link || activeVariant?.arabic_link || props.firstcry_link ?
                    <> */}
                      <ButtonTheme
                        className="buy-now-btn buy_cart"
                        outline
                        disabled={
                          (!activeVariant?.link || activeVariant?.link === "") && (!activeVariant?.arabic_link || activeVariant?.link === "") &&
                          !props.firstcry_link && !props.link
                        }
                        onClick={() => {
                          window
                            .open(
                              `${props.link ? props.link : activeVariant?.link
                                ? activeVariant.link
                                : activeVariant?.arabic_link ? activeVariant?.arabic_link : props.language == 'en' ? props.firstcry_link : props.arabic.firstcry_arabic_link
                              }`,
                              "_blank"
                            )
                            .focus();
                        }}
                      >
                        {props.language == 'en' ? 'Buy Now' : 'شراء'}
                      </ButtonTheme>
                    {/* </> : ""} */}

                  <div
                    className={`${props.language === "ar"
                      ? "heart-icon-wrap-Arabic"
                      : ""
                      }`}
                  >
                    {props.userWishlistProducts?.find(
                      (x) => x.product_id === props._id
                    )?._id ? (
                      <RiHeartFill className="icon" />
                    ) : (
                      props.user?.isAuthenticated ?
                        <RiHeartLine
                          className="icon heart-icon-wrap"
                          onClick={() => { addToWishlist(); }}
                        /> :
                        <LinkContainer
                          to={`/${props.global?.activeLanguage}/profile?active=wishlist`}
                          className="heart-icon-wrap"
                        >
                          <Nav.Link>
                            <IoIosHeartEmpty fontSize="24px" />
                          </Nav.Link>
                        </LinkContainer>
                    )}
                  </div>
                </div>
                <div className="partners d-block">
                  <div className="product-code-wrap">
                    <p className="mb-0">
                      {props.language == 'en' ? 'Product Code:' : 'رمز المنتج'} {activeVariant?.code || props.product_code}
                    </p>
                  </div>
                </div>

                <div className="social-media-icons">
                  <LinkedinShareButton
                    url={
                      "https://www.pigeonarabia.com/${props.global.activeLanguage}/mother-baby-products"
                    }
                    title={"Pigeon Global"}
                    source={`https://www.pigeonarabia.com/${props.global.activeLanguage}/product/electric-breast-pump-pro`}
                    media={`https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FBreast%20Pump%20pro%20new%201.jpeg`}
                    summary={`Check out our latest products here:
                      \n
                      https://www.pigeonarabia.com/${props.global.activeLanguage}/mother-baby-products
                      `}
                  >
                    <FaLinkedinIn className="social-icon" />
                  </LinkedinShareButton>
                  <FacebookShareButton
                    url={`https://www.pigeonarabia.com/${props.global.activeLanguage
                      }/product/${encodeURIComponent(props.route)}`}
                    data-href={metaTags.url}
                    quote={`Check out our latest products here:
                      \n
                      https://www.pigeonarabia.com/${props.global.activeLanguage}/mother-baby-products
                      `}
                    hashtag={"#pigeon"}
                  >
                    <FaFacebookF
                      data-href={metaTags.url}
                      className="social-icon"
                    />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={`https://www.pigeonarabia.com/${props.global.activeLanguage
                      }/product/${encodeURIComponent(props.route)}`}
                    title={props.name || "Pigeon Global"}
                    hashtags={["pigeon", "pigeon_arabia"]}
                  >
                    <FaTwitter className="social-icon" />
                  </TwitterShareButton>
                  <PinterestShareButton
                    media={props.featured_img}
                    url={`https://www.pigeonarabia.com/${props.global.activeLanguage
                      }/product/${encodeURIComponent(props.route)}`}
                    description={`Check out our latest products here:
                    \n
                    https://www.pigeonarabia.com/${props.global.activeLanguage}/mother-baby-products
                    `}
                  >
                    <FaPinterestP className="social-icon" />
                  </PinterestShareButton> 
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Review
          show={reviewModal}
          onHide={() => setReviewModal(false)}
          productId={props._id}
          userId={props.user?.loggedInUser?._id}
        />
      </Container>
      <div
        style={{
          position: "absolute",
          bottom: "50px",
          right: "10%",
          transform: "translateX(50%)",
          zIndex: 999999,
        }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Success</strong>
            <strong>
              <small
                style={{ cursor: "pointer" }}
                onClick={() =>
                  history.push(`/${props.global.activeLanguage}/wishlist`)
                }
              >
                View
              </small>
            </strong>
          </Toast.Header>
          <Toast.Body>Product added to your wishlist</Toast.Body>
        </Toast>
      </div>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    userWishlistProducts: state.productReducer?.userWishlistProducts,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () =>
      dispatch({
        type: "LOGOUT",
      }),
    wishlistSuccess: (data) =>
      dispatch({
        type: "GET_WISHLIST_SUCCESS",
        payload: {
          wishlist: data,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
