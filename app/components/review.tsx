import React, { useState } from "react";
import Image from "next/image";

const ReviewSection = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      rating: 5,
      review: "I had an amazing experience renting this sports car. The handling was superb, and the comfort was unbeatable. Definitely worth every penny!",
      profileImg: "https://s3-alpha-sig.figma.com/img/9b76/706a/6ff04d2c5ee05f69f07eda85ba8c1846?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aUmip3qHG4FphbRd6MPAqtTqlKrf89HAK28wX3YhEQ~1XacPpQe8P5MJQlysrUC3rTBE1qzmq5QqrgQgXhoZCIKosHcL2lcWvac7mqKiOPtZqnUQZ1pBMZoQaslO9QmGEo5pAVCleZpKwVp~AHi63H~2w3YJplQbXj3XYetewAd~TroNJ0271Wc0n6BvTq0CjjdodallakzVfhzXpC8fhy3IHwB1Bdq3MxLIUQRqUd-jhmwq3qpjbcrB6pleOFDaMa90IdKRTg0GNFqht7WJN-Jv3n4uMdAYMTk7Y0CZZk2j3sdQW4J9WaKrST1al-AQmLom6C2Lp4ZjUO-L-GshTw__",
    },
    {
      name: "Jane Smith",
      rating: 4,
      review: "The car was fantastic, but the delivery process could have been faster. However, once I got it, the ride was smooth and exhilarating!",
      profileImg: "https://s3-alpha-sig.figma.com/img/1f59/2390/d69545d7cf9ff5be12e2248ebf54993a?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D3rPycWw9mBSOboIxnuR2UE8mS6tLQqWcijMUIuYbE~L6g7wIlhMEer35Wus9Gg4OIBMQPs5GDDiI4kUFGQEz17zm397C~WKdFNcMlAs91eprqMqeq38I3hoghMa7qhpm2HjBUPnIhZvJDnGRBiEeR3uJR8TVhPTeu16n5kMRqL1fmr4ju3bBv-GITRVrLdVJsa6kvfQkClkC1rSeH1B3sHb-wt4nkVby-RF-Iwjodp3jYl9PW5IleHZtCM2vT9bPP8FAjy-SLIJGb34G1KeRjdYzC9jbgsIQk6FnAEL8lZ0~JqAS2Mh1PFDxProvPFQcQ3V4BSZ3d72hS68qHsi0A__",
    },
   
  ])
  // Handle form submission
  const handleReviewSubmit = (e:any) => {
    e.preventDefault();

    if (!name || rating === 0 || !reviewText) {
      alert("Please fill out all fields and select a rating before submitting.");
      return;
    }

    const newReview = {
      name,
      rating,
      review: reviewText,
      profileImg: "/default-profile.png", // You can replace this with a real user profile system
    };
    setReviews([...reviews, newReview]);

    // Clear form
    setName("");
    setRating(0);
    setReviewText("");
  };


  return (
    <div className=" bg-white w-full md:w-[90%] lg:w-[80%] mx-auto mt-6 gap-8 p-6 rounded-lg">

      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Customer Reviews</h2>

      {/* Existing Reviews */}
      <div className="flex flex-col space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={review.profileImg}
                alt="User Profile"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <p className="font-semibold text-gray-800">{review.name}</p>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={i < review.rating ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      className={`w-5 h-5 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.review}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Review Form */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add Your Review</h3>
        <form onSubmit={handleReviewSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          {/* Rating Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Your Rating</label>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={index < rating ? "currentColor" : "gray-300"}
                  viewBox="0 0 24 24"
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => setRating(index + 1)}
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    className={index < rating ? "text-yellow-500" : "text-gray-300"}
                  />
                </svg>
              ))}
            </div>
          </div>

          {/* Review Text Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Your Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;
