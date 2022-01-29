import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import GitHub from "@material-ui/icons/GitHub";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Pinterest from "@material-ui/icons/Pinterest";
import { PortfoliosType } from "../data/portfolios";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export type PropsType = {
  menuItem: any;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  // transition: theme.transitions.create("transform", {
  //   duration: theme.transitions.duration.shortest,
  // }),
}));

const Menu: FC<PropsType> = ({ menuItem }) => {
  const [expandeds, setExpandeds] = useState<boolean[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  useEffect(() => {
    const data: boolean[] = [];
    for (const index in menuItem) {
      data[index] = false;
    }
    setExpandeds(data);
  }, []);

  const handleExpandClick = (index: number) => {
    let newArr = [...expandeds]; // copying the old datas array
    newArr[index] = !newArr[index]; // replace newArr[index] value with whatever you want to change it to
    setExpandeds(newArr);
  };

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
                    }}
                    alt="Paella dish"
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
                  goToLink(item.link1);
                }}
              >
                <GitHub />
              </IconButton>

              {/* <ExpandMore
                  expand={expandeds[index]}
                  onClick={() => {
                    handleExpandClick(index);
                  }}
                  aria-expanded={expandeds[index]}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore> */}
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
    background-color: var(--portfolios-menu-color);
    color: var(--white-color);
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
