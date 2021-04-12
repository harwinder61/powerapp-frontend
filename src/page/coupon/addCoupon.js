import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, getcouponById, updateCoupon } from "../../store/coupon/couponSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import moment from 'moment';
import { useHistory } from "react-router"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";


const serviceOrder = [{
    name: "Service Order",
    value: "SO"
}, {
    name: "Vehicle Purchase",
    value: "VP"
}, {
    name: "Affiliate Marketing",
    value: "AF"
}, {
    name: "Vehicle Lease",
    value: "VL"
}, {
    name: "Parts Purchase",
    value: "PP"
}]

const AddCoupon = (props) => {
    const { match: { params } } = props
    let history = useHistory()
    const dispatch = useDispatch();
    const loading = useSelector(({ global }) => global.loading);
    const [couponId] = React.useState(params?.id);
    const couponDetail = useSelector(({ coupon }) => coupon.couponDetail);
	
	const handleValidSubmit = (event, values) => {
        dispatch(loadingStatus(true));
        if (couponId) {
            dispatch(updateCoupon({
                "coupon_code_id": couponId,
                "coupon_code": values?.couponCode,
                "coupon_description": values?.couponDescription,
                "coupon_terms": values?.couponTermsCondituins,
                "reward_type": values?.rewardType,
                "coupon_recommendations": values?.couponRecommedations,
                "effective_from_date": values?.effectiveFrom,
                "effective_to_date": values?.effectiveto,
                "DealGroupID": values?.dealerGroup,
                "DealerNumber": values?.DealerNumber,
                "image_location": values?.imageLocation
            }, history));
        } else {
            dispatch(addCoupon({
                "coupon_code": values?.couponCode,
                "coupon_description": values?.couponDescription,
                "coupon_terms": values?.couponTermsCondituins,
                "reward_type": values?.rewardType,
                "coupon_recommendations": values?.couponRecommedations,
                "effective_from_date": values?.effectiveFrom,
                "effective_to_date": values?.effectiveto,
                "DealGroupID": 1,
                "DealerNumber": values?.DealerNumber,
				"image_location": values?.imageLocation
            }, history));
        }
    }

    useEffect(() => {
        if (couponId) {
            dispatch(getcouponById(Number.parseInt(couponId)));
        } else {
            dispatch(getcouponById(""));
        }
    }, [dispatch, couponId]);



    return (
        <>
            <div className=" dashboard-container w-100">
                <Container fluid={true}>
					
					<Header
                        headerLabel={couponId ? "Edit Coupon" : "Add Coupon"}
                        enableSearch={false}
                    />
                    <Row className="table-row-outer edit-bg ">
                        <Col>
                            <AvForm onValidSubmit={handleValidSubmit} >
                                <FormGroup row>
                                    <Label for="couponCode" sm={2}>* Coupon Code</Label>
                                    <Col sm={10}>
                                        <InputText name="couponCode" value={couponDetail?.coupon_code} type="text" required />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Coupon Description</Label>
                                    <Col sm={10}>
                                        <InputText name="couponDescription" value={couponDetail?.coupon_description} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Coupon Recommedations</Label>
                                    <Col sm={10}>
                                        <InputText name="couponRecommedations" value={couponDetail?.coupon_recommendations} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Coupon terms conditions</Label>
                                    <Col sm={10}>
                                        <InputText name="couponTermsCondituins" value={couponDetail?.coupon_terms_conditions} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>* Dealer Group</Label>
                                    <Col sm={10}>
                                        <InputText name="dealerGroup" value={couponId ? couponDetail?.deal_group_id : 'Jones Group'} disabled type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Dealer Number</Label>
                                    <Col sm={10}>
                                        <InputText name="DealerNumber" value={couponDetail?.dlrid} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Effective From</Label>
                                    <Col sm={10}>
                                        <InputText name="effectiveFrom" value={couponId ? moment(couponDetail?.effective_from_date).format('YYYY-MM-DD') : ''} type="date" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Effective To</Label>
                                    <Col sm={10}>
                                        <InputText name="effectiveto" value={couponId ? moment(couponDetail?.effective_to_date).format('YYYY-MM-DD') : ''} type="date" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Image Location</Label>
                                    <Col sm={10}>
                                        <InputText name="imageLocation" value={couponDetail?.image_location} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Reward type</Label>
                                    <Col sm={10}>
                                        <InputText name="rewardType" value={couponDetail?.reward_type} type="select" option={serviceOrder} />

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

export default AddCoupon