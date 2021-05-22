import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser } from "../../store/user/userSlice"
import { loadingStatus } from "../../store/global/globalSlice"
import { useDispatch, useSelector } from 'react-redux';
import PaginationComponent from "react-reactstrap-pagination";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../../component/header";

/**
 * Component for dispaly the coupon list
 * @param {*} props 
 * @returns 
 */

const userTypeList =[{
  FieldDescription: "Internal",
  optionName: "Internal",
},{
  FieldDescription: "External",
  optionName: "External",
}]


const UserList = (props) => {
  const [userList, setUserList] = useState([])
  const [selectedPage, setSelectPage] = useState(1)

  const [searchObject, setSearchObject] = useState({
    "FirstName": {type: "text", placeholder: "First Name", value: "", },
    "LastName": {type: "text", placeholder: "Last Name", value: "", },
    "Email": {type: "text", placeholder: "Email", value: "", },
    "UserType": {type: "select", placeholder: "User Type", value: "", option: userTypeList, optionKey: "FieldDescription", optionName: "FieldValue" },

  })

  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user.user);

//   useEffect(() => {
//     dispatch(getrewardlist("reward_type"));
// }, [dispatch]);

  useEffect(() => {
    dispatch(loadingStatus(true));
    dispatch(getUser( selectedPage, searchObject));
  }, [dispatch, selectedPage, searchObject]);

  useEffect(() => {
    setUserList(user?.Data?.Items)
  }, [user]);


  const handleSubmit = () => {
    dispatch(getUser( selectedPage, searchObject));
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
            headerLabel="Users"
            path="/add-user"
            pathName="Add User"
            showDealerName={false}
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
                    <th>First Name</th>
                    <th>email</th>
                    <th>Deal Group Id</th>
                    <th>Role</th>
        <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {user?.Status ? userList?.map((iteam, index) => (
                    <tr key={index}>
                      <td>{iteam.FirstName}</td>
                      <td>{iteam.Email}</td>
                      <td>{iteam.DealGroupID}</td>
                      <td>{iteam.UserRole}</td>
                      <td>
                        <Link to={`/update-user/${iteam?.UserID}`}>
                          <FontAwesomeIcon icon={["fas", "pen"]} /> <i className="fas fa-pencil-alt"></i>
                        </Link>
                      </td>

                    </tr>

                  )): (<tr><td colSpan={9}>No records found.</td></tr>)}


                </tbody>
              </Table>
              <PaginationComponent
                totalItems={user?.Data?.TotalSize ? user?.Data?.TotalSize : 0}
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

export default UserList