import React, { useRef } from 'react';
import Slider from 'react-slick';
import { FaStar, FaRegStar } from 'react-icons/fa';
import nextAct from "../images/landing-reviews/next-active.png";
import prevAct from "../images/landing-reviews/prev-active.png";
import "../App.css";

const ReviewSlider = () => {
  const sliderRef = useRef(null);

  const reviews = [
    {
      name: 'William W',
      review: '“I recently used Tradiy to find a trusted tradesman for some home repairs, and I couldn’t be more impressed! The entire process was seamless from start to finish. The platform is user-friendly and quickly connected me with reliable and professional tradesmen in my area.”',
      rating: 5,
    },
    {
      name: 'Darren G',
      review: "“Edd's created something really special here - a place for everyone to find good trades and to also help those trades grow and scale their business too!”",
      rating: 5,
    },
    {
      name: 'Stuart B',
      review: '“Since meeting Edd and joining tradiy we have seen massive amounts of improvements in our business, more Customers and the help and support has been amazing, definitely worth joining Tradiy.”',
      rating: 5,
    },
    {
      name: 'Yvonne C',
      review: '“Brilliant list of reliable trustworthy services. Wouldnt hesitate to recommend them.”',
      rating: 5,
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendDots: dots => (
      <div className="custom-dots">
        <button
          className="prev-button"
          onClick={() => sliderRef.current.slickPrev()}
        >
        <img src={prevAct} alt='prev' />
        </button>
        {dots}
        <button
          className="next-button"
          onClick={() => sliderRef.current.slickNext()}
        >
        <img src={nextAct} alt='next' />
        </button>
      </div>
    ),
  };

  const renderStars = (rating) => {
    const filledStarColor = "#2EC1C7";
    const outlinedStarColor = "#2EC1C7";

    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} color={filledStarColor} />);
      } else {
        stars.push(<FaRegStar key={i} color={outlinedStarColor} />);
      }
    }
    return stars;
  };

  return (
    <div className="review-slider-container">
      <Slider ref={sliderRef} {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="rating">{renderStars(review.rating)}</div>
            <p>{review.review}</p>
            <h3>{review.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewSlider;
