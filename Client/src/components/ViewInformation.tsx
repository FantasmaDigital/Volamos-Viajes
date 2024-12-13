import React, { useState } from "react";
import { Destination } from "../interface/destination.interface";
import ViewAsideRight from "./ViewAsideRight";
import TitleAndStars from "./TitleAndStars";
import Paragraph from "../utils/Paragraph";
import Titles from "../utils/Titles";
import { titles } from "../constants/enums/titles.enum";

const ViewAsideRightMemo = React.memo(ViewAsideRight);

interface PropsViewInformation {
    destination: Destination;
}

const ViewInformation: React.FC<PropsViewInformation> = ({ destination }) => {
    const [selectedPackageIndex, setSelectedPackageIndex] = useState(0); // Índice del paquete seleccionado.

    const handlePackageSelect = (index: number) => {
        setSelectedPackageIndex(index);
    };

    const selectedPackage = destination.package[selectedPackageIndex];

    return (
        <div className="w-[95%] m-auto">
            <TitleAndStars name={destination.name} />
            <div className="flex flex-col lg:flex-row w-full gap-8">
                {/* Sección de contenido principal */}
                <section className="flex flex-col w-full md:w-[90%]">
                    {/* Botones para seleccionar el paquete */}
                    <div className="flex gap-4 my-4">
                        {destination.package.map((pkg, index) => (
                            <button
                                key={index}
                                onClick={() => handlePackageSelect(index)}
                                className={`px-6 py-3 rounded-sm ${
                                    selectedPackageIndex === index
                                        ? "bg-primary text-white hover:bg-secondary"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {pkg.description}
                            </button>
                        ))}
                    </div>

                    {/* Información del paquete seleccionado */}
                    <div>
                    <Titles type={titles.SUBTITLE} text="Itinerario:" styles="font-bold mb-2" />
                        <ul className="list-disc pl-5">
                            {selectedPackage.days.map((day, idx) => (
                                <li key={idx} className="mb-4">
                                    <Titles type={titles.RATING} text={day.avalible} styles="font-bold text-blue-500" />
                                    <Paragraph paragraph={day.text} />
                                </li>
                            ))}
                        </ul>

                        <Titles type={titles.SUBTITLE} text="Incluye:" styles="font-bold mb-2" />
                        <ul className="list-disc pl-5">
                            {selectedPackage.includes.map((include, idx) => (
                                <li key={idx}>
                                    <Paragraph paragraph={include} />
                                </li>
                            ))}
                        </ul>

                        {/* Tours incluidos */}
                        {selectedPackage.toursIncluded && selectedPackage.toursIncluded.length > 0 && (
                            <div className="mt-6">
                                <Titles type={titles.SUBTITLE} text="Tours Incluidos:" styles="font-bold mb-2" />
                                <ul className="list-disc pl-5">
                                    {selectedPackage.toursIncluded.map((tour, idx) => (
                                        <li key={idx} className="mb-4">
                                            <Titles
                                                type={titles.RATING}
                                                text={tour.name}
                                                styles="font-bold text-blue-500"
                                            />
                                            {tour.duration && (
                                                <Paragraph
                                                    paragraph={`Duración: ${tour.duration}`}
                                                    styles="text-gray-600 italic"
                                                />
                                            )}
                                            <Paragraph paragraph={tour.description} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div>
                            <Titles type={titles.SUBTITLE} text="Precios:" styles="font-bold mt-4 mb-2" />
                            {selectedPackage.table.map((table, idx) => (
                                <div key={idx} className="overflow-x-auto">
                                    <Titles type={titles.RATING} text={table.title} styles="font-bold mb-2" />
                                    <table className="table-auto w-full border border-gray-800 shadow-md rounded-lg hover:cursor-pointer">
                                        <thead className="bg-blue-500 text-white">
                                            <tr>
                                                {table.rows[0].map((header, headerIdx) => (
                                                    <th
                                                        key={headerIdx}
                                                        className="px-4 py-2 border border-blue-500 text-center"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {table.rows.slice(1).map((row, rowIdx) => (
                                                <tr
                                                    key={rowIdx}
                                                    className={`${
                                                        rowIdx % 2 === 0 ? "bg-gray-100" : "bg-white"
                                                    } hover:bg-blue-100`}
                                                >
                                                    {row.map((cell, cellIdx) => (
                                                        <td
                                                            key={cellIdx}
                                                            className="px-4 py-2 border border-gray-300 text-center"
                                                        >
                                                            <Paragraph paragraph={cell} />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-xl font-bold mt-4 mb-2">Políticas:</h2>
                        <ul className="list-disc pl-5">
                            {selectedPackage.policy.map((policy, idx) => (
                                <li key={idx}>
                                    <Paragraph paragraph={policy} />
                                </li>
                            ))}
                        </ul>

                        <Paragraph paragraph={selectedPackage.avalibleUntil} styles="text-gray-500" />
                    </div>
                </section>

                {/* Sección lateral (aside) */}
                <section className="w-full sm:w-[70%] lg:w-1/2 flex flex-col m-auto justify-center">
                    <ViewAsideRightMemo destination={destination.name} />
                </section>
            </div>
        </div>
    );
};

export default ViewInformation;
