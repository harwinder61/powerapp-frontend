import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getmember } from "../../store/member/memberSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Header from "../../component/header";

/**
 * Component for dispaly the member list
 * @param {*} props 
 * @returns 
 */
const MemberList = (props) => {

  // const variable decare
  const [search, setSearch] = useState("")
  const [memberList, setMemberList] = useState([])
  const dispatch = useDispatch();
  const member = useSelector(({ member }) => member.member);

  useEffect(() => {
    dispatch(loadingStatus(true));
    dispatch(getmember(3, "DLR0001"));
  }, [dispatch]);

  useEffect(() => {
    setMemberList(member?.Data?.Items)
  }, [member]);

  const handleSubmit = () => {
    if (search !== "") {
      setMemberList(member?.Data?.Items.filter(iteam => iteam.Contact_FullName.includes(search.toUpperCase())))
    } else {
      setMemberList(member?.Data?.Items)

    }
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
              await setSearch(e.target.value)
              setMemberList(member?.Data?.Items.filter(iteam => iteam.Contact_FullName.includes(e.target.value.toUpperCase())))
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
                      <td>{iteam.CustomerID}</td>
                      <td>{iteam.Contact_FullName}</td>
                      <td>{iteam.social_media_id}</td>
                      <td>{moment(iteam.create_date).format('MM/DD/YYYY')}</td>
                      <td>{iteam.membership_type1}</td>
                      <td>{iteam.points_ytd}</td>
                      <td>{iteam.points_lifetime}</td>

                      <td>{iteam.field_description}</td>
                      <td>
                        <Link to={`/update-member/${iteam?.member_customer_id}`}>
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

export default MemberList