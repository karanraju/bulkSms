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
import React, { useEffect } from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  CardFooter,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import UserFetch from "Hook/userData";

function PhoneBook() {
  const notificationAlertRef = React.useRef(null);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [PhoneNumber, setPhoneNumber] = React.useState();
  const [listNumber, setlistNumber] = React.useState();
  console.log("listNumber", listNumber);
  const [condition, setCondition] = React.useState("");
  const [searchNumber, setSearchNumber] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const [arrayNumber, setArrayNumber] = React.useState([]);
  const [dataList, setdataList] = React.useState([]);
  const [data] = UserFetch();

  console.log("datata", data?.data?.[0]?.id);
  console.log("arrayNumber", dataList);
  // console.log("dataList", dataList)to;

  const navigate = useNavigate();

  function handleChange(event) {
    console.log(event.target.value);
    setSearchText(event.target.value);
  }

  useEffect(() => {
    if (searchText) {
      const filteredUsers = listNumber?.dataNumber.filter((user) =>
        user.Name.includes(searchText)
      );
      setdataList(filteredUsers);
      console.log("filteredUsers", filteredUsers);
    }
  }, [searchText]);

  useEffect(() => {
    if (arrayNumber.includes(condition)) {
      let newArray = arrayNumber.filter((item) => item !== condition);
      setArrayNumber(() => [...newArray]);
      // arrayNumber.push()
    } else {
      setArrayNumber((prev) => [...prev, condition]);
    }
  }, [condition]);

  const onLogin = async () => {
    const payload = {
      id: data?.data?.[0]?.id,
      Name: PhoneNumber?.Name,
      PhoneNumber: PhoneNumber?.PhoneNumber,
    };

    console.log("payload", payload);
    // console.log("Success:", values, payload);
    const response = await fetch(`${process.env.REACT_APP_API}/phoneNumber`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("result", result);
    setmodalSearch(false);
    console.log("result", result);
    // setLoginDataSatus(result);
    // setSignupData(result);
    // console.log("********", result);
  };

  const handleContact = async () => {
    console.log("sdfdfdf ", data);

    const uuid = data?.data?.[0]?.id;

    console.log("uuid", uuid);

    const response = await fetch(
      `${process.env.REACT_APP_API}/listContact?id=${data?.data?.[0]?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log("result", result);
    console.log("result", result);
    setlistNumber(result);
    // setLoginDataSatus(result);
    // setSignupData(result);
    // console.log("********", result);
  };

  useEffect(() => {
    if (data) {
      handleContact();
    }
  }, [data]);

  useEffect(() => {
    handleContact();
  }, [modalSearch]);

  useEffect(() => {
    if (PhoneNumber) {
      onLogin();
    }
  }, [PhoneNumber]);

  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Black Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };

  const SignupSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    PhoneNumber: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
        style={{ width: "35%", height: "50%" }}
      >
        <ModalHeader>
          {/* <Input placeholder="SEARCH" type="text" /> */}
          <div style={{ color: "white" }}>
            {/* <Card>
              <CardHeader>
                <h5 className="title">Login Page</h5>
              </CardHeader>
              <CardBody> */}
            <Formik
              // validationSchema={schema}
              onSubmit={(data) => setPhoneNumber(data)}
              initialValues={{
                Name: "",
                PhoneNumber: "",
              }}
              validationSchema={SignupSchema}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          name="Name"
                          // defaultValue="Mike"
                          placeholder="Name"
                          type="text"
                          onChange={handleChange}
                          style={{
                            // color: "white",
                            borderColor: "gray",
                            backgroundColor: "white",
                          }}
                        />
                        {errors.Name && touched.Name ? (
                          <div>{errors.Name}</div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col
                      className="pl-md-1  "
                      md="12"
                      style={{ margin: "2%", marginBottom: "5%" }}
                    >
                      <FormGroup>
                        <label>PhoneNumber</label>
                        <Input
                          name="PhoneNumber"
                          // defaultValue="Andrew"
                          placeholder="PhoneNumber"
                          type="text"
                          onChange={handleChange}
                          style={{ backgroundColor: "white" }}
                        />
                        {errors.PhoneNumber && touched.PhoneNumber ? (
                          <div>{errors.PhoneNumber}</div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col>
                      <div>
                        <Button
                          style={{
                            marginTop: "-10%",
                            height: "6%",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingBottom: "5%",
                          }}
                          type="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
            {/* </CardBody>
              <div class="d-flex w-100  justify-content-center"></div>

              <CardFooter></CardFooter>
            </Card> */}
          </div>
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>

      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* <CardTitle tag="h4">Phone Book</CardTitle> */}
                  <div>
                    <CardTitle tag="h5">
                      {" "}
                      <Input
                        style={{ width: 500, marginHorizontal: "20px" }}
                        placeholder="Search"
                        className="border-2  border-gray"
                        onChange={handleChange}
                      />
                    </CardTitle>
                  </div>
                  <div
                    style={{ width: 520, height: 25, borderRadius: "10px" }}
                  ></div>
                  <button type="button" onClick={toggleModalSearch}>
                    Add Number
                  </button>
                </div>
              </CardHeader>
              {listNumber?.dataNumber?.length > 0 ? (
                <div>
                  {dataList?.length > 0 ? (
                    <CardBody
                      style={{
                        height: "300px",
                        scrollbarWidth: "none",
                        overflow: "auto",
                        // overflowY: "hidden",
                      }}
                    >
                      {dataList?.map((item) => (
                        <Alert
                          color={arrayNumber?.includes(item) ? "info" : ""}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: 0.3,
                              // backgroundColor: "gray",
                              marginBottom: "5px",
                              // marginBottom: 10,
                            }}
                          ></div>
                          <div
                            style={{
                              justifyContent: "space-between",
                              display: "flex",
                              padding: "10px",
                            }}
                            onClick={() => setCondition(item)}
                          >
                            <span>{item.Name}</span>
                            <span>{item.PhoneNumber}</span>
                          </div>

                          <div
                            style={{
                              width: "100%",
                              height: 0.3,
                              backgroundColor: "gray",
                              // marginBottom: 10,
                            }}
                          ></div>
                        </Alert>
                      ))}
                    </CardBody>
                  ) : (
                    <div>
                      <CardBody
                        style={{
                          height: "400px",
                          scrollbarWidth: "none",
                          overflow: "auto",
                          // overflowY: "hidden",
                        }}
                      >
                        {listNumber?.dataNumber.map((item) => (
                          <Alert
                            style={{ marginBottom: "5px" }}
                            color={arrayNumber?.includes(item) ? "info" : ""}
                          >
                            <div
                              style={{
                                justifyContent: "space-between",
                                display: "flex",
                                padding: 10,
                              }}
                              onClick={() => setCondition(item)}
                            >
                              <span>{item.Name}</span>
                              <span>{item.PhoneNumber}</span>
                            </div>
                            <div
                              style={{
                                width: "100%",
                                height: 0.5,
                                backgroundColor: "gray",
                                // marginTop: 10,
                              }}
                            ></div>
                          </Alert>
                        ))}
                        {/* <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>{listNumber?.data?.[0]?.Name}</span>
                    <span>{listNumber?.data?.[0]?.PhoneNumber}</span>
                  </div>
                </Alert> */}
                        {/* <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>{listNumber?.data?.[0]?.Name}</span>
                    <span>{listNumber?.data?.[0]?.PhoneNumber}</span>
                  </div>
                </Alert> */}
                        {/* <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>{listNumber?.data?.[0]?.Name}</span>
                    <span>{listNumber?.data?.[0]?.PhoneNumber}</span>
                  </div>
                </Alert> */}
                        {/* <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>{listNumber?.data?.[0]?.Name}</span>
                    <span>{listNumber?.data?.[0]?.PhoneNumber}</span>
                  </div>
                </Alert> */}
                      </CardBody>
                    </div>
                  )}

                  <div
                    style={{
                      margin: "20px",
                      backgroundColor: "blue",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10,
                      width: 70,
                      borderRadius: 8,
                    }}
                  >
                    <div
                      style={{ color: "white" }}
                      onClick={() =>
                        navigate("/typography", { state: arrayNumber })
                      }
                    >
                      Send
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: 800,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "50%",
                    marginBottom: "10%",
                  }}
                >
                  No Data Found
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PhoneBook;

const Data = [
  { id: 1, name: "ram", phoneNumber: "9824877222" },
  { id: 2, name: "shyam", phoneNumber: "9844190183" },
  { id: 3, name: "gita", phoneNumber: "9844190183" },
];
