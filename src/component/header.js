import { Row, Col, Input } from 'reactstrap';
import InputButton from "./button"
import { useHistory } from "react-router"

// import 

const Header = ({ pathName, path, handleSubmit, handleSearch, headerLabel, enableSearch }) => {
    let history = useHistory()

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
                            <div className="serch-outer">
                                <i className="fa fa-search" aria-hidden="true"></i>
                                <Input name="search"
                                    onChange={handleSearch}
                                    placeholder="" />
                                <InputButton className="temp_button"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Filter
                    </InputButton>
                            </div>
                        </Col>
                        <Col className=" text-md-right left-col-sec">
                            <div className="dealer_name">Dealer Group : Jones Group
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

                            {headerLabel}

                        </Col>
                        <Col className=" text-md-right left-col-sec">
                            <div className="dealer_name">Dealer Group : Jones Group </div>
                        </Col>

                    </Row>
                </div>
            )}

        </>
    )
}

Header.defaultProps = {
    enableSearch: true
}

export default Header