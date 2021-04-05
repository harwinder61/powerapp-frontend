const InputText = ({name, value, handlechange, type}) => 
        (
            <label>
                Name:
                <input type={type} name={name} value={value} onChange={handlechange}/>
            </label>
        )
    

    InputText.defaultProps ={
        type: "text"
    }

export default InputText