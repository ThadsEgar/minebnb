import { useState } from "react";
import Image from "next/image";
import "./Searchbar.css";

export const SearchBar = ({ isPdp = false, scrolled = false }) => {
  const [hovered, setHovered] = useState(false);

  const shouldShowMiniSearchBar = scrolled || isPdp

  return (
    <div className="searchbar__container__wrapper">
      {
        (!scrolled && !isPdp) && (
          <div className="traveltype">
          <h1 className="font-bold">Homes</h1>
          <h1>Experiences</h1>
        </div>
        )
      }

      <div
        className={`searchbar-container ${
          shouldShowMiniSearchBar ? "searchbar-mini" : "searchbar-expanded"
        } ${hovered ? "hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p className="searchbar__itemdiv">Anywhere</p>
        <p className="searchbar__itemdiv">Any week</p>
        <p>Add guests</p>
        <Image
          width={28}
          height={28}
          src="/SearchBar/searchicon.png"
          alt="Search Button"
          className={scrolled ? "" : ""}
        />
      </div>
    </div>
  );
};
