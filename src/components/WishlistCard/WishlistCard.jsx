import React from "react";
import { Badge } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import { useHistory } from "react-router-dom";
// import { GrYoutube, GrFacebook, GrInstagram } from "react-icons/gr";
import {
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  FacebookShareButton,
  PinterestShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import ButtonTheme from "../ButtonTheme";
import { connect } from "react-redux";

function WishlistCard(props) {
  const history = useHistory();
  return (
    <div className="wishlist-card">
      <TiDelete
        className="remove-icon"
        onClick={() => props.onDelete(props._id)}
      />
      <div className="image">
        <img src={props.product?.featured_img} alt="" />
      </div>
      <div className="details">
        <h5 className="name">{props.global.activeLanguage == 'en' ? props.product?.name : props.product?.arabic.name }</h5>
        <Badge variant="primary">{props.global.activeLanguage == 'en' ? props.product?.categories.name : props.product?.categories.arabic.name }</Badge>
        {/* <p className="description m-0">some short description goes here</p> */}
        <div className="logos-wrap">
          <div className="text-logo">
            {props.product?.tags?.map((x) => (
              <span className="badge badge-secondary">{x}</span>
            ))}
          </div>
          {/* <div className="text-logo" style={{ borderLeft: "none" }}>
            <span className="badge badge-secondary">BPA FREE</span>
          </div>
          <div className="text-logo" style={{ borderRight: "none" }}>
            <span className="badge badge-secondary">ELECTRIC</span>
          </div> */}
        </div>
      </div>
      <div className="buttons">
        <div className="simple-buttons">
          <div className="view">
            <ButtonTheme
              variant="primary"
              size="sm"
              outline
              onClick={() => {
                history.push(
                  `/${
                    props.global?.activeLanguage
                  }/product/${encodeURIComponent(props.product?.route)}`
                );
              }}
            >
              {props.global.activeLanguage == 'en' ? 'View Details' : 'عرض التفاصيل'}
            </ButtonTheme>
          </div>
          <div className="buy">
            <ButtonTheme
              variant="primary"
              size="sm"
              disabled={!props.product?.firstcry_link}
              onClick={() => {
                window
                  .open(props.product?.firstcry_link || "", "_blank")
                  .focus();
              }}
            >
              {props.global?.activeLanguage == 'en' ? 'Buy Now' :'شراء'}
            </ButtonTheme>
          </div>
        </div>
        <div className="social-buttons">
          <small className="mr-2">{props.global?.activeLanguage == 'en' ? 'Share to' : 'مشاركة' }</small>
          {/* <GrFacebook className="facebook" />
          <GrInstagram className="instagram mx-2" />
          <GrYoutube className="youtube" /> */}
          <LinkedinShareButton
            url={`https://www.pigeonarabiacom/${props.global?.activeLanguage}/products`}
            title={"Pigeon Global"}
            source={`https://www.pigeonarabia.com/${
              props.global?.activeLanguage
            }/product/${encodeURIComponent(props.route)}`}
            summary={`Check out our latest products here:
                      \n
                      https://www.pigeonarabia.com/${props.global?.activeLanguage}/mother-baby-products
                      `}
          >
            <FaLinkedinIn className="social-icon" />
          </LinkedinShareButton>
          <FacebookShareButton
            url={`https://www.pigeonarabia.com/${
              props.global?.activeLanguage
            }/product/${encodeURIComponent(props.route)}`}
            quote={`Check out our latest products here:
                      \n
                      https://www.pigeonarabia.com/${props.global?.activeLanguage}/mother-baby-products
                      `}
            hashtag={"#pigeon"}
          >
            <FaFacebookF className="social-icon" />
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://www.pigeonarabia.com/${
              props.global?.activeLanguage
            }/product/${encodeURIComponent(props.route)}`}
            title={props.name || "Pigeon Global"}
            hashtags={["pigeon", "pigeon_arabia"]}
          >
            <FaTwitter className="social-icon" />
          </TwitterShareButton>
          <PinterestShareButton
            media={props.featured_img}
            url={`https://www.pigeonarabia.com/${
              props.global?.activeLanguage
            }/product/${encodeURIComponent(props.route)}`}
            description={`Check out our latest products here:
                    \n
                    www.pigeonarabia.com/${props.global?.activeLanguage}/mother-baby-products
                    `}
          >
            <FaPinterestP className="social-icon" />
          </PinterestShareButton>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistCard);
