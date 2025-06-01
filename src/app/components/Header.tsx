import Link from "next/link";
import { SearchBar } from "../components/shared/SearchBar/SearchBar";

const Header = ({ isPdp = false, scrolled = false }) => {
  return (
    <div className="relative">
      <div className="flex w-[125px] absolute left-0 top-4 z-50">
        <h1 className="text-green-700 py-2 text-2xl font-medium transition-colors duration-200 font-sans">
          <Link href="/search">
            <span className="text-green-700 py-2 text-2xl font-medium transition-colors duration-200 font-sans">
              minebnb
            </span>
          </Link>
        </h1>
      </div>

      <div className="text-black items-center justify-center right-0 top-8 absolute z-50">
        <a
          className="hover:bg-green-300 px-3 py-2 text-sm font-medium transition-colors duration-200 font-sans rounded-full outline-1"
          href="https://www.linkedin.com/in/thads-michael-egar"
        >
          Contact Me
        </a>
      </div>
      <header className="w-full flex items-center justify-center relative">
        <div>
          <SearchBar isPdp={isPdp} scrolled={scrolled} />
        </div>
      </header>
    </div>
  );
};

export default Header;
