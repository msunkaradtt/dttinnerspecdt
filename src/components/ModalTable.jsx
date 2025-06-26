import React from "react"

const ModalTable = (props) => {

    return (
        <div className="flex flex-col space-y-4">
            {props.params.map((field, index) => (
                field.type === "text" ?
                (
                <div key={index} className="flex flex-col space-y-2">
                    <label className="block text-blue-gray-900">{field.label}</label>
                    <div className="flex items-center justify-between">
                        <input
                        type="text"
                        className="px-3 py-2 border border-blue-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-gray-900"
                        value={field.value}
                        />
                        <label htmlFor="sideLabelTextInput" className="text-blue-gray-900">{field.units}</label>
                    </div>
                </div>) :
                (<div key={index}>
                    <label className="block text-blue-gray-900">{field.label}</label>
                    <select
                    className="px-3 py-2 border border-blue-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-gray-900"
                    >
                        <option value="option1">Material_1</option>
                        <option value="option2">Material_2</option>
                        <option value="option3">Material_3</option>
                    </select>
                </div>)
            ))}
        </div>
    )
}

export default ModalTable