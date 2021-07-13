import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { getuserById, updateUser } from "../../store/user/userSlice";
import { loadingStatus } from "../../store/global/globalSlice";

import { useHistory } from "react-router"
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";

/**
 * Component for change password
 * @param {*} props 
 * @returns 
 */

const ChangePassword = (props) => {
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
                "title": memberDetail?.Title,
                "firstName": memberDetail?.FirstName,
                "dealGroupID": memberDetail?.DealGroupID,
                "middleName": memberDetail?.MiddleName,
                "lastName": memberDetail?.LastName,
                "email": memberDetail?.Email,
                "userRole": memberDetail?.UserRole,
                "postalCode": memberDetail?.PostalCode,
                "password": values?.Password,
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
                                    <Label for="Password" sm={2}>* Password</Label>
                                    <Col sm={10}>
                                        <InputText name="Password"  type="password" required />
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

export default ChangePassword