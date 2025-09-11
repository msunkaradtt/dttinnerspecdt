import React from "react"

const AITable = (props) => {

    return (
    <div className="flex flex-col space-y-4">
        <label htmlFor="fileInput1" className="block text-blue-gray-900">Input</label>
        <input
        type="file"
        className="px-3 py-2 border border-blue-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-gray-900"
        />

        <label htmlFor="dropdownInput1" className="block text-blue-gray-900">Models</label>
        <select
        id="dropdownInput1"
        className="px-3 py-2 border border-blue-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-gray-900"
        >
            <option value="option1">Random forest</option>
            <option value="option2">XGBoost</option>
            <option value="option3">Linear Regression</option>
        </select>
    </div>
    )
}

export default AITable