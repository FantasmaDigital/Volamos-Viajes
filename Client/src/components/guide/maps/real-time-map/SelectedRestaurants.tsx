import EstimatedTime from './EstimatedTime';
import Restaurants from './Restaurants';

interface SelectedRestaurantsProps{
    showAllRestaurants: React.SetStateAction<boolean>,
    restaurants: any[],
    startPoint: any,
    endPoint: any,
    selectedRestaurants: string[],
    restaurantsInStorage: any[],
    handleCheckboxChange: any,
    setShowAllRestaurants: (restaurants: any) => void,
    markSelectedRestaurants: (restaurants: any) => void,
    estimatedTime: number | 0,
}

const SelectedRestaurants: React.FC<SelectedRestaurantsProps> = ({
    showAllRestaurants,
    restaurants,
    startPoint,
    endPoint,
    selectedRestaurants,
    restaurantsInStorage,
    handleCheckboxChange,
    setShowAllRestaurants,
    markSelectedRestaurants,
    estimatedTime
}) => {
    return (
        <div
            className={`${showAllRestaurants ? "w-full" : "w-96"
                } py-5 px-6 bg-gray-100 shadow-md z-10`}
        >
            <h3 className="text-lg font-bold mb-4">Resultados</h3>
            <div className="mb-4">
                <p className="font-bold">
                    Punto A: {`Lat: ${startPoint?.lat}, Lng: ${startPoint?.lng}`}
                </p>
                <p className="font-bold">
                    Punto B: {`Lat: ${endPoint?.lat}, Lng: ${endPoint?.lng}`}
                </p>

                {selectedRestaurants.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-bold">Restaurantes a visitar:</h4>
                        <ul>
                            {selectedRestaurants.map((restaurantId) => {
                                const restaurant = restaurants.find(
                                    (rest) => rest.place_id === restaurantId
                                );
                                return (
                                    restaurant && (
                                        <li
                                            key={restaurant.place_id}
                                            className="flex items-center text-gray-700 mb-2"
                                        >
                                            {restaurant.photo &&
                                                restaurant.photo[0]?.photo_url ? (
                                                <>
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
                                                </>
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-300 rounded-full mr-3"></div> // Si no hay imagen, muestra un placeholder
                                            )}
                                            <span>{restaurant.name}</span>
                                        </li>
                                    )
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>

            {restaurants.length > 0 && (
                <Restaurants
                    showAllRestaurants={showAllRestaurants}
                    restaurants={restaurants}
                    restaurantsInStorage={restaurantsInStorage}
                    handleCheckboxChange={handleCheckboxChange}
                    setShowAllRestaurants={setShowAllRestaurants}
                    markSelectedRestaurants={markSelectedRestaurants} />
            )}
            {estimatedTime && (
                <EstimatedTime estimatedTime={estimatedTime} />
            )}
        </div>
    )
}

export default SelectedRestaurants;