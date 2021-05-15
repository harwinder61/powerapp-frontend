import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRewardType, updateRewardType } from "../../store/rewardType/rewardTypeSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PaginationComponent from "react-reactstrap-pagination";
import { AvForm } from 'availity-reactstrap-validation';
import { rewardUnitList } from "../../utils/constant"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";

/**
 * Component for dispaly the member list
 * @param {*} props 
 * @returns 
 */
const RewardTypeList = (props) => {

  // const variable decare
  const [selectedPage, setSelectPage] = useState(1)
  const [rewardTypeDetail, setRewardTypeDetail] = useState(null)
  const dispatch = useDispatch();
  const rewardType = useSelector(({ rewardType }) => rewardType.rewardType);
  const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);
  const loading = useSelector(({ global }) => global.loading);

  useEffect(() => {
    dispatch(loadingStatus(true));
    setRewardTypeDetail(null)
    dispatch(getRewardType(dealerGroupObject?.dealerGroupId, selectedPage ));
  }, [dispatch, dealerGroupObject, selectedPage]);

  // useEffect(() => {
  //   setRewardTypeList(rewardType?.Data)
  // }, [rewardType]);


  const handleSelected = (selectedPage) => {
    setSelectPage(selectedPage)
  }


  const handleValidSubmit = (event, values) => {
    dispatch(loadingStatus(true));

        if (rewardTypeDetail) {
            dispatch(updateRewardType({
              "dealGroupID": dealerGroupObject?.dealerGroupId,
              "dealerOptionsId": rewardTypeDetail?.DealerOptionsId,
              "rewardType": rewardTypeDetail?.RewardType,
              "rewardAmount": values?.RewardAmount,
              "rewardUnit": values?.RewardUnit
           }, dealerGroupObject?.dealerGroupId, selectedPage ));
           setRewardTypeDetail(null)
    
        }
  }

  return (
    <>

      <div className=" dashboard-container w-100">
        <Container fluid={true}>
          <Header
            enableSearch={false}
            headerLabel="Reward Types"
          />

          <Row className="table-row-outer">
            <Col>
            <AvForm onValidSubmit={handleValidSubmit} >
                          
              <Table borderless>
                <thead>
                  <tr>
                    <th>Option Id</th>
                    <th>Reward Type</th>
                    <th>Reward Amount</th>
                    <th>Reward Unit</th>
                    <th>Created Date</th>
                    <th>Last update</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log("rewardTypeDetail", rewardTypeDetail)}

                  {rewardType?.Status ? rewardType?.Data?.Items?.map((iteam, index) => (
                    <tr key={index}>
                      <td>{iteam.DealerOptionsId}</td>
                      <td >{iteam.FieldDefinitionsFieldDescription}</td>
                      <td >{rewardTypeDetail?.DealerOptionsId === iteam.DealerOptionsId ? (<InputText name="RewardAmount" value={iteam.RewardAmount} type="text" required />) : iteam.RewardAmount}</td>
                      <td >{rewardTypeDetail?.DealerOptionsId === iteam.DealerOptionsId ? (<InputText name="RewardUnit" value={iteam.RewardUnit} type="select" required option={rewardUnitList}/>) : iteam.RewardUnit}</td>
                      <td >{iteam.CreatedDate !== "" ? moment(iteam.CreatedDate).format('MM/DD/YYYY')  : '01/01/1900' }</td>
                      <td >{iteam.LastUpdatedDate !== "" ? moment(iteam.LastUpdatedDate).format('MM/DD/YYYY')  : '01/01/1900'}</td>

                      <td>
                        {rewardTypeDetail?.DealerOptionsId === iteam.DealerOptionsId ? <InputButton color="primary" disabled={loading} name="Update"/> : <Button color="link" onClick={() => setRewardTypeDetail(iteam)}>
                          <FontAwesomeIcon icon={["fas", "pen"]} /> <i className="fas fa-pencil-alt"></i>
                        </Button>}
                      </td>

                    </tr>

                  )) : (<tr><td colSpan={9}>No records found.</td></tr>)}


                </tbody>
              </Table>
              </AvForm>

              <PaginationComponent
                totalItems={rewardType?.Data?.TotalSize}
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

export default RewardTypeList