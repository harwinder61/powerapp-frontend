import { Button } from 'reactstrap';
/**
 * Define input button component
 * @param {*} param0 
 * @returns html
 */
const InputButton = ({ loading, color, name, className, onClick }) =>
(
    <Button color={color} disabled={loading} className={className} onClick={onClick} > {name} </Button>
)


InputButton.defaultProps = {
    color: "primary",
    name: "Submit",
    className: ""
}

export default InputButton