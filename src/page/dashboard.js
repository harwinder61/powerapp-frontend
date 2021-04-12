import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Table, Input } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router"
import { getcoupon } from "../store/coupon/couponSlice"
import { loadingStatus } from "../store/global/globalSlice"
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const Dashboard = (props) => {
  const [search, setSearch] = useState("")
  const [couponList, setCouponList] = useState([])
  let history = useHistory()
  const dispatch = useDispatch();
  const coupon = useSelector(({ coupon }) => coupon.coupon);

  useEffect(() => {
    dispatch(loadingStatus(true));
    dispatch(getcoupon(1, "DLR0001"));
  }, [dispatch]);

  useEffect(() => {
    setCouponList(coupon?.Data?.Items)
  }, [coupon]);

  const handleSubmit = () => {
    if (search !== "") {
      setCouponList(coupon?.Data?.Items.filter(iteam => iteam.coupon_code.includes(search)))
    } else {
      setCouponList(coupon?.Data?.Items)

    }
  }

  return (
    <>

      <div className=" dashboard-container w-100 bg-main">
        <Container fluid={true}>
          <Row>
            <Col className="text-right py-2 main-header">Aclaro PowerApp</Col>
          </Row>
          <div className="buttons-row">
            <Row >
              <Col>

                {props?.title}
                <div className="serch-outer">
                  <Input name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                  <Button className="temp_button"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Search
            </Button>
                </div>
              </Col>
              <Col className=" text-md-right left-col-sec">
                <div className="dealer_name">Dealer Group : Jones Group
         </div>

                <Button className="temp_button"
                  type="button"
                  onClick={() => history.push("/add-coupon")}
                >
                  Add Member
            </Button>
              </Col>

            </Row>
          </div>
          <Row className="table-row-outer">
            <Col>
              <Table borderless>
                <thead>
                  <tr>
                    <th>Member Types</th>
                    <th>Minimum Points</th>
                    <th>Discount Value</th>
                    <th>Discount Unit</th>
                    <th>Points Multiplier</th>
                    <th>Membership   Benefits</th>
                    <th>Created Date</th>
                    <th>Valid   Until</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {couponList?.map((iteam, index) => (
                    <tr key={index}>
                      <td>{iteam.coupon_code}</td>
                      <td>{iteam.coupon_description}</td>
                      <td>{iteam.coupon_terms_conditions}</td>
                      <td>{iteam.field_description}</td>
                      <td>{iteam.pointsMultiplier}</td>
                      <td>{moment(iteam.effective_from_date).format('MM/DD/YYYY')}</td>
                      <td>{moment(iteam.effective_to_date).format('MM/DD/YYYY')}</td>
                      <td>{iteam.dlrid}</td>
                      <td><FontAwesomeIcon icon={["fas", "pen"]} /> <i className="fas fa-pencil-alt"></i></td>

                    </tr>

                  ))}


                </tbody>
              </Table>
            </Col>

          </Row>
        </Container>
      </div>

    </>
  )
}

export default Dashboard