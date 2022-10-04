import React, { Component } from "react";
import ImageMenu from "../sections/Home/ImageMenu/ImageMenu";
import ProductsGrid from "../sections/Home/ProductsGrid/ProductsGrid";
import PromoBanner from "../sections/Home/PromoBanner";
import Slider from "../sections/Home/Slider";
import RelatedArticle from "../sections/Products/RelatedArticle";
import Welcome from "../sections/Home/Welcome/Welcome";
import { connect } from "react-redux";
import { getCategories } from "../redux/products";
import Help from "../sections/Products/Help/Help";
import { Helmet } from "react-helmet";

class Home extends Component {
  state = {
    currentPage: null,
    categories: this.props.categories?.filter((x) => x.parent_id === null),
  };

  componentDidUpdate(prevProps) {
    if (this.props.categories !== prevProps.categories) {
      //filtering only parent categories
      let categories = [
        ...this.props.categories?.filter((x) => x.parent_id === null),
      ];
      this.setState({
        categories,
      });
    }
  }
  render() {
    const { global } = this.props;
    return (
      <div>
        <Helmet htmlAttributes>
          <html lang="en" />
          <title>
            {global?.activeLanguage === "ar"
              ? "Pigeon KSA Arabia I منتجات العناية بالأم والطفل التي أتسوقها الآن"
              : "Pigeon KSA Arabia I Mother & Baby Care Products I Shop Now"}
          </title>
          <meta
            property="og:title"
            content={
              global?.activeLanguage === "ar"
                ? "Pigeon KSA Arabia | منتجات العناية بالأم والطفل التي أتسوقها الآن"
                : "Pigeon KSA Arabia | Mother & Baby Care Products I Shop Now"
            }
          />
          <meta
            name="description"
            content={
              global?.activeLanguage === "ar"
                ? "حل شامل لتلبية جميع احتياجاتك من الأمومة إلى رعاية الأطفال. تصفح مجموعتنا الواسعة من المنتجات التي تتراوح من شافطات حليب الأم ، والزجاجات ، والحلمات ، وسادات الثدي والمزيد."
                : "A one-stop solution to meet all your needs from maternity to childcare. Browse our wide range of products ranging from breast pumps, bottles, teats, breast pads and more."
            }
          />
          <script type="application/ld+json">
            {global?.activeLanguage === "ar" ? "" : ""}
          </script>
        </Helmet>
        <Slider activeLanguage={global?.activeLanguage} />
        <Welcome language={global?.activeLanguage} />
        <ImageMenu language={global?.activeLanguage} />
        <ProductsGrid
          categories={this.state.categories}
          isArabic={global?.activeLanguage === "ar"}
          language={global?.activeLanguage}
        />
        <PromoBanner language={global?.activeLanguage} />
        <RelatedArticle
          language={global?.activeLanguage}
          articleTitle={
            global?.activeLanguage === "ar"
              ? "النظام الغذائي للأم خلال فترة الرضاعة الطبيعية"
              : "Mother’s Diet During the Breastfeeding Period"
          }
          articleDescription={
            global?.activeLanguage === "ar"
              ? "<h3>اعتني بنظامك الغذائي من أجل طفلك</h3>\n\n<p>تحتاج الأمهات بعد الولادة إلى طاقة أكثر بكثير مما تتطلبه أثناء الحمل. والسبب أنهم ينتجون اللبن ويحتاجون إلى التغذية لذلك. علاوة على ذلك، فإن الأم تعتني بالطفل وتنام أقل بكثير. لهذا السبب من المهم الاهتمام بالنظام الغذائي للأم خلال هذا الوقت.</p>"
              : "<h3>Take care of your diet for your baby&rsquo;s sake</h3>\n\n<p>Postpartum mothers require far more energy than during pregnancy. The reason is that they are producing breast milk and they require nutrition for that. Moreover, the mother is also taking care of the baby and getting far less sleep. That is why it is important to take care of the mother&rsquo;s diet during this time.</p>"
          }
          articleImage={
            "https://pigeon.b-cdn.net/album1%2FMother%E2%80%99s%20Diet%20Banner.jpeg"
          }
          articleRoute={`/${global?.activeLanguage}/breastfeeding-advisor/hints-for-continuing-to-breastfeed/mothers-diet-during-the-breastfeeding-period`}
        />
        <Help
          isArabic={global?.activeLanguage === "ar"}
          language={global?.activeLanguage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state?.productReducer?.categories,
    global: state.globalReducer,
    pages: state?.allPages.pages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
