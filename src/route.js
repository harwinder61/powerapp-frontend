import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import Login from "./page/login";
import Dashboard from "./page/dashboard";
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
import { useSelector } from 'react-redux';
import RequireAuthLogin from "./utils/requireAuthLogin";
import ProtectedRoute from './utils/protectedRoute';
import AddMemberShip from "./page/membership/addMembership"
import Setting from "./page/setting/setting"
import RewardType from "./page/rewardType/rewardTypeList"
const DefaultContainer = () => {
    const auth = useSelector(({ auth }) => auth);


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
            <ProtectedRoute exact path="/user" title="Users" Component={Dashboard} />
            <ProtectedRoute exact path="/setting"  Component={Setting} />

        </>
    )

}

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

            <Router basename="/powerapp">
                <Switch>
                    <Route exact path="/" component={RequireAuthLogin(Login)} />
                    <Route exact component={DefaultContainer} />
                </Switch>
            </Router>
        </>
    )
}
export default Routers