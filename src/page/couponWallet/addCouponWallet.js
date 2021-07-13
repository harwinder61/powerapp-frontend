import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import {  addCouponWallet } from "../../store/consumerWallet/consumerWalletSlice";
import { loadingStatus } from "../../store/global/globalSlice";

import { useHistory } from "react-router"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";

import moment from 'moment';

/**
 * Component for add coupon wallet
 * @param {*} props 
 * @returns 
 */

const AddCouponWallet = (props) => {
    let history = useHistory()
    const dispatch = useDispatch();
    const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);

    const loading = useSelector(({ global }) => global.loading);
    const memberDetail = {};
   



    const handleValidSubmit = (event, values) => {
        dispatch(loadingStatus(true));
        
            dispatch(addCouponWallet({
            
                "dealGroupID": dealerGroupObject?.dealerGroupId,
                "dealerNumber": values?.DealerNumber,
                "couponCodeId": values?.CouponCodeId,
                "customerId": 0,
                "socialMediaId": values?.SocialMediaId,
                "phoneNumber": values?.PhoneNumber,
                "vin": values?.Vin,
                "title":values?.Title,
                "firstName": values?.FirstName,
                "middleName": values?.MiddleName,
                "lastName": values?.LastName,
                "issueDate": moment.utc(values?.IssueDate)

            }, history));
        
    }

    return (
        <>
            <div className=" dashboard-container w-100">
                <Container fluid={true}>
                    <Header
                        headerLabel={"Coupon Wallet"}
                        enableSearch={false}
                    />
                    <Row className="table-row-outer">
                        <Col>
                            <AvForm onValidSubmit={handleValidSubmit} >

                                <FormGroup row>
                                    <Label for="CouponCodeId" sm={2}>* Coupon / Voucher Code</Label>
                                    <Col sm={10}>
                                        <InputText name="CouponCodeId" value={memberDetail?.CouponCodeId} type="text" required/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="DealerNumber" sm={2}>* Dealer Number</Label>
                                    <Col sm={10}>
                                        <InputText name="DealerNumber" value={memberDetail?.DealerNumber} type="text" required  />
                                    </Col>
                                </FormGroup>
                                

                                <FormGroup row>
                                    <Label for="SocialMediaId" sm={2}> Social Media Id</Label>
                                    <Col sm={10}>
                                        <InputText name="SocialMediaId" value={memberDetail?.SocialMediaId} type="text" />
                                    </Col>
                                </FormGroup>



                                <FormGroup row>
                                    <Label for="PhoneNumber" sm={2}> Phone Number</Label>
                                    <Col sm={10}>
                                        <InputText name="PhoneNumber" value={memberDetail?.PhoneNumber} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="Vin" sm={2}> Vin</Label>
                                    <Col sm={10}>
                                        <InputText name="Vin" value={memberDetail?.Vin} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="Title" sm={2}>Title</Label>
                                    <Col sm={10}>
                                        <InputText name="Title" value={memberDetail?.Title} type="text"  />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="FirstName" sm={2}> First Name</Label>
                                    <Col sm={10}>
                                        <InputText name="FirstName" placeholder="First Name" value={memberDetail?.FirstName}  />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="MiddleName" sm={2}> Middle Name</Label>
                                    <Col sm={10}>
                                        <InputText name="MiddleName" placeholder="First Name" value={memberDetail?.MiddleName}  />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="LastName" sm={2}> Last Name</Label>
                                    <Col sm={10}>
                                        <InputText name="LastName" placeholder="First Name" value={memberDetail?.LastName}  />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="IssueDate" sm={2}>* Issue Date</Label>
                                    <Col sm={10}>
                                        <InputText name="IssueDate" type="date" required />
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

export default AddCouponWallet