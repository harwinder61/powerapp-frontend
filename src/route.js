import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import React, { useEffect} from 'react';
import { useCallback } from 'react'

import Login from "./page/login";
import offerhistoryList from "./page/offerhistory/offerhistoryList"
import CouponList from "./page/coupon/couponList"
import AddCoupon from "./page/coupon/addCoupon"
import AddCoupontransaction from "./page/offerhistory/addCoupontransaction"
import MemberList from "./page/member/memberList"
import MembershipList from "./page/membership/membershipList"
import AddMember from "./page/member/addMember"
import RewardTransactionHistory from "./page/rewardTransactionHistory/rewardTransactionHistoryList"
import AddRewardTransactionHistory from "./page/rewardTransactionHistory/addRewardTransactionHistory";
import SideBar from './component/sidebar';
import LoadingOverlay from 'react-loading-overlay';
import {useDispatch, useSelector } from 'react-redux';
import RequireAuthLogin from "./utils/requireAuthLogin";
import ProtectedRoute from './utils/protectedRoute';
import AddMemberShip from "./page/membership/addMembership"
import Setting from "./page/setting/setting"
import RewardType from "./page/rewardType/rewardTypeList"
import userList from "./page/user/userList"
import AddUser from "./page/user/addUser"
import ChangePassword from "./page/user/changePassword"
import { authRefreshLogin } from "./store/auth/authSlice"

import ConsumerWallet from "./page/consumerWallet/consumerWalletList"
import CouponWallet from "./page/couponWallet/couponWalletList"
import AddTenderCoupon from "./page/couponWallet/addTenderCoupon"
import AddCouponWallet from "./page/couponWallet/addCouponWallet"

const DefaultContainer = () => {
    const auth = useSelector(({ auth }) => auth);
      const dispatch = useDispatch();
    
      const loadData = useCallback(()  => {
        dispatch(authRefreshLogin({
    			"username": auth?.email,
    			"password": auth?.password,
    			"grant_type": 'refresh',
    			"refresh_token": process.env.REACT_APP_REFRESH_TOKEN
    		}));
      }, [dispatch, auth])
      
    
      useEffect(() => {
        loadData()
        setInterval(loadData, 30 * 60 * 1000);
    }, [loadData]);
      


    return (
        <>
            {auth?.userData?.Data?.access_token && <SideBar />}
            <ProtectedRoute exact path="/members" Component={MemberList} />

            <ProtectedRoute exact path="/add-member" title="Member" Component={AddMember} />
            <ProtectedRoute exact path="/update-member/:socialId/:id" title="Member" Component={AddMember} />

            <ProtectedRoute exact path="/coupons" title="Coupon" Component={CouponList} />
            <ProtectedRoute exact path="/add-coupon" title="Coupon" Component={AddCoupon} />
            <ProtectedRoute exact path="/add-coupontransaction" title="Coupon" Component={AddCoupontransaction} />
            <ProtectedRoute exact path="/update-coupon/:id" title="Coupon" Component={AddCoupon} />
            <ProtectedRoute exact path="/membership" title="Membership" Component={MembershipList} />
            <ProtectedRoute exact path="/add-membership" title="Coupon" Component={AddMemberShip} />
            <ProtectedRoute exact path="/update-membership/:id" title="Coupon" Component={AddMemberShip} />
            <ProtectedRoute exact path="/offers" title="Offers,Coupons and Promo" Component={offerhistoryList} />
            <ProtectedRoute exact path="/reward" Component={RewardTransactionHistory} />
            <ProtectedRoute exact path="/add-reward" Component={AddRewardTransactionHistory} />
            <ProtectedRoute exact path="/reward-type" title="Reward Type" Component={RewardType} />
            <ProtectedRoute exact path="/user" title="Users" Component={userList} />
            <ProtectedRoute exact path="/add-user"  Component={AddUser} />
            <ProtectedRoute exact path="/update-user/:id" Component={AddUser} />
            <ProtectedRoute exact path="/update-user-password/:id" Component={ChangePassword} />
            <ProtectedRoute exact path="/consumer-wallet"  Component={ConsumerWallet} />            
            <ProtectedRoute exact path="/setting"  Component={Setting} />
            <ProtectedRoute exact path="/coupon-wallet"  Component={CouponWallet} />            
            <ProtectedRoute exact path="/add-tender-coupon"  Component={AddTenderCoupon} />            
            <ProtectedRoute exact path="/add-coupon-wallet"  Component={AddCouponWallet} />
            

        </>
    )

}

/**
 * Define the rounting 
 * @returns Route
 */

const Routers = () => {
    const loading = useSelector(({ global }) => global.loading);
    return (
        <>
            <LoadingOverlay
                className="loader-spinner"
                active={loading}
                spinner
                text=''
            >
            </LoadingOverlay>

            <Router>
                <Switch>
                    <Route exact path="/" component={RequireAuthLogin(Login)} />
                    <Route exact component={DefaultContainer} />
                </Switch>
            </Router>
        </>
    )
}
export default Routers