import { FC, useEffect, useState } from "react";
import styled from "styled-components";

export type PropsType = {
  images: any;
  className: string;
  speed?: number;
  dots?: boolean;
  progressBar?: boolean;
  height?: string;
  width?: string;
  arrows?: boolean;
  autoplay?: boolean;
  style?: any;
};

let slideIndex = [];
let timer = [];
const SlideImages: FC<PropsType> = ({
  images,
  className,
  speed = 10000,
  dots = false,
  progressBar = false,
  height = "100%",
  width = "",
  arrows = true,
  autoplay = false,
  style,
}) => {
  const [progress, setProgress] = useState(0);
  let percent = 0;
  let count = 0;

  useEffect(() => {
    slideIndex[className] = -1;
    timer[className] = [];
    nextSlides();
    if (autoplay) {
      loopSlideImages();
    }
    return () => {
      clearAll();
    };
  }, []);

  const clearAll = () => {
    const highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
  };

  const nextSlides = () => {
    slideIndex[className] = slideIndex[className] + 1;
    showSlides();
    clearLoopSlideImages();
  };

  const prevSlides = () => {
    slideIndex[className] = slideIndex[className] - 1;
    showSlides();
    clearLoopSlideImages();
  };

  const currentSlide = (n) => {
    slideIndex[className] = n;
    showSlides();
    setTimeout(() => {
      clearLoopSlideImages();
    }, 1000);
  };

  const clearLoopSlideImages = () => {
    if (autoplay) {
      for (var i = 0; i < timer[className].length; i++) {
        clearTimeout(timer[className][i]);
      }
      timer[className] = [];
      if (progressBar && percent <= 100 && autoplay) {
        percent = 0;
        count = 0;
        setProgress(percent);
        loopProgress();
      }
      loopSlideImages();
    }
  };

  const loopSlideImages = () => {
    if (autoplay) {
      timer[className].push(
        setTimeout(function () {
          nextSlides();
          loopSlideImages();
        }, speed)
      );
    }
  };

  const loopProgress = () => {
    if (percent <= 100) {
      timer[className].push(
        setTimeout(() => {
          count += 1110;
          percent = (100 / speed) * count;
          setProgress(percent);
          loopProgress();
        }, 1000)
      );
    }
  };

  const showSlides = () => {
    const slides: any = document.getElementsByClassName(
      `${className}Slide fadeImg`
    );
    const dots = document.getElementsByClassName(`${className}Dot dot`);
    if (slideIndex[className] > slides.length - 1) {
      slideIndex[className] = 0;
    }
    if (slideIndex[className] < 0) {
      slideIndex[className] = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides.length) {
      slides[slideIndex[className]].style.display = "block";
    }
    if (dots.length) {
      dots[slideIndex[className]].className += " active";
    }
  };

  return (
    <SlideImagesStyled>
      <div className="slideshow-container" style={style}>
        {images.map((b: any, index: number) => {
          return (
            <div
              className={`${className}Slide fadeImg`}
              key={index}
              style={{ height: height, width: width, display: "none" }}
            >
              <img
                src={b}
                alt={b}
                style={{ width: "100%", height: "100%", margin: 0 }}
              />
            </div>
          );
        })}
        <a
          className="slide-prev"
          style={{ display: arrows ? "flex" : "none" }}
          onClick={() => {
            prevSlides();
          }}
        >
          &#10094;
        </a>
        <a
          className="slide-next"
          style={{ display: arrows ? "flex" : "none" }}
          onClick={() => {
            nextSlides();
          }}
        >
          &#10095;
        </a>

        <div
          style={{
            textAlign: "center",
            marginTop: "-40px",
            display: dots ? "block" : "none",
          }}
        >
          {images.map((b: any, index: number) => {
            return (
              <span
                className={`${className}Dot dot`}
                key={index}
                onClick={() => {
                  currentSlide(index);
                }}
              ></span>
            );
          })}
        </div>
        <div
          className="progress"
          style={{ height: "3px", display: progressBar ? "flex" : "none" }}
        >
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </SlideImagesStyled>
  );
};

const SlideImagesStyled = styled.div`
  /* Slideshow container */
  .slideshow-container {
    max-width: 100%;
    height: 100%;
    position: relative;
    margin: auto;
    display: block;
    margin: 0;
  }

  /* Next & previous buttons */
  .slide-prev,
  .slide-next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
  }

  /* Position the "next button" to the right */
  .slide-next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  /* On hover, add a black background color with a little bit see-through */
  .slide-prev:hover,
  .slide-next:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  /* Fading animation */
  .fadeImg {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
    height: 75vh;
    border: 1px solid black;
    /* border-image: url(../../public/images/gold-border.png) 5 round; */
  }

  /* The dots/bullets/indicators */
  .dot {
    cursor: pointer;
    height: 13px;
    width: 13px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }

  .slideshow-container .active,
  .dot:hover {
    background-color: #faf9f9;
    height: 15px;
    width: 15px;
  }

  @-webkit-keyframes fadeImg {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeImg {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  /* On smaller screens, decrease text size */
  @media only screen and (max-width: 300px) {
    text-align: -webkit-center;

    .prev,
    .next,
    .text {
      font-size: 11px;
    }
  }

  @media only screen and (max-width: 760px) {
    .fadeImg {
      height: auto !important;
    }
  }
  @media only screen and (max-width: 1000px) {
    text-align: -webkit-center;

    .fadeImg {
      height: auto !important;
    }
  }
`;
export default SlideImages;
