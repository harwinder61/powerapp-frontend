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
import { getrewardlist } from "../../store/common/commonSlice"

import Header from "../../component/header";

/**
 * Component for dispaly the coupon list
 * @param {*} props 
 * @returns 
 */
const CouponList = (props) => {
  const [couponList, setCouponList] = useState([])
  const [selectedPage, setSelectPage] = useState(1)
  const [sortObject, setSortObject] = useState({
    SortColumn: "EffectiveFromDate",
    SortDirection: true
  })
  const [searchObject, setSearchObject] = useState({
    "DealerNumber": {type: "text", placeholder: "Dealer Number", value: "", },
    "CouponDescription": {type: "text", placeholder: "Coupon Description", value: "", },
    "RewardType": {type: "select", placeholder: "Reward Type", value: "", option: [], optionKey: "FieldDescription", optionName: "FieldValue" },
    "EffectiveFromDate": {type: "date", placeholder: "Effective From Date", value: "" },
    "EffectiveToDate": {type: "date", placeholder: "EffectiveToDate", value: "" },
  
  })
  const commonDetail = useSelector(({ common }) => common.commonDetail);

  

  const dispatch = useDispatch();
  const coupon = useSelector(({ coupon }) => coupon.coupon);
  const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);

  useEffect(() => {
    dispatch(getrewardlist("reward_type"));

}, [dispatch]);

  useEffect(() => {
    dispatch(loadingStatus(true));
    dispatch(getcoupon(dealerGroupObject?.dealerGroupId, selectedPage, searchObject, sortObject));
  }, [dispatch, selectedPage, searchObject, dealerGroupObject, sortObject]);

  useEffect(() => {
    setCouponList(coupon?.Data?.Items)
  }, [coupon]);

  useEffect(() => {
    setSearchObject((prevState) => ({
      ...prevState,
      RewardType: {
        ...prevState.RewardType,
        option: commonDetail.Data,
      }
    }));
    
  }, [commonDetail]);


  

  const handleSubmit = () => {
    dispatch(getcoupon(dealerGroupObject?.dealerGroupId, selectedPage, searchObject));
  }

  const handleSelected = (selectedPage) => {
    setSelectPage(selectedPage)
  }

  const handleSort = (fieldName) => {
    setSortObject({
      SortColumn: fieldName,
      SortDirection: sortObject.SortColumn !== fieldName  ? true : !sortObject.SortDirection
    })
  }


const handleSearchFunction = async (e) => {
  const text = e.target.value
    await setSelectPage(1)
    await setSearchObject((prevState) => ({
      ...prevState,
      [e.target.name]: {
        ...prevState[e.target.name],
        value: text,
      }
    }));
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
            searchObject={searchObject}
            handleSearch={(e) =>
              handleSearchFunction(e)
            }
          />
          <Row className="table-row-outer">
            <Col>
              <Table borderless>
                <thead>
                  <tr>
                    <th>Offers/Coupons/Promos</th>
                    <th>Coupon Description <i onClick={() => handleSort("CouponDescription")} className="fa fa-sort float-right" /></th>
                    <th>Terms and conditions</th>
                    <th>Reward Type <i onClick={() => handleSort("RewardType")} className="fa fa-sort float-right" /></th>
                    <th>AI Recommendation Number</th>
                    <th>Effective From <i onClick={() => handleSort("EffectiveFromDate")} className="fa fa-sort float-right" /></th>
                    <th>Effective   To <i onClick={() => handleSort("EffectiveToDate")} className="fa fa-sort float-right" /></th>
                    <th>Dealer Number<i onClick={() => handleSort("DealerNumber")} className="fa fa-sort float-right" /></th>
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
                      <td>{iteam.EffectiveFromDate !== "" ? moment(iteam.EffectiveFromDate).format('MM/DD/YYYY') : '01/01/1900'}</td>
                      <td>{iteam.EffectiveToDate !== "" ? moment(iteam.EffectiveToDate).format('MM/DD/YYYY'): '01/01/1900'}</td>
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
                totalItems={coupon?.Data?.TotalSize ? coupon?.Data?.TotalSize : 0}
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