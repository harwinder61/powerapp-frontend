import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getConsumerWallet, setSearchValue } from "../../store/consumerWallet/consumerWalletSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import { useDispatch, useSelector } from 'react-redux';
import PaginationComponent from "react-reactstrap-pagination";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../../component/header";

/**
 * Component for dispaly the coupon list
 * @param {*} props 
 * @returns 
 */


const ConsumerWallet = (props) => {
  const [consumerWalletList, setConsumerWallet] = useState([])
  const [selectedPage, setSelectPage] = useState(1)
  // const [activeTr ,setActiveTr] = useState("")

  const [searchObject, setSearchObject] = useState({
    "SocialMediaId": {type: "text", placeholder: "Social Media Id", value: "", },
    "PhoneNumber": {type: "text", placeholder: "Phone Number", value: "", },
    "CustomerId": {type: "text", placeholder: "Customer Id", value: "", },
    "Vin": {type: "text", placeholder: "Vin", value: "", },
   
    // "UserType": {type: "select", placeholder: "User Type", value: "", option: userTypeList, optionKey: "FieldDescription", optionName: "FieldValue" },

  })

  const dispatch = useDispatch();
  const consumerWallet = useSelector(({ consumerWallet }) => consumerWallet.consumerWallet);
  const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);

  useEffect(() => {
    dispatch(loadingStatus(true));
    dispatch(getConsumerWallet( selectedPage, searchObject, dealerGroupObject?.dealerGroupId));
  }, [dispatch, selectedPage, searchObject, dealerGroupObject]);

  useEffect(() => {
    // let list = []
    // consumerWallet && consumerWallet?.Data?.Items?.map(iteam => {
    //   if(list.findIndex(x => x.SocialMediaId === iteam.SocialMediaId && x.PhoneNumber === iteam.PhoneNumber && x.CustomerId === iteam.CustomerId && x.vin === iteam.vin ) !== -1){
    //     list[list.findIndex(x => x.SocialMediaId === iteam.SocialMediaId && x.PhoneNumber === iteam.PhoneNumber && x.CustomerId === iteam.CustomerId && x.vin === iteam.vin)].count +=1
    //   } else {
    //     list.push({
    //       CustomerName: iteam?.CustomerName,
    //       SocialMediaId: iteam?.SocialMediaId,
    //       PhoneNumber: iteam?.PhoneNumber,
    //       CustomerId: iteam?.CustomerId,
    //       Vin: iteam?.Vin,
    //       count: 1
    //     })
    //   }
    //   return true
    // })

    setConsumerWallet(consumerWallet?.Data?.Items)
  }, [consumerWallet]);


  const handleSubmit = () => {
    dispatch(getConsumerWallet( selectedPage, searchObject, dealerGroupObject?.dealerGroupId));
  }

  const handleSelected = (selectedPage) => {
    setSelectPage(selectedPage)
  }

const handleSearchFunction = async (e) => {
  const text = e.target.value
    await setSelectPage(1)
    await setSearchObject((prevState) => ({
      ...prevState,
      [e.target.name]: {
        ...prevState[e.target.name],
        value: text,
      }
    }));
  }

  return (
    <>

      <div className=" dashboard-container w-100">
        <Container fluid={true}>
          <Header
            showAddBuuton={false}
            headerLabel="Customer Wallet"
            handleSubmit={handleSubmit}
            searchObject={searchObject}
            handleSearch={(e) =>
              handleSearchFunction(e)
            }
          />
          <Row className="table-row-outer">
            <Col>
              <Table borderless>
              <thead>
                  <tr>
                    <th>Consumer Name</th>
                    <th>Customer Id </th>
                    <th>Social Media Id</th>
                    <th>Phone Number</th>
                    <th>Vin</th>
                    <th>Count of Coupons Vouchers</th>
                    <th>Action</th>
                  </tr>
                </thead>
                
              <tbody
              //  onPointerLeave={()=>setActiveTr("")}
               >
                {consumerWallet?.Status ? consumerWalletList?.map((iteam, index) => (
                   <tr key={index} className="default-tr" 
                  //  onPointerEnter={()=>setActiveTr(index)}
                   >
                      <td><span>{iteam.CustomerId ? `${iteam.FirstName} ${iteam.LastName}` : "N/A"}</span></td>
                      <td><span>{iteam.CustomerId || "N/A"}</span></td>
                      <td><span>{iteam.SocialMediaId}</span></td>
                      <td><span>{iteam.PhoneNumber? iteam.PhoneNumber : "N/A"}</span></td>
                      <td><span>{iteam.Vin? iteam.Vin : "N/A"}</span></td>
                      <td><span>{ iteam.CouponCount || "N/A"}</span></td>
                      
                      <td><span>
                      <Link to={`/coupon-wallet`} onClick={() => dispatch(setSearchValue(iteam))}>
                          <FontAwesomeIcon icon={["fas", "plus"]} /> <i className="fas fa-pencil-alt"></i>
                        </Link>
                       

                        {/* {activeTr === index ? (<Link  onClick={()=>setActiveTr("")}><FontAwesomeIcon  size="lg"icon={["fas", "angle-up"]} /></Link>
                        ) : (
                        <Link  onClick={()=>setActiveTr(index)}><FontAwesomeIcon icon={["fas", "plus"]} size="lg" /></Link>
                        )} */}
                      </span></td>

                    </tr>

                  )): (<tr><td colSpan={9}>No records found.</td></tr>)}


                </tbody>
              </Table>
              <PaginationComponent
                totalItems={consumerWallet?.Data?.length ? consumerWallet?.Data?.length : 0}
                defaultActivePage={selectedPage}
                pageSize={10}
                onSelect={handleSelected}
              />
            </Col>

          </Row>
        </Container>
      </div>

    </>
  )
}

export default ConsumerWallet