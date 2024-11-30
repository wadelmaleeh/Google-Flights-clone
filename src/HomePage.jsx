import React, { useEffect, useState } from "react";
import { GoArrowSwitch } from "react-icons/go";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";

const HomePage = () => {
 const [inputType, setInputType] = useState("text"); // Default type is "text"

 const handleFocus = () => {
   setInputType("date"); // Change to "date" on focus
 };

 const handleBlur = (event) => {
   if (!event.target.value) {
     setInputType("text"); // Revert to "text" if no value is selected
   }
 };

  const [locations, setLocations] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
const [showResults, setShowResults] = useState(false);  
  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=new&locale=en-US",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "1c4c70ffa6msh4a6fba33a52f040p1b8048jsn7d9a134a138a",
              "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
            },
          }
        );

        const data = await response.json();
        if (data.status) {
          setLocations(data.data); // Assuming the locations are inside `data.data`
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = () => {
    setShowResults(true); // Show the results when the search button is clicked
  };

  return (
    <div className="home-page">
      <div className="flex justify-center">
        <h1 className="text-white font-outline-2 font-medium my-16 text-5xl">
          Flights
        </h1>
      </div>
      <div className="md:w-[76%] w-[90%] mx-auto bg-[#36373a] rounded-xl lg:h-40 h-48">
        <div className="flex mb-4 justify-center">
          <div className="flex text-[#bdc1c5]  mt-3 mr-4 gap-2 p-2 duration-200 rounded justify-center items-center hover:bg-[#454548]">
            <FaCaretDown />
            Economy class
          </div>
          <div className="flex gap-2 text-[#bdc1c5] hover:bg-[#454548] duration-200 rounded  relative top-3 -left-3 h-10 px-2 justify-center items-center">
            <FaCaretDown />
            1
            <MdOutlinePersonOutline className="text-xl" />
          </div>
          <div className="text-[#bdc1c5]  justify-end pr-3 pt-3">
            <button>
              <div className="flex gap-2 p-2 duration-200 rounded justify-center items-center hover:bg-[#454548]">
                <FaCaretDown />
                Round trip
                <GoArrowSwitch />
              </div>
            </button>
          </div>
        </div>
        <div className="lg:flex justify-center gap-2 md:mx-4 ml-[6px] w-[96%]  grid">
          <div className="flex gap-2   lg:w-[50%]  justify-center    ">
            <input
              type={inputType}
              placeholder="Back"
              onFocus={handleFocus}
              onBlur={handleBlur}
              id="departure"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="mt-1 ml-1 pl-2 block w-full h-11 text-[#bdc1c5] rounded-md bg-[#36373a] border-[#6f7277] border-[1.4px]  hover:border-[#aeb1b8] shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type={inputType}
              placeholder="Departure"
              onFocus={handleFocus}
              onBlur={handleBlur}
              id="departure"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="mt-1 pl-2 block w-full h-11 text-[#bdc1c5] rounded-md bg-[#36373a] border-[#6f7277] border-[1.4px]  hover:border-[#aeb1b8] shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex gap-2 lg:ml-0 ml-1  lg:w-[50%]">
            <div>
              <select
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1  block w-full h-11 text-[#bdc1c5] rounded-md bg-[#36373a] border-[#6f7277] border-[1.4px]  hover:border-[#aeb1b8] shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select destination
                </option>
                {locations.map((location) => (
                  <option key={location.skyId} value={location.skyId}>
                    {location.presentation.suggestionTitle}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="mt-1 block w-full h-11 text-[#bdc1c5] rounded-md bg-[#36373a] border-[#6f7277] border-[1.4px]  hover:border-[#aeb1b8] shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select origin
                </option>
                {locations.map((location) => (
                  <option key={location.skyId} value={location.skyId}>
                    {location.presentation.suggestionTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="-mt-3  text-right">
        <div className="flex justify-center">
          <button
            className="px-4 py-2  bg-blue-500 text-white font-medium text-sm rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
            onClick={handleSearch}
          >
            Search Flights
          </button>
        </div>

        {showResults && (
          <div className="mt-6 p-4 md:w-[76%] w-[90%] text-white mx-auto border border-gray-300 rounded-md">
            <h3 className="font-semibold flex justify-center  text-lg">
              Search Results
            </h3>
            <div className="flex mt-6 md:justify-center justify-around  md:gap-16">
              <div>
                <p className="text-left">
                  <strong>Origin:</strong> {origin}
                </p>
                <p>
                  <strong>Departure Date:</strong> {departureDate}
                </p>
              </div>

              <div>
                <p className="text-left">
                  <strong>Destination:</strong> {destination}
                </p>
                <p>
                  <strong>Return Date:</strong> {returnDate}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
