import React from 'react';
import sitelogo from '../Logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormGroup, Label, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from "../store/auth/authSlice"
import { useHistory } from "react-router"

const Login = () => {
	let history = useHistory()
	const dispatch = useDispatch();
	const loading = useSelector(({ global }) => global.loading);


	const handleSubmit = (event, values) => {
		dispatch(authLogin({
			"username": values.email,
			"password": values.password,
			"grant_type": process.env.REACT_APP_GRANT_TYPE,
			"refresh_token": process.env.REACT_APP_REFRESH_TOKEN
		}, history));
	}
	return (
		<>
			<div className="container col-md-5">
				<div className="wrapper min-100 login-wrapper">
					<img src={sitelogo} alt="logo" />
					<div className="form-outer">

						<AvForm onValidSubmit={handleSubmit}>

							<FormGroup row>

								<Label sm={2} >Email</Label>
								<Col sm={10}>
									<AvField required className=" col-md-10 form-control" type="email" name="email" placeholder="Username" 
										validate={{
											required: { value: true, errorMessage: 'Please enter a email' },
										}}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2}  >Password</Label>
								<Col sm={10}>
									<AvField required className=" col-md-10 form-control" type="password" name="password" placeholder="Password" validate={{
											required: { value: true, errorMessage: 'Please enter a password' },
										}}/>
								</Col>
							</FormGroup>

							<div className="row">
								<div className=" col-md-2">

								</div>
								<div className=" col-md-10 d-flex">

									<Button
										color="primary col-md-10"
										disabled={loading}

									>
										Login
				</Button>
									<div className=" col-md-2">

									</div>
								</div>
							</div>




						</AvForm>
					</div>

				</div>
			</div>
		</>
	)
}

export default Login