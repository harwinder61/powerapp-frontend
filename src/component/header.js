import { Row, Col, Input } from 'reactstrap';
import InputButton from "./button"
import { useHistory } from "react-router"
import { useSelector } from 'react-redux';

// import 

const Header = ({ pathName, path, handleSubmit, handleSearch, headerLabel, enableSearch, disabledSearch, showId, searchObject }) => {
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
                        <Col xs="8">

                            {headerLabel}
                            {!disabledSearch && <Row xs="3">
                                
                                {Object.entries(searchObject).map(([name, data], index) => (<Col div className="serch-outer" > { 
                                 data.type === "select" ? (
                                    <>
                                        <Input
                                            key ={name}     
                                            name={name}
                                            type={data.type}
                                            onChange={handleSearch}
                                            value={data?.value}
                                            placeholder={data?.placeholder}
                                            >
                                                <option value="">{data?.placeholder}</option>
                                                {data.option.map(option => (
                                                    <option value={option[data.optionName]}>{option[data.optionKey]}</option>
                                                ))}
                                        </Input>
                                    </>
                                ) : (
                                    <>
                                    {data.type !== "date" && <i key={index} className="fa fa-search" aria-hidden="true"></i>}
                                        <Input
                                            key ={name}     
                                            name={name}
                                            type={data.type}
                                            onChange={handleSearch}
                                            value={data?.value}
                                            placeholder={data?.placeholder}
                                            />
                                    </>
                                
                                )}</Col>)
                                )}
                                {/* <Input name="search"
                                    onChange={handleSearch}
                                    placeholder="" /> */}
                                <InputButton className="temp_button filter-button "
                                    type="button"
                                    onClick={handleSubmit}
                                    name="Filter"
                                />

                            </Row>}
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
    showId: null,
    searchObject: {}
}

export default Header