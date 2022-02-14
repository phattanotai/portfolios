import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FacebookIcon from "@material-ui/icons/Facebook";
import GithubIcon from "@material-ui/icons/GitHub";
import YoutubeIcon from "@material-ui/icons/YouTube";
import VersionInfo from "../Components/VersionInfo";
import { WorldMap } from "../Threejs/WorldMap";
import { gsap, TweenMax } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";

gsap.registerPlugin(TextPlugin);

const HomePage: FC = () => {
  let typographyRef: any = useRef(null);
  let h2Ref: any = useRef(null);
  let nameRef: any = useRef(null);
  let pRef: any = useRef(null);

  let versionRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("Phattano");

  useEffect(() => {
    const world = new WorldMap();
    particle();
    return () => {
      world.onDestroy();
    };
  }, [typographyRef]);

  const particle = () => {
    const tl = gsap.timeline();

    tl.to(".typography-border", {
      duration: 2,
      scaleX: 0,
    });

    gsap.to(h2Ref, {
      duration: 5,
      clipPath: "polygon(0 0,100% 0,100% 100%, 0% 100%)",
    });

    tl.to(pRef, {
      duration: 8,
      clipPath: "polygon(0 0,100% 0,100% 100%, 0% 100%)",
    });

    gsap.to(nameRef, {
      duration: 4,
      text: "Phattanothai Pukham",
      ease: "out",
    });

    TweenMax.from(".icons", 2.5, {
      opacity: 1,
      x: random(-500, 500),
      y: random(-500, 500),
      z: random(-500, 500),
      scale: 1,
      delay: 1,
      yoyo: true,
    });

    tl.to(".icons", {
      duration: 2,
      scaleY: 1,
    });

    gsap.to(versionRef.current, {
      duration: 4,
      scaleX: 1,
    });

    tl.to(versionRef.current, {
      duration: 2,
      rotateY: 360,
      translateY: 50,
    });

    tl.to(versionRef.current, {
      duration: 2,
      rotateY: 1,
      translateY: 25,
    });
  };

  const random = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <HomePageStyled>
      <div id="canvasContainer"></div>
      <div
        className="typography"
        ref={(e) => {
          typographyRef = e;
        }}
      >
        <div className="typography-border"></div>
        <h2
          className="h22"
          ref={(e) => {
            h2Ref = e;
          }}
          style={{ clipPath: "polygon(0 0, 100% 0, 0 0)" }}
        >
          Hi, my name is
        </h2>
        <h1>
          <span
            ref={(e) => {
              nameRef = e;
            }}
          >
            {name}
            {/* Phattanothai Pukham */}
          </span>
        </h1>
        <p
          ref={(e) => {
            pRef = e;
          }}
        >
          I’m a software developer and I enjoy creating things that live on the
          internet.{" "}
        </p>
        <div className="icons">
          <a
            href="https://www.facebook.com/profile.php?id=100025241772649"
            target="_blank"
            className="icon i-facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://github.com/phattanotai"
            target="_blank"
            className="icon i-github"
          >
            <GithubIcon />
          </a>
          <a
            href="https://www.youtube.com/channel/UC-kzdCM7NyiLn3tih8yFtMw"
            target="_blank"
            className="icon i-youtube"
          >
            <YoutubeIcon />
          </a>
        </div>
        <br />
        <VersionInfo versionRef={versionRef} />
      </div>
    </HomePageStyled>
  );
};

const HomePageStyled = styled.header`
  width: 100%;
  height: 100vh;
  position: relative;

  .typography {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 80%;

    .icons {
      display: flex;
      justify-content: center;
      margin-top: 1rem;

      transform: scaleY(0);
      transform-origin: bottom;

      .icon {
        border: 2px solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.4s ease-in-out;
        cursor: pointer;
        &:hover {
          border: 2px solid var(--primary-color);
          color: var(--primary-color);
        }
        &:not(:last-child) {
          margin-right: 1rem;
        }
        svg {
          margin: 0.5rem;
        }
      }

      .i-youtube {
        &:hover {
          border: 2px solid red;
          color: red;
        }
      }
      .i-github {
        &:hover {
          border: 2px solid #5f4687;
          color: #5f4687;
        }
      }
    }
  }

  .typography-border {
    content: "";
    position: absolute;
    top: 33px;
    left: 0;
    width: 100%;
    border-bottom: 1px solid white;
    transform: scaleX(1);
  }

  h2 {
    flex-basic: 0;
    flex-grow: 1;
    clip-path: polygon(0 0, 100% 0, 0 0);
  }

  p {
    flex-basic: 0;
    flex-grow: 1;
    clip-path: polygon(0 0, 0 0, 0 0);
  }

  .versionApp {
    transform: scaleX(0);
  }
`;

export default HomePage;
