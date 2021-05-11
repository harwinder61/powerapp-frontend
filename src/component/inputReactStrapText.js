import { Input } from 'reactstrap';

const InputReactStrapText = ({ name, value, type, required, option, disabled, optionName, optionValue  }) => {
    if (type === "text")
        return (
            <Input id={name} name={name} value={value} type={type} required={required} disabled={disabled} />
        )
    else if (type === "select") return (
        <Input id={name} name={name} value={value} type={type} required={required} disabled={disabled} >
            {option?.map((iteam) => (
                <option key={optionValue !== "" ? iteam[optionValue] : iteam.value} value={optionValue !== "" ? iteam[optionValue] : iteam.value}>{optionValue !== "" ? iteam[optionName] : iteam.name}</option>
            ))}
        </Input>
    )
    else return (
        <Input id={name} name={name} value={value} type={type} required={required} disabled={disabled} />
    )


}


InputReactStrapText.defaultProps = {
    type: "text",
    required: false,
    disabled: false,
	optionKey: "",
    optionValue: "",
	optionName: "",
    option: []
}

export default InputReactStrapText