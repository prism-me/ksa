import React, { useState } from "react";
import { connect } from "react-redux";
// import { Container } from "react-bootstrap";
import WishlistCard from "../../../components/WishlistCard/WishlistCard";
import { API } from "../../../http/API";
// import { wishlistData } from "../../../utils/data";

function WishlistGrid(props) {
  // const [data, setData] = useState(wishlistData);

  const deleteWishlistItem = (id) => {
    API.delete(`/auth/wishlist/${id}`, {
      headers: {
        Authorization: `Bearer ${props.user?.accessToken}`,
      },
    }).then((response) => {
      API.get(`/auth/wishlist`, {
        headers: {
          Authorization: `Bearer ${props.user?.accessToken}`,
        },
      }).then((response) => {
        props.wishlistSuccess(response.data);
      });
    });
  };
  return (
    <div className="wishlist-grid">
      {/* <Container fluid> */}
      {props.data?.length > 0 ? (
        props.data.map((x) => (
          <WishlistCard {...x} onDelete={deleteWishlistItem} />
        ))
      ) : (
        <p className="text-italic text-center fw-500">
          {props.activeLanguage == 'en' ? 'No items added to the wishlist' : 'لم يتم إضافة أي عنصر لقائمة المشتريات'}
        </p>
      )}
      {/* </Container> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    userWishlistProducts: state.productReducer?.userWishlistProducts,
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

export default connect(mapStateToProps, mapDispatchToProps)(WishlistGrid);
