import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { getmemberById, addMember, updateMember } from "../../store/member/memberSlice";
import { loadingStatus } from "../../store/global/globalSlice";
import { getrewardlist } from "../../store/common/commonSlice";
import { getmemberShip } from "../../store/membership/membershipSlice"
import moment from 'moment';
import { useHistory } from "react-router"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";
import { delearGroupType } from "../../utils/constant"

const AddMemberShip = (props) => {
    const { match: { params } } = props
    let history = useHistory()
    const dispatch = useDispatch();

    const loading = useSelector(({ global }) => global.loading);
    const [memberId] = React.useState(params?.id);
    const memberDetail = useSelector(({ member }) => member.memberDetail);
    const commonDetail = useSelector(({ common }) => common.commonDetail);
    const memberShip = useSelector(({ memberShip }) => memberShip.memberShip);
    useEffect(() => {
        dispatch(loadingStatus(true));
    }, [dispatch]);




    const handleValidSubmit = (event, values) => {
        console.log("values", values)
        dispatch(loadingStatus(true));
        if (memberId) {
            dispatch(updateMember({
                "SocialMediaID": values?.social_media_id,
                "MemberCustomerID": Number.parseInt(memberId, 10),
                "DealGroupID": values?.dealerGroup,
                "RegistrationDate": moment.utc(values?.registration_date),
                "MembershipType": values?.membership_type_id,
                "MemberStatus": values?.member_status
            }, history, 3, 1));
        } else {
            dispatch(addMember({
                "SocialMediaID": values?.social_media_id,
                "DealGroupID": values?.dealerGroup,
                "MemberCustomerID": Number.parseInt(values?.memberCustomerId),
                "RegistrationDate": moment.utc(values?.registration_date),
                "MembershipType": Number.parseInt(values?.membership_type_id),
                "MemberStatus": values?.member_status
            }, history, 3, 1));
        }
    }

    useEffect(() => {
        dispatch(getrewardlist("member_status"));
        dispatch(getmemberShip(3));
        if (memberId) {
            dispatch(getmemberById(Number.parseInt(memberId), 3));
        }
    }, [dispatch, memberId]);


    return (
        <>
            <div className=" dashboard-container w-100">
                <Container fluid={true}>
                    <Header
                        headerLabel={params?.id ? "Member Customer ID" : "Members"}
                        enableSearch={false}
                        showId={memberId}
                    />
                    <Row className="table-row-outer">
                        <Col>
                            <AvForm onValidSubmit={handleValidSubmit} >

                                {!params?.id && <FormGroup row>
                                    <Label for="memberCustomerId" sm={2}>Member Customer ID</Label>
                                    <Col sm={10}>
                                        <InputText name="memberCustomerId" type="text" />
                                    </Col>
                                </FormGroup>}

                                <FormGroup row>
                                    <Label for="social_media_id" sm={2}>Social Media Id</Label>
                                    <Col sm={10}>
                                        <InputText name="social_media_id" value={params?.socialId} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="membership_type_id" sm={2}>* Membership Type</Label>
                                    <Col sm={10}>

                                        <InputText name="membership_type_id" value={memberDetail?.MembershipTypeId} type="select" option={memberShip?.Data} optionValue="MembershipTypeID" optionName="MembershipType" />
                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Label for="member_status" sm={2}>Member Status</Label>
                                    <Col sm={10}>
                                        <InputText name="member_status" value={memberDetail?.MemberStatus} type="select" option={commonDetail?.Data} optionValue="FieldValue" optionName="FieldDescription" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="registration_date" sm={2}>Registration Date</Label>
                                    <Col sm={10}>
                                        <InputText name="registration_date" value={memberId ? moment(memberDetail?.RegistrationDate).format('YYYY-MM-DD') : ''} type="date" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>* Dealer Group</Label>
                                    <Col sm={10}>
                                        <InputText name="dealerGroup" value={memberDetail?.DealGroupID} type="select" option={delearGroupType} />
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