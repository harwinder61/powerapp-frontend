import { AvField } from 'availity-reactstrap-validation';

const InputText = ({ name, value, type, required, option, disabled, optionName, optionValue, placeholder  }) => {
    if (type === "text")
        return (
            <AvField id={name} name={name} value={value} type={type} required={required} disabled={disabled} />
        )
    else if (type === "select") return (
        <AvField id={name} name={name} value={value} type={type} required={required} disabled={disabled} >
            <option key={0} value="">Select {placeholder}</option>
            {option?.map((iteam) => (
                <option key={optionValue !== "" ? iteam[optionValue] : iteam.value} value={optionValue !== "" ? iteam[optionValue] : iteam.value}>{optionValue !== "" ? iteam[optionName] : iteam.name}</option>
            ))}
        </AvField>
    )
    else return (
        <AvField id={name} name={name} value={value} type={type} required={required} disabled={disabled} />
    )


}


InputText.defaultProps = {
    type: "text",
    required: false,
    disabled: false,
	optionKey: "",
    optionValue: "",
	optionName: "",
    placeholder: "",
    option: []
}

export default InputText