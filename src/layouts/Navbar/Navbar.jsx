import React, { useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import logo from "./../../assets/images/logo.svg";
import ReactCountryFlag from "react-country-flag"
import {
  IoIosHeartEmpty,
  IoIosMail,
  IoIosSearch,
  IoMdGlobe,
  IoIosLogOut,
  IoMdCart,
} from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { CgMenuLeftAlt } from "react-icons/cg";
import { Hidden } from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";
import Searchbar from "../../components/Searchbar/index";
import {
  getCategories,
  getCategoryProducts,
  getProducts,
} from "../../redux/products";
import { API } from "../../http/API";
import { types } from "../../redux/global/types";
import { routes } from "../../navigator/routes";

function MainNavbar(props) {
  const history = useHistory();
  const searchIconRef = React.useRef(null);
  const [isHome, setIsHome] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  // const [products, setProducts] = useState([]);

  //! Temporary API call for testing
  // useEffect(() => {
  //   API.get(`/products`)
  //     .then((response) => {
  //       setProducts(response.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  //Handle search function.
  const handleSearch = (e) => {
    // console.log(e.target.value);
    // setProducts(
    //   products.filter((product) =>
    //     product.includes(e.target.value)
    //   )
    // );
  };
  //!-------------

  useEffect(() => {
    if (
      history.location.pathname === `/` ||
      history.location.pathname === "/ar" ||
      history.location.pathname === "/en" ||
      history.location.pathname === "/ar/mother-baby-products" ||
      history.location.pathname.startsWith(
        `/${props.global.activeLanguage}/products`
      ) ||
      history.location.pathname.startsWith(`/ar/products`) ||
      history.location.pathname.startsWith(
        `/${props.global.activeLanguage}/mother-baby-products`
      ) ||
      history.location.pathname.startsWith(
        `/${props.global.activeLanguage}/home`
      )
      // history.location.pathname === "/" ||
      // history.location.pathname.startsWith("/products") ||
      // history.location.pathname.startsWith("/category") ||
      // history.location.pathname.startsWith("/home")
    ) {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [history.location]);

  useEffect(() => {

    function handleClickOutside(event) {
      if (searchIconRef && !searchIconRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {

    let a = history.location.pathname.split("/")

    setTimeout(() => {

      if (a[1] != props.global.activeLanguage || !props.global.activeLanguage) {
        props.setActiveLanguage(a[1] ? a[1] : "ar")
      }
    }, 1000)
  }, []);

  useEffect(() => {
    API.get(`/pages`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          let currentPage = response.data.find((x) => x.slug === "header");
          setCurrentPage(currentPage);

          API.get(`/all_widgets/${currentPage._id}`)
            .then((res) => {
              let widget_content =
                res.data?.[res.data?.length - 1]?.widget_content;
              setMenuItems(widget_content?.menuItems);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="navbar-wrap">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        fixed="top"
        className={props.show && isHome ? "" : "hide-curve"}
      >
        <Hidden mdUp>
          <Navbar.Brand href="#">
            <CgMenuLeftAlt
              onClick={() => props.toggleDrawer(true)}
              className="nav-toggle-override"
            />
            <img
              src={logo}
              alt="pigeon-logo"
              onClick={() => history.push("/")}
            />
          </Navbar.Brand>
        </Hidden>
        <Hidden smDown>
          <Navbar.Brand
            href={`/` || `/${props.global.activeLanguage}`}
          >
            <img src={logo} alt="pigeon-logo" />
          </Navbar.Brand>
        </Hidden>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto ml-4 pl-4 nav-text">
            <LinkContainer
              to={`/${props.global.activeLanguage}/about`}
            >
              <Nav.Link>{props.global.activeLanguage === "en" ? "About Pigeon" : "حول بيجون"}</Nav.Link>
            </LinkContainer>
            <LinkContainer
              to={`/${props.global.activeLanguage}/mother-baby-products`}
            >
              <Nav.Link>{props.global.activeLanguage === "en" ? "Our Products" : "منتجاتنا"}</Nav.Link>
            </LinkContainer>
            <LinkContainer
              to={`/${props.global.activeLanguage}/mother-baby-world`}
            >
              <Nav.Link>{props.global.activeLanguage === "en" ? "Mother & Baby World" : "عالم الأم والطفل"}</Nav.Link>
            </LinkContainer>
            <LinkContainer
              to={`/${props.global.activeLanguage}/good-to-know`}
            >
              <Nav.Link>{props.global.activeLanguage === "en" ? "Good to know" : "من الجيد أن تعلمي"}</Nav.Link>
            </LinkContainer>
            <LinkContainer
              to={`/${props.global.activeLanguage}/breastfeeding-advisor`}
            >
              <Nav.Link>{props.global.activeLanguage === "en" ? "Breastfeeding Advisor" : "مستشار الرضاعة الطبيعية"}</Nav.Link>
            </LinkContainer>

            {props.global.activeLanguage === 'en' ?
              <LinkContainer
                to={`/${props.global.activeLanguage}/blog`}
              >
                <Nav.Link>{props.global.activeLanguage === "en" ? "Blog" : "المدونة"}</Nav.Link>
              </LinkContainer>
              : ""}
            <LinkContainer
              to={`/${props.global.activeLanguage}/video`}
            >
              <Nav.Link>{props.global.activeLanguage === "en" ? "Video" : "فيديوهات"}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={`/${props.global.activeLanguage}/contact`}>
              <Nav.Link>{props.global.activeLanguage === "en" ? "Contact" : "تواصل معنا"}</Nav.Link>
            </LinkContainer>
          </Nav>
          <div className="dropdown">
            <Dropdown>
              <Dropdown.Toggle
                variant=" btn-sm"
                id="dropdown-basic">
                {props.global.activeLanguage === "en" ? "Language" : "اللغة"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as="button"
                  className={props.global.activeLanguage === "en" ? "active" : ""}
                >
                  <div onClick={() => {
                    props.setActiveLanguage("en");
                  }}>
                    {props.global.activeLanguage === "en" ? "English" : "الإنجليزية"}
                  </div>
                </Dropdown.Item>
                <Dropdown.Item as="button" className={props.global.activeLanguage === "ar" ? "active" : ""}>
                  <div onClick={() => {
                    props.setActiveLanguage("ar");
                  }}>
                    {props.global.activeLanguage === "en" ? "العربية" : "العربية"}
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Nav className="navbar-icons">
            <LinkContainer
              to={`/${props.global?.activeLanguage}/profile?active=wishlist`}
            >
              <Nav.Link>
                <IoIosHeartEmpty fontSize="24px" />
              </Nav.Link>
            </LinkContainer>
            <Nav.Link href="https://www.pigeon.com" target="_blank">
              <IoMdGlobe fontSize="24px" />
            </Nav.Link>

            {/* <LinkContainer
              to={`/${props.global?.activeLanguage}/cart`}
            >
              <Nav.Link>
                <IoMdCart fontSize="24px" />
              </Nav.Link>
            </LinkContainer> */}


            <Nav.Link href="#" className="searchbar-icon" ref={searchIconRef}>
              <IoIosSearch
                fontSize="24px"
                onClick={() => setShowSearch(!showSearch)}
              />
              {showSearch ? (
                <Searchbar
                  searchData={props.searchData}
                  onClose={() => setShowSearch(false)}
                  language={props.global?.activeLanguage}
                />
              ) : null}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    products: state?.productReducer?.products,
    allProducts: state?.productReducer?.allProducts,
    searchData: state?.productReducer?.searchData,
    totalProducts: state?.productReducer?.totalProducts,
    categories: state?.productReducer?.categories,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () =>
      dispatch({
        type: "LOGOUT",
      }),
    setActiveLanguage: (language) =>
      dispatch({
        type: types.SET_ACTIVE_LANGUAGE,
        payload: {
          language: language,
        },
      }),
    getProducts: (page) => dispatch(getProducts(page)),
    getCategories: () => dispatch(getCategories()),
    getCategoryProducts: (category) => dispatch(getCategoryProducts(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);
