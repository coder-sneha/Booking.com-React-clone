import React, { useState } from 'react';
import { faArrowRight, faBed, faPerson, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const Header = ({ type, location }) => {
  const [activeTab, setActiveTab] = useState('stays'); // Default active tab is 'stays'

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [date, setDate] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);


  const [openDate, setOpenDate] = useState(false);

  const [flightDate, setFLightDate] = useState(new Date());

  const handleDateSelect = (item) => {
    setDate([item.selection]);
    if (date[0].startDate && date[0].endDate) {
      setOpenDate(!openDate);
    }
  };

  

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };


  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [arrival, setArrival] = useState("");
  const [depart, setDepart] = useState("");

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options  } });
  };

  const handleSearchFlight = () => {
    navigate("/flights", { state: { arrival, depart, flightDate } });
    setActiveTab('flights');
  };


  return (
    <div className='header'>
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className='headerList'>
          <div
            className={`headerListItem ${activeTab === 'stays' ? 'active' : ''}`}
            onClick={() => handleTabClick('stays')}
          >
            <FontAwesomeIcon icon={faBed} />
            <span style={{ marginLeft: '0.3rem' }}>Stays</span>
          </div>

          {type !== "list" &&
              <div
            className={`headerListItem ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => handleTabClick('flights')}
          >
            <FontAwesomeIcon icon={faPlane} />
            <span style={{ marginLeft: '0.3rem' }}>Flights</span>
          </div>
            }

         


        </div>



        {activeTab === "stays" && (

          <div>
            {type !== "list" &&
              <>
                <h1>Find your next stay</h1>
                <h2>search low prices on hotels, home and much more...</h2>

              </>
            }
            <div className='headerSearch'>
              <div className='headerSearchItem'>
                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  value={type === "list" ? location.state.destination : destination}
                  onChange={(e) => setDestination(e.target.value)}
                />

              </div>
              <div className='headerSearchItem'>
                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>
                  {type === "list" && location.state.date ?
                    `${format(location.state.date[0].startDate, "dd/MM/yyyy")} to ${format(location.state.date[0].endDate, "dd/MM/yyyy")}`
                    : date[0].startDate && date[0].endDate ?
                      `${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`
                      : 'Check-in Date -- Check-out Date'}
                </span>


                {openDate && <DateRange
                  editableDateInputs={true}
                  onChange={handleDateSelect}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className='date'
                  style={{ zIndex: 10, background: "white" }}
                />}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >
                  {type === "list" && location.state.options ?
                    `${location.state.options.adult} adult · ${location.state.options.children} children · ${location.state.options.room} room`
                    : `${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {type !== "list" &&
             <div className='headerSearchItem'>
                <button className='headerBtn' style={{ background: "#1a53ff", color: "white", fontSize: "1.2rem" }} onClick={handleSearch}>Search</button>
              </div>
            }
              
            </div>

          </div>
          
        )}

        {activeTab === "flights" && (
          <div>

            <>
              <h1>Compare and book flights with ease</h1>
              Discover your next drean stattion

            </>


            <div className='headerSearch'>
              <div className='headerSearchItem'>
                <FontAwesomeIcon icon={faPlaneDeparture} className='headerIcon' />
                <input
                  type="text"
                  placeholder="Where are from?"
                  className="headerSearchInput"
                  onChange={(e) => setDepart(e.target.value)}
                />
              </div>

              <div className='headerSearchItem' style={{fontSize:"1.5rem"}}>
              <FontAwesomeIcon icon={faArrowRight} className='headerIcon' />
                </div>

              <div className='headerSearchItem'>
                <FontAwesomeIcon icon={faPlaneArrival} className='headerIcon' />
                <input
                  type="text"
                  placeholder="Where are to?"
                  className="headerSearchInput"
                  onChange={(e) => setArrival(e.target.value)}
                />

              </div>
              <div className='headerSearchItem'>
                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                <DatePicker selected={flightDate} onChange={(date) => setFLightDate(date)} dateFormat="YYYY-MM-dd" />
              </div>

              <div className='headerSearchItem'>
                <button className='headerBtn' style={{ background: "#1a53ff", color: "white", fontSize: "1.2rem" }} onClick={handleSearchFlight}>Search</button>
              </div>
            </div>



          </div>
        )}


      </div>

    </div>
  );
};

export default Header;
