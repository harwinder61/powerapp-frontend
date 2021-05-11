import { Row, Col, Input } from 'reactstrap';
import InputButton from "./button"
import { useHistory } from "react-router"
import { useSelector } from 'react-redux';

// import 

const Header = ({ pathName, path, handleSubmit, handleSearch, headerLabel, enableSearch, disabledSearch, showId }) => {
    let history = useHistory()
    const dealerGroupObject = useSelector(({ common }) => common.dealerGroup);

    return (
        <>
            <Row>
                <Col className="text-right py-2 main-header">Aclaro PowerApp</Col>
            </Row>
            {enableSearch ? (
                <div className="buttons-row">
                    <Row >
                        <Col>

                            {headerLabel}
                            {!disabledSearch && <div className="serch-outer">
                                <i className="fa fa-search" aria-hidden="true"></i>
                                <Input name="search"
                                    onChange={handleSearch}
                                    placeholder="" />
                                <InputButton className="temp_button"
                                    type="button"
                                    onClick={handleSubmit}
                                    name="Filter"
                                />

                            </div>}
                        </Col>
                        <Col className=" text-md-right left-col-sec">
                            <div className="dealer_name">Dealer Group : {dealerGroupObject?.dealerGroupName}
         </div>

                            <InputButton className="temp_button"
                                type="button"
                                name={pathName}
                                onClick={() => history.push(path)}
                            />
                        </Col>

                    </Row>
                </div>) : (
                <div className="buttons-row">
                    <Row >
                        <Col>

                            {headerLabel} {showId ? `#${showId}` : ''}

                        </Col>
                        <Col className=" text-md-right left-col-sec">
                            <div className="dealer_name">Dealer Group : {dealerGroupObject?.dealerGroupName} </div>
                        </Col>

                    </Row>
                </div>
            )}

        </>
    )
}

Header.defaultProps = {
    enableSearch: true,
    disabledSearch: false,
    showId: null
}

export default Header