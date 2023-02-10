import React from "react";
import ReactStars from "react-rating-stars-component";
import { connect } from "react-redux";
import { Link, useHistory, withRouter } from "react-router-dom";
import ButtonTheme from "../ButtonTheme";

function GridItem(props) {
  const history = useHistory();
  return (
    <div
      className="grid-item"
      // onClick={() => history.push(`/product/${props.id}`)}
    >
      <Link
        to={`/${props.global.activeLanguage}/product/${encodeURIComponent(
          props.route
        )}`}
      >
        <div className="img-wrapper">
          <div className="wave-overlay"></div>
          <Link className="overlay-title">
            <ButtonTheme
              style={{
                background: "#fff",
                border: "1px solid #fff",
                borderRadius: "0",
                color: "#e65550",
              }}
              onClick={() =>
                history.push(
                  `/${props.global.activeLanguage}/product/${encodeURIComponent(
                    props.route
                  )}`
                )
              }
            >
              {props.global.activeLanguage == "en"
                ? "View Details"
                : "عرض التفاصيل"}
            </ButtonTheme>
          </Link>
          <img
            src={process.env.REACT_APP_IMAGE_BASE_URL + props.image}
            alt=""
            className="img-thumbnail"
          />
        </div>
        <div className="description">
          <h6 className="title">{props.name}</h6>
          <span className="rating">
            {(props.avg_rating || props.rating) && (
              <ReactStars
                count={5}
                value={Math.round((props.avg_rating || 0) * 2) / 2}
                size={18}
                activeColor="gold"
                edit={false}
                color="#eaeaea"
                isHalf
                key={new Date().getTime()}
              />
            )}
            {props.rating_count > 0 && (
              <span className="text-secondary small">
                ({props.rating_count || 0})
              </span>
            )}
          </span>
        </div>
      </Link>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GridItem));
