import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Wishlist from "../pages/Wishlist";
import UserProfile from "../pages/UserProfile";
import MotherBabyWord from "../pages/MotherBabyWorld";
import GoodToKnow from "../pages/GoodToKnow";
import Video from "../pages/Video";
import Pregnancy from "../pages/Pregnancy";
import FAQ from "../pages/FAQ";
import BreastFeedingAdvisor from "../pages/BreastFeedingAdvisor";
import PostPregnancy from "../pages/PostPregnancy";
import BabyCare from "../pages/BabyCare";
import FirstTimeFather from "../pages/FirstTimeFather";
import ArticleDetailPage from "../pages/ArticleDetailPage";
import DisclosurePolicy from "../pages/DisclosurePolicy";
import PrivacyProtection from "../pages/PrivacyProtection";
import SocialMediaPolicy from "../pages/SocialMediaPolicy";
import TermsOfUse from "../pages/TermsOfUse";
import OfficialSocialMedia from "../pages/OfficialSocialMedia";
import Subsidiaries from "../pages/Subsidiaries";
import Sitemap from "../pages/Sitemap";
import ProductCategories from "../pages/ProductCategories";
import Blog from "../pages/Blog";
import BlogDetailPage from "../pages/BlogDetailPage";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Order from "../pages/Order";

export const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    isPrivate: false,
    exact: true,
  },
  {
    name: "HomeRoute",
    path: "",
    component: Home,
    isPrivate: false,
    exact: true,
  },
  {
    name: "ourPrudcts",
    path: "/mother-baby-products",
    component: ProductCategories,
    isPrivate: false,
    exact: true,
  },
  // {
  //   name: "Cart",
  //   path: "/cart",
  //   component: Cart,
  //   isPrivate: false,
  //   exact: true,
  // },
  {
    name: "Checkout",
    path: "/checkout",
    component: Checkout,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Order",
    path: "/order",
    component: Order,
    isPrivate: false,
    exact: true,
  },
  // {
  //   name: "Categories",
  //   path: "/category",
  //   component: ProductCategories,
  //   isPrivate: false,
  //   exact: true,
  // },
  {
    name: "Products",
    path: "/products",
    component: Products,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Products",
    path: "/products/:id",
    component: Products,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Products",
    path: "/products/:id/:sub",
    component: Products,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Product",
    path: "/product/:id",
    component: ProductDetails,
    isPrivate: false,
    exact: true,
  },
  {
    name: "About",
    path: "/about",
    component: About,
    isPrivate: false,
    exact: true,
  },
  {
    name: "MotherBabyWorld",
    path: "/mother-baby-world",
    component: MotherBabyWord,
    isPrivate: false,
    exact: true,
  },
  {
    name: "GoodToKnow",
    path: "/good-to-know",
    component: GoodToKnow,
    isPrivate: false,
    exact: true,
  },
  {
    name: "BreastFeedingAdvisor",
    path: "/breastfeeding-advisor",
    component: BreastFeedingAdvisor,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Blog",
    path: "/blog",
    component: Blog,
    isPrivate: false,
    exact: true,
  },
  {
    name: "BlogDetailPage",
    path: "/blog/:id",
    component: BlogDetailPage,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Video",
    path: "/video",
    component: Video,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Contact",
    path: "/contact",
    // path: "/contact",
    component: Contact,
    isPrivate: false,
    exact: true,
  },
  {
    name: "FAQ",
    path: "/faq",
    component: FAQ,
    isPrivate: false,
    exact: true,
  },
  {
    name: "Wishlist",
    path: "/wishlist",
    component: Wishlist,
    isPrivate: true,
    exact: true,
    show: false,
  },
  {
    name: "Profile",
    path: "/profile",
    component: UserProfile,
    isPrivate: true,
    exact: true,
    show: false,
  },
  {
    name: "Pregnancy",
    path: "/stages-of-pregnancy",
    component: Pregnancy,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Post Pregnancy",
    path: "/post-pregnancy-care",
    component: PostPregnancy,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Baby Care",
    path: "/baby-care",
    component: BabyCare,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "First Time Father",
    path: "/first-time-father",
    component: FirstTimeFather,
    isPrivate: false,
    exact: true,
    show: false,
  },
  // {
  //   name: "Article",
  //   path: "/article/:id",
  //   component: ArticleDetailPage,
  //   isPrivate: false,
  //   exact: true,
  //   show: false,
  // },
  {
    name: "Article",
    path: "/breastfeeding-advisor/:category/:article",
    component: ArticleDetailPage,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Disclosure Policy",
    path: "/disclosure-policy",
    component: DisclosurePolicy,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Policy on Privacy Protection",
    path: "/privacy-protection-policy",
    component: PrivacyProtection,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Social Media Policy",
    path: "/social-media-policy",
    component: SocialMediaPolicy,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Term Of Use",
    path: "/term-of-use",
    component: TermsOfUse,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Official Social Media List",
    path: "/official-social-media-list",
    component: OfficialSocialMedia,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Subsidiaries",
    path: "/subsidiaries",
    component: Subsidiaries,
    isPrivate: false,
    exact: true,
    show: false,
  },
  {
    name: "Sitemap",
    path: "/sitemap",
    component: Sitemap,
    isPrivate: false,
    exact: true,
    show: false,
  },
];
