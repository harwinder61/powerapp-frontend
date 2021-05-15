import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table } from 'reactstrap';
import { getRewardTransactionHistory } from "../../store/rewardTransactionHistory/rewardTransactionHistorySlice"
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
const RewardTransactionHistory = (props) => {
  const [rewardTransactionHistoryList, setRewardTransactionHistoryList] = useState([])
  const [selectedPage, setSelectPage] = useState(1)
  
  const [searchObject, setSearchObject] = useState({
    "CustomerID": {type: "text", placeholder: "Customer ID", value: "", },
    "RewardType": {type: "select", placeholder: "Reward Type", value: "", option: [], optionKey: "FieldDescription", optionName: "FieldValue" },
    "TransactionDate": {type: "date", placeholder: "Transaction Date", value: "" },
  })


  const dispatch = useDispatch();
  const rewardTransactionHistory = useSelector(({ rewardTransactionHistory }) => rewardTransactionHistory.rewardTransactionHistory);
  const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);
  const commonDetail = useSelector(({ common }) => common.commonDetail);

  useEffect(() => {
    dispatch(getrewardlist("reward_type"));

}, [dispatch]);

useEffect(() => {
  setSearchObject((prevState) => ({
    ...prevState,
    RewardType: {
      ...prevState.RewardType,
      option: commonDetail.Data,
    }
  }));
  
}, [commonDetail]);


  useEffect(() => {
    dispatch(loadingStatus(true));
    dispatch(getRewardTransactionHistory(dealerGroupObject?.dealerGroupId, selectedPage, searchObject));
  }, [dispatch, selectedPage, searchObject, dealerGroupObject]);

  useEffect(() => {
    setRewardTransactionHistoryList(rewardTransactionHistory?.Data?.Items)
  }, [rewardTransactionHistory]);

  const handleSubmit = () => {
    dispatch(getRewardTransactionHistory(dealerGroupObject?.dealerGroupId, selectedPage, searchObject));
  }

  const handleSelected = (selectedPage) => {
    setSelectPage(selectedPage)
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
            headerLabel="Reward Transaction History"
            path="/add-reward"
            pathName="Add Rewards Transaction"
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
                    <th>Customer Number</th>
                    <th>Customer Name</th>
                    <th>Socail Media Id</th>
                    <th>Reward Type</th>
                    <th>Reward Type</th>
                    <th>Operation Type</th>
                    <th>Create Date</th>
                    <th>Transaction Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rewardTransactionHistory?.Status ? rewardTransactionHistoryList?.map((iteam, index) => (
                    <tr key={index}>
                      <td>{iteam.CustomerID}</td>
                      <td>{iteam.ContactFullName}</td>
                      <td>{iteam.SocialMediaId}</td>
                      <td>{iteam.RewardTypeFieldDescription}</td>
                      <td>{iteam.RewardPoints}</td>
                      <td>{iteam.OperationalTypeFieldDescription}</td>
                      <td>{iteam.RegistrationDate !== "" ? moment(iteam.RegistrationDate).format('MM/DD/YYYY')  : '01/01/1900'}</td>
                      <td>{iteam.TransactionDate !== "" ?  moment(iteam.TransactionDate).format('MM/DD/YYYY')  : '01/01/1900' }</td>
                    </tr>

                  )): (<tr><td colSpan={9}>No records found.</td></tr>)}


                </tbody>
              </Table>
              <PaginationComponent
                totalItems={rewardTransactionHistory?.Data?.TotalSize}
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

export default RewardTransactionHistory