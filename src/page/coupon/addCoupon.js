import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, getcouponById, updateCoupon } from "../../store/coupon/couponSlice"
import { getrewardlist } from "../../store/common/commonSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import moment from 'moment';
import { useHistory } from "react-router"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";


const AddCoupon = (props) => {
    const { match: { params } } = props
    let history = useHistory()
    const dispatch = useDispatch();
    const loading = useSelector(({ global }) => global.loading);
    const [couponId] = React.useState(params?.id);
    const couponDetail = useSelector(({ coupon }) => coupon.couponDetail);
    const commonDetail = useSelector(({ common }) => common.commonDetail);
    const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);


    const handleValidSubmit = (event, values) => {
        dispatch(loadingStatus(true));
        if (couponId) {
            dispatch(updateCoupon({
                "couponCodeId": couponId,
                "couponCode": values?.couponCode,
                "couponDescription": values?.couponDescription,
                "couponTermsConditions": values?.couponTermsCondituins,
                "rewardType": values?.rewardType,
                "couponRecommendations": values?.couponRecommedations,
                "EffectiveFromDate": values?.effectiveFrom,
                "effectiveToDate": values?.effectiveto,
                "dealGroupID": dealerGroupObject?.dealerGroupId ? dealerGroupObject?.dealerGroupId :  couponDetail?.DealGroupID,
                "dealerNumber": 'DLR0001',
                "imageLocation": values?.imageLocation
            }, history));
        } else {
            dispatch(addCoupon({
                "couponCode": values?.couponCode,
                "couponDescription": values?.couponDescription,
                "couponTermsConditions": values?.couponTermsCondituins,
                "rewardType": values?.rewardType,
                "couponRecommendations": values?.couponRecommedations,
                "EffectiveFromDate": values?.effectiveFrom,
                "effectiveToDate": values?.effectiveto,
                "dealGroupID": dealerGroupObject?.dealerGroupId ? dealerGroupObject?.dealerGroupId :  1,
                "dealerNumber": 'DLR0001',
                "imageLocation": values?.imageLocation
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

    useEffect(() => {
        dispatch(getrewardlist("reward_type"));

    }, [dispatch]);

    return (
        <>
            <div className=" dashboard-container w-100">
                <Container fluid={true}>

                    <Header
                        headerLabel={couponId ? "Edit Coupon" : "Add Coupon"}
                        enableSearch={false}
                        showId={couponId}
                    />
                    <Row className="table-row-outer edit-bg ">
                        <Col>
                            <AvForm onValidSubmit={handleValidSubmit} >
                                <FormGroup row>
                                    <Label for="couponCode" sm={2}>* Coupon Code</Label>
                                    <Col sm={10}>
                                        <InputText name="couponCode" value={couponDetail?.CouponCode} type="text" required />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Coupon Description</Label>
                                    <Col sm={10}>
                                        <InputText name="couponDescription" value={couponDetail?.CouponDescription} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Coupon Recommedations</Label>
                                    <Col sm={10}>
                                        <InputText name="couponRecommedations" value={couponDetail?.CouponRecommendations} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Coupon terms conditions</Label>
                                    <Col sm={10}>
                                        <InputText name="couponTermsCondituins" value={couponDetail?.CouponTermsConditions} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>* Dealer Group</Label>
                                    <Col sm={10}>
                                        <InputText name="dealerGrouplabel" value={dealerGroupObject?.dealerGroupName} disabled type="text" />
                                        <InputText name="DealerNumber" value={couponDetail?.DealGroupID} type="hidden" />
                                        <InputText name="dealerGroup" value={couponDetail?.DealGroupID} type="hidden" />
                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Label for="name" sm={2}>Effective From</Label>
                                    <Col sm={10}>
                                        <InputText name="effectiveFrom" value={couponId ? moment(couponDetail?.EffectiveFromDate).format('YYYY-MM-DD') : ''} type="date" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Effective To</Label>
                                    <Col sm={10}>
                                        <InputText name="effectiveto" value={couponId ? moment(couponDetail?.EffectiveToDate).format('YYYY-MM-DD') : ''} type="date" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Image Location</Label>
                                    <Col sm={10}>
                                        <InputText name="imageLocation" value={couponDetail?.ImageLocation} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>Reward type</Label>
                                    <Col sm={10}>
                                        <InputText name="rewardType" value={couponDetail?.RewardType} type="select" option={commonDetail.Data} optionValue="FieldValue" optionName="FieldDescription" />

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