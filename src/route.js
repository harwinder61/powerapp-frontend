import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./page/login";
import Dashboard from "./page/dashboard";
import AddCoupon from "./page/addCoupon"
import SideBar from './component/sidebar';
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from 'react-redux';
// import RequireAuth from "./utils/requireAuth";
import RequireAuthLogin from "./utils/requireAuthLogin";
import ProtectedRoute from './utils/protectedRoute';

   const DefaultContainer = () => (
      <>
      <SideBar/>
        <ProtectedRoute exact path="/dashboard" title="Coupon" Component={Dashboard}/>
        <ProtectedRoute exact path="/add-coupon" title="Coupon" Component={AddCoupon}/>
        <Route exact path="/members" render={(props) => <Dashboard title="Members" {...props} />}/>
        <Route exact path="/offers" render={(props) => <Dashboard title="Offers,Coupons and Promo" {...props} />}/>
        <Route exact path="/coupons" render={(props) => <Dashboard title="Offers,Coupons and Promo History" {...props} />}/>
        <Route exact path="/reward" render={(props) => <Dashboard title="Reward Transaction History" {...props} />}/>
        <Route exact path="/dealer" render={(props) => <Dashboard title="Add Dealer Options (New Options)" {...props} />}/>
        <Route exact path="/user" render={(props) => <Dashboard title="Users" {...props} />}/>
     
      </>
   )
   

const Routers =() =>  {
    const loading = useSelector(({ global }) => global.loading);
    return (
            <>
                <LoadingOverlay
                    className ="loader-spinner"
                    active={loading}
                    spinner
                    text=''
                    >
                </LoadingOverlay>

            <Router>
            <Switch>
                <Route exact path="/" component={RequireAuthLogin(Login)} />
                <Route exact component={DefaultContainer}/>
            </Switch>
            </Router>
        </>
        )
    }      
export default Routers