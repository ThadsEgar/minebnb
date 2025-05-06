import {SearchBar} from '../components/shared/SearchBar/SearchBar';

const Header = () => {
    return (
      <div className="border-b-2 border-gray-300">
        <header className="w-full h-20 flex items-center justify-between">
          <div className="flex items-center justify-center">
            <h1 className="text-green-700 py-2 text-2xl font-medium transition-colors duration-200 font-sans">
              <a href="/search">minebnb</a>
            </h1>
          </div>
          <SearchBar />
          <div className="">
            <ul className="text-black flex gap-8 py-8 justify-between">
              <li className="hover:bg-green-300 px-3 py-2 text-xl font-medium transition-colors duration-200 font-sans rounded-full outline-1">
                <a href="https://www.linkedin.com/in/thads-michael-egar">Contact Me</a>
              </li>
            </ul>
          </div>
        </header>
      </div>
    );
  }

  export default Header;