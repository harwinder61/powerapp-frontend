import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { addRewardTransactionHistory } from "../../store/rewardTransactionHistory/rewardTransactionHistorySlice"
import { getRewardType, getOperationType } from "../../store/common/commonSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import moment from 'moment';
import { useHistory } from "react-router"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";


const AddRewardTransactionHistory = (props) => {
    let history = useHistory()
    const dispatch = useDispatch();
    const loading = useSelector(({ global }) => global.loading);
    const rewardType = useSelector(({ common }) => common.rewardType);
    const operationType = useSelector(({ common }) => common.operationType);
    const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);


    const handleValidSubmit = (event, values) => {
        dispatch(loadingStatus(true));
        dispatch(addRewardTransactionHistory({
            "legacyCustomerNumber": values?.legacyCustomerNumber,
            "customerID": values?.customerID,
            "dealGroupID": dealerGroupObject?.dealerGroupId ? dealerGroupObject?.dealerGroupId : 3,
            "transactionAmount": values?.transactionAmount,
            "rewardType": values?.rewardType,
            "operationType": values?.operationType,
            "transactionDate": moment.utc(),
        }, history));

    }
    useEffect(() => {
        dispatch(getRewardType("reward_type"))
    }, [dispatch]);

    useEffect(() => {
        dispatch(getOperationType("operational_type"))
    }, [dispatch]);


    return (
        <>
            <div className=" dashboard-container w-100">
                <Container fluid={true}>

                    <Header
                        headerLabel="Add Rewards Transaction"
                        enableSearch={false}
                    />
                    <Row className="table-row-outer edit-bg ">
                        <Col>
                            <AvForm onValidSubmit={handleValidSubmit} >

                                <FormGroup row>
                                    <Label for="customerID" sm={2}>* Customer ID</Label>
                                    <Col sm={10}>
                                        <InputText name="customerID" type="text" required />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="legacyCustomerNumber" sm={2}>* Legacy Customer Number</Label>
                                    <Col sm={10}>
                                        <InputText name="legacyCustomerNumber" type="text" required />
                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Label for="transactionAmount" sm={2}>* Transaction Amount</Label>
                                    <Col sm={10}>
                                        <InputText name="transactionAmount" type="text" required />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="rewardType" sm={2}>* reward Type</Label>
                                    <Col sm={10}>
                                        <InputText name="rewardType" type="select" option={rewardType?.Data} optionValue="FieldValue" optionName="FieldDescription" required />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>* Operation Type</Label>
                                    <Col sm={10}>
                                        <InputText name="operationType" type="select" option={operationType?.Data} optionValue="FieldValue" optionName="FieldDescription" />

                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Label for="name" sm={2}>* Dealer Group</Label>
                                    <Col sm={10}>
                                        <InputText name="dealerGroup" value={dealerGroupObject?.dealerGroupName} disabled type="text" required />
                                    </Col>
                                </FormGroup>


                                <InputButton color="primary" disabled={loading} name="Submit" />

                            </AvForm>

                        </Col>

                    </Row>
                </Container>
            </div>

        </>
    )
}

export default AddRewardTransactionHistory