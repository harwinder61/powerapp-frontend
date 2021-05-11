import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getofferhistory } from "../../store/offerhistory/offerhistorySlice"
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
const OfferhistoryList = (props) => {
  const [offerhistoryList, setOfferhistoryList] = useState([])
  const dispatch = useDispatch();
  const [selectedPage, setSelectPage] = useState(1)
  const [searchText, setSearchText] = useState("")


  //const coupon = useSelector(({ coupon }) => coupon.coupon);
  const offerhistory = useSelector(({ offerhistory }) => offerhistory.offerhistory);

  const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);

  useEffect(() => {
    dispatch(loadingStatus(true));
    dispatch(getofferhistory(dealerGroupObject?.dealerGroupId, selectedPage, searchText));
  }, [dispatch, selectedPage, searchText, dealerGroupObject]);

  useEffect(() => {
    setOfferhistoryList(offerhistory?.Data?.Items)
  }, [offerhistory]);

  const handleSubmit = () => {
    dispatch(getofferhistory(dealerGroupObject?.dealerGroupId, selectedPage, searchText));
  }

  const handleSelected = (selectedPage) => {
    setSelectPage(selectedPage)
  }


  return (
    <>

      <div className=" dashboard-container w-100">
        <Container fluid={true}>
          <Header
            headerLabel="Offers, Coupons and Promos History"
            path="/add-coupontransaction"
            pathName="Add Coupon Transactions"
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
                    <th>Customer Number</th>
                    <th>Customer Name</th>
                    <th>Transaction Date</th>
                    <th>Transaction Amount</th>
                    <th>Operation Type</th>
                    <th>Create Date</th>
                  </tr>
                </thead>
                <tbody>
                  {offerhistory?.Status ?  offerhistoryList?.map((iteam, index) => (
                    <tr key={index}>
                      <td>{iteam.CouponCode}</td>
                      <td>{iteam.CustomerId}</td>
                      <td>{iteam.ContactFullName}</td>
                      <td>{moment(iteam.TransactionDate).format('MM/DD/YYYY')}</td>
                      <td>{iteam.TransactionAmount}</td>
                      <td>{iteam.FieldDescription}</td>
                      <td>{moment(iteam.create_date).format('MM/DD/YYYY')}</td>
                    </tr>

                  )): (<tr><td colSpan={9}>No records found.</td></tr>)}


                </tbody>
              </Table>
              <PaginationComponent
                totalItems={offerhistory?.Data?.TotalSize}
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

export default OfferhistoryList