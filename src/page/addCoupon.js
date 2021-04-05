import React from 'react';
// import { useHistory } from "react-router"
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, Label, Button, Container, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon } from "../store/coupon/couponSlice"
import { loadingStatus } from "../store/global/globalSlice"


const AddCoupon = (props) => {
    const dispatch = useDispatch();
    const loading = useSelector(({ global }) => global.loading);

    const handleValidSubmit = (event, values) => {
        dispatch(loadingStatus(true));
        dispatch(addCoupon(values));
      }
    
 return (
  <>
  <div className =" dashboard-container w-100">
		<Container fluid={true}>
      <Row>
        <Col className="text-right py-2">Aclaro PowerApp</Col>
      </Row>
      <div className ="buttons-row">
      <Row >
        <Col>
        
        {props?.title}
        
        </Col>
        <Col className=" text-md-right left-col-sec">
            <div className="dealer_name">Dealer Group : Jones Group </div>
        </Col>
      
      </Row>
      </div>
       <Row className="table-row-outer">
         <Col>
            <AvForm onValidSubmit={handleValidSubmit}>
                <FormGroup row>
                    <Label for="name" sm={2}>* Coupon Code</Label>
                    <Col sm={10}>
                        <AvField name="couponCode"  type="text" required />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="name" sm={2}>Coupon Description</Label>
                    <Col sm={10}>
                        <AvField name="couponDescription"  type="text" />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="name" sm={2}>Coupon Recommedations</Label>
                    <Col sm={10}>
                        <AvField name="couponRecommedations"  type="text" />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="name" sm={2}>Coupon terms conditions</Label>
                    <Col sm={10}>
                        <AvField name="couponTermsCondituins"  type="text"  />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="name" sm={2}>* Dealer Group</Label>
                    <Col sm={10}>
                        <AvField name="dealerGroup"  type="text" required />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="name" sm={2}>Dealer Name</Label>
                    <Col sm={10}>
                        <AvField name="dealerName"  type="text"  />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="name" sm={2}>Effective From</Label>
                    <Col sm={10}>
                        <AvField name="effectiveFrom"  type="text"  />
                    </Col>
                </FormGroup>

                <Button color="primary" disabled={loading}>Submit</Button>

            </AvForm>

         </Col>
      
         </Row>      
      </Container>
    </div>
    
	</>
  )
}
	
export default AddCoupon