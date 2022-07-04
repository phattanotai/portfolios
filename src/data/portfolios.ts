export type PortfoliosType = {
  category: string[];
  images: string[];
  link1: string;
  link2: string;
  title: string;
  content: string;
  type: number;
  text: string;
  blur: boolean;
};
const portfolios: PortfoliosType[] = [
  {
    category: ["Angular", "Postgresql", "Mongodb", "Expressjs", "Redis"],
    images: ["./assets/images/portImages/wgt/web/1.png"],
    link1: "http://wgtgps.net/login",
    link2: "",
    title: "Website",
    content: `ตัวอย่างเว็บแอพพลิเคชั่นสำหรับให้ลูกค้าที่เข้าเข้ามาติดตั้ง gps กับทางบริษัท dealer และพนักงานเข้าใช้งานเพื่อจัดการข้อมูลที่ได้จากเครื่อง gps 
      ตามสิทธ์ิที่ได้ตามประเภทผู้เข้าใช้งานระบบ`,
    type: 1,
    text: "Created with Angular, Expressjs",
    blur: false,
  },
  {
    category: ["Ionic", "Expressjs", "Redis"],
    images: [
      "./assets/images/portImages/wgt/app/1.jpeg",
      "./assets/images/portImages/wgt/app/2.jpeg",
    ],
    link1:
      "https://play.google.com/store/apps/details?id=wgts.gps.tracking&hl=th&gl=US",
    link2: "",
    title: "Application",
    content: "ตัวอย่างแอพพลิเคชั่นระบบ Gps ติดตามรถออนไลน์",
    type: 2,
    text: "Created with Ionic",
    blur: false,
  },
  {
    category: ["Angular", "Mysql", "Expressjs"],
    images: ["./assets/images/portImages/all/1.jpg"],
    link1: "",
    link2: "",
    title: "Website",
    content: "ตัวอย่างระบบจัดการข้อมูลการเทรด",
    type: 1,
    text: "Created with Angular Expressjs and Mysql",
    blur: false,
  },
  {
    category: ["Javascript", "Expressjs", "Mongodb", "Jquery"],
    images: ["./assets/images/portImages/gwt/2.png"],
    link1: "",
    link2: "",
    title: "Website",
    content:
      "ตัวอย่างระบบจัดการหลังบ้านสำหรับให้แอดมินจัดการข้อมูลการตั้งค่าต่างๆ ข้อมูลผู้ใช้ ระบบแชท สร้างpopup และอื่นๆ ",
    type: 1,
    text: "Created with only HTML, Jquery and CSS, Expressjs",
    blur: false,
  },

  {
    category: ["Ionic", "Graphql", "Socket.io", "Expressjs"],
    images: [
      "./assets/images/portImages/world-taxi/customer/0.jpeg",
      "./assets/images/portImages/world-taxi/customer/2.jpg",
    ],
    link1: "",
    link2: "",
    title: "Application",
    content:
      "ตัวอย่างแอพพลิเคชั่นสำหรับผู้ใช้งานระบบเรียกรถเท็กชี่ โดยใช้ข้อมูลที่ได้จากระบบ gps ",
    type: 2,
    text: "Created with Ionic, Expressjs, Graphql, Socket.io",
    blur: false,
  },
  {
    category: ["Ionic", "Graphql", "Socket.io", "Expressjs"],
    images: [
      "./assets/images/portImages/world-taxi/driver/0.jpeg",
      "./assets/images/portImages/world-taxi/driver/2.jpg",
    ],
    link1: "",
    link2: "",
    title: "Application",
    content:
      "ตัวอย่างแอพพลิเคชั่นสำหรับผู้ขับรถแท็กชี่ระบบเรียกรถเท็กชี่ โดยใช้ข้อมูลที่ได้จากระบบ gps ที่ผู้ขับเข้ามาติดตั้ง gps กับบริษัท",
    type: 2,
    text: "Created with Ionic, Expressjs, Graphql, Socket.io",
    blur: false,
  },
  {
    category: ["Angular", "Postgresql", "Expressjs"],
    images: ["./assets/images/portImages/bet888/backoffice/1.jpg"],
    link1: "",
    link2: "",
    title: "Backoffice",
    content: "ตัวอย่างระบบจัดการหลังบ้านเว็บหวยออนไลน์",
    type: 1,
    text: "Created with Angular, Expressjs",
    blur: false,
  },
  {
    category: ["Angular", "Postgresql", "Expressjs"],
    images: ["./assets/images/portImages/bet888/web/1.jpg"],
    link1: "",
    link2: "",
    title: "Website",
    content: "ตัวอย่างระบบจัดการหลังบ้านเว็บหวยออนไลน์",
    type: 1,
    text: "Created with Angular, Expressjs",
    blur: false,
  },
  {
    category: ["Nextjs", "Mongodb", "Expressjs"],
    images: ["./assets/images/portImages/okwin/backoffice/0.JPG"],
    link1: "",
    link2: "",
    title: "Backoffice",
    content: "ตัวอย่างระบบจัดการหลังบ้าน",
    type: 1,
    text: "Created with Nextjs, Expressjs",
    blur: false,
  },
  {
    category: ["Nextjs", "Mongodb", "Nestjs"],
    images: ["./assets/images/portImages/okwin/web/1.JPG"],
    link1: "",
    link2: "https://github.com/phattanotai/big-win-web-nextjs-test",
    title: "Website",
    content: "ตัวอย่างเว็บไซต์พัฒนาโดยใช้ Nextjs and Nestjs",
    type: 1,
    text: "Created with Nextjs, Nestjs",
    blur: true,
  },
  {
    category: ["React Native", "Mongodb", "Nestjs"],
    images: ["./assets/images/portImages/okwin/app/2.JPG"],
    link1: "",
    link2: "",
    title: "Application",
    content: "ตัวอย่างแอพพลิเคชั่นพัฒนาโดยใช้ React Native and Nestjs",
    type: 1,
    text: "Created with React Native, Nestjs",
    blur: true,
  },
  {
    category: ["Vuejs", "Nestjs"],
    images: ["./assets/images/portImages/vuejs/0.jpeg"],
    link1: "",
    link2: "",
    title: "Website",
    content: "ตัวอย่างเว็บแอพพลิเคชั่นพัฒนาโดยใช้ Vuejs and Nestjs",
    type: 1,
    text: "Created with Vuejs, Nestjs",
    blur: false,
  },
  {
    category: ["Reactjs", "Threejs"],
    images: ["./assets/images/portImages/portfolio/portfolio2.jpeg"],
    link1: "http://portfolios.gracia.tech",
    link2: "https://github.com/phattanotai/portfolios",
    title: "Website",
    content: "ตัวอย่างเว็บแอพพลิเคชั่นพัฒนาโดยใช้ Reactjs and Threejs",
    type: 1,
    text: "Created with Reactjs, Threejs",
    blur: false,
  },
  {
    category: ["PHP", "Mysql"],
    images: ["./assets/images/portImages/auto-like/1.png"],
    link1: "",
    link2: "",
    title: "Website",
    content:
      "ตัวอย่างเว็บแอพพลิเคชั่นเพิ่มยอดไลค์ ยอดติดตามพัฒนาโดยใช้ PHP and Mysql",
    type: 1,
    text: "Created with PHP, Mysql",
    blur: false,
  },
];

export default portfolios;
