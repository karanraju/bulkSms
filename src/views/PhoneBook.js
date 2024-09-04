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
  console.log("arrayNumber", dataList);
  // console.log("dataList", dataList);

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
    const response = await fetch(`${process.env.REACT_APP_API}/listContact`, {
      method: "GET",
      // body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("result", result);
    console.log("result", result);
    setlistNumber(result);
    // setLoginDataSatus(result);
    // setSignupData(result);
    // console.log("********", result);
  };

  useEffect(() => {
    handleContact();
  }, []);

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
                        placeholder="UserName"
                        className="border-2  border-primary"
                        onChange={handleChange}
                      />
                    </CardTitle>
                  </div>
                  <div style={{ width: 520, height: 30 }}></div>
                  <button type="button" onClick={toggleModalSearch}>
                    Add Number
                  </button>
                </div>
              </CardHeader>
              {dataList?.length > 0 ? (
                <CardBody
                  style={{
                    height: "400px",
                    scrollbarWidth: "none",
                    overflow: "auto",
                    // overflowY: "hidden",
                  }}
                >
                  {dataList?.map((item) => (
                    <Alert
                      color={arrayNumber?.includes(item) ? "info" : "primary"}
                    >
                      <div
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                        onClick={() => setCondition(item)}
                      >
                        <span>{item.Name}</span>
                        <span>{item.PhoneNumber}</span>
                      </div>
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
                        color={arrayNumber?.includes(item) ? "info" : "primary"}
                      >
                        <div
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                          onClick={() => setCondition(item)}
                        >
                          <span>{item.Name}</span>
                          <span>{item.PhoneNumber}</span>
                        </div>
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
            </Card>
          </Col>
          {/* <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CANADA</CardTitle>
              </CardHeader>
              <CardBody>
                <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>+918983483445</span>
                    <span>BUY</span>
                  </div>
                </Alert>
                <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>+918983483445</span>
                    <span>BUY</span>
                  </div>
                </Alert>
                <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>+918983483445</span>
                    <span>BUY</span>
                  </div>
                </Alert>
                <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>+918983483445</span>
                    <span>BUY</span>
                  </div>
                </Alert>
              </CardBody>
            </Card>
          </Col> */}
          {/* <Col md="12">
            <Card>
              <CardBody>
                <div className="places-buttons">
                  <Row>
                    <Col className="ml-auto mr-auto text-center" md="6">
                      <CardTitle tag="h4">
                        Notifications Places
                        <p className="category">Click to view notifications</p>
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                      <Row>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("tl")}
                          >
                            Top Left
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("tc")}
                          >
                            Top Center
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("tr")}
                          >
                            Top Right
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="8">
                      <Row>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("bl")}
                          >
                            Bottom Left
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("bc")}
                          >
                            Bottom Center
                          </Button>
                        </Col>
                        <Col md="4">
                          <Button
                            block
                            color="primary"
                            onClick={() => notify("br")}
                          >
                            Bottom Right
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col> */}
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
