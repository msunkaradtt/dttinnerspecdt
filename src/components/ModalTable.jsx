import React, { useState } from "react";
import { Input } from "@material-tailwind/react";

const ModalTable = (props) => {

    const [fields, setFields] = useState([
        { label: "First Name", value: "" },
        { label: "Last Name", value: "" },
        { label: "Email", value: "" },
        { label: "Phone Number", value: "" },
    ])

    const handleFieldChange = (index, field, value) => {
        const newFields = fields.map((f, i) => i === index ? { ...f, [field]: value } : f)
        setFields(newFields)
    }

    return (
    <>
    {fields.map((field, index) => (
        <div key={index} className="mb-4">
            <Input
            label={field.label}
            autocomplete="none"
            type="text"
            value={field.value}
            onChange={(e) => handleFieldChange(index, "value", e.target.value)}
            className="mt-1 block w-full"
            />
        </div>
    ))}
    </>
    )
}

export default ModalTable