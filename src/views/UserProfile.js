/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Formik } from "formik";
import UserFetch from "Hook/userData";
import React, { useEffect, useState } from "react";

// reactstrap components
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
  Modal,
  ModalHeader,
} from "reactstrap";

function UserProfile() {
  const [collectData, setCollectData] = useState();
  const [SignupData, setSignupData] = useState();
  const [modalSearch, setmodalSearch] = useState(false);
  const [data] = UserFetch();
  console.log("dataaaa", data?.data?.[0]?.id);
  console.log("collectData", collectData);

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
    };

    console.log("Success:", values, payload);
    const response = await fetch(
      `${process.env.REACT_APP_API}/updateProfile?id=${data?.data?.[0]?.id}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    setSignupData(result);
    setmodalSearch(true);
    console.log("********", result);
  };

  useEffect(() => {
    if (collectData) {
      onFinish();
    }
  }, [collectData]);

  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };

  return (
    <>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Row>
            <Col md="12" style={{ color: "white" }}>
              Profile Updated
            </Col>
          </Row>
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i
              className="tim-icons icon-simple-remove"
              style={{ color: "white", marginTop: "-25px" }}
            />
          </button>
        </ModalHeader>
      </Modal>

      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profiless</h5>
              </CardHeader>
              {/* <CardBody>
                <Formik
                  // validationSchema={schema}
                  onSubmit={(data) => setCollectData(data)}
                  initialValues={{
                    number: "",
                    message: "",
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
                        <Col className="pr-md-1" md="5">
                          <FormGroup>
                            <label>Company (disabled)</label>
                            <Input
                              defaultValue="Creative Code Inc."
                              disabled
                              placeholder="Company"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="3">
                          <FormGroup>
                            <label>Username</label>
                            <Input
                              defaultValue="michael23"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Input placeholder="mike@email.com" type="email" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>First Name</label>
                            <Input
                              defaultValue="Mike"
                              placeholder="Company"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input
                              defaultValue="Andrew"
                              placeholder="Last Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Address</label>
                            <Input
                              defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="4">
                          <FormGroup>
                            <label>City</label>
                            <Input
                              defaultValue="Mike"
                              placeholder="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="4">
                          <FormGroup>
                            <label>Country</label>
                            <Input
                              defaultValue="Andrew"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label>Postal Code</label>
                            <Input placeholder="ZIP Code" type="number" />
                          </FormGroup>
                        </Col>
                      </Row>
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
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </CardBody> */}

              <CardBody>
                <Formik
                  enableReinitialize
                  // validationSchema={schema}
                  onSubmit={(data) => {
                    setCollectData(data);
                  }}
                  initialValues={{
                    // message: "",
                    // Number: "",
                    email: data?.data?.[0]?.Email,
                    firstName: data?.data?.[0]?.FirstName,
                    LastName: data?.data?.[0]?.LastName,
                    address: data?.data?.[0]?.Address,
                    aboutMe: data?.data?.[0]?.AboutMe,
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
                        {/* <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>Company (disabled)</label>
                            <Input
                              defaultValue="Creative Code Inc."
                              disabled
                              placeholder="Company"
                              type="text"
                            />
                          </FormGroup>
                        </Col> */}
                        {/* <Col className="px-md-1" md="3">
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
                        </Col> */}
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Input
                              name="email"
                              placeholder="mike@email.com"
                              type="email"
                              defaultValue={data?.data?.[0]?.Email}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>First Name</label>
                            <Input
                              name="firstName"
                              defaultValue={data?.data?.[0]?.FirstName}
                              placeholder="Company"
                              type="text"
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input
                              name="LastName"
                              defaultValue={data?.data?.[0]?.LastName}
                              placeholder="Last Name"
                              type="text"
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Address</label>
                            <Input
                              name="address"
                              defaultValue={() => data?.data?.[0]?.Address}
                              placeholder="Home Address"
                              type="text"
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="8">
                          <FormGroup>
                            <label>About Me</label>
                            <Input
                              cols="80"
                              defaultValue={data?.data?.[0]?.AboutMe}
                              placeholder="Here can be your description"
                              rows="4"
                              type="textarea"
                              name="aboutMe"
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
              <CardFooter>
                {/* <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button> */}
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg")}
                    />
                    <h5 className="title">{data?.data?.[0]?.FirstName}</h5>
                  </a>
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                  className="card-description"
                >
                  {data?.data?.[0]?.AboutMe}
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
