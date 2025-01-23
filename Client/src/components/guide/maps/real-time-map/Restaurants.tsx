import { useEffect } from "react";

interface RestaurantsProps {
    showAllRestaurants: React.SetStateAction<boolean>,
    restaurants: any[],
    restaurantsInStorage: any[],
    handleCheckboxChange: (restaurant: any) => void,
    setShowAllRestaurants: (restaurants: any) => void,
    markSelectedRestaurants: (restaurants: any) => void
}

const Restaurants: React.FC<RestaurantsProps> = ({
    showAllRestaurants,
    restaurants,
    restaurantsInStorage,
    handleCheckboxChange,
    setShowAllRestaurants,
    markSelectedRestaurants
}) => {
    useEffect(() => {
        console.log(restaurantsInStorage)
    }, [restaurantsInStorage])
    return (
        <div className="mt-4">
            <h4 className="font-bold text-lg">Restaurantes Cercanos:</h4>
            <ul
                className={
                    showAllRestaurants
                        ? "flex flex-row flex-wrap"
                        : "flex flex-col"
                }
            >
                {restaurants
                    .slice(0, showAllRestaurants ? 20 : 4)
                    .map((restaurant, index) => (
                        <li
                            key={index}
                            className="text-gray-700 max-w-xs max-h-28 p-2 border border-gray-300 rounded-md shadow-md flex-shrink-0"
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={Array.isArray(restaurantsInStorage) && restaurantsInStorage.some(
                                        (selected) => selected.id === restaurant.place_id
                                    )}
                                    onChange={() => handleCheckboxChange(restaurant)}
                                />
                                <img
                                    src={
                                        restaurant.photos?.[0]?.getUrl() ||
                                        "https://via.placeholder.com/100"
                                    }
                                    alt={restaurant.name}
                                    className="w-16 h-16 rounded-md object-cover"
                                />
                                <span className="cursor-pointer hover:underline truncate w-32">
                                    {restaurant.name}
                                </span>
                            </div>
                        </li>
                    ))}
            </ul>

            <button
                onClick={() => setShowAllRestaurants(!showAllRestaurants)}
                className="mt-4 px-3 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
            >
                {showAllRestaurants ? "Ver menos" : "Ver más"}
            </button>
            <button
                onClick={markSelectedRestaurants}
                className="mt-4 px-3 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
            >
                Marcar destinos
            </button>
        </div>
    )
}

export default Restaurants;