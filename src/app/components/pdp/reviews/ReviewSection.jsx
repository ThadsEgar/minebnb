import Image from "next/image";
import "./ReviewSection.css";
import { usePdp } from "../../../context/PropertyDetailsContext";

const REVIEW_SECTIONS = [
  { name: "Mob Defense", score: "4.2", icon: "/pdpReviews/security.png" },
  { name: "Location", score: "5.0", icon: "/pdpReviews/location.png" },
  { name: "Resources", score: "4.5", icon: "/pdpReviews/diamond.png" },
  { name: "Utilities", score: "5.0", icon: "/pdpReviews/desk.png" },
  { name: "Block Appeal", score: "4.7", icon: "/pdpReviews/block.png" },
  { name: "Redstone", score: "4.8", icon: "/pdpReviews/lightning.png" },
];

const ReviewsContainer = () => {
  return (
    <div className="review__container">
      <ReviewsOverviewContainer />
      <ReviewCardsContainer />
    </div>
  );
};

const ReviewsOverviewContainer = () => {
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
            width={125}
            height={125}
          />
          <p className="review__score">{average}</p>
          <Image
            className="image--horizontal"
            src="/pdpReviews/pickaxe.png"
            alt="Image"
            width={125}
            height={125}
          />
        </div>
        <p className="review__smalldescription">Miner's Favorite</p>
        <p className="review__longdescription">
          This house is a favorite based on ratings,
          <br /> reviews from fellow Villagers.
        </p>
      </div>
    );
  }
};

const ReviewCardsContainer = () => {
  return (
    <div className="review__cards__container">
      <ReviewSummaryCard />
      {REVIEW_SECTIONS.map((item) => {
        return (
          <ReviewCard
            key={item.name}
            text={item.name}
            score={item.score}
            icon={item.icon}
          />
        );
      })}
    </div>
  );
};

const ReviewCard = ({ text, score, icon }) => {
  return (
    <div className="review__card">
      <div>
        <p>{text}</p>
        <p>{score}</p>
      </div>

      <Image src={icon} alt="Review card image" width={32} height={32} />
    </div>
  );
};

const ReviewSummaryCard = () => {
  return (
    <div className="review__summary__card">
      <div className="review__summary__card__text">Overall Rating</div>
      <div className="review__summary__card__subtext">
        <ReviewSummaryCardProgressBar number={5} />
        <ReviewSummaryCardProgressBar number={4} />
        <ReviewSummaryCardProgressBar number={3} />
        <ReviewSummaryCardProgressBar number={2} />
        <ReviewSummaryCardProgressBar number={1} />
      </div>
    </div>
  );
};

const ReviewSummaryCardProgressBar = ({ progressbarpercent = {}, number }) => {
  const progessBarStyle = progressbarpercent ? `${progressbarpercent}` : "";
  return (
    <div className="review__progresss__bar__container">
      <p>{number}</p>
      <div className="review__progress__bar" style={{ width: "full" }} />
    </div>
  );
};

export default ReviewsContainer;
