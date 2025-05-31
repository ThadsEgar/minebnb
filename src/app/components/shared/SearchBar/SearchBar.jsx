import { useState } from "react";
import Image from "next/image";
import "./SearchBar.css";

export const SearchBar = ({ isPdp = false, scrolled = false }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`searchbar-container ${scrolled ? 'searchbar-mini' : 'searchbar-expanded'} ${hovered ? 'hovered' : ''}`}
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
        className={scrolled ? "" : "ml-auto"}
      />
    </div>
  );
};