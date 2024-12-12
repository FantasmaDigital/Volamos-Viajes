import React from "react";
import Paragraph from "../utils/Paragraph";
import { getIcon } from "../utils/functions/getIcons";

interface PropsWhatToBring {
    items: string[];
}

const WhatToBring: React.FC<PropsWhatToBring> = ({ items }) => {
    return (
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex flex-row items-center space-x-3 space-y-2 pl-5">
                    <span className="flex justify-center items-center">{getIcon(item)}</span>
                    <Paragraph paragraph={item} />
                </li>
            ))}
        </ul>
    );
};

export default WhatToBring;
