import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
// import PageItem from "react-bootstrap/PageItem";
import GridItem from "../../../components/GridItem";
// import { categoryProducts } from "../../../utils/data";

const perPage = 12;

export default function ProductGrid(props) {
  const [paginationItems, setPaginationItems] =
    useState(null);
  const [activePage, setActivePage] = useState(
    props.currentPage
  );
  // const [disableFirst, setDisableFirst] = useState(false);
  // const [disableLast, setDisableLast] = useState(false);

  useEffect(() => {
    let paginatedItems = [];
    let count = props.totalProducts / perPage;
    if (
      (props.totalProducts > perPage &&
        props.totalProducts % perPage > 0) ||
      (count > 0 && count < 1)
    ) {
      ++count;
    }
    let prevPage = props.currentPage - 1;
    paginatedItems.push(
      <Pagination.First
        disabled={prevPage < 1}
        onClick={() => props.handlePageClick(1)}
      />
    );
    paginatedItems.push(
      <Pagination.Prev
        disabled={prevPage < 1}
        onClick={() => {
          if (prevPage < 1) {
            props.handlePageClick(1);
            // setDisableFirst(true);
          } else {
            props.handlePageClick(prevPage);
          }
        }}
      />
    );

    for (let index = 1; index <= count; index++) {
      paginatedItems.push(
        <Pagination.Item
          key={index}
          active={index === props.currentPage}
          onClick={
            index === activePage
              ? null
              : () => props.handlePageClick(index)
          }
        >
          {index}
        </Pagination.Item>
      );
    }
    let nextPage = props.currentPage + 1;
    paginatedItems.push(
      <Pagination.Next
        disabled={nextPage > parseInt(count)}
        onClick={() => {
          if (nextPage > parseInt(count)) {
            props.handlePageClick(parseInt(count));
            // setDisableLast(true);
          } else {
            props.handlePageClick(nextPage);
          }
        }}
      />
    );
    paginatedItems.push(
      <Pagination.Last
        disabled={nextPage > parseInt(count)}
        onClick={() =>
          props.handlePageClick(parseInt(count))
        }
      />
    );
    setPaginationItems(paginatedItems);
  }, [props.totalProducts, activePage, props]);

  useEffect(() => {
    setActivePage(props.currentPage);
  }, [props.currentPage]);

  // const paginationItems=()=>{

  // }
  // console.log(props.bannerType);
  return (
    <div className="products-grid">
      <Container>
        <Row>
          {props.products?.length > 0 ? (
            props.products.map((product) => (
              <Col xs={12} sm={4}>
                <GridItem
                  id={product._id}
                  route={product.route}
                  name={
                    props.isArabic
                      ? product.arabic?.name
                      : product.name
                  }
                  image={product.featured_img}
                  rating={product.rating}
                  avg_rating={product.avg_rating}
                  rating_count={
                    product.reviews?.length || 0
                  }
                  firstcry_link={product.firstcry_link}
                  isBanner={
                    // props.bannerType?.value !== "" ||
                    // props.bannerType?.value !== "Popularity"
                    true
                  }
                  bannerType={
                    product.sortings?.find(
                      (x) =>
                        x.toLowerCase() ===
                        props.bannerType?.value?.toLowerCase()
                    ) || product.sortings?.[0]
                  }
                />
              </Col>
            ))
          ) : (
            <div className="d-flex p-5 w-100 justify-content-center align-items-center">
              <p
                style={{ color: "#aaa", fontSize: "20px" }}
              >
                {
                  props.isArabic ?
                    <em> سيتم تحديث المنتجات في هذه الفئة قريباً. ابقى على اطلاع!</em>
                    :
                    <em>  The products for this category will be updated soon. Stay Tuned! </em>
                }
              </p>
            </div>
          )}
        </Row>
        <div className="pagination-wrapper">
          {props.totalProducts > 0 && (
            <Pagination>
              {paginationItems?.map((x) => x)}
            </Pagination>
          )}
        </div>
      </Container>
    </div>
  );
}
