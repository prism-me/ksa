import React from "react";
import { Container, Row } from "react-bootstrap";
import VideoItem from "../../components/VideoItem";
import { constants } from "../../utils/constants";
import { useEffect } from "react";
import { connect } from "react-redux";


const VideoGrid = (props) => {
  // console.log("====props.global===")
  // console.log(props.global.activeLanguage)

  const [oldAllVideos, setOldAllVideos] = React.useState(props.videos);
  const [allVideos, setAllVideos] = React.useState(props.videos);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [allCategories, setAllCategories] = React.useState([]);

  useEffect(() => {
    if (props.videos.length > 0 && props.videos != allVideos) {
      setAllVideos(props.videos)
      setOldAllVideos(props.videos)
      setCategories(props.videos)
    }
  }, [props.videos])


  const setCategories = (videos) => {
    let categories = {}
    videos.forEach((element, index, array) => {
      let category = {}
      if (typeof element.category_slug !== 'undefined') {
        category = {
          title: element.category,
          category_slug: element.category_slug,
          arabic_title: element.arabic.category
        }
        categories[element.category_slug] = category
      }


    })
    setAllCategories(categories)
  }
  const filterVideosByCategory = (category) => {

    setSelectedCategory(category)

    if (category == 'all') {
      setAllVideos(oldAllVideos)
      console.log(allVideos)
    } else {

      console.log(category)

      const filteredData = oldAllVideos.filter(video => video.category_slug == category);
      console.log(allVideos)
      setAllVideos(filteredData)
      console.log(filteredData)
    }

  }

  return (
    <div className="videos-section">
      <Container>
        <h1>
          {
            constants?.site_content?.videos_page_heading[
            props.language
            ]
          }
        </h1>

        <Row style={{ marginBottom: '20px' }} className="Videos-buttons-wrapper">
          <button
            className={selectedCategory == 'all' ? 'filterCategoryBtn active' : "filterCategoryBtn"}
            onClick={() => filterVideosByCategory("all")}
          >
            {props.global.activeLanguage == 'en' ? 'All' : "الكل"}
          </button>

          {/* <button
            onClick={() => filterVideosByCategory("breast-feeding")}
            className={selectedCategory == 'breast-feeding' ? 'filterCategoryBtn active' : "filterCategoryBtn"}
          >
            {props.global.activeLanguage == 'en' ? 'Breast Feeding' : "الرضاعة الطبيعية"}
          </button> */}
          {/* <button
            onClick={() => filterVideosByCategory("bottle-feeding")}
            className={selectedCategory == 'bottle-feeding' ? 'filterCategoryBtn active' : "filterCategoryBtn"}
          >
            {props.global.activeLanguage == 'en' ? 'Bottle Feeding' : "زجاجة الرضاعة"}
          </button> */}
          {Object.keys(allCategories).map(function (key, index) {
            return (
              <button
                onClick={() => filterVideosByCategory(allCategories[key].category_slug)}
                className={selectedCategory == allCategories[key].category_slug ? 'filterCategoryBtn active' : "filterCategoryBtn"}
              >
                {props.global.activeLanguage == 'en' ? allCategories[key].title : allCategories[key].arabic_title}
              </button>
            )
          })}

        </Row>
        <Row>
          {allVideos?.map((x, index) => (
            <VideoItem
              key={index + x.title}
              src={x.url}
              title={
                props.isArabic ? x.arabic?.title : x.title
              }
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

// export default VideoGrid;

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    // userWishlistProducts: state.productReducer?.userWishlistProducts,
    global: state.globalReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // logout: () =>
    //   dispatch({
    //     type: "LOGOUT",
    //   }),
    // wishlistSuccess: (data) =>
    //   dispatch({
    //     type: "GET_WISHLIST_SUCCESS",
    //     payload: {
    //       wishlist: data,
    //     },
    //   }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoGrid);
