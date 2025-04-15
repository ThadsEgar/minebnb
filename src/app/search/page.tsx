import MainViewContainer from "../components/container";
import Filters from "../components/FilterBar";
import ListingsContainer from "../components/ListingsContainer";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="pt-60">
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#F7F7F7]">
        <MainViewContainer>
          <Header />
          <Filters />
        </MainViewContainer>
      </div>
      <MainViewContainer>
        <ListingsContainer />
        <Footer />
      </MainViewContainer>
    </div>
  );
}

const Footer = () => {
  return (
    <div className="flex text-black">
      <div>
        <ul>
          <li>Home</li>
          <li>Discover</li>
          <li>About</li>
          <li>Contact Me</li>
        </ul>
      </div>
    </div>
  );
}