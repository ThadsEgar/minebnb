import Image from "next/image";
import "./ReviewSection.css";
import { usePdp } from "../../../context/PropertyDetailsContext";

const ReviewsContainer = () => {
  return (
    <div className="review__container">
      <ReviewsOverviewContainer />
      <ReviewCardsContainer />
    </div>
  );
};

const ReviewsOverviewContainer = ({ reviewScore = 4.32 }) => {
  const { propertyDetailsResponse, loading } = usePdp();
  if (!loading && propertyDetailsResponse) {
    console.log("APPLES", propertyDetailsResponse);
    const { reviewOverview } = propertyDetailsResponse;
    const { average } = reviewOverview;
    return (
      <div>
        <div className="review__highlight">
          <Image
            src="/pdpReviews/pickaxe.png"
            alt="Image"
            width={200}
            height={30}
          />
          <p className="review__score">{average}</p>
          <Image
            className="image--horizontal"
            src="/pdpReviews/pickaxe.png"
            alt="Image"
            width={200}
            height={30}
          />
        </div>
        <p className="review__smalldescription">Miner's Favorite</p>
        <p className="review__longdescription">
          This house is a favorite based on ratings,<br/> reviews from fellow 
          Villagers.
        </p>
      </div>
    );
  }
};

const ReviewCardsContainer = () => {};

export default ReviewsContainer;
