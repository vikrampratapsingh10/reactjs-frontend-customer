import React, { useEffect } from "react";
import Navigation from "../../navigation/Navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryDetail } from "../../../redux-config/DeliveryDetailSlice";
import "../payments/payments.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { paymentSchema } from "./schemas/paymentIndex";
import api from "../../../WebApi/api";

export default function Checkout() {
  const { currentCustomer } = useSelector((state) => state.customer);
  const location = useLocation();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    deliveryAddress: "",
    contactNumber:"",
    contactPerson:"",
    payment:""
  };

  const totalBill =
    location.state.orderpackage.billamount +
    location.state.orderpackage.SHIPPING_FEES;
  const products = location.state.orderpackage.cartitems;
  const dispatch = useDispatch();
   
 // --------------------------------------------------------
 const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

useEffect(() => {
  loadScript("https://checkout.razorpay.com/v1/checkout.js");
},[]);

// --------------------------------------------------------


  const {values,errors,touched,name,deliveryAddress,contactPerson,contactNumber,payment,handleChange,handleBlur,handleSubmit}=useFormik({
    initialValues:initialValues,
    validationSchema:paymentSchema,
    onSubmit:async(values)=>{
  
      localStorage.setItem("values",JSON.stringify(values))
      console.log(values);
      const checkout=JSON.parse(localStorage.getItem("values"));
        if (values.payment ==='online') {
          window.alert(values.payment)
           displayRazorpay();
        } else {
          dispatch(setDeliveryDetail(checkout));
          console.log(checkout)
          const response = await axios.post(api.PLACE_ORDER, {
            customerid: currentCustomer._id,
            deliveryAddress: values.deliveryAddress,
            contactNumber: values.contactNumber,
            contactPerson: values.contactPerson,
            orderItems: products,
          });
          console.log(response);
          toast.success("Order Placed Successfully");
          navigate("/ordersuccess");
        }
    }
  })
 
  const displayRazorpay = async () => {
    let response = await axios.post(api.RAZORPAY_MODE, {
      totalBill,
    });
    const checkout=JSON.parse(localStorage.getItem("values"));
    let data = response.data;
    const options = {
      key: "rzp_test_Vhg1kq9b86udsY",
      currency: data.currency,
      amount: data.amount,
      name: "Learning To Code Online",
      description: "Test Wallet Transaction",
      image:
        "https://tse2.mm.bing.net/th?id=OIP.4p7ztcUW4gAM6_1VGZ1EVwHaIj&pid=Api&P=0",
      order_id: data.id,
      handler: async (response) => {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        toast.success("Order Success");
    
        dispatch(setDeliveryDetail(checkout));
        const res = await axios.post(api.PLACE_ORDER, {
          customerid: currentCustomer._id,
          deliveryAddress: checkout.deliveryAddress,
          contactNumber: checkout.contactNumber,
          contactPerson: checkout.contactPerson,
          orderItems: products,
        });
        console.log(res);
        toast.success("Order Placed Successfully");
        navigate("/ordersuccess");
      },
      prefill: {
        name: "vikram",
        email: "vikrampratapsingh628@gmail.com",
        contact: "9131662204",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Navigation />
      <ToastContainer />

      <Link to={"/cart"}>
        {" "}
        <button type="button" className="btn btn-primary mb-4 ml-2">
          Back To Cart
        </button>
      </Link>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-8 mb-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0 fw-100">Biling details</h5>
                </div>
                <div className="card-body">
                  {/* 2 column grid layout with text inputs for the first and last names */}
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <lable
                          className="input-block labellogin"
                          htmlFor="email"
                        >
                          <span>Name</span>
                          <br />
                          <input
                            type="text"
                            autoComplete="off"
                            name="name"
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="standard"
                            className="logininput"
                          />
                          {errors.name && touched.name ? (
                            <small className="form-error">{errors.name}</small>
                          ) : null}
                        </lable>
                      </div>
                    </div>
                  </div>
                  {/* Text input */}
                  <div className="form-outline mb-4">
                    <lable className="input-block labellogin" htmlFor="email">
                      <span>Delivery Address</span>
                      <br />
                      <input
                        type="text"
                        autoComplete="off"
                        name="deliveryAddress"
                        id="deliveryAddress"
                        value={values.deliveryAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="standard"
                        className="logininput"
                      />
                      {errors.deliveryAddress && touched.deliveryAddress ? (
                        <small className="form-error">{errors.deliveryAddress}</small>
                      ) : null}
                    </lable>
                  </div>
                  {/* Text input */}
                  <div className="form-outline mb-4">
                    <lable
                      className="input-block labellogin"
                      htmlFor="contactPerson"
                    >
                      <span>Contact Person Name</span>
                      <br />
                      <input
                        type="text"
                        autoComplete="off"
                        name="contactPerson"
                        id="contactPerson"
                        value={values.contactPerson}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="standard"
                        className="logininput"
                      />
                      {errors.contactPerson && touched.contactPerson ? (
                        <small className="form-error">{errors.contactPerson}</small>
                      ) : null}
                    </lable>
                  </div>
                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <lable
                      className="input-block labellogin"
                      htmlFor="contactNumber"
                    >
                      <span>Contact Number</span>
                      <br />
                      <input
                        type="text"
                        autoComplete="off"
                        name="contactNumber"
                        id="contactNumber"
                        value={values.contactNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="standard"
                        className="logininput"
                      />
                      {errors.contactNumber && touched.contactNumber ? (
                        <small className="form-error">{errors.contactNumber}</small>
                      ) : null}
                    </lable>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      <strong> Products</strong>
                    </li>
                    {products.length > 1 &&
                      products.map((product) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          {product.productId.title.substring(0, 40)}
                          <br />
                          <span>Qty {product.quantity}</span>
                        </li>
                      ))}
                    {products.length === 1 &&
                      products.map((product) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          {product.productId.title.substring(0, 40)}
                          <br />
                          <span>Qty 1</span>
                        </li>
                      ))}
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <small className="mb-0">(including Shiping)</small>
                        </strong>
                      </div>
                      <span>
                        <strong>&#8377;{totalBill}</strong>
                      </span>
                    </li>
                    <div>
                      <strong>Make Payemnt</strong>
                      <div className="col-md-5 mb-3">
                        <label htmlFor="payment" className="form-label"></label>
                        <select   className="form-select form-select-lg w-100" 
                    id="payment" 
                    name="payment" 
                    value={values.payment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                        >
                          <option value="default" selected>
                            Select Payment Mode
                          </option>
                          <option value='online'>RazorPay</option>
                          <option value="debit">Debit Card</option>
                          <option value="credit">Credit Card</option>
                        </select>
                      </div>
                    </div>
                  </ul>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Make purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div>
          {/* Button trigger modal */}
          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Order Sucessully
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                    <div className="text-right">
                      {" "}
                      <i
                        className="fa fa-close close"
                        data-dismiss="modal"
                      />{" "}
                    </div>
                    <div className="px-4 py-5">
                      <h5 className="text-uppercase">
                        {currentCustomer.customerName}
                      </h5>
                      <h4 className="mt-5 theme-color mb-5">
                        Thanks for your order
                      </h4>
                      <span className="theme-color">Payment Summary</span>
                      <div className="mb-3">
                        <hr className="new1" />
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="font-weight-bold">
                          Total Product Price
                        </span>
                        <span className="text-muted">
                          &#8377;{location.state.orderpackage.billamount}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <small>Shipping</small>
                        <small>
                          &#8377;{location.state.orderpackage.SHIPPING_FEES}
                        </small>
                      </div>
        <div className="d-flex justify-content-between mt-3">
                        <span className="font-weight-bold">Total</span>
                        <span className="font-weight-bold theme-color">
                          &#8377;{totalBill}
                        </span>
                      </div>
                      <div className="text-center mt-5">
                        <button
                          className="btn btn-primary"
                          data-dismiss="modal"
                        >
                          Track your order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Link to={"/home"}>
                    <button type="button" className="btn btn-primary">
                      {" "}
                      Go to Home Page
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
