import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getConsumerSpecificWallet, setTenderCouponValue } from "../../store/consumerWallet/consumerWalletSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import { useDispatch, useSelector } from 'react-redux';
import PaginationComponent from "react-reactstrap-pagination";
import moment from 'moment';

import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../../component/header";

/**
 * Component for dispaly the coupon wallet list
 * @param {*} props 
 * @returns 
 */


const CouponWallet = (props) => {
  const [consumerWalletList, setConsumerWallet] = useState([])
  const [selectedPage, setSelectPage] = useState(1)
  const dispatch = useDispatch();
  const consumerWallet = useSelector(({ consumerWallet }) => consumerWallet.consumerSpecificWallet);
  const searchObject = useSelector(({ consumerWallet }) => consumerWallet.searchObject);
  const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);
  const dealerList = useSelector(({ consumerWallet }) => consumerWallet.dealerList);


  useEffect(() => {
    dispatch(loadingStatus(true));
    dispatch(getConsumerSpecificWallet( selectedPage, searchObject, dealerGroupObject?.dealerGroupId));
  }, [dispatch, selectedPage, searchObject, dealerGroupObject]);

  useEffect(() => {
    setConsumerWallet(consumerWallet?.Data?.Items)
  }, [consumerWallet]);


  const handleSubmit = () => {
    dispatch(getConsumerSpecificWallet( selectedPage, searchObject, dealerGroupObject?.dealerGroupId));
  }

  const handleSelected = (selectedPage) => {
    setSelectPage(selectedPage)
  }

  return (
    <>

      <div className=" dashboard-container w-100">
        <Container fluid={true}>
          <Header
            enableSearch={true}
            disabledSearch ={true}
            headerLabel="Coupon Wallet"
            handleSubmit={handleSubmit}
            searchObject={searchObject}
            showAddBuuton={false}
           />
          <Row className="table-row-outer">
            <Col>
              <Table borderless>
              <thead>
                  <tr>
                    <th>Consumer Name</th>
                    <th>Customer Id </th>
                    <th>Social Media Id</th>
                    <th>Phone Number</th>
                    <th>Vin</th>
                  </tr>
                </thead>
                
              <tbody>
                {searchObject &&
                   <tr className="default-tr" >
                      <td><span>{consumerWalletList.length > 0 ? `${consumerWalletList[0]?.FirstName} ${consumerWalletList[0]?.LastName}` : '' }</span></td>
                      <td><span>{searchObject.CustomerId || "N/A"}</span></td>
                      <td><span>{searchObject.SocialMediaId}</span></td>
                      <td><span>{searchObject.PhoneNumber? searchObject.PhoneNumber : "N/A"}</span></td>
                      <td><span>{searchObject.Vin? searchObject.Vin : "N/A"}</span></td>
                       </tr>
                  }


                </tbody>
              </Table>
            </Col>

          </Row>
        
          <Row className="table-row-outer">
            <Col>
              <Table borderless>
              <thead>
                  <tr>
                    <th>Coupons/Vouchers</th>
                    <th>Description</th>
                    <th>Terms and conditions</th>
                    <th>Effective From</th>
                    <th>Effective   To</th>
                    <th>Dealer Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                
              <tbody>
                {consumerWallet?.Status ? consumerWalletList?.map((iteam, index) => (
                   <tr key={index} className="default-tr">
                      <td><span>{iteam.CouponCode}</span></td>
                      <td><span>{iteam.CouponDescription}</span></td>
                      <td><span>{iteam.CouponTermsConditions}</span></td>
                      <td><span>{iteam.EffectiveFromDate !== "" ? moment(iteam.EffectiveFromDate).format('MM/DD/YYYY') : '01/01/1900'}</span></td>
                      <td><span>{iteam.EffectiveToDate !== "" ? moment(iteam.EffectiveToDate).format('MM/DD/YYYY'): '01/01/1900'}</span></td>
                  
                      <td><span>{dealerList.findIndex(i => i.DealerNumber  ===  iteam?.DealerNumber ) !== 1 ? dealerList[dealerList.findIndex(i => i.DealerNumber  ===  iteam?.DealerNumber )]?.DealerName  :"NA"}</span></td>
                      <td>
                        <span>
                          <Link to={`/add-tender-coupon`} onClick={() => dispatch(setTenderCouponValue(iteam))}>
                            <FontAwesomeIcon icon={["fas", "plus"]} /> <i className="fas fa-pencil-alt"></i>
                          </Link>
                      
                        </span>
                      </td>
                   
                    </tr>

                  )): (<tr><td colSpan={9}>No records found.</td></tr>)}


                </tbody>
              </Table>
              <PaginationComponent
                totalItems={consumerWallet?.Data?.length ? consumerWallet?.Data?.length : 0}
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

export default CouponWallet