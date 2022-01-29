export type PortfoliosType = {
  id: number;
  category: string;
  images: string[];
  link1: string;
  link2: string;
  title: string;
  content: string;
  type: number;
  text: string;
};
const portfolios: PortfoliosType[] = [
  {
    id: 1,
    category: "Angular",
    images: ["./assets/images/portImages/all/1.jpg"],
    link1: "",
    link2: "",
    title: "Website",
    content: "",
    type: 1,
    text: "Created with Angular",
  },
  {
    id: 2,
    category: "Angular",
    images: ["./assets/images/portImages/bet888/backoffice/1.jpg"],
    link1: "",
    link2: "",
    title: "Backoffice",
    content: "",
    type: 1,
    text: "Created with Angular",
  },
  {
    id: 3,
    category: "Angular",
    images: ["./assets/images/portImages/bet888/web/1.jpg"],
    link1: "",
    link2: "",
    title: "Website",
    content: "",
    type: 1,
    text: "Created with Angular",
  },
  {
    id: 4,
    category: "Angular",
    images: ["./assets/images/portImages/wgt/web/1.png"],
    link1: "http://wgtgps.net/login",
    link2: "",
    title: "Website",
    content: "",
    type: 1,
    text: "Created with Angular",
  },
  {
    id: 5,
    category: "Javascript",
    images: ["./assets/images/portImages/gwt/2.png"],
    link1: "",
    link2: "",
    title: "Website",
    content: "",
    type: 1,
    text: "Created with only HTML,Javascript and CSS.",
  },
  {
    id: 6,
    category: "Ionic",
    images: [
      "./assets/images/portImages/wgt/app/1.jpeg",
      "./assets/images/portImages/wgt/app/2.jpeg",
    ],
    link1: "",
    link2: "",
    title: "Application",
    content: "",
    type: 2,
    text: "Created with Ionic",
  },
  {
    id: 7,
    category: "Ionic",
    images: [
      "./assets/images/portImages/world-taxi/customer/0.jpeg",
      "./assets/images/portImages/world-taxi/customer/2.jpg",
    ],
    link1: "",
    link2: "",
    title: "Application",
    content: "",
    type: 2,
    text: "Created with Ionic",
  },
  {
    id: 8,
    category: "Ionic",
    images: [
      "./assets/images/portImages/world-taxi/driver/0.jpeg",
      "./assets/images/portImages/world-taxi/driver/2.jpg",
    ],
    link1: "",
    link2: "",
    title: "Application",
    content: "",
    type: 2,
    text: "Created with Ionic",
  },
  {
    id: 10,
    category: "NextJS",
    images: ["./assets/images/portImages/okwin/backoffice/0.JPG"],
    link1: "",
    link2: "",
    title: "Backoffice",
    content: "",
    type: 1,
    text: "Created with Next.Js",
  },
  {
    id: 9,
    category: "NextJS",
    images: ["./assets/images/portImages/okwin/web/1.JPG"],
    link1: "",
    link2: "",
    title: "Website",
    content: "",
    type: 1,
    text: "Created with Next.Js",
  },

  {
    id: 11,
    category: "React Native",
    images: ["./assets/images/portImages/okwin/app/2.JPG"],
    link1: "",
    link2: "",
    title: "Application",
    content: "",
    type: 1,
    text: "Created with React Native",
  },
];

export default portfolios;
