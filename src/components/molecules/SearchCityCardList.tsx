import { Box, Modal } from "@mui/material";
import { CityType } from "../../types/city.types";
import SearchCityCard  from "./SearchCityCard";
import { useState } from "react";
import WeatherDisplay from "../organisms/WeatherDisplay";

type CitiesListProps = {
    cities: CityType[],
    className: string;
};

export default function SearchCityCardList({ cities = [], className }: CitiesListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [longitude, setLongitude] = useState<number | null>(0);
    const [latitude, setLatitude] = useState<number | null>(0);


    const handleModal = (lat: number, lon: number) => {
        setIsModalOpen(!isModalOpen);
        setLatitude(lat);
        setLongitude(lon);
    };

    return (
        <div>
            <div>
                <ul className={className}>
                    {cities.map((city, index) => (
                        <li key={index}>
                            <div>
                                <SearchCityCard
                                    className='rounded-xl m-4 bg-white p-5 cursor-pointer hover:scale-110 ease-in duration-300'
                                    cityName={city.cityName}
                                    state={city.state}
                                    country={city.country}
                                    onClick={() => handleModal(city.lat, city.lon)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    aria-labelledby="transition-modal-title"
                    className="flex flex-col justify-center items-center"
                >
                    <Box className="flex justify-center items-center h-3/6 w-3/6 bg-white rounded-2xl">
                        <WeatherDisplay
                            lat={latitude!}
                            lon={longitude!}
                            apiKey="08630a93ab31ac1ec920ad0e4d0c2e7f"
                        />
                    </Box>
                </Modal>
            </div>
        </div>
    );
}