import React from "react";
import Input from "./Input";

const Form = ({ handleSubmit, children, classes }) => {
    return (
        <div className={`w-[600px] p-5 border border-slate-300 rounded-lg bg-white ${classes}`}>
            <form onSubmit={handleSubmit}>{children}</form>
        </div>
    );
};

export default Form;
