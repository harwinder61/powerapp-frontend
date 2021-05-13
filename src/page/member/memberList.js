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
  const [searchObject, setSearchObject] = useState({
    CustomerName: {type: "text", placeholder: "Customer Name", value: "", },
    SocialMediaID: {type: "text", placeholder: "Social Media ID", value: "", },
    MembershipTypeID: {type: "text", placeholder: "Membership Type ID", value: "", },
    MemberStatus: {type: "text", placeholder: "Member Status", value: "", }

  })


  const dispatch = useDispatch();
  const member = useSelector(({ member }) => member.member);
  const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);

  useEffect(() => {
    dispatch(loadingStatus(true));
    dispatch(getmember(dealerGroupObject?.dealerGroupId, selectedPage, searchObject));
  }, [dispatch, selectedPage, searchObject, dealerGroupObject]);

  useEffect(() => {
    setMemberList(member?.Data?.Items)
  }, [member]);

  const handleSubmit = () => {
    dispatch(getmember(dealerGroupObject?.dealerGroupId, selectedPage, searchObject));
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
            headerLabel="Members"
            path="/add-member"
            pathName="Add Member"
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
                totalItems={member?.Data?.TotalSize ? member?.Data?.TotalSize : 0}
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