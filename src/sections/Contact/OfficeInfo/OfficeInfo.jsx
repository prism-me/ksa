import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GrMap } from "react-icons/gr";
import { BsEnvelope } from "react-icons/bs";
import LocationCard from "../../../components/LocationCard";

function OfficeInfo(props) {
  return (
    <div className="office-info">
      <Container>
        <Row>
          <Col sm={5}>
            <div className="section-title-underlined">
              <h2>{props.data?.title}</h2>
            </div>
            <div className="location-detail">
              <div className="icon-wrapper" 
             
              style={
                props.language === "en"  
              
              ? {float :"left" , marginTop : "-.2rem" , marginRight : ".3rem" , stroke : "#8d8b8b" }
              
              : {float :"right" , marginTop : "-.2rem" , marginLeft : ".3rem" , stroke : "#8d8b8b"}
            
            }
              
              >
                <GrMap />
              </div>
              <div className="location-text">
                <p
                  dangerouslySetInnerHTML={{
                    __html: props.data?.address_details,
                  }}
                ></p>
              </div>
            </div>
            {/* <div className="email-detail">
              <div className="icon-wrapper">
                <BsEnvelope />
              </div>
              <div className="email-text">
                <p>pmeinfo@areenme.ae</p>
              </div>
            </div> */}
          </Col>
          <Col sm={7}>
            <div className="map-wrapper">
              <LocationCard mapData={props.data} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OfficeInfo;
