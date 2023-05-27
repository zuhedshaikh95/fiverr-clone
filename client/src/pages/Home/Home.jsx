import React, { useEffect, useState } from "react";
import { Featured, NextArrow, PrevArrow, TrustedBy } from "../../components";
import { CategoryCard, ProjectCard } from "../../components";
import { cards, projects } from "../../data";

import "./Home.scss";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";

const Home = () => {
  const screenBreakpoints = {
    small: 576,
    medium: 768,
    large: 992,
  };

  const [visibleSlides, setVisibleSlides] = useState(window.innerWidth);

  const handleVisibleSlides = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= screenBreakpoints.large) {
      setVisibleSlides(5);
    } else if (screenWidth >= screenBreakpoints.medium) {
      setVisibleSlides(2);
    } else {
      setVisibleSlides(1);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVisibleSlides);

    return () => {
      window.removeEventListener("resize", handleVisibleSlides);
    };
  }, []);

  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <div style={{ padding: "40px 20px" }}>
        <CarouselProvider
          naturalSlideHeight={155}
          naturalSlideWidth={125}
          totalSlides={cards.length}
          infinite
          className="slider"
          visibleSlides={visibleSlides}
        >
          <Slider>
            {cards.map((card) => (
              <Slide key={card.id}>
                <CategoryCard data={card} />
              </Slide>
            ))}
          </Slider>
          <ButtonBack>
            <PrevArrow />
          </ButtonBack>
          <ButtonNext>
            <NextArrow />
          </ButtonNext>
        </CarouselProvider>
      </div>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>The best for every budget</h6>
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>Quality work done quickly</h6>
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>Protected payments, every time</h6>
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>24/7 support</h6>
            </div>
            <p>
              Questions? Our round-the-clock support team is available to help
              anytime, anywhere.
            </p>
          </div>
          <div className="item">
            <video
              poster="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png"
              src="./media/video.mp4"
              controls
            ></video>
          </div>
        </div>
      </div>

      {/* Fiverr Business Component */}
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h2>fiverr business</h2>
            <h1>
              A business solution designed for <span>teams</span>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>Connect to freelancers with proven business experience</h6>
            </div>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>
                Get matched with the perfect talent by a customer success
                manager
              </h6>
            </div>
            <div className="title">
              <img src="./media/check.png" alt="check" />
              <h6>
                Manage teamwork and boost productivity with one powerful
                workspace
              </h6>
            </div>
            <button>Explore Fiverr Business</button>
          </div>
          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div style={{ padding: "40px 20px" }}>
        <CarouselProvider
          naturalSlideHeight={135}
          naturalSlideWidth={125}
          totalSlides={cards.length}
          infinite
          className="slider"
          visibleSlides={visibleSlides}
        >
          <Slider>
            {projects.map((card, index) => (
              <Slide key={card.id}>
                <ProjectCard data={card} />
              </Slide>
            ))}
          </Slider>
          <ButtonBack>
            <PrevArrow />
          </ButtonBack>
          <ButtonNext>
            <NextArrow />
          </ButtonNext>
        </CarouselProvider>
      </div>
    </div>
  );
};

export default Home;
