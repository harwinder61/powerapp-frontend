import React, { useEffect, useState } from 'react';
// import { useHistory } from "react-router"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Table, Input } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router"
import { getmember } from "../../store/member/memberSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const MemberList = (props) => {
  const [search, setSearch] = useState("")
  const [memberList, setMemberList] = useState([])
  let history = useHistory()
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
          <Row>
            <Col className="text-right py-2">Aclaro PowerApp</Col>
          </Row>
          <div className="buttons-row">
            <Row >
              <Col>

                Members
        <div>
                  <Input name="search" onChange={async (e) => {
                    await setSearch(e.target.value)

                    setMemberList(member?.Data?.Items.filter(iteam => iteam.Contact_FullName.includes(e.target.value.toUpperCase())))
                  }} placeholder="Search" />
                  <Button className="temp_button"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Search
            </Button>
                </div>
              </Col>
              <Col className=" text-md-right left-col-sec">
                <div className="dealer_name">Dealer Group : Jones Group
         </div>

                <Button className="temp_button"
                  type="button"
                  onClick={() => history.push("/add-member")}
                >
                  Add Member
          </Button>
              </Col>

            </Row>
          </div>
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
                  {member.Status ? memberList?.map((iteam, index) => (
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