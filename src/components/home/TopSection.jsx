import React, { useEffect, useRef, useState } from "react";
import topVideo from "../../assets/home/backgroundVideo.mp4";
import topImage from "../../assets/home/backgroundImage.png";
import CarouselImage from "../../assets/home/carouselImage.jpeg";
import { getCollections } from "../../apis/Collections";
import { Link } from "react-router-dom";

const TopSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [allCollections, setAllCollections] = useState([]);

  const [currentCollection, setCurrentCollection] = useState({});

  const carouselRef = useRef(null);

  const fetchCollections = async () => {
    try {
      const allCollections = await getCollections();
      console.log(allCollections);
      setAllCollections(allCollections);
      setCurrentCollection(allCollections[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const carouselElement = carouselRef.current;

    const handleSlideChange = (event) => {
      const newIndex = event.to;
      console.log("current index: ", event.to, ", total length: ", allCollections.length)
      if (newIndex >= 0 && newIndex < allCollections.length) {
        setCurrentCollection(allCollections[newIndex]);
        console.log("current index: ", event.to, ", total length: ", allCollections.length)
      }
    };

    carouselElement.addEventListener("slid.bs.carousel", handleSlideChange);

    return () => {
      carouselElement.removeEventListener(
        "slid.bs.carousel",
        handleSlideChange
      );
    };
  }, [allCollections]);

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide relative"
      data-bs-ride="carousel"
      ref={carouselRef}
    >
      <div className="carousel-inner h-screen bg-black">
        {/* first video */}
        {/* <div className="carousel-item active relative w-full h-full">
          <img
            src={topImage}
            className={`${!videoLoaded ? "block" : "hidden"} w-full h-full object-cover`}
            alt="slide1"
          />
          <video
            autoPlay
            loop
            muted
            src={topVideo}
            className="block w-full h-full object-cover"
            alt="slide1"
            onCanPlay={() => {
              setVideoLoaded(true);
            }}
          />
        </div>
        
        <div className="carousel-item relative w-full h-full">
          <img
            src={CarouselImage}
            className="block w-full h-full object-cover"
            alt="slide2"
          />
        </div> */}

        {/* third image */}

        {allCollections.map((collection, index) => (
          <div
            key={collection.id}
            className={`carousel-item relative w-full h-full ${
              index === 0 ? "active" : ""
            }`}
          >
            <img
              src={collection.imageSrc}
              className="filter brightness-75 block w-full h-full object-cover"
              alt={collection.title}
            />
          </div>
        ))}
        
        {/* Text and buttons */}
        <div className="absolute bottom-28 left-12 text-left text-white">
          <h5 className="text-sm">Featured collection, 2024</h5>
          <h2 className="text-4xl font-bold py-4">{currentCollection.title}</h2>
          <Link
            to={`/collection?id=${encodeURIComponent(currentCollection.id)}`}
            className="inline-block bg-transparent border border-white text-[#D8E3B1] py-2 px-4"
            
          >
            View collection
          </Link>
        </div>

        {/* Fixed-position navigation buttons */}
        <div className="absolute bottom-16 left-8 w-48 px-12 flex justify-between items-center -translate-y-1/2">
          <button
            className="carousel-control-prev bg-[#D8E3B121] bg-opacity-30 hover:bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
            type="button"
            data-bs-target="#carouselExampleSlidesOnly"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next bg-[#D8E3B121] bg-opacity-30 hover:bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
            type="button"
            data-bs-target="#carouselExampleSlidesOnly"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
