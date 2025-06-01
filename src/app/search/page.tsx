"use client";
import { useEffect, useState } from "react";
import MainViewContainer from "../components/utils/container";
import Filters from "../components/FilterBar";
import ListingsContainer from "../components/ListingsContainer";
import Header from "../components/Header";
import { SearchContextProvider } from "../context/SearchContext";
import { Footer } from "../components/shared/Footer/Footer";

export default function Search() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <SearchContextProvider>
      <div className="pt-48">
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#F7F7F7] transition-all duration-300">
          <MainViewContainer>
            <Header scrolled={scrolled} />
          </MainViewContainer>
          <div
            className={`border-b border-gray-300 ${
              scrolled ? "opacity-100" : "opacity-100"
            }`}
          />

          <MainViewContainer>
            <Filters />
          </MainViewContainer>
          <div className="border-b-1 border-gray-300"></div>
        </div>
        <div className={scrolled ? "pt-0" : "pt-16"}>
          <MainViewContainer>
            <ListingsContainer />
          </MainViewContainer>
        </div>

        <Footer />
      </div>
    </SearchContextProvider>
  );
}
