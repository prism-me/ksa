// import React, { useEffect, useState } from "react";
// import {
//   Badge,
//   Col,
//   Container,
//   Row,
// } from "react-bootstrap";
// import { useParams, useHistory } from "react-router-dom";
// import axios from "axios";
// import { connect } from "react-redux";
//
// // const currentDate = new Date().toLocaleDateString();
// const BlogItemDetails = (props) => {
//   const { id } = useParams();
//   const [blogDetails, setBlogDetails] = useState();
//
//   useEffect(() => {
//     if (id && id !== "") {
//       axios
//         .get(
//           `https://www.pigeonarabia.com/APIs/public/api/blogs/${id}`
//         )
//         .then((response) => {
//           if (
//             response.status === 200 ||
//             response.status === 201
//           ) {
//             setBlogDetails(response.data);
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   }, []);
//   return (
//     <div className="milk-drinks-section">
//       <Container>
//         <div className="content-wrap">
//           <div className="image-wrap">
//             <img
//               src={blogDetails?.banner_img}
//               alt="FeedingAdvisor"
//               className="image"
//             />
//           </div>
//           <div className="text-wrap">
//             <Row>
//               <Col sm={8}>
//                 <Badge
//                   variant="secondary"
//                   className="mb-2"
//                 ></Badge>
//                 <h2>{blogDetails?.title}</h2>
//
//                 <div
//                   className="description"
//                   dangerouslySetInnerHTML={{
//                     __html: blogDetails?.description,
//                   }}
//                 ></div>
//               </Col>
//               <Col sm={4}>
//                 <div className="detailed-image">
//                   <img
//                     src={blogDetails?.featured_img}
//                     alt=""
//                   />
//                 </div>
//               </Col>
//             </Row>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };
//
// // export default BlogItemDetails;
// const mapStateToProps = (state) => {
//   return {
//     global: state.globalReducer,
//   };
// };
//
// export default connect(mapStateToProps)(BlogItemDetails);

import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

// const currentDate = new Date().toLocaleDateString();
const BlogItemDetails = (props) => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState();

  useEffect(() => {
    if (id && id !== "") {
      axios
        .get(`https://www.pigeonarabia.com/APIs/public/api/blogs/${id}`)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setBlogDetails(response.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  // console.log(blogDetails);

  return (
    <div className="milk-drinks-section">
      <Container>
        <div className="content-wrap">
          <div className="image-wrap">
            <img
              src={blogDetails?.banner_img}
              alt="FeedingAdvisor"
              className="image"
            />
          </div>
          <div className="text-wrap">
            <Row>
              <Col sm={8}>
                <Badge variant="secondary" className="mb-2"></Badge>
                <h2>
                  {props.global.activeLanguage === "ar"
                    ? blogDetails?.arabic.title
                    : blogDetails?.title}
                </h2>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html:
                      props.global.activeLanguage === "ar"
                        ? blogDetails?.arabic?.description
                        : blogDetails?.description,
                  }}
                ></div>
                {/* <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: blogDetails?.description,
                  }}
                ></div> */}
              </Col>
              <Col sm={4}>
                <div className="detailed-image">
                  <img src={blogDetails?.featured_img} alt="" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

// export default BlogItemDetails;
const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(BlogItemDetails);
