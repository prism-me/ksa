import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineHeart,
} from "react-icons/ai";
import { IoGridOutline } from "react-icons/io5";
import { BsEnvelope } from "react-icons/bs";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function BottomTabNavigator(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bottom-navigator-wrapper">
      <BottomNavigation
        showLabels={false}
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <Link to="/">
          <AiOutlineHome className="tab-icon" />
        </Link>
        <Link to={`/${props.activeLanguage}/mother-baby-products`}>
          <IoGridOutline className="tab-icon" />
        </Link>
        <Link to={`/${props.activeLanguage}/contact`}>
          <BsEnvelope className="tab-icon" />
        </Link>
        <Link to={`/${props.activeLanguage}/wishlist`}>
          <AiOutlineHeart className="tab-icon" />
        </Link>
      </BottomNavigation>
    </div>
  );
}

export default BottomTabNavigator;
