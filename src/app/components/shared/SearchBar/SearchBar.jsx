import { useState } from "react";
import Image from "next/image";
import "./SearchBar.css";
export const SearchBar = () => {
  const [hovered, setHovered] = useState(false);

  const onMouseEnterCB = () => {
    setHovered(true);
  };

  const onMouseLeaveCB = () => {
    setHovered(false);
  };

  return (
    <div
      className={hovered ? "searchbar--hovered" : "searchbar"}
      onMouseEnter={() => {
        onMouseEnterCB();
      }}
      onMouseLeave={() => {
        onMouseLeaveCB();
      }}
    >
      <p className="searchbar__itemdiv">Anywhere</p>
      <p className="searchbar__itemdiv">Any week</p>
      <p>Add guests</p>
      <Image
        width={28}
        height={28}
        src="/SearchBar/searchicon.png"
        alt="Search Button"
      />
    </div>
  );
};
