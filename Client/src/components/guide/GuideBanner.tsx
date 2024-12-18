import React from 'react';
import Titles from '../../utils/Titles';
import { titles } from '../../constants/enums/titles.enum';

const GuideBanner:React.FC = () => {
    return (
        <div className='w-full shadow-[0px_0px_19px_7px_rgba(204,_204,_204,_1)] z-10 h-[45rem] sm:h-[30rem] md:h-[35rem] lg:h-[43rem] flex flex-col justify-center items-center'>
            <Titles type={titles.TITLE} text='Planea tu proximo destino con facil y rapido' styles='text-primary'/>
            <Titles type={titles.SUBTITLE} text='Conoce la mejor ruta y horarios para tu viaje con GUIDE' styles='text-text'/>
        </div>
    );
}

export default GuideBanner;
