import {useState} from 'react';
import Image from "next/image";

export const SearchBar = () => {
    return(
        <div className="searchbar">
            <p>Anywhere</p>
            <p>Any week</p>
            <p>Add guests</p>
            <Image src="/filterBar/snowy.png" alt="Search Button" />
        </div>
    )
}

