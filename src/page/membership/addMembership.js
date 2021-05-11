import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { getmemberShipById, addMemberShip, updateMemberShip } from "../../store/membership/membershipSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import { getrewardlist } from "../../store/common/commonSlice"
import moment from 'moment';
import { useHistory } from "react-router"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";



const AddMemberShip = (props) => {
    const { match: { params } } = props
    let history = useHistory()
    const dispatch = useDispatch();
    const loading = useSelector(({ global }) => global.loading);
    const [memberId] = React.useState(params?.id);
    const memberDetail = useSelector(({ memberShip }) => memberShip.memberShipDetail);
    const commonDetail = useSelector(({ common }) => common.commonDetail);

    const handleValidSubmit = (event, values) => {
        dispatch(loadingStatus(true));

        if (memberId) {
            dispatch(updateMemberShip({
                "MembershipTypeId": memberId,
                "DealGroupID": 3,
                "MembershipType": values?.MembershipType,
                "DiscountValue": values?.DiscountValue,
                "DiscountUnit": values?.DiscountUnit,
                "ValidUntilDate": values?.ValidUntilDate,
                "MinimumPoints": values?.MinimumPoints,
                "PointsMultipler": values?.PointsMultipler,
                "membershipBenefits": values?.MembershipBenefits
            }, history));
        } else {
            dispatch(addMemberShip({
                "MembershipTypeId": 0,
                "DealGroupID": 3,
                "MembershipType": values?.MembershipType,
                "DiscountValue": values?.DiscountValue,
                "DiscountUnit": values?.DiscountUnit,
                "ValidUntilDate": values?.ValidUntilDate,
                "MinimumPoints": values?.MinimumPoints,
                "PointsMultipler": values?.PointsMultipler,
                "membershipBenefits": values?.MembershipBenefits
            }, history));
        }
    }

    useEffect(() => {
        // const discount_unit = dispatch(getrewardlist("discount_unit"));
        if (memberId) {
            dispatch(getmemberShipById(Number.parseInt(memberId)));
        } else {
            dispatch(getmemberShipById(""));
        }
    }, [dispatch, memberId]);


    useEffect(() => {
        dispatch(getrewardlist("discount_unit"))
    }, [dispatch, memberId]);



    return (
        <>
            <div className=" dashboard-container w-100">
                <Container fluid={true}>
                    <Header
                        headerLabel="Members Type"
                        enableSearch={false}
                        showId={memberId}
                    />
                    <Row className="table-row-outer edit-bg">
                        <Col>
                            <AvForm onValidSubmit={handleValidSubmit} >
                                <FormGroup row>
                                    <Label for="member_status" sm={2}>* Membership Type</Label>
                                    <Col sm={10}>
                                        <InputText name="MembershipType" value={memberDetail?.MembershipType} type="text" required />

                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="membershiMinimumPointsp_type_id" sm={2}>Minimum Points</Label>
                                    <Col sm={10}>
                                        <InputText name="MinimumPoints" value={memberDetail?.MinimumPoints} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="DiscountValue" sm={2}>* DiscountValue</Label>
                                    <Col sm={10}>
                                        <InputText name="DiscountValue" value={memberDetail?.DiscountValue} required type="text" />
                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Label for="DiscountUnit" sm={2}>* Discount Unit</Label>
                                    <Col sm={10}>
                                        <InputText name="DiscountUnit" required value={memberDetail?.DiscountUnit} type="select" option={commonDetail?.Data ? commonDetail?.Data : []} optionValue="FieldValue" optionName="FieldDescription" />
                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Label for="PointsMultipler" sm={2}>Points Multipler</Label>
                                    <Col sm={10}>
                                        <InputText name="PointsMultipler" value={memberDetail?.PointsMultipler} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="MembershipBenefits" sm={2}>Membership Benefits</Label>
                                    <Col sm={10}>
                                        <InputText name="MembershipBenefits" value={memberDetail?.MembershipBenefits} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="ValidUntilDate" sm={2}>* Valid Until</Label>
                                    <Col sm={10}>
                                        <InputText name="ValidUntilDate" required value={memberId ? moment(memberDetail?.ValidUntilDate).format('YYYY-MM-DD') : ''} type="date" />
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

export default AddMemberShip