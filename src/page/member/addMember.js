import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { getmemberById, addMember, updateMember } from "../../store/member/memberSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import moment from 'moment';
import { useHistory } from "react-router"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";


const memberStatus = [{
    name: "Not_registered",
    value: 0
}, {
    name: "Active",
    value: 1
}, {
    name: "Deactivated",
    value: 2
}]

const membershipType = [{
    name: "Basic",
    value: 1
}, {
    name: "Bronze",
    value: 2
}, {
    name: "Silver",
    value: 3
}, {
    name: "Gold",
    value: 4
}, {
    name: "Platinum",
    value: 5
}, {
    name: "Platinum Plus",
    value: 6
}, {
    name: "Black",
    value: 7
}, {
    name: "Test Membership",
    value: 8
}]

const AddMemberShip = (props) => {
    const { match: { params } } = props
    let history = useHistory()
    const dispatch = useDispatch();
    const loading = useSelector(({ global }) => global.loading);
    const [memberId] = React.useState(params?.id);
    const memberDetail = useSelector(({ member }) => member.memberDetail);

    const handleValidSubmit = (event, values) => {
        dispatch(loadingStatus(true));
        if (memberId) {
            dispatch(updateMember({
                "SocialMediaID": values?.social_media_id,
                "MemberCustomerID": 0,
                "DealGroupID": 0,
                "RegistrationDate": values?.registration_date,
                "MembershipType": values?.membership_type_id,
                "MemberStatus": values?.member_status
            }, history));
        } else {
            dispatch(addMember({
                "SocialMediaID": values?.social_media_id,
                "MemberCustomerID": 0,
                "DealGroupID": 0,
                "RegistrationDate": values?.registration_date,
                "MembershipType": values?.membership_type_id,
                "MemberStatus": values?.member_status
            }, history));
        }
    }

    useEffect(() => {
        if (memberId) {
            dispatch(getmemberById(Number.parseInt(memberId), 3));
        } else {
            dispatch(getmemberById(""));
        }
    }, [dispatch, memberId]);



    return (
        <>
            <div className=" dashboard-container w-100">
                <Container fluid={true}>
                    <Header
                        headerLabel="Members"
                        enableSearch={false}
                    />
                    <Row className="table-row-outer">
                        <Col>
                            <AvForm onValidSubmit={handleValidSubmit} >
                                <FormGroup row>
                                    <Label for="member_status" sm={2}>Member Status</Label>
                                    <Col sm={10}>
                                        <InputText name="member_status" value={memberDetail?.member_status} type="select" option={memberStatus} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="membership_type_id" sm={2}>* Member Type</Label>
                                    <Col sm={10}>
                                        <InputText name="membership_type_id" value={memberDetail?.membership_type_id} type="select" option={membershipType} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="registration_date" sm={2}>Registration Date</Label>
                                    <Col sm={10}>
                                        <InputText name="registration_date" value={memberId ? moment(memberDetail?.registration_date).format('YYYY-MM-DD') : ''} type="date" />
                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Label for="name" sm={2}>Schedule Dealer Number</Label>
                                    <Col sm={10}>
                                        <InputText name="couponRecommedations" value={memberDetail?.coupon_recommendations} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="social_media_id" sm={2}>Schedule Customer Number</Label>
                                    <Col sm={10}>
                                        <InputText name="social_media_id" value={memberDetail?.social_media_id} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="social_media_id" sm={2}>Social Media Id</Label>
                                    <Col sm={10}>
                                        <InputText name="social_media_id" value={memberDetail?.social_media_id} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>* Member Customer Id</Label>
                                    <Col sm={10}>
                                        <InputText name="dealerGroup" value={memberId ? memberDetail?.deal_group_id : 'Jones Group'} disabled type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>* Dealer Group</Label>
                                    <Col sm={10}>
                                        <InputText name="dealerGroup" value={memberId ? memberDetail?.deal_group_id : 'Jones Group'} disabled type="text" />
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