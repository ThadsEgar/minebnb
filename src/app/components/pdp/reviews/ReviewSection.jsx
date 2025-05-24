import Image from "next/image";
import './ReviewSection.css'

const ReviewsContainer = () => {
  return (
    <div className="review__container">
      <ReviewsOverviewContainer />
      <ReviewCardsContainer />
    </div>
  );
};

const ReviewsOverviewContainer = ({reviewScore=4.32}) => {
  return (
    <div>
        <div className="review__highlight">
            <Image src="/pdpReviews/pickaxe.png" alt="Image" width={200} height={30}/>
            <p className="review__score">{reviewScore}</p>
            <Image className="image--horizontal" src="/pdpReviews/pickaxe.png" alt="Image" width={200} height={30}/>
        </div>
        <p className="review__smalldescription">Miner's Favorite</p>
        <p className="review__longdescription">This house is a favorite based on ratings, reviews from fellow Villager's.</p>
    </div>
  )
};

const ReviewCardsContainer = () => {};

export default ReviewsContainer;
