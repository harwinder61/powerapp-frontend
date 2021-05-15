import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getmemberShip } from "../../store/membership/membershipSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Header from "../../component/header";

/**
 * Component for dispaly the member list
 * @param {*} props 
 * @returns 
 */
const MembershipList = (props) => {

  // const variable decare
  const [search, setSearch] = useState("")
  const [membershipList, setMemberShipList] = useState([])
  const dispatch = useDispatch();
  const memberShip = useSelector(({ memberShip }) => memberShip.memberShip);
  const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);

  useEffect(() => {
    dispatch(loadingStatus(true));
    dispatch(getmemberShip(dealerGroupObject?.dealerGroupId));
  }, [dispatch, dealerGroupObject]);

  useEffect(() => {
    setMemberShipList(memberShip?.Data)
  }, [memberShip]);

  const handleSubmit = () => {
    if (search !== "") {
      setMemberShipList(memberShip?.Data?.Items.filter(iteam => iteam.Contact_FullName.includes(search.toUpperCase())))
    } else {
      setMemberShipList(memberShip?.Data?.Items)

    }
  }


  return (
    <>

      <div className=" dashboard-container w-100">
        <Container fluid={true}>
          <Header
            disabledSearch={true}

            headerLabel="Member Types"
            path="/add-membership"
            pathName="Add Membership Type"
            handleSubmit={handleSubmit}
            handleSearch={async (e) => {
              await setSearch(e.target.value)
              setMemberShipList(memberShip?.Data?.Items.filter(iteam => iteam.Contact_FullName.includes(e.target.value.toUpperCase())))
            }}
          />

          <Row className="table-row-outer">
            <Col>
              <Table borderless>
                <thead>
                  <tr>
                    <th>Member Types</th>
                    <th>Minimum Points</th>
                    <th>Discount Value</th>
                    <th>Discount Unit</th>
                    <th>Points Multiplier</th>
                    <th>Membership   Benefits</th>
                    <th>Created Date</th>
                    <th>Valid Until</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                  {memberShip?.Status ? membershipList?.map((iteam, index) => (
                    <tr key={index}>
                      <td>{iteam.MembershipType}</td>
                      <td className="left_align">{iteam.MinimumPoints}</td>
                      <td className="left_align">{iteam.DiscountValue}</td>
                      <td >{iteam.DiscountUnit}</td>
                      <td className="left_align">{iteam.PointsMultipler}</td>
                      <td >{iteam.MembershipBenefits}</td>
                      <td className="left_align">{iteam.CreatedDate !== "" ? moment(iteam.CreatedDate).format('MM/DD/YYYY') : '01/01/1900'}</td>
                      <td className="left_align">{iteam.ValidUntilDate !== "" ? moment(iteam.ValidUntilDate).format('MM/DD/YYYY') : '01/01/1900' }</td>

                      <td>
                        <Link to={`/update-membership/${iteam?.MembershipTypeID}`}>
                          <FontAwesomeIcon icon={["fas", "pen"]} /> <i className="fas fa-pencil-alt"></i>
                        </Link>
                      </td>

                    </tr>

                  )) : (<tr><td colSpan={9}>No records found.</td></tr>)}


                </tbody>
              </Table>
            </Col>

          </Row>
        </Container>
      </div>

    </>
  )
}

export default MembershipList