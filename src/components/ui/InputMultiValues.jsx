import React, { useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";

const InputMultiValues = ({
    data,
    handleChange,
    handleRemove,
    error,
    label,
}) => {
    if (!data) {
        return null;
    }
    return (
        <>
            {label && (
                <label className="mx-1 mt-2 text-gray-700">{label}</label>
            )}

            <div className="border-2 flex mt-1 items-start px-3 focus:border-secondary focus:ring-4 focus:ring-primary/10 transition-all rounded-md   py-2 bg-white flex-wrap max-w-[600px]">
                <ul className="inline-flex gap-0.5 w-full flex-wrap h-full">
                    {data.length > 0 &&
                        data.map((competence, index) => {
                            return (
                                <li
                                    key={index}
                                    className="px-3  py-1.5 rounded-full bg-secondary flex items-center  text-white text-sm"
                                >
                                    <span>{competence}</span>
                                    <button
                                        className="block ml-2"
                                        onClick={() => handleRemove(index)}
                                    >
                                        <FaCircleXmark />
                                    </button>
                                </li>
                            );
                        })
                    }
                </ul>
                <input
                    placeholder={"Enter competences"}
                    onKeyDown={handleChange}
                    className={"outline-none text-sm  bg-transparent"}
                />
            </div>
            {error && (
                <p className="text-red text-sm font-medium flex gap-1 items-center">
                    <FaExclamationCircle />
                    {error}
                </p>
            )}
        </>
    );
};

export default InputMultiValues;
