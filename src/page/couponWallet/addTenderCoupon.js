import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import {  addtendercoupon } from "../../store/consumerWallet/consumerWalletSlice";
import { loadingStatus } from "../../store/global/globalSlice";
import {  getOperationType } from "../../store/common/commonSlice"

import { useHistory } from "react-router"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";

/**
 * Component for add tender coupon
 * @param {*} props 
 * @returns 
 */

const AddTenderCoupon = (props) => {
    let history = useHistory()
    const dispatch = useDispatch();
    const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);
    const operationType = useSelector(({ common }) => common.operationType);

    const loading = useSelector(({ global }) => global.loading);
    const tenderCouponDetail = useSelector(({ consumerWallet }) => consumerWallet.tenderCouponResult);;
   



    const handleValidSubmit = (event, values) => {
        dispatch(loadingStatus(true));
        
            dispatch(addtendercoupon({
                "walletId": values?.WalletId,
                "dealGroupID": dealerGroupObject?.dealerGroupId,
                "dealerNumber": values?.DealerNumber,
                "couponCodeId": tenderCouponDetail?.CouponCodeId,
                "customerId": tenderCouponDetail?.CustomerId,
                "socialMediaId": values?.SocialMediaId,
                "phoneNumber": values?.PhoneNumber,
                "vin": values?.Vin,
                "transactionAmount":values?.TransactionAmount,
                "operationalType": values?.OperationalType
            }, history));
        
    }

    useEffect(() => {
        dispatch(getOperationType("operational_type"))
    }, [dispatch]);



    return (
        <>
            <div className=" dashboard-container w-100">
                <Container fluid={true}>
                    <Header
                        headerLabel={"Tender Coupon"}
                        enableSearch={false}
                    />
                    <Row className="table-row-outer">
                        <Col>
                            <AvForm onValidSubmit={handleValidSubmit} >

                                <FormGroup row>
                                    <Label for="WalletId" sm={2}>* Wallet Id</Label>
                                    <Col sm={10}>
                                        <InputText name="WalletId" value={tenderCouponDetail?.WalletId} disabled type="text" required/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="DealerNumber" sm={2}>* Dealer Number</Label>
                                    <Col sm={10}>
                                        <InputText name="DealerNumber" value={tenderCouponDetail?.DealerNumber} disabled type="text" required/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="SocialMediaId" sm={2}> Social Media Id</Label>
                                    <Col sm={10}>
                                        <InputText name="SocialMediaId" value={tenderCouponDetail?.SocialMediaId} type="text" />
                                    </Col>
                                </FormGroup>



                                <FormGroup row>
                                    <Label for="PhoneNumber" sm={2}>Phone Number</Label>
                                    <Col sm={10}>
                                        <InputText name="PhoneNumber" value={tenderCouponDetail?.PhoneNumber} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="Vin" sm={2}>* Vin</Label>
                                    <Col sm={10}>
                                        <InputText name="Vin" value={tenderCouponDetail?.Vin} type="text" disabled required/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="TransactionAmount" sm={2}>* Transaction Amount</Label>
                                    <Col sm={10}>
                                        <InputText name="TransactionAmount" value={tenderCouponDetail?.TransactionAmount} type="yext" required />
                                    </Col>
                                </FormGroup>

                                
                                <FormGroup row>
                                    <Label for="OperationalType" sm={2}>* Operational Type</Label>
                                    <Col sm={10}>
                                        <InputText name="OperationalType" placeholder="Operational Type" type="select" option={operationType?.Data} optionValue="FieldValue" optionName="FieldDescription" required />
                                    </Col>
                                </FormGroup>
                                <InputButton color="primary" disabled={loading}>Submit</InputButton>
                            </AvForm>

                        </Col>

                    </Row>
                </Container>
            </div>

        </>
    )
}

export default AddTenderCoupon