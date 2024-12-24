import React from 'react';
import { PiBus, PiCameraLight, PiMapTrifoldFill, PiPersonSimpleWalkLight } from 'react-icons/pi';
import NewNavBar from './NewNavbar';
import { IoFastFoodOutline } from 'react-icons/io5';

const TrekkingSection: React.FC = () => {
    return (
        <>

            <div className="relative bg-blue-900 w-full h-screen text-white">

                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-90"
                    style={{
                        backgroundImage: `url("./public/img/background/main-bg.png")`,
                    }}

                >
                    <NewNavBar />
                </div>

                {/* Overlay */}
                <div className='relative flex flex-col py-20 px-20'>
                    {/* Header Text */}
                    <div className="text-left text-center max-w-md">
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
                        <div className="flex flex-row items-center justify-start gap-6 overflow-x-auto scrollbar-hidden w-full flex-nowrap">
                            <div className="flex flex-col items-center text-extraBlue p-4 hover:scale-110 hover:bg-extraBlue hover:text-white transform transition-transform duration-300 ease-in-out w-28 sm:w-32">
                                <div className="text-3xl">
                                    <PiBus className='text-5xl' />
                                </div>
                                <span className="mt-2 text-base sm:text-lg">Travel</span>
                            </div>
                            <div className="flex flex-col items-center text-extraBlue p-4 hover:scale-110 hover:bg-extraBlue hover:text-white transform transition-transform duration-300 ease-in-out w-28 sm:w-32">
                                <div className="text-3xl">
                                    <IoFastFoodOutline className='text-5xl' />
                                </div>
                                <span className="mt-2 text-base sm:text-lg">Food</span>
                            </div>
                            <div className="flex flex-col items-center text-extraBlue p-4 hover:scale-110 hover:bg-extraBlue hover:text-white transform transition-transform duration-300 ease-in-out w-28 sm:w-32">
                                <div className="text-3xl">
                                    <PiCameraLight className='text-5xl' />
                                </div>
                                <span className="mt-2 text-base sm:text-lg">Photos</span>
                            </div>
                            <div className="flex flex-col items-center text-extraBlue p-4 hover:scale-110 hover:bg-extraBlue hover:text-white transform transition-transform duration-300 ease-in-out w-28 sm:w-32">
                                <div className="text-3xl">
                                    <PiPersonSimpleWalkLight className='text-5xl' />
                                </div>
                                <span className="mt-2 text-base sm:text-lg">Walk</span>
                            </div>
                            <div className="flex flex-col items-center text-extraBlue p-4 hover:scale-110 hover:bg-extraBlue hover:text-white transform transition-transform duration-300 ease-in-out w-28 sm:w-32">
                                <div className="text-3xl">
                                    <PiMapTrifoldFill className='text-5xl' />
                                </div>
                                <span className="mt-2 text-base sm:text-lg">Tour Guide</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrekkingSection;
