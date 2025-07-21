import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchReviews = async () => {
  const { data } = await axios.get("http://localhost:5000/reviews");
  return data;
};

const Testimonials = () => {
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  if (isLoading) {
    return <p className="text-center text-xl py-10">Loading reviews...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-xl text-red-600 py-10">
        Failed to load reviews.
      </p>
    );
  }

  return (
    <div className="my-6 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">
       <span className="text-black"> Testimonial</span> Section
      </h2>
      <div className="hidden lg:block">
        {/* Desktop View: 3 Cards per Slide */}
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          swipeable
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10"
              >
                &#10094;
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10"
              >
                &#10095;
              </button>
            )
          }
        >
          {reviews.reduce((chunks, review, index) => {
            const chunkIndex = Math.floor(index / 3);
            if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
            chunks[chunkIndex].push(review);
            return chunks;
          }, []).map((group, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8"
            >
              {group.map((review) => (
                <div
                  key={review._id}
                  className="bg-white shadow-lg rounded-xl p-10 w-full max-w-sm mx-auto text-center hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={review.photo}
                    alt={review.name}
                    className="w-0 h-75 rounded-full mx-auto border-4 border-blue-500 mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <p className="text-gray-600 text-sm mt-2 italic">
                    "{review.feedback}"
                  </p>
                  <div className="text-yellow-500 font-bold mt-3">
                    ⭐ {review.rating} Stars
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>

      <div className="lg:hidden">
        {/* Mobile View: 1 Card per Slide */}
        <Carousel
          autoPlay={true}
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          swipeable
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                className="absolute left-4 top-6/10  -translate-y-1/2 bg-blue-600 hover:bg-blue-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10"
              >
                &#10094;
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                className="absolute right-4 top-6/10 -translate-y-1/2 bg-blue-600 hover:bg-blue-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10"
              >
                &#10095;
              </button>
            )
          }
        >
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm mx-auto text-center hover:scale-105 transition-transform duration-300"
            >
              <img
                src={review.photo}
                alt={review.name}
                className="w-60 h-60 rounded-full mx-auto border-4 border-blue-500 mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <p className="text-gray-600 text-sm mt-2 italic">
                "{review.feedback}"
              </p>
              <div className="text-yellow-500 font-bold mt-3">
                ⭐ {review.rating} Stars
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
