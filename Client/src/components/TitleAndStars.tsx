import React from "react";
import Titles from "../utils/Titles";
import { titles } from "../constants/enums/titles.enum";
import { STAR } from "../constants/Icons";

interface PropsTitleAndStars {
    name: string;
}

const TitleAndStars: React.FC<PropsTitleAndStars> = ({ name }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center pb-5">
            <Titles text={`${name}`} styles="text-center" type={titles.TITLE} />
            <div className="flex flex-row gap-1">
                {
                    Array.from({ length: 5 }).map(() => {
                        return (
                            <span className="text-2xl text-yellow-600">{STAR()}</span>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TitleAndStars;