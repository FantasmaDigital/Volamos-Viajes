import React from "react";
import { renderSentence } from "./functions/formatText";

interface PropsParagraph {
    paragraph: string;
    showIndex?: boolean;
    indexItem?: number;
    styles?: string;
}

const Paragraph: React.FC<PropsParagraph> = ({ paragraph, showIndex = false, indexItem, styles = '' }) => {
    return (
        <div className="w-full">
            <p className={`py-1 text-sm sm:text-base md:text-lg lg:text-xl ${styles}`}>
                <span>
                    {showIndex && <strong className="pr-1 font-semibold">{indexItem}.</strong>}
                    {renderSentence(paragraph)}
                </span>
            </p>
        </div>
    );
};

export default Paragraph;
