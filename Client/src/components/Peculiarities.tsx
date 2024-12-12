import React from "react";
import Paragraph from "../utils/Paragraph";

interface PropsPeculiarities {
    items: string[];
}

const Peculiarities: React.FC<PropsPeculiarities> = ({ items }) => {
    return (
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex flex-row items-center space-x-3 space-y-2 pl-5">
                    <Paragraph paragraph={item} showIndex={true} indexItem={index+1} />
                </li>
            ))}
        </ul>
    );
};

export default Peculiarities;
