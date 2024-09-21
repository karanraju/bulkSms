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
import UserFetch from "Hook/userData";
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
  const [Item, setItem] = useState();
  console.log("itemmm", Item?.data?.[0]);
  const datas = UserFetch();

  const onLogin = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API}/smsData?id=${datas?.[0]?.data?.[0]?.id}`,
      {
        method: "GET",
        // body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log("result", result);
    setItem(result);
    // setLoginDataSatus(result);
    // setSignupData(result);
    // console.log("********", result);
  };

  useEffect(() => {
    if (datas) {
      onLogin();
    }
  }, [datas]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Message</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Number</th>
                      <th>From</th>
                      <th>Status</th>
                      <th className="text-center">Message</th>
                    </tr>
                  </thead>
                  {Item?.data?.length > 0 ? (
                    <tbody>
                      {Item?.data?.map((item) => {
                        return (
                          <tr>
                            <td>{item?.ToNumber}</td>
                            <td>{item?.fromNumber}</td>
                            <td>{item.status}</td>
                            <td className="text-center">{item?.BODY}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <div
                      style={{
                        color: "white",
                        fontSize: 19,
                        fontWeight: 800,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "200%",
                        display: "flex",
                        marginTop: "10%",
                      }}
                    >
                      No Record Found
                    </div>
                  )}
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/* <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="category">Here is a subtitle for this table</p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-center">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-center">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-center">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-center">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-center">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-center">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </div>
    </>
  );
}

export default Tables;
