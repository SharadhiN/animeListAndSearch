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
                    data-testid="input-search-by-title"
                >
                </input>
                <button onClick={searchByTitle} data-testid="btn-search-title" >Search</button>
            </div>
            <div className="search">
                <input
                    type='date'
                    placeholder="Search by Start Date..."
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    data-testid="input-search-by-start-date"
                >
                </input>
                <button onClick={searchByStartDate} data-testid="btn-search-start-date" >Search</button>
            </div>
            <div className="search">
                <input
                    type='date'
                    placeholder="Search by End Date..."
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    data-testid="input-search-by-end-date"
                >
                </input>
                <button onClick={searchByEndDate} data-testid="btn-search-end-date" >Search</button>
            </div>
        </>
    );
}

export default Search;