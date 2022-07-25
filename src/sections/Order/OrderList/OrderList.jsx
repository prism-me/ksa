import React, { useEffect, useReducer, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import "./OrderList.scss";

function OrderList(props) {
    const orderDetails = [
        {
            image: "https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg",
            Title: "Pigeon Breast Pump Manual - White",
            place_on: "06 Dec 2021",
            price: "AED 243.47",
            status: "Delivered",
        },
        {
            image: "https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg",
            Title: "Pigeon Breast Pump Manual - White",
            place_on: "06 Dec 2021",
            price: "AED 243.47",
            status: "Pending",
        },
        {
            image: "https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg",
            Title: "Pigeon Breast Pump Manual - White",
            place_on: "06 Dec 2021",
            price: "AED 243.47",
            status: "Delivered",
        },
        {
            image: "https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg",
            Title: "Pigeon Breast Pump Manual - White",
            place_on: "06 Dec 2021",
            price: "AED 243.47",
            status: "Delivered",
        },
        {
            image: "https://s3.eu-central-1.amazonaws.com/pigeon-gallery/album1%2FElectric%20Breast%20Pump%20Portable%20new.jpeg",
            Title: "Pigeon Breast Pump Manual - White",
            place_on: "06 Dec 2021",
            price: "AED 243.47",
            status: "Delivered",
        }
    ];
    return (
        <div className="order-list">
            <div className="list_box">
                <Table>
                    <thead>
                        <td>Image</td>
                        <td>Product List</td>
                        <td>Status</td>
                    </thead>
                    <tbody>
                        {orderDetails?.map((item, index) => (
                            <tr key={index}>
                                <td className="td_img"><img src={item.image} width='100px' height='100px' /></td>
                                <td className="td_product">
                                    <h2>{item.Title}</h2>
                                    Place on : <span>{item.place_on}</span><br></br>
                                    Price : <span>{item.price}</span>
                                </td>
                                <td className="td_status"><p className={item.status === "Delivered" ? "status_green" : "status_red"}>{item.status}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        global: state.globalReducer,
    };
};

export default connect(mapStateToProps)(OrderList);

