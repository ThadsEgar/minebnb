"use client";
import MainViewContainer from "../components/container";
import Filters from "../components/FilterBar";
import ListingsContainer from "../components/ListingsContainer";
import Header from "../components/Header";
import { SearchContextProvider } from "../context/SearchContext";

export default function Search() {
  return (
    <SearchContextProvider>
      <div className="pt-60">
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#F7F7F7]">
          <MainViewContainer>
            <Header />
            <Filters />
          </MainViewContainer>
        </div>
        <MainViewContainer>
          <ListingsContainer />
        </MainViewContainer>
        <Footer />

      </div>
    </SearchContextProvider>
  );
}

const Footer = () => {
  return (
    <div className="text-black bg-[#f4efef] mt-8 border-t-1 border-gray-300">
      <ul className="mx-48 grid grid-cols-3">
        <div className="flex flex-col gap-2 py-4">
          <li className="font-semibold">Important Links</li>
          <a
            className="font-light text-gray-500 hover:text-blue-300 duration-200"
            href="https://www.linkedin.com/in/thads-michael-egar"
          >
            Contact Me
          </a>
          <li className="font-light text-gray-500  hover:text-blue-300 duration-200">
            Credits
          </li>
          <li className="font-light text-gray-500  hover:text-blue-300 duration-200">
            About
          </li>
          <li className="font-light text-gray-500  hover:text-blue-300 duration-200">
            Contact Me
          </li>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <li className="font-semibold">Hosting</li>
          <li className="font-light text-gray-500">Hosting Rules</li>
          <li className="font-light text-gray-500">Pet Info</li>
          <li className="font-light text-gray-500">Payment Options</li>
          <li className="font-light text-gray-500">Cleanliness Rules</li>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <li className="font-semibold">Minebnb</li>
          <li className="font-light text-gray-500">Minebnb your home</li>
          <li className="font-light text-gray-500">Minecarts</li>
          <li className="font-light text-gray-500">Careers</li>
          <li className="font-light text-gray-500">Iron golem support</li>
        </div>
      </ul>
    </div>
  );
};
