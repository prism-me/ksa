import React, { useState } from "react";
import { Link } from "react-router-dom";

//images
// import banner1 from "./../../../assets/images/banner1.jpg";
// import banner1 from "./../../../assets/images/image-menu/q3.jpg";
// import banner2 from "./../../../assets/images/image-menu/q1.jpg";
// import banner3 from "./../../../assets/images/image-menu/q2.jpg";
import banner4 from "./../../../assets/images/image-menu/q4.jpeg";
import banner5 from "./../../../assets/images/image-menu/q5.jpeg";
import banner6 from "./../../../assets/images/image-menu/ABOUTPIGEON.jpg";
import banner7 from "./../../../assets/images/image-menu/PIGEONWAY.jpg";
import { constants } from "../../../utils/constants";

export default function ImageMenu(props) {
  // const history = useHistory();
  const [currentImage, setCurrentImage] = useState(banner6);
  const bannerImages = [banner6, banner7, banner5, banner4];

  const setSliderImage = (index) => {
    setCurrentImage(bannerImages[index]);
  };

  return (
    <React.Fragment>
      <div
        className="image-menu"
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <ul>
          <li
            // onMouseLeave={() => setSliderImage(0)}
            onMouseOver={() => setSliderImage(0)}
          >
            <Link to={`/${props.language}/about`}>
              <span className="link-txt">
                {constants?.site_content?.Image_Menu?.title1[props.language]}
                {/*About Pigeon*/}
              </span>
            </Link>
          </li>
          <li
            // onMouseLeave={() => setSliderImage(0)}
            onMouseOver={() => setSliderImage(1)}
          >
            <Link to={`/${props.language}/about`}>
              <span className="link-txt">
                {constants?.site_content?.Image_Menu?.title2[props.language]}
                {/*Pigeon Way*/}
              </span>
            </Link>
          </li>
          <li
            // onMouseLeave={() => setSliderImage(0)}
            onMouseOver={() => setSliderImage(2)}
          >
            {/* <a href="/breastfeeding-advisor"> */}
            <Link to={`/${props.language}/breastfeeding-advisor`}>
              <span className="link-txt">
                {/*Breastfeeding Advisor*/}
                {constants?.site_content?.Image_Menu?.title3[props.language]}
              </span>
            </Link>
            {/* </a> */}
          </li>
          <li
            // onMouseLeave={() => setSliderImage(0)}
            onMouseOver={() => setSliderImage(3)}
          >
            <Link to={`/${props.language}/mother-baby-world`}>
              <span className="link-txt">
                {constants?.site_content?.Image_Menu?.title4[props.language]}
                {/*Mother &amp; Baby World*/}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
