import React from "react";

interface PropsMainTitles {
    topText: string,
    bottomText: string,
    marginBottom?: string
    textColor?: string,
    textCenter?:boolean
}

const MainTitles: React.FC<PropsMainTitles> = ({ topText, bottomText, marginBottom='', textColor='', textCenter=false}) => {
    return (
        <div className={`w-full flex flex-col`}>
            <h3 className={`text-md font-bold ${textColor != '' ? textColor : 'text-primary'} uppercase text-center ${textCenter ? 'md:text-center' : 'md:text-start'}`}>{topText}</h3>
            <h2 className={`text-4xl font-extrabold ${textColor != '' ? textColor : 'text-text'} text-center ${textCenter ? 'md:text-center' : 'md:text-start'} mt-3 ${marginBottom == '' ? 'mb-10' : marginBottom}`}>
                {bottomText}
            </h2>
        </div>
    )
}

export default MainTitles