import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBBadge,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
  } from "mdb-react-ui-kit";
import React from "react";
import { useLocation } from "react-router-dom";
import Image from "../assets/imgs/banner.jpg";
import Banner from "../components/Banner";

const Success = () => {
  let location = useLocation();
  let { item, cartItems } = location.state;

  console.log(cartItems);

  return (
    <>
      <Banner title={"Success"} background={Image} />
      <MDBContainer>
        <div className="success-page">
          <h2>Thank You <b>{item.name}</b></h2>
          <p>Your order has been placed.</p>
        </div>
        <div className="cart_block">
          {cartItems.length > 0 ? (
            <MDBRow className="justify-content-center">
              <MDBCol lg="7">
                <MDBTable align="middle">
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {cartItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              src={item.imgUrl.preview}
                              alt=""
                              style={{ width: "60px", height: "60px" }}
                              className="rounded-2"
                            />
                          </td>
                          <td>{item.title}</td>
                          <td>${item.price}</td>
                        </tr>
                      );
                    })}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
            </MDBRow>
          ) : (
            <p className="text-center"> Empty Cart</p>
          )}
        </div>
      </MDBContainer>
    </>
  );
};

export default Success;
