import React from "react";
import Shadow from "../shadow/Shadow";
import ShadowWrapper from "../shadow/ShadowWrapper";

const Card = ({
    listing: { title, description, competences, date, location },
}) => {
    return (
        <ShadowWrapper classes="w-64 h-64 shadow-lg bg-white rounded-lg space-y-4 flex justify-between">
            <div className="h-full w-full bg-white flex flex-col gap-4 p-4 rounded-l-lg">
                <p className="text-xl font-black">{title}</p>
                <p className="text-sm">{description}</p>
                <p className="flex flex-wrap gap-2">
                    {competences.map((competence) => (
                        <span className="bg-secondary text-white p-2 rounded">
                            {`${competence}`}
                        </span>
                    ))}
                </p>
                <p>
                    {" "}
                    <span className="text-secondary font-black">
                        {date}
                    </span> at {location}
                </p>
                <Shadow />
            </div>

            <button
                style={{ margin: 0 }}
                className="h-full w-12 bg-primary rounded-r-lg"
            >
                <p
                    style={{ transform: "rotate(-90deg)" }}
                    className="text-white text-2xl font-black text-center"
                >
                    Apply
                </p>
            </button>
        </ShadowWrapper>
    );
};

export default Card;
