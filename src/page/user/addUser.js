import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { getuserById, addUser, updateUser } from "../../store/user/userSlice";
import { loadingStatus } from "../../store/global/globalSlice";

import { useHistory } from "react-router"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";
import { delearGroupType, userRoleList } from "../../utils/constant"

/**
 * Component for add user
 * @param {*} props 
 * @returns 
 */

const AddUser = (props) => {
    const { match: { params } } = props
    let history = useHistory()
    const dispatch = useDispatch();

    const loading = useSelector(({ global }) => global.loading);
    const [memberId] = React.useState(params?.id);
    const memberDetail = useSelector(({ user }) => user.userDetail?.[0]);
   



    const handleValidSubmit = (event, values) => {
        dispatch(loadingStatus(true));
        if (memberId) {
            dispatch(updateUser({
                "userID": Number.parseInt(memberId, 10),
                "title": values?.Title,
                "firstName": values?.FirstName,
                "dealGroupID": values?.dealerGroup,
                "middleName": values?.MiddleName,
                "lastName": values?.LastName,
                "email": values?.Email,
                "userRole": values?.userRole,
                "postalCode": values?.postalCode
            }, history));
        } else {
            dispatch(addUser({
                "title": values?.Title,
                "firstName": values?.FirstName,
                "dealGroupID": values?.dealerGroup,
                "middleName": values?.MiddleName,
                "lastName": values?.LastName,
                "email": values?.Email,
                "password": values?.Password,
                "userRole": values?.userRole,
                "postalCode": values?.postalCode
            
            }, history));
        }
    }

    useEffect(() => {
        if (memberId) {
            dispatch(getuserById(Number.parseInt(memberId)));
        }
    }, [dispatch, memberId]);


    return (
        <>
            <div className=" dashboard-container w-100">
                <Container fluid={true}>
                    <Header
                        headerLabel={"User"}
                        enableSearch={false}
                        showId={memberId}
                    />
                    <Row className="table-row-outer">
                        <Col>
                            <AvForm onValidSubmit={handleValidSubmit} >

                                <FormGroup row>
                                    <Label for="Title" sm={2}>Title</Label>
                                    <Col sm={10}>
                                        <InputText name="Title" value={memberDetail?.Title} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="FirstName" sm={2}>* First Name</Label>
                                    <Col sm={10}>
                                        <InputText name="FirstName" value={memberDetail?.FirstName} type="text" required/>
                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Label for="MiddleName" sm={2}>Middle Name</Label>
                                    <Col sm={10}>
                                        <InputText name="MiddleName" value={memberDetail?.MiddleName} type="text" />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="LastName" sm={2}>* Last Name</Label>
                                    <Col sm={10}>
                                        <InputText name="LastName" value={memberDetail?.LastName} type="text" required/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="Email" sm={2}>* Email</Label>
                                    <Col sm={10}>
                                        <InputText name="Email" value={memberDetail?.Email} type="text" required/>
                                    </Col>
                                </FormGroup>

                                {!params?.id && <FormGroup row>
                                    <Label for="Password" sm={2}>* Password</Label>
                                    <Col sm={10}>
                                        <InputText name="Password" value={memberDetail?.Password} type="password" required />
                                    </Col>
                                </FormGroup>}



                                <FormGroup row>
                                    <Label for="name" sm={2}>* Dealer Group</Label>
                                    <Col sm={10}>
                                        <InputText name="dealerGroup" placeholder="Dealer Group" value={memberDetail?.DealGroupID} type="select" option={delearGroupType} required />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="name" sm={2}>* User Role</Label>
                                    <Col sm={10}>
                                        <InputText name="userRole" placeholder="User Role" value={memberDetail?.UserRole} type="select" option={userRoleList} required />
                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Label for="name" sm={2}>* Postal Code</Label>
                                    <Col sm={10}>
                                        <InputText name="postalCode" placeholder="User Role" value={memberDetail?.PostalCode} required />
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

export default AddUser