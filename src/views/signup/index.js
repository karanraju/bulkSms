import React, { useState } from "react";
// import { Image, Input } from "antd";
// import { Button, Checkbox, Form } from "antd";
import { useEffect } from "react";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";
import PhoneInput from "antd-phone-input";
import OtpInput from "react-otp-input";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// import { NavLink, Link, useLocation } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { Formik } from "formik";

export const SignUp = () => {
  const navigate = useNavigate();
  const [signInShow, setSignInShow] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [collectData, setCollectData] = useState();
  const [collectPassword, setcollectPassword] = useState();
  const [signupData, setSignupData] = useState();
  console.log("signupData", signupData);
  const [showPassword, setShowPassword] = useState(false);
  const [statusPassword, setStatusPassword] = useState();
  const [loginData, setLoginData] = useState();
  const [loginDataSatus, setLoginDataSatus] = useState();

  console.log("loginDataSatus", loginDataSatus);

  console.log("otp", loginData);

  const onFinish = async (values) => {
    console.log("collectData", collectData);
    const payload = {
      // message: collectData?.message,
      Number: collectData?.Number,
      email: collectData?.email,
      firstName: collectData?.firstName,
      lastName: collectData?.LastName,
      address: collectData?.address,
      city: collectData?.city,
      country: collectData?.country,
      zip: collectData?.Zip,
      aboutMe: collectData?.aboutMe,

      // email: values.username,
      // password: values?.password,
      // mobileNumber: values?.mobileNumber
      //   ? `+` +
      //     values.mobileNumber.countryCode +
      //     `-` +
      //     values.mobileNumber.areaCode +
      //     values.mobileNumber.phoneNumber
      //   : null,
    };
    console.log("Success:", values, payload);
    const response = await fetch(`${process.env.REACT_APP_API}/api/signUp`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setSignupData(result);
    console.log("********", result);
  };

  const onsetPassword = async () => {
    const payload = {
      password: collectPassword?.password,
      number: collectData?.Number,
    };

    console.log("payload", payload);
    // console.log("Success:", values, payload);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/setpassword`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log("result", result);
    setStatusPassword(result);
    // setSignupData(result);
    // console.log("********", result);
  };

  const onLogin = async () => {
    const payload = {
      Email: loginData?.Email,
      Password: loginData?.Password,
    };

    console.log("payload", payload);
    // console.log("Success:", values, payload);
    const response = await fetch(`${process.env.REACT_APP_API}/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("result", result);
    setLoginDataSatus(result);
    // setSignupData(result);
    // console.log("********", result);
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  // useEffect(() => {
  //   fetch("http://localhost:3000/").then((response) => {
  //     console.log(
  //       "helooooo",
  //       response?.json().then((data) => console.log("dataa", data))
  //     );
  //     // console.log("resspnse", response.json().strin);
  //     // return response.json();
  //   });
  //   // .then((data) => {
  //   //   console.log("dataaaa", data);
  //   // });
  // }, []);

  const getData = () => {
    if (otp == signupData?.otp) {
      console.log("sbc");
    }
  };

  useEffect(() => {
    if (loginDataSatus?.token) {
      navigate("/dashboard");
    }
  }, [loginDataSatus]);

  useEffect(() => {
    if (otp == signupData?.otp) {
      console.log("hello");
      setShowPassword(true);
    }
  }, [otp]);

  useEffect(() => {
    if (loginData) {
      onLogin();
    }
  }, [loginData]);

  useEffect(() => {
    if (collectData) {
      onFinish();
    }
  }, [collectData]);

  useEffect(() => {
    if (collectPassword) {
      onsetPassword();
    }
  }, [collectPassword]);

  const SignupSchema = Yup.object().shape({
    Number: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    LastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    aboutMe: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <Row className="d-flex  align-items-center justify-content-center  p-5">
      <Col md="8">
        {statusPassword?.updated == true ? (
          <div>
            <Card>
              <CardHeader>
                <h5 className="title">Login Page</h5>
              </CardHeader>
              <CardBody>
                <Formik
                  // validationSchema={schema}
                  onSubmit={(data) => setLoginData(data)}
                  initialValues={{
                    Email: "",
                    Password: "",
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>Email</label>
                            <Input
                              name="Email"
                              defaultValue="Mike"
                              placeholder="Email"
                              type="text"
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>PassWord</label>
                            <Input
                              name="Password"
                              defaultValue="Andrew"
                              placeholder="Password"
                              type="text"
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Button
                        className="btn-fill"
                        color="primary"
                        type="submit"
                      >
                        Login
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
              <div class="d-flex w-100  justify-content-center"></div>

              <CardFooter></CardFooter>
            </Card>
          </div>
        ) : signupData?.type == "Success" && showPassword == true ? (
          <div>
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Formik
                  // validationSchema={schema}
                  onSubmit={(data) => setcollectPassword(data)}
                  initialValues={{
                    password: "",
                    confirmPassword: "",
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>New Password</label>
                            <Input
                              name="password"
                              defaultValue="Mike"
                              placeholder="Company"
                              type="text"
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Confirm Password</label>
                            <Input
                              name="confirmPassword"
                              defaultValue="Andrew"
                              placeholder="Last Name"
                              type="text"
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Button
                        className="btn-fill"
                        color="primary"
                        type="submit"
                      >
                        Save
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardBody>
              <div class="d-flex w-100  justify-content-center"></div>

              <CardFooter></CardFooter>
            </Card>
          </div>
        ) : signupData?.type == "Success" ? (
          <Card>
            <CardFooter>
              <div className="d-flex justify-content-center">
                <OtpInput
                  style={{ height: 50, width: 50 }}
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <h5 className="title">Edit Profile</h5>
            </CardHeader>
            <CardBody>
              <Formik
                validationSchema={SignupSchema}
                // validationSchema={schema}
                onSubmit={(data) => setCollectData(data)}
                initialValues={{
                  // message: "",
                  Number: "",
                  email: "",
                  firstName: "",
                  LastName: "",
                  address: "",
                  // city: "",
                  // country: "",
                  // zip: "",
                  aboutMe: "",
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form onSubmit={handleSubmit}>
                    <Row style={{ padding: "2px" }}>
                      {/* <Col className="pr-md-1" md="5"> */}
                      {/* <FormGroup>
                          <label>Company (disabled)</label>
                          <Input
                            defaultValue="Creative Code Inc."
                            // disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup> */}
                      {/* </Col> */}
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label>PhoneNumber</label>
                          <Input
                            name="Number"
                            defaultValue="9824877222"
                            placeholder="Number"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                        {errors.Number && touched.Number ? (
                          <div>{errors.Number}</div>
                        ) : null}
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input
                            name="email"
                            placeholder="mike@email.com"
                            type="email"
                            onChange={handleChange}
                          />
                        </FormGroup>
                        {errors.Number && touched.Number ? (
                          <div>{errors.Number}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            name="firstName"
                            defaultValue="Mike"
                            placeholder="Company"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                        {errors.firstName && touched.firstName ? (
                          <div>{errors.firstName}</div>
                        ) : null}
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            name="LastName"
                            defaultValue="Andrew"
                            placeholder="Last Name"
                            type="text"
                            onChange={handleChange}
                          />
                          {errors.LastName && touched.LastName ? (
                            <div>{errors.LastName}</div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            name="address"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            placeholder="Home Address"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                        {errors.address && touched.address ? (
                          <div>{errors.address}</div>
                        ) : null}
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            name="city"
                            defaultValue="Mike"
                            placeholder="City"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            name="country"
                            defaultValue="Andrew"
                            placeholder="Country"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input
                            placeholder="ZIP Code"
                            name="zip"
                            type="number"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                            name="aboutMe"
                            onChange={handleChange}
                          />
                        </FormGroup>
                        {errors.aboutMe && touched.aboutMe ? (
                          <div>{errors.aboutMe}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Button className="btn-fill" color="primary" type="submit">
                      Save
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
            <div class="d-flex w-100  justify-content-center">
              <div onClick={() => setSignInShow(true)}>Sign In</div>
              {/* <div class="col">2 of 2</div> */}
            </div>
            <label>About Me</label>
            <CardFooter></CardFooter>
          </Card>
          // <Card>
          //   <CardHeader>
          //     <h5 className="title">Sign Up</h5>
          //   </CardHeader>
          //   <CardBody>
          //     <Form>
          //       <Row>
          //         {/* <Col className="pr-md-1" md="5">
          //           <FormGroup>
          //             <label>Company (disabled)</label>
          //             <Input
          //               defaultValue="Creative Code Inc."
          //               disabled
          //               placeholder="Company"
          //               type="text"
          //             />
          //           </FormGroup>
          //         </Col> */}
          //         <Col className="px-md-1" md="6">
          //           <FormGroup>
          //             <label>Username</label>
          //             <Input
          //               defaultValue="michael23"
          //               placeholder="Username"
          //               type="text"
          //             />
          //           </FormGroup>
          //         </Col>
          //         <Col className="pl-md-1" md="6">
          //           <FormGroup>
          //             <label htmlFor="exampleInputEmail1">Email address</label>
          //             <Input placeholder="mike@email.com" type="email" />
          //           </FormGroup>
          //         </Col>
          //       </Row>
          //       <Row>
          //         <Col className="pr-md-1" md="6">
          //           <FormGroup>
          //             <label>First Name</label>
          //             <Input
          //               defaultValue="Mike"
          //               placeholder="Company"
          //               type="text"
          //             />
          //           </FormGroup>
          //         </Col>
          //         <Col className="pl-md-1" md="6">
          //           <FormGroup>
          //             <label>Last Name</label>
          //             <Input
          //               defaultValue="Andrew"
          //               placeholder="Last Name"
          //               type="text"
          //             />
          //           </FormGroup>
          //         </Col>
          //       </Row>
          //       <Row>
          //         <Col md="12">
          //           <FormGroup>
          //             <label>Password</label>
          //             <Input
          //               defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
          //               placeholder="Home Address"
          //               type="text"
          //             />
          //           </FormGroup>
          //         </Col>
          //       </Row>
          //       {/* <Row>
          //         <Col className="pr-md-1" md="4">
          //           <FormGroup>
          //             <label>City</label>
          //             <Input
          //               defaultValue="Mike"
          //               placeholder="City"
          //               type="text"
          //             />
          //           </FormGroup>
          //         </Col>
          //         <Col className="px-md-1" md="4">
          //           <FormGroup>
          //             <label>Country</label>
          //             <Input
          //               defaultValue="Andrew"
          //               placeholder="Country"
          //               type="text"
          //             />
          //           </FormGroup>
          //         </Col>
          //         <Col className="pl-md-1" md="4">
          //           <FormGroup>
          //             <label>Postal Code</label>
          //             <Input placeholder="ZIP Code" type="number" />
          //           </FormGroup>
          //         </Col>
          //       </Row>
          //       <Row>
          //         <Col md="8">
          //           <FormGroup>
          //             <label>About Me</label>
          //             <Input
          //               cols="80"
          //               defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
          //                   that two seat Lambo."
          //               placeholder="Here can be your description"
          //               rows="4"
          //               type="textarea"
          //             />
          //           </FormGroup>
          //         </Col>
          //       </Row> */}
          //     </Form>
          //   </CardBody>
          //   <div class="d-flex w-100  justify-content-center">
          //     <div>Sign In</div>
          //     {/* <div class="col">2 of 2</div> */}
          //   </div>

          //   <CardFooter>
          //     <Button className="btn-fill" color="primary" type="submit">
          //       Save
          //     </Button>
          //     <div>
          //       <OtpInput
          //         style={{ height: 50, width: 50 }}
          //         value={otp}
          //         onChange={setOtp}
          //         numInputs={4}
          //         renderSeparator={<span>-</span>}
          //         renderInput={(props) => <input {...props} />}
          //       />
          //     </div>
          //   </CardFooter>
          // </Card>
        )}
      </Col>
    </Row>
  );
};
