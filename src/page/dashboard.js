import React from 'react';
// import { useHistory } from "react-router"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router"

const dummy = [{
  "memberTypes" : "Basic",
  "minimumPoints" : "abc",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

},{
  "memberTypes" : "Basic",
  "minimumPoints" : "test",
  "discountValue" : 2,
  "discountUnit" : 3,
  "pointsMultiplier" : 10 ,
  "membership" : 1,
  "createdDate" : "29-03-2021",
  "validUntil" : "29-04-2021",

}]

const Dashboard = (props) => {
  let history = useHistory()

 //const [inputData, setForm] = useState({})
   //let history = useHistory()
 



 return (
  <>

    <div className =" dashboard-container w-100">
		<Container fluid={true}>
      <Row>
        <Col className="text-right py-2">Aclaro PowerApp</Col>
      </Row>
      <div className ="buttons-row">
      <Row >
        <Col>
        
        {props?.title}
        
        </Col>
        <Col className=" text-md-right left-col-sec">
        <div className="dealer_name">Dealer Group : Jones Group
         </div>
       
          <Button className="temp_button"
            type="button"
            onClick={() => history.push("/add-coupon")} 
            // onClick={ handleSubmit} 
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
              <th>Member Types</th>
              <th>Minimum Points</th>
              <th>Discount Value</th>
              <th>Discount Unit</th>
              <th>Points Multiplier</th>
              <th>Membership   Benefits</th>
              <th>Created Date</th>
              <th>Valid   Until</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {dummy.map((iteam, index) => (
              <tr key={index}>
                <td>{iteam.memberTypes}</td>
                <td>{iteam.minimumPoints}</td>
                <td>{iteam.discountValue}</td>
                <td>{iteam.discountUnit}</td>
                <td>{iteam.pointsMultiplier}</td>

                 <td>{iteam.membership}</td>
                <td>{iteam.createdDate}</td>
                <td>{iteam.validUntil}</td>
                <td><FontAwesomeIcon icon={["fas", "pen"]} /> <i className="fas fa-pencil-alt"></i></td>
              
              </tr>

            ))}

            
          </tbody>
        </Table>
         </Col>
      
         </Row>      
      </Container>
    </div>
    
	</>
  )
}
	
export default Dashboard