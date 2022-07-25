import React from "react";
import MainTitle from "./../../../components/MainTitle";
// import banner from "./../../../assets/images/products/banner.jpeg";
import banner from "./../../../assets/images/banner4.jpeg";
import { constants } from "../../../utils/constants";
import { connect } from "react-redux";

function ProductHeader(props) {
  const { global } = props;
  return (
    <div
      className="product-header"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <MainTitle
        text={
          global?.activeLanguage === "ar"
            ? constants?.site_content?.our_products_heading
                .ar
            : constants?.site_content?.our_products_heading
                .en
        }
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(ProductHeader);
