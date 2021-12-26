
import axios from "axios";
import emailjs from 'emailjs-com'
const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      
    },
  };

const sendEmail = (data: any) => {
  return new Promise((resolve ,rejects) => {
    const serviceID = 'service_v3gozr8';
    const templateID = 'template_r5z5pve';

    const message: any = {
      from_name: data.name,
      to_name: 'Phattanothai',
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    }
    emailjs.sendForm(serviceID, templateID, data, 'user_jtskqNk5wSIny01ci32sk').then((d) => {
      console.log(d)
      resolve({
        ststus: 'ok',
        message: 'send message success'
      })
    }, (error) => {
      console.log(error)
      rejects({
        ststus: 'error',
        message: error
      })
    });
  });
};

export default {
    sendEmail
};
