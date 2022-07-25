import React, { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Searchbar = ({ searchData, onClose, language }) => {
  const history = useHistory();
  const [searchedItems, setSearchedItems] = useState([]);

  const handleSearch = (e) => {
    if (e.target.value.length == 0) {
      setSearchedItems([]);
    }
    if (e.target.value.length < 2) {
      return;
    }
    let filteredProducts = searchData?.products.filter(
      (x) =>
        x.name
          ?.toLowerCase()
          .includes(e.target.value?.toLowerCase())
    );

    let filteredCategories = searchData?.categories.filter(
      (x) =>
        x.name
          ?.toLowerCase()
          .includes(e.target.value?.toLowerCase())
    );
    let mappedProducts = [];
    let mappedCategories = [];
    if (filteredProducts?.length > 0) {
      mappedProducts = filteredProducts.map((x) => {
        return {
          name: x.name,
          link: `/${language}/product/${encodeURIComponent(
            x.route
          )}`,
        };
      });
    }
    if (filteredCategories?.length > 0) {
      mappedCategories = filteredCategories.map((x) => {
        return {
          name: x.name,
          link: `/${language}/products/${
            !x.parent_id ? x.route : x.parent_route?.route
          }`,
        };
      });
    }
    setSearchedItems([
      ...mappedProducts,
      ...mappedCategories,
    ]);
  };
  return (
    <Col xs={6} md={4}>
      <div className="searchbar-dropdown">
        <Form>
          <Form.Control
            type="text"
            placeholder="Search..."
            className="searchbar-field"
            onChange={handleSearch}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </Form>
        {searchedItems?.length > 0 && (
          <ul className="search-items-list">
            {searchedItems?.map((x) => (
              <li
                variant="light"
                onClick={() => {
                  history.push(x.link);
                  onClose();
                }}
              >
                {x.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Col>
  );
};

export default Searchbar;
