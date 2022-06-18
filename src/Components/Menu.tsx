import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import GitHub from "@material-ui/icons/GitHub";
import ShareIcon from "@material-ui/icons/Share";
import Pinterest from "@material-ui/icons/Pinterest";
import { PortfoliosType } from "../data/portfolios";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";

export type PropsType = {
  menuItem: any;
};

const Menu: FC<PropsType> = ({ menuItem }) => {
  const [expandeds, setExpandeds] = useState<boolean[]>([]);
  useEffect(() => {
    const data: boolean[] = [];
    for (const index in menuItem) {
      data[index] = false;
    }
    setExpandeds(data);
  }, []);

  const goToLink = (link: string) => {
    window.open(link);
  };
  return (
    <MenuItemStyled>
      {menuItem.map((item: PortfoliosType, index: number) => {
        return (
          <Card key={index}>
            <CardHeader title={item.title} subheader={item.text} />
            <div className="portfolio-img">
              {item.images.map((image: any) => {
                return (
                  <CardMedia
                    key={image}
                    component="img"
                    image={image}
                    style={{
                      width: item.type === 2 ? "120px" : "80%",
                      height: item.type === 2 ? "215px" : "50%",
                      margin: "0px",
                      filter: item.blur ? "blur(5px)" : "",
                    }}
                    alt={item.content}
                  />
                );
              })}
            </div>
            <CardContent>
              <Typography variant="body2">{item.content}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="share"
                style={{ display: item.link1 ? "block" : "none" }}
                onClick={() => {
                  goToLink(item.link1);
                }}
              >
                <ShareIcon />
              </IconButton>
              <IconButton
                aria-label="add to favorites"
                style={{ display: item.link2 ? "block" : "none" }}
                onClick={() => {
                  goToLink(item.link2);
                }}
              >
                <GitHub />
              </IconButton>
            </CardActions>

            <Collapse
              in={expandeds[index]}
              timeout="auto"
              unmountOnExit
              className="collapse-info"
            >
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  <div>
                    <ul>
                      <li>
                        <a href={item.link1}>
                          <GitHub />
                        </a>
                      </li>
                      <li>
                        <a href={item.link2}>
                          <Pinterest />
                        </a>
                      </li>
                    </ul>
                  </div>
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    </MenuItemStyled>
  );
};

const MenuItemStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  color: var(--white-color);

  @media screen and (max-width: 920px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 670px) {
    grid-template-columns: repeat(1, 1fr);

    .MuiCard-root {
      overflow: hidden;
      margin-left: 5px;
      margin-right: 5px;
    }
  }

  .collapse-info {
    position: absolute;
    width: 41%;
    min-height: 20%;
    background-color: var(--sidebar-dark-color);
    z-index: 100;
  }
  .portfolio-img {
    align-items: center;
    text-align: center;
    img {
      padding: 5px;
    }
  }

  .MuiCardMedia-root {
    display: inline;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .MuiCard-root {
    background-color: var(--background-dark-grey);
    color: var(--white-color);
    border-right: 6px solid var(--border-color);

    &:hover {
      border: 2px solid var(--primary-color);
      transform: translateZ(15px);
    }
  }

  .MuiTypography-displayBlock {
    color: var(--font-light-color);
  }

  .portfolio-content {
    display: block;
    position: relative;
    overflow: hidden;
    align-items: center;
    text-align: center;
  }
`;

export default Menu;
