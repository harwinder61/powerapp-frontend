import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getmember } from "../../store/member/memberSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PaginationComponent from "react-reactstrap-pagination";
import "bootstrap/dist/css/bootstrap.min.css";


import Header from "../../component/header";

/**
 * Component for dispaly the member list
 * @param {*} props 
 * @returns 
 */
const MemberList = (props) => {

  // const variable decare
  const [memberList, setMemberList] = useState([])
  const [selectedPage, setSelectPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const dispatch = useDispatch();
  const member = useSelector(({ member }) => member.member);
  const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);

  useEffect(() => {
    dispatch(loadingStatus(true));
    dispatch(getmember(dealerGroupObject?.dealerGroupId, selectedPage, searchText));
  }, [dispatch, selectedPage, searchText, dealerGroupObject]);

  useEffect(() => {
    setMemberList(member?.Data?.Items)
  }, [member]);

  const handleSubmit = () => {
    dispatch(getmember(dealerGroupObject?.dealerGroupId, selectedPage, searchText));
  }

  const handleSelected = (selectedPage) => {
    setSelectPage(selectedPage)
  }


  return (
    <>

      <div className=" dashboard-container w-100">
        <Container fluid={true}>
          <Header
            headerLabel="Members"
            path="/add-member"
            pathName="Add Member"
            handleSubmit={handleSubmit}
            handleSearch={async (e) => {
              await setSelectPage(1)
              await setSearchText(e.target.value)
              // setMemberList(member?.Data?.Items.filter(iteam => iteam.Contact_FullName.includes(e.target.value.toUpperCase())))
            }}
          />

          <Row className="table-row-outer">
            <Col>
              <Table borderless>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Social Media ID</th>
                    <th>Member Since</th>
                    <th>Membership Level</th>
                    <th>Points YTD</th>
                    <th>Points Lifetime</th>
                    <th>Member Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {member?.Status ? memberList?.map((iteam, index) => (
                    <tr key={index}>
                      <td>{iteam.CustomerId}</td>
                      <td>{iteam.ContactFullName}</td>
                      <td>{iteam.SocialMediaId}</td>
                      <td>{moment(iteam.create_date).format('MM/DD/YYYY')}</td>
                      <td>{iteam.MembershipType}</td>
                      <td>{iteam.PointsYtd}</td>
                      <td>{iteam.PointsLifetime}</td>

                      <td>{iteam.FieldDescription}</td>
                      <td>
                        <Link to={`/update-member/${iteam.SocialMediaId}/${iteam?.MemberCustomerId}`}>
                          <FontAwesomeIcon icon={["fas", "pen"]} /> <i className="fas fa-pencil-alt"></i>
                        </Link>
                      </td>

                    </tr>

                  )) : (<tr><td colSpan={9}>No records found.</td></tr>)}


                </tbody>
              </Table>

              <PaginationComponent
                totalItems={member?.Data?.TotalSize}
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

export default MemberList