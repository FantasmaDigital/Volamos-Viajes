import React from 'react';
import { PiBus, PiCameraLight, PiMapTrifoldFill, PiPersonSimpleWalkLight } from 'react-icons/pi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { useLocation } from '../../context/guide/LocationContext';

const GuideBanner: React.FC = () => {
    const locationContext = useLocation();

    const touristTypes = [
        // 'amusement_park',
        // 'aquarium',
        // 'art_gallery',
        'casino',
        // 'church',
        'museum',
        // 'night_club',
        // 'park',
        // 'shopping_mall',
        // 'stadium',
        // 'zoo',
        // 'hindu_temple',
        // 'synagogue',
        // 'tourist_attraction',
        // 'monument'
    ];

    const foodTypes = [
        'restaurant',
        // 'cafe', 
        // 'meal_delivery', 
        // 'meal_takeaway', 
        // 'bakery', 
        // 'bar', 
        // 'brewery', 
        // 'food', 
        // 'grocery_or_supermarket', 
        // 'liquor_store', 
        // 'ice_cream'
    ];


    return (
        <div className="relative bg-blue-900 w-full h-[45rem] sm:h-[30rem] md:h-[35rem] lg:h-[43rem] pt-16 text-white flex flex-col justify-center">
            {/* Overlay */}
            <div className='relative flex flex-col py-10 px-20'>
                {/* Header Text */}
                <div className="text-left max-w-md">
                    <h1 className="text-4xl text-left font-bold sm:text-5xl">
                        Trekking opportunities for novice and expert
                    </h1>
                    <p className="mt-4 text-lg text-left sm:text-xl">
                        Sharing lifetime experiences
                    </p>
                </div>
            </div>
            <div className="relative flex flex-col lg:flex-row items-center justify-center px-4 sm:px-20 ">
                {/* Content Section */}
                <div className="relative z-10 bg-white text-black px-6 py-8 w-full max-w-6xl flex flex-col lg:flex-row items-center gap-6">
                    {/* Text Section */}
                    <div className="text-left max-w-sm px-2">
                        <h2 className="text-2xl font-bold sm:text-3xl">
                            The local experience
                        </h2>

                        <p className="text-gray-600 py-4 text-sm sm:text-base">
                            You will discover exactly why Bolivia is known as The Land of Hidden Treasures as you will embark on an adventure of a lifetime along the land.
                        </p>
                    </div>

                    {/* Icons with descriptions */}
                    <div className="flex flex-row items-center justify-start gap-6 w-full">
                        {[
                            { icon: <PiBus className='text-5xl' />, label: 'Travel', form: 'travel', type: touristTypes },
                            { icon: <IoFastFoodOutline className='text-5xl' />, label: 'Food', form: 'food', type: foodTypes },
                            { icon: <PiCameraLight className='text-5xl' />, label: 'Photos', form: 'photos', type: touristTypes },
                            { icon: <PiPersonSimpleWalkLight className='text-5xl' />, label: 'Walk', form: 'walk', type: touristTypes },
                            { icon: <PiMapTrifoldFill className='text-5xl' />, label: 'Tour Guide', form: 'tourGuide', type: touristTypes },
                        ].map(({ icon, label, form, type }) => (
                            <div
                                key={form}
                                className={`flex flex-col items-center text-extraBlue p-4 hover:scale-110 hover:bg-extraBlue hover:text-white transform transition-transform duration-300 ease-in-out w-full text-center cursor-pointer`}
                                onClick={() => locationContext.setPlaceOption(type)}
                            >
                                <div className="text-3xl">{icon}</div>
                                <span className="mt-2 text-base sm:text-lg">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GuideBanner;
