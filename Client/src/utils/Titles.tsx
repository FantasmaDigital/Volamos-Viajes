import React from "react";
import { titles } from "../constants/enums/titles.enum";

interface PropsTitles {
    text: string;
    styles?: string;
    type?: titles;
}

const Titles: React.FC<PropsTitles> = ({ text, styles = '', type = titles.TITLE }) => {
    return (
        <>
            {
                (() => {
                    switch (type) {
                        case titles.TITLE:
                            return <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold my-2 ${styles}`}>{text}</h1>;
                        case titles.SUBTITLE:
                            return <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold my-2 ${styles}`}>{text}</h2>;
                        case titles.DESCRIPTION:
                            return <h4 className={`text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold my-2 ${styles}`}>{text}</h4>;
                        default:
                            return <h4 className={`text-base sm:text-lg md:text-xl lg:text-xl font-normal my-2 ${styles}`}>{text}</h4>;
                    }
                })()
            }
        </>
    );
}

export default Titles;
