import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import OverView from "../components/hotel/overview";
import Price from "../components/hotel/price";
import Rule from "../components/hotel/rule";
import { useNavigate } from 'react-router-dom';


const SearchItem = ({ place }) => {
    const [list, setList] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [sortOrder, setSortOrder] = useState('select'); // State for sort order
    const [priceRange, setPriceRange] = useState({ min: 2000, max: 10000 }); // Initial price range

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${place}"}`, {
                    headers: {
                        'projectId': '8iwe1dc6tcby' // Add projectId header
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setList(data.data.hotels); // Store fetched data in the hotels state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [place]); // Fetch data whenever place or projectId changes

    const handleSeeDetails = (hotel) => {
        setSelectedHotel(hotel);
    };

    const handleCloseDetails = () => {
        setSelectedHotel(null);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handlePriceRangeChange = (e) => {
        setPriceRange({ ...priceRange, [e.target.name]: parseInt(e.target.value) });
    };

    // Function to sort the list based on the selected sort order
    const sortedList = () => {
        switch (sortOrder) {
            case 'asc':
                return [...list].sort((a, b) => a.avgCostPerNight - b.avgCostPerNight);
            case 'desc':
                return [...list].sort((a, b) => b.avgCostPerNight - a.avgCostPerNight);
            case 'highRating':
                return [...list].sort((a, b) => b.rating - a.rating);
            case 'lowRating':
                return [...list].sort((a, b) => a.rating - b.rating);
            default:
                return list;
        }
    };

    // Function to filter the list based on the selected price range
    const filteredList = sortedList().filter((item) => item.avgCostPerNight >= priceRange.min && item.avgCostPerNight <= priceRange.max);

    const [options, setOptions] = useState([
        { title: "OverView" },
        { title: "Prices & info" },
        { title: "Facilities and House Rule" },
    ]);

    const [overViewData, setOverViewData] = useState(true);
    const [PricesData, setPricesData] = useState(false);
    const [RuleData, setRuleData] = useState(false);

    console.log(selectedHotel)

    const navigate = useNavigate();

   

    const handleHotelBook = (price ,id) => {
        navigate('/hotelBooking', { state: { price: price, id: id } });
    }


    return (
        <div className="searchItemContainer">
            {selectedHotel ? (
                <React.Fragment>
                    <div className="hotelDetails">

                        <button style={{ padding: "5px" }} onClick={handleCloseDetails}><FontAwesomeIcon icon={faArrowLeft} /></button>

                        {/* fetching hotel detail */}
                        <div >

                            <div  >
                                <ul className="options-list" >
                                    {options.map((option, index) => (
                                        <div style={{ marginLeft: "10rem" }}
                                            key={index}
                                            onClick={() => {
                                                setOverViewData(index === 0);
                                                setPricesData(index === 1);
                                                setRuleData(index === 2);
                                            }}
                                            className={`option-item ${(index === 0 && overViewData) ||
                                                (index === 1 && PricesData) ||
                                                (index === 2 && RuleData)
                                                ? "active-tab"
                                                : ""
                                                }`}
                                        >
                                            {option.title}
                                        </div>
                                    ))}
                                </ul>
                            </div>


                            {overViewData && <OverView id={selectedHotel._id} />}
                            {PricesData && <Price id={selectedHotel._id} />}
                            {RuleData && <Rule id={selectedHotel._id} />}
                        </div>
                    </div>


                </React.Fragment>

            ) : (
                <React.Fragment>
                    <div style={{ display: "flex" }}>
                        <div className="sortDropdown" style={{ marginLeft: "1rem" }}>
                            <label className='sortby'  htmlFor="sort">Sort by:</label>
                            <select  id="sort" onChange={handleSortChange} value={sortOrder}>
                                <option value="select">Select</option>
                                <option value="asc">Price: Low to High</option>
                                <option value="desc">Price: High to Low</option>
                                <option value="highRating">Rating: High to Low</option>
                                <option value="lowRating">Rating: Low to High</option>
                            </select>
                        </div>
                        <div className="priceRangeSlider" >
                            <label style={{ fontWeight: "bold", fontSize: "1.5rem" }} htmlFor="minPrice">Min Price:</label>
                            <input type="range" id="minPrice" name="min" min="0" max="10000" value={priceRange.min} onChange={handlePriceRangeChange} />
                            <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>{priceRange.min}</span>
                            <label style={{ fontWeight: "bold", fontSize: "1.5rem", marginLeft: "1rem" }} htmlFor="maxPrice">Max Price:</label>
                            <input type="range" id="maxPrice" name="max" min="0" max="100000" value={priceRange.max} onChange={handlePriceRangeChange} />
                            <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>{priceRange.max}</span>
                        </div>
                    </div>

                    {filteredList.map((item, index) => (
                        <div key={index} className="searchItem">
                            <img src={item.images} alt="" className="siImg" />
                            <div className="siDesc">
                                <h1 className="siTitle" style={{ fontSize: "2rem" }}>{item.name}</h1>
                                <b><span className="siDistance" style={{ fontSize: "1.5rem" }}>{item.location}</span></b>
                                <b><span className="siSubtitle" style={{ fontSize: "1.2rem" }}>{item.amenities.join(', ')}</span></b>
                            </div>
                            <div className="siDetails">
                                <div className="siRating">
                                    <h2><a style={{ fontSize: "2rem" }}>Rating : </a>{item.rating}<a style={{ color: "orange" }}>★</a></h2>
                                </div>
                                <div className="siDetailTexts">
                                    <b style={{ fontSize: "1.5rem", color: "red" }}>Price:</b> <span className="siPrice"> {item.avgCostPerNight}</span>
                                    <button className="siCheckButton" onClick={() => handleSeeDetails(item)}>See Details</button>
                                    <button className="siCheckButton" style={{ marginLeft: "5rem"}} onClick={() => handleHotelBook(item.avgCostPerNight ,item._id)}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </React.Fragment>
            )}
        </div>
    );
};

export default SearchItem;
