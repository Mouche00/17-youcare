import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const Input = ({
    type = "text",
    handleChange,
    label,
    name,
    placeholder,
    classInput,
    divStyle,
    handleKeyDown,
    error,
}) => {
    return (
        <div style={divStyle} className="my-2">
            {label && <label className="mx-1 text-gray-700">{label}</label>}
            <input
                type={type}
                className={classInput}
                placeholder={placeholder}
                name={name}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
            />
            {error && (
                <p className="text-red text-sm font-medium flex gap-1 items-center">
                    <FaExclamationCircle />
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
