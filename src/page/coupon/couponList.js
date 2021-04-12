import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getcoupon } from "../../store/coupon/couponSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Header from "../../component/header";

/**
 * Component for dispaly the coupon list
 * @param {*} props 
 * @returns 
 */
const CouponList = (props) => {
  const [search, setSearch] = useState("")
  const [couponList, setCouponList] = useState([])
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
      setCouponList(coupon?.Data?.Items.filter(iteam => iteam.coupon_code.includes(search.toUpperCase())))
    } else {
      setCouponList(coupon?.Data?.Items)

    }
  }


  return (
    <>

      <div className=" dashboard-container w-100">
        <Container fluid={true}>
          <Header
            headerLabel="Coupon Codes"
            path="/add-coupon"
            pathName="Add Coupon"
            handleSubmit={handleSubmit}
            handleSearch={async (e) => {
              await setSearch(e.target.value)
              setCouponList(coupon?.Data?.Items.filter(iteam => iteam.coupon_code.includes(e.target.value.toUpperCase())))
            }}
          />
          <Row className="table-row-outer">
            <Col>
              <Table borderless>
                <thead>
                  <tr>
                    <th>Offers/Coupons/Promos</th>
                    <th>Coupon Description</th>
                    <th>Terms and conditions</th>
                    <th>Reward Type</th>
                    <th>AI Recommendation Number</th>
                    <th>Effective From</th>
                    <th>Effective   To</th>
                    <th>Dealer Number</th>
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
                      <td>
                        <Link to={`/update-coupon/${iteam?.coupon_code_id}`}>
                          <FontAwesomeIcon icon={["fas", "pen"]} /> <i className="fas fa-pencil-alt"></i>
                        </Link>
                      </td>

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

export default CouponList