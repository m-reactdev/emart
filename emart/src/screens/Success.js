import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "../assets/imgs/banner.jpg";
import Banner from "../components/Banner";
import { resetOrder } from "../redux/actions/all-actions/CartAction";

const Success = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let purchasedItem = useSelector(({ CartState }) => {
    return CartState.purchasedItem;
  });

  let item = useSelector(({ CartState }) => {
    return CartState.item;
  });

  return (
    <>
      <Banner title={"Success"} background={Image} />
      <MDBContainer>
        <div className="success-page">
          {item !== null ? (
            <>
              <h2>
                Thank You <b>{item.name}</b>
              </h2>
              <p>Your order has been placed.</p>

              <div className="cart_block">
                {purchasedItem.length > 0 ? (
                  <MDBRow className="justify-content-center">
                    <MDBCol lg="7">
                      <MDBTable align="middle" responsive>
                        <MDBTableHead>
                          <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {purchasedItem.map((item, index) => {
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
                      <MDBBtn onClick={() => dispatch(resetOrder(navigate))}>
                        Home
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                ) : (
                  <p className="text-center"> Empty Cart</p>
                )}
              </div>
            </>
          ) : (
            <MDBBtn onClick={() => navigate("/")}>Home</MDBBtn>
          )}
        </div>
      </MDBContainer>
    </>
  );
};

export default Success;
