import React from "react";
import { useAnime } from "../providers/animeContext";

const Search = () => {
    const { title, startDate, setStartDate, endDate, setEndDate, setTitle, searchByTitle, searchByStartDate, searchByEndDate } = useAnime();
    return (
        <>
            <div className="search">
                <input
                    type='text'
                    placeholder="Search by Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                >
                </input>
                <button onClick={searchByTitle} className="my-first-step" >Search</button>
            </div>
            <div className="search">
                <input
                    type='date'
                    placeholder="Search by Start Date..."
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                >
                </input>
                <button onClick={searchByStartDate}  >Search</button>
            </div>
            <div className="search">
                <input
                    type='date'
                    placeholder="Search by End Date..."
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                >
                </input>
                <button onClick={searchByEndDate} className="my-first-step" >Search</button>
            </div>
        </>
    );
}

export default Search;