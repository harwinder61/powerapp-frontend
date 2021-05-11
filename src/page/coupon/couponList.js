import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getcoupon } from "../../store/coupon/couponSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PaginationComponent from "react-reactstrap-pagination";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../../component/header";

/**
 * Component for dispaly the coupon list
 * @param {*} props 
 * @returns 
 */
const CouponList = (props) => {
  const [couponList, setCouponList] = useState([])
  const [selectedPage, setSelectPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [sortObject, setSortObject] = useState({
    SortColumn: "EffectiveFromDate",
    SortDirection: true
  })

  const dispatch = useDispatch();
  const coupon = useSelector(({ coupon }) => coupon.coupon);
  const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);


  useEffect(() => {
    dispatch(loadingStatus(true));
    // console.log('sortObject', sortObject)
    dispatch(getcoupon(dealerGroupObject?.dealerGroupId, "DLR0001", selectedPage, searchText, sortObject));
  }, [dispatch, selectedPage, searchText, dealerGroupObject, sortObject]);

  useEffect(() => {
    setCouponList(coupon?.Data?.Items)
  }, [coupon]);

  const handleSubmit = () => {
    dispatch(getcoupon(dealerGroupObject?.dealerGroupId, "DLR0001", selectedPage, searchText));
  }

  const handleSelected = (selectedPage) => {
    setSelectPage(selectedPage)
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
              await setSelectPage(1)
              await setSearchText(e.target.value)
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
                    <th>Effective From <i onClick={() => setSortObject({
                      SortColumn: "EffectiveFromDate",
                      SortDirection: sortObject.SortColumn !== "EffectiveFromDate"  ? true : !sortObject.SortDirection
                    })} className="fa fa-sort float-right" /></th>
                    <th>Effective   To <i onClick={() => setSortObject({
                      SortColumn: "EffectiveToDate",
                      SortDirection: sortObject.SortColumn !== "EffectiveToDate"  ? true : !sortObject.SortDirection
                    })} className="fa fa-sort float-right" /></th>
                    <th>Dealer Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {coupon?.Status ? couponList?.map((iteam, index) => (
                    <tr key={index}>
                      <td>{iteam.CouponCode}</td>
                      <td>{iteam.CouponDescription}</td>
                      <td>{iteam.CouponTermsConditions}</td>
                      <td>{iteam.FieldDescription}</td>
                      <td>{iteam.pointsMultiplier}</td>
                      <td>{moment(iteam.EffectiveFromDate).format('MM/DD/YYYY')}</td>
                      <td>{moment(iteam.EffectiveToDate).format('MM/DD/YYYY')}</td>
                      <td>{iteam.DealerId}</td>
                      <td>
                        <Link to={`/update-coupon/${iteam?.CouponCodeId}`}>
                          <FontAwesomeIcon icon={["fas", "pen"]} /> <i className="fas fa-pencil-alt"></i>
                        </Link>
                      </td>

                    </tr>

                  )): (<tr><td colSpan={9}>No records found.</td></tr>)}


                </tbody>
              </Table>
              <PaginationComponent
                totalItems={coupon?.Data?.TotalSize}
                defaultActivePage={selectedPage}
                pageSize={10}
                onSelect={handleSelected}
              />
            </Col>

          </Row>
        </Container>
      </div>

    </>
  )
}

export default CouponList