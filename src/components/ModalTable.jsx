import React, { useState } from "react";
import { Input } from "@material-tailwind/react";

const ModalTable = (props) => {

    return (
    <>
    {props.params.map((field, index) => (
        <div key={index} className="w-full flex items-center justify-center">
            <div className="mb-4 w-full">
                <Input
                label={field.label}
                autocomplete="none"
                type="text"
                value={field.value}
                className="mt-1 block"
                />
            </div>
            <span className="m-6 text-blue-gray-900">{field.units}</span>
        </div>
    ))}
    </>
    )
}

export default ModalTable