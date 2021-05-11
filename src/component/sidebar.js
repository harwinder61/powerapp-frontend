// sidebar.
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import React from 'react';
import '../App.scss';
import sitelogo from '../Logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from "../store/auth/authSlice"
import { useHistory } from "react-router"


const SideBar = () => {
	const dispatch = useDispatch();
	const auth = useSelector(({ auth }) => auth);
	let history = useHistory()


	return (
		<div className="sidenav" >
			<div className="sidebar-logo">
				<img alt="logo" src={sitelogo} />
			</div>
			<ul className="sidemenu">
				<li><Link to="/membership">Membership Types</Link></li>
				<li><Link to="/members">Members</Link></li>
				<li><Link to="/coupons">Offers,Coupons and Promo</Link></li>
				<li><Link to="/offers">Offers,Coupons and Promo History</Link></li>
				<li><Link to="/reward">Reward Transaction History</Link></li>
				<li><Link to="/reward-type">Reward Type</Link></li>
				<li><Link to="/user">Users</Link></li>
				<li><Link to="/setting">Setting</Link></li>
				<li > {auth?.email}
					<Button
						color="primary log-out"
						onClick={() => {
							dispatch(authLogout())
							history.push("/")
						}}
					>
						Log out
				</Button>
				</li>


			</ul>
		</div>
	);
};

export default SideBar