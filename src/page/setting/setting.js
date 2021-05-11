import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { updateDealerGroupState } from "../../store/common/commonSlice";
import InputText from "../../component/input"
import InputButton from "../../component/button"
import Header from "../../component/header";
import { delearGroupType } from "../../utils/constant"

const AddMemberShip = (props) => {
    const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);

    const dispatch = useDispatch();

    const handleValidSubmit = (event, values) => {
            dispatch(updateDealerGroupState(values.dealerGroup, delearGroupType[delearGroupType.findIndex( i => i.value === Number.parseInt(values.dealerGroup))].name));
    }

   
    return (
        <>
            <div className=" dashboard-container w-100">
                <Container fluid={true}>
                    <Header
                        headerLabel="Setting"
                        showId={dealerGroupObject?.dealerGroupId}
                        enableSearch={false}
                    />
                    <Row className="table-row-outer">
                        <Col>
                            <AvForm onValidSubmit={handleValidSubmit} >

                                <FormGroup row>
                                    <Label for="name" sm={2}>* Dealer Group</Label>
                                    <Col sm={10}>
                                        <InputText name="dealerGroup" value={dealerGroupObject?.dealerGroupId} type="select" option={delearGroupType} />
                                    </Col>
                                </FormGroup>

                                <InputButton color="primary"  name="Save" />

                            </AvForm>

                        </Col>

                    </Row>
                </Container>
            </div>

        </>
    )
}

export default AddMemberShip