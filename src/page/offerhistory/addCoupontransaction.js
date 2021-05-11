import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { addOfferhistory } from "../../store/offerhistory/offerhistorySlice"
import { getrewardlist } from "../../store/common/commonSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import moment from 'moment';
import { useHistory } from "react-router"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";


const AddCoupontransaction = (props) => {
    const { match: { params } } = props
    let history = useHistory()
    const dispatch = useDispatch();
    const loading = useSelector(({ global }) => global.loading);
    const [addOfferhistoryId] = React.useState(params?.id);
    const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);
    const commonDetail = useSelector(({ common }) => common.commonDetail);

    const handleValidSubmit = (event, values) => {
        dispatch(loadingStatus(true));
        if (addOfferhistoryId) {
            // dispatch(updateCoupon({
            //     "coupon_code_id": couponId,
            //     "coupon_code": values?.couponCode,
            //     "coupon_description": values?.couponDescription,
            //     "coupon_terms": values?.couponTermsCondituins,
            //     "reward_type": values?.rewardType,
            //     "coupon_recommendations": values?.couponRecommedations,
            //     "effective_from_date": values?.effectiveFrom,
            //     "effective_to_date": values?.effectiveto,
            //     "DealGroupID": values?.dealerGroup,
            //     "DealerNumber": values?.DealerNumber,
            //     "image_location": values?.imageLocation
            // }, history));
        } else {
            dispatch(addOfferhistory({


                "dealGroupID": dealerGroupObject?.dealerGroupId ? dealerGroupObject?.dealerGroupId : 3,
                "dealerNumber": "DLR0001",
                "couponCode": values?.couponCode,
                "legacyCustomerNumber": values?.legacyCustomerNumber,
                "customerID": values?.customerID,
                "transactionAmount": Number.parseInt(values?.transactionAmount, 10),
                "operationType": values?.operationType,
                "transactionDate": moment.utc(),

            }, history));
        }
    }

    useEffect(() => {
        dispatch(getrewardlist("operational_type"))
    }, [dispatch]);

    return (
        <>
            <div className=" dashboard-container w-100">
                <Container fluid={true}>

                    <Header
                        headerLabel={addOfferhistoryId ? "Edit  Coupon Transaction" : "Add Coupon Transaction"}
                        enableSearch={false}
                        showId={addOfferhistoryId}
                    />
                    <Row className="table-row-outer edit-bg ">
                        <Col>
                            <AvForm onValidSubmit={handleValidSubmit} >

                                <FormGroup row>
                                    <Label for="name" sm={2}>Operation Type</Label>
                                    <Col sm={10}>
                                        <InputText name="operationType" type="select" option={commonDetail?.Data} optionValue="FieldValue" optionName="FieldDescription" />

                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="Transaction Amount" sm={2}>* Transaction Amount</Label>
                                    <Col sm={10}>
                                        <InputText name="transactionAmount" type="text" required />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="couponCode" sm={2}>* Coupon Code</Label>
                                    <Col sm={10}>
                                        <InputText name="couponCode" type="text" required />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>* Dealer Group</Label>
                                    <Col sm={10}>
                                        <InputText name="dealerGroup" value={dealerGroupObject?.dealerGroupName} disabled type="text" required />
                                    </Col>
                                </FormGroup>

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


                                <InputButton color="primary" disabled={loading} name="Submit" />

                            </AvForm>

                        </Col>

                    </Row>
                </Container>
            </div>

        </>
    )
}

export default AddCoupontransaction