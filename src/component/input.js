import { AvField } from 'availity-reactstrap-validation';

const InputText = ({ name, value, type, required, option, disabled }) => {
    if (type === "text")
        return (
            <AvField name={name} value={value} type={type} required={required} disabled={disabled} />
        )
    else if (type === "select") return (
        <AvField name={name} value={value} type={type} required={required} disabled={disabled} >
            {option.map((iteam) => (
                <option key={iteam.value} value={iteam.value}>{iteam.name}</option>
            ))}
        </AvField>
    )
    else return (
        <AvField name={name} value={value} type={type} required={required} disabled={disabled} />
    )


}


InputText.defaultProps = {
    type: "text",
    required: false,
    disabled: false,
    option: []
}

export default InputText