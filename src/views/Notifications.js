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
import React, { useEffect, useState } from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

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
} from "reactstrap";

function Notifications() {
  const [listNumber, setlistNumber] = useState();
  console.log("listNumber", listNumber);
  const notificationAlertRef = React.useRef(null);
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

  const handleContact = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/listCountryNumber`, {
      method: "GET",
      // body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("result", result);
    setlistNumber(result);
    // setLoginDataSatus(result);
    // setSignupData(result);
    // console.log("********", result);
  };

  useEffect(() => {
    handleContact();
  }, []);

  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">USA</CardTitle>
              </CardHeader>
              <CardBody>
                <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>{listNumber?.data?.[0]?.PhoneNumber}</span>
                    <span>BUY</span>
                  </div>
                </Alert>
                <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>{listNumber?.data?.[0]?.PhoneNumber}</span>
                    <span>BUY</span>
                  </div>
                </Alert>
                <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>{listNumber?.data?.[0]?.PhoneNumber}</span>
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
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CANADA</CardTitle>
              </CardHeader>
              <CardBody>
                <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>{listNumber?.data?.[1]?.PhoneNumber}</span>
                    <span>BUY</span>
                  </div>
                </Alert>
                <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>{listNumber?.data?.[1]?.PhoneNumber}</span>
                    <span>BUY</span>
                  </div>
                </Alert>
                <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>{listNumber?.data?.[1]?.PhoneNumber}</span>
                    <span>BUY</span>
                  </div>
                </Alert>
                <Alert color="info">
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>{listNumber?.data?.[1]?.PhoneNumber}</span>
                    <span>BUY</span>
                  </div>
                </Alert>
              </CardBody>
            </Card>
          </Col>
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

export default Notifications;
