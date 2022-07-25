import React, { Component } from "react";
import { Route, Switch } from "react-router";
// import { routes } from "./src/navigator/routes";
// import Route from "./src/components/CustomRoute";
// import Login from "./src/../components/Modals/Login/Login";
// import Register from "./src/../components/Modals/Register/Register";
// import Error404 from "./src/pages/Error404";

const routes = [
  {
    name: "Home",
    path: "/",
    isPrivate: false,
    exact: true,
  },
  {
    name: "Categories",
    path: "/category",
    isPrivate: false,
    exact: true,
  },
  {
    name: "Products",
    path: "/products",
    isPrivate: false,
    exact: true,
  },
  {
    name: "Products",
    path: "/products/:id",
    isPrivate: false,
    exact: true,
  },
  {
    name: "Products",
    path: "/products/:id/:sub",
    isPrivate: false,
    exact: true,
  },
  {
    name: "Product",
    path: "/product/:id",
    isPrivate: false,
    exact: true,
  },
  {
    name: "About",
    path: "/about",
    isPrivate: false,
    exact: true,
  },
  {
    name: "MotherBabyWorld",
    path: "/mother-baby-world",
    isPrivate: false,
    exact: true,
  },
  {
    name: "GoodToKnow",
    path: "/good-to-know",
    isPrivate: false,
    exact: true,
  },
  {
    name: "BreastFeedingAdvisor",
    path: "/breastfeeding-advisor",
    isPrivate: false,
    exact: true,
  },
  {
    name: "Video",
    path: "/video",
    isPrivate: false,
    exact: true,
  },
  {
    name: "Contact",
    path: "/contact",
    isPrivate: false,
    exact: true,
  },
  {
    name: "FAQ",
    path: "/faq",
    isPrivate: false,
    exact: true,
  },
  {
    name: "Wishlist",
    path: "/wishlist",
    isPrivate: true,
    exact: true,
    show: false,
  },
  {
    name: "Profile",
    path: "/profile",
    isPrivate: true,
    exact: true,
    show: false,
  },
  {
    name: "Pregnancy",
    path: "/pregnancy",
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Post Pregnancy",
    path: "/post-pregnancy",
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Baby Care",
    path: "/baby-care",
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "First Time Father",
    path: "/first-time-father",
    isPrivate: false,
    exact: true,
    show: false,
  },
  // {
  //   name: "Article",
  //   path: "/article/:id",
  //   isPrivate: false,
  //   exact: true,
  //   show: false,
  // },
  {
    name: "Article",
    path: "/breastfeeding-advisor/:category/:article",
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Disclosure Policy",
    path: "/disclosure-policy",
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Policy on Privacy Protection",
    path: "/privacy-protection-policy",
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Social Media Policy",
    path: "/social-media-policy",
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Term Of Use",
    path: "/term-of-use",
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Official Social Media List",
    path: "/official-social-media-list",
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Subsidiaries",
    path: "/subsidiaries",
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Sitemap",
    path: "/sitemap",
    isPrivate: false,
    exact: true,
    show: false,
  },
];

export default (
  <Switch>
    {routes.map((route) => {
      return <Route path={route.path} key={route.path} />;
    })}
  </Switch>
);
