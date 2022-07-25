import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { API } from "../../../http/API";
import logo from "./../../../assets/images/pigeon_placeholder.png";
import {} from "react-redux";
import { connect } from "react-redux";

function PigeonLogo(props) {
  const [pigeonLogoData, setPigeonLogoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    API.get(`/pages`)
      .then((response) => {
        if (
          response.status === 200 ||
          response.status === 201
        ) {
          let currentPage = response.data.find(
            (x) => x.slug === "pigeon-logo"
          );
          setCurrentPage(currentPage);
          API.get(`/all_widgets/${currentPage._id}`)
            .then((res) => {
              let widget_content =
                res.data[res.data.length - 1]
                  .widget_content;
              setPigeonLogoData(widget_content);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const { global } = props;
  return (
    <div className="pigeon-logo-tab">
      <Container>
        {/* <div className="section-title-underlined">
          <h2>Pigeon Logo</h2>
        </div> */}
        <div className="content">
          <p
            dangerouslySetInnerHTML={{
              __html: `${
                global?.activeLanguage === "ar"
                  ? pigeonLogoData?.arabic?.content
                  : pigeonLogoData?.content
              }`,
            }}
          ></p>
        </div>
        <div className="logo">
          <img
            src={pigeonLogoData?.logo}
            alt="Pigeon Logo"
          />
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    global: state.globalReducer,
  };
};

export default connect(mapStateToProps)(PigeonLogo);
