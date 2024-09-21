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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import PropTypes from "prop-types";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import CustomCalender from "components/CustomCalender/CustomCalender";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import * as XLXS from "xlsx";
import * as formik from "formik";
import * as Yup from "yup";

import { useLocation } from "react-router-dom";
import UserFetch from "Hook/userData";
// import moment from "moment";

const now = new Date();

// import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
// import "./addons/dragAndDrop/styles.less";
// import "react-big-calendar/lib/addons/dragAndDrop/styles";
// import "react-big-calendar/lib/addons/dragAndDrop/styles";

// reactstrap components

const localizer = momentLocalizer(moment);

const event = [
  /* {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2024, 3, 0),
    end: new Date(2024, 3, 1),
  }, */
  {
    id: 1,
    title: "Long Event",
    start: new Date(2024, 3, 7),
    end: new Date(2024, 3, 10),
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2024, 3, 9, 0, 0, 0),
    end: new Date(2024, 3, 9, 0, 0, 0),
    allDay: true,
  },

  {
    id: 92,
    title: "Some Other Event",
    start: new Date(2024, 3, 9, 8, 0, 0),
    end: new Date(2024, 3, 10, 11, 30, 0),
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2024, 3, 11),
    end: new Date(2024, 3, 13),
    desc: "Big conference for important people",
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2024, 3, 12, 10, 30, 0, 0),
    end: new Date(2024, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(2024, 3, 12, 12, 0, 0, 0),
    end: new Date(2024, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch",
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(2024, 3, 12, 14, 0, 0, 0),
    end: new Date(2024, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: "Happy Hour",
    start: new Date(2024, 3, 12, 17, 0, 0, 0),
    end: new Date(2024, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day",
  },
  {
    id: 10,
    title: "Dinner",
    start: new Date(2024, 3, 12, 20, 0, 0, 0),
    end: new Date(2024, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: "Planning Meeting with Paige",
    start: new Date(2024, 3, 13, 8, 0, 0),
    end: new Date(2024, 3, 13, 10, 30, 0),
  },
  {
    id: 11.1,
    title: "Inconvenient Conference Call",
    start: new Date(2024, 3, 13, 9, 30, 0),
    end: new Date(2024, 3, 13, 12, 0, 0),
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2024, 3, 13, 11, 30, 0),
    end: new Date(2024, 3, 13, 14, 0, 0),
  },
  {
    id: 11.3,
    title: "Quote Follow-up - Tea by Tina",
    start: new Date(2024, 3, 13, 15, 30, 0),
    end: new Date(2024, 3, 13, 16, 0, 0),
  },
  {
    id: 12,
    title: "Late Night Event",
    start: new Date(2024, 3, 17, 19, 30, 0),
    end: new Date(2024, 3, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: "Late Same Night Event",
    start: new Date(2024, 3, 17, 19, 30, 0),
    end: new Date(2024, 3, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: "Multi-day Event",
    start: new Date(2024, 3, 20, 19, 30, 0),
    end: new Date(2024, 3, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: "Point in Time Event",
    start: now,
    end: now,
  },
  {
    id: 16,
    title: "Video Record",
    start: new Date(2024, 3, 14, 15, 30, 0),
    end: new Date(2024, 3, 14, 19, 0, 0),
  },
  {
    id: 17,
    title: "Dutch Song Producing",
    start: new Date(2024, 3, 14, 16, 30, 0),
    end: new Date(2024, 3, 14, 20, 0, 0),
  },
  {
    id: 18,
    title: "Itaewon Meeting",
    start: new Date(2024, 3, 14, 16, 30, 0),
    end: new Date(2024, 3, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: "Online Coding Test",
    start: new Date(2024, 3, 14, 17, 30, 0),
    end: new Date(2024, 3, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: "An overlapped Event",
    start: new Date(2024, 3, 14, 17, 0, 0),
    end: new Date(2024, 3, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: "Phone Interview",
    start: new Date(2024, 3, 14, 17, 0, 0),
    end: new Date(2024, 3, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: "Cooking Class",
    start: new Date(2024, 3, 14, 17, 30, 0),
    end: new Date(2024, 3, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: "Go to the gym",
    start: new Date(2024, 3, 14, 18, 30, 0),
    end: new Date(2024, 3, 14, 20, 0, 0),
  },
  {
    id: 24,
    title: "DST ends on this day (Europe)",
    start: new Date(2022, 9, 30, 0, 0, 0),
    end: new Date(2022, 9, 30, 4, 30, 0),
  },
  {
    id: 25,
    title: "DST ends on this day (America)",
    start: new Date(2022, 10, 6, 0, 0, 0),
    end: new Date(2022, 10, 6, 4, 30, 0),
  },
  {
    id: 26,
    title: "DST starts on this day (America)",
    start: new Date(2023, 2, 12, 0, 0, 0),
    end: new Date(2023, 2, 12, 4, 30, 0),
  },
  {
    id: 27,
    title: "DST starts on this day (Europe)",
    start: new Date(2023, 2, 26, 0, 0, 0),
    end: new Date(2023, 2, 26, 4, 30, 0),
  },
];

function Typography({}) {
  const [myEvents, setEvents] = useState(event);
  console.log("myEvents", myEvents);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [item, setitem] = useState();
  console.log("itemmm", item);
  const [collectData, setCollectData] = useState();
  console.log("collectData", collectData);
  const [message, setMessage] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [phoneBookNumber, setPhoneBookNumber] = useState([]);
  const datas = UserFetch();
  console.log("daaaaaa", datas?.[0]?.data?.[0]?.id);
  // console.log("phoneBookNumber", phoneBookNumber);
  console.log("messagess", message);

  const location = useLocation();
  console.log(
    "name"
    // Object.values(?.[1]?.PhoneNumber).join("")
  );

  useState(() => {
    if (location) {
      // let numbers = location?.state?.map(
      //   (item) => console.log("item", Object?.values(item?.PhoneNumber))
      //   // Object.values(item?.PhoneNumber)
      // );
      console.log(
        "numbersraju",
        location?.state?.forEach((element) => {
          setPhoneBookNumber((prev) => [...prev, element?.PhoneNumber]);
          setitem(phoneBookNumber);
          console.log("element", element?.PhoneNumber);
          // Object.values(element?.PhoneNumber).join("");
        })
      );
    }
  }, [location]);

  useEffect(() => {
    if (phoneBookNumber) {
    }
  }, [phoneBookNumber]);
  // console.log("collectData", collectData);

  const handleMessage = async (values) => {
    console.log("collectData", collectData);
    const payload = {
      Number: collectData?.number,
      message: collectData?.message,
      startDate: startDate,
    };
    console.log("Success:", values, payload);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/twillio?id=${datas?.[0]?.data?.[0]?.id}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    // setSignupData(result);
    console.log("********", result);
  };

  const SignupSchema = Yup.object().shape({
    number: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (collectData) {
      // setMessage(collectData?.message);
      let title = collectData?.message;
      console.log("raju", collectData?.message);
      setEvents((prev) => [...prev, { start, end, title }]);
      console.log("djdfghdfg", collectData);
      setShow(false);
      handleMessage();
    }
  }, [collectData]);

  useEffect(() => {
    const arrayData = data?.map((item) => Object.values(item));
    const singleArray = arrayData.flat();

    console.log("singleArray", singleArray);
    const regex = /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{9,14})$/;

    const number = singleArray.filter((item) => regex.test(parseInt(item)));
    setitem(number);
    console.log("numberrrr", number);
  }, [data]);

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setStart(start);
      setEnd(end);

      const formattedDate = moment(start).format("DD-MM-YYYY");
      console.log("formattedDate", formattedDate);
      // const title =
      //   "abcjnguehtuhte rhuerhtutyeuthuej uerhtu8erytuehtuehu ertje8t8eu4teturhru8thwthlw ";
      const title = message;
      console.log("titleeee", title);
      setShow(true);
      // if (title) {
      //   setEvents((prev) => [...prev, { start, end, title }]);
      // }
    },
    [setEvents]
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2024, 3, 12),
      scrollToTime: new Date(2024, 4, 15),
    }),
    []
  );

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLXS.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLXS.utils.sheet_to_json(sheet);
      console.log("parsedData :: ", parsedData);
      setData(() => parsedData);
    };
  };

  // const handleSubmit = (data) => {
  //   console.log("helloooo", data);
  //   setShow(true);
  // };

  const { Formik } = formik;

  // useEffect(() => {
  //   if (collectData) {
  //     setMessage(collectData?.message);
  //     setShow(false);
  //     handleSelectSlot();
  //   }
  // }, [collectData]);

  // const schema = yup.object().shape({
  //   firstN: yup.string().required(),
  //   lastName: yup.string().required(),
  //   username: yup.string().required(),
  //   city: yup.string().required(),
  //   state: yup.string().required(),
  //   zip: yup.string().required(),
  //   terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  // });

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <div>
                <Calendar
                  defaultDate={defaultDate}
                  // defaultView={Views.WEEK}
                  step={60}
                  onSelectEvent={handleSelectEvent}
                  onSelectSlot={handleSelectSlot}
                  localizer={localizer}
                  events={myEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500, color: "white" }}
                  selectable
                  scrollToTime={scrollToTime}
                />
              </div>

              <Modal show={show}>
                {/* <Button
                  variant="secondary"
                  onClick={handleClose}
                  style={{ margin: "20px" }}
                >
                  Close
                </Button> */}
                <Modal.Header>
                  <div onClick={handleClose}>
                    <div>
                      <i
                        style={{ color: "white" }}
                        className="tim-icons icon-simple-remove"
                      />
                    </div>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                  />

                  <Formik
                    // validationSchema={schema}
                    onSubmit={(data) => setCollectData(data)}
                    initialValues={{
                      number: "",
                      message: "",
                    }}
                    validationSchema={SignupSchema}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      touched,
                      errors,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Row className="">
                          <Form.Group
                            as={Col}
                            md="10"
                            controlId="validationFormik01"
                          >
                            <Form.Label>number</Form.Label>

                            <Form.Control
                              type="text"
                              name="number"
                              key={item}
                              placeholder="mobile number"
                              defaultValue={
                                phoneBookNumber ? phoneBookNumber : item
                              }
                              onChange={handleChange}
                            />

                            {errors.number && touched.number ? (
                              <div style={{ color: "white" }}>
                                {errors.number}
                              </div>
                            ) : null}
                            {/* <Form.Control
                              type="text"
                              name="firstName"
                              defaultValue={item}
                            
                              isValid={touched.firstName && !errors.firstName}
                            /> */}
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="10"
                            controlId="validationFormik02"
                          >
                            <Form.Label>message</Form.Label>
                            <Form.Control
                              name="message"
                              rows={3}
                              as="textarea"
                              placeholder="message"
                              onChange={handleChange}
                            />
                            {errors.message && touched.message ? (
                              <div style={{ color: "white" }}>
                                {errors.message}
                              </div>
                            ) : null}
                            {/* <Form.Control
                              type="text"
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                              isValid={touched.lastName && !errors.lastName}
                            /> */}
                            <div
                              style={{
                                marginTop: "20px",
                                marginBottom: "20px",
                              }}
                            >
                              <DatePicker
                                // dateFormat="YYYY-MM-DD"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                              />
                            </div>

                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Button type="submit">Submit form</Button>
                      </Form>
                    )}
                  </Formik>

                  {/* <Form onSubmit={handleSubmit}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label style={{ color: "white" }}>
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="text"
                        key={item}
                        placeholder="name@example.com"
                        defaultValue={item}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label style={{ color: "white" }}>
                        Example textarea
                      </Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </Form> */}
                  {/* <div style={{ display: "flex" }}>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div> */}
                </Modal.Body>
                <Modal.Footer>
                  {/* <Button
                    variant="secondary"
                    onClick={handleClose}
                    style={{ margin: "20px" }}
                  >
                    Close
                  </Button> */}
                  {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button> */}
                </Modal.Footer>
              </Modal>
              {/* <CardHeader className="mb-5">
                <h5 className="card-category">Black Table Heading</h5>
                <CardTitle tag="h3">
                  Created using Poppins Font Family
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="typography-line">
                  <h1>
                    <span>Header 1</span>
                    The Life of Black Dashboard React
                  </h1>
                </div>
                <div className="typography-line">
                  <h2>
                    <span>Header 2</span>
                    The Life of Black Dashboard React
                  </h2>
                </div>
                <div className="typography-line">
                  <h3>
                    <span>Header 3</span>
                    The Life of Black Dashboard React
                  </h3>
                </div>
                <div className="typography-line">
                  <h4>
                    <span>Header 4</span>
                    The Life of Black Dashboard React
                  </h4>
                </div>
                <div className="typography-line">
                  <h5>
                    <span>Header 5</span>
                    The Life of Black Dashboard React
                  </h5>
                </div>
                <div className="typography-line">
                  <h6>
                    <span>Header 6</span>
                    The Life of Black Dashboard React
                  </h6>
                </div>
                <div className="typography-line">
                  <p>
                    <span>Paragraph</span>I will be the leader of a company that
                    ends up being worth billions of dollars, because I got the
                    answers. I understand culture. I am the nucleus. I think
                    that’s a responsibility that I have, to push possibilities,
                    to show people, this is the level that things could be at.
                  </p>
                </div>
                <div className="typography-line">
                  <span>Quote</span>
                  <blockquote>
                    <p className="blockquote blockquote-primary">
                      "I will be the leader of a company that ends up being
                      worth billions of dollars, because I got the answers. I
                      understand culture. I am the nucleus. I think that’s a
                      responsibility that I have, to push possibilities, to show
                      people, this is the level that things could be at." <br />
                      <br />
                      <small>- Noaa</small>
                    </p>
                  </blockquote>
                </div>
                <div className="typography-line">
                  <span>Muted Text</span>
                  <p className="text-muted">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Primary Text</span>
                  <p className="text-primary">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Info Text</span>
                  <p className="text-info">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Success Text</span>
                  <p className="text-success">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Warning Text</span>
                  <p className="text-warning">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Danger Text</span>
                  <p className="text-danger">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <h2>
                    <span>Small Tag</span>
                    Header with small subtitle <br />
                    <small>Use "small" tag for the headers</small>
                  </h2>
                </div>
                <div className="typography-line">
                  <span>Lists</span>
                  <Row>
                    <Col md="3">
                      <h5>Unordered List</h5>
                      <ul>
                        <li>List Item</li>
                        <li>List Item</li>
                        <li className="list-unstyled">
                          <ul>
                            <li>List Item</li>
                            <li>List Item</li>
                            <li>List Item</li>
                          </ul>
                        </li>
                        <li>List Item</li>
                      </ul>
                    </Col>
                    <Col md="3">
                      <h5>Ordered List</h5>
                      <ol>
                        <li>List Item</li>
                        <li>List Item</li>
                        <li>List item</li>
                        <li>List Item</li>
                      </ol>
                    </Col>
                    <Col md="3">
                      <h5>Unstyled List</h5>
                      <ul className="list-unstyled">
                        <li>List Item</li>
                        <li>List Item</li>
                        <li>List item</li>
                        <li>List Item</li>
                      </ul>
                    </Col>
                    <Col md="3">
                      <h5>Inline List</h5>
                      <ul className="list-inline">
                        <li className="list-inline-item">List1</li>
                        <li className="list-inline-item">List2</li>
                        <li className="list-inline-item">List3</li>
                      </ul>
                    </Col>
                  </Row>
                </div>
                <div className="typography-line">
                  <span>Code</span>
                  <p>
                    This is <code>.css-class-as-code</code>, an example of an
                    inline code element. Wrap inline code within a{" "}
                    <code>{`<code>...</code>`}</code>
                    tag.
                  </p>
                  <pre>
                    1. #This is an example of preformatted text.
                    <br />
                    2. #Here is another line of code
                  </pre>
                </div>
              </CardBody> */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Typography;
