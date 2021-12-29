import React, { useState, FC, useEffect } from "react";
import styled from "styled-components";
import { MainLayout, InnerLayout } from "../styles/Layouts";
import Title from "../Components/Title";
import PrimaryButton from "../Components/PrimaryButton";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ContactItem from "../Components/ContactItem";
import { contactData, contactMenu, contactLabel } from "../data/contact";
import emailService from "../services/emailService";
import Particle from "../Components/Particle";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particles from "react-particles-js";

const ContactPage: FC = () => {
  const langType = useSelector((state: any) => state.lang);

  const [emailData, setEmailData] = useState({
    from_name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const phone = <PhoneIcon />;
  const email = <EmailIcon />;
  const location = <LocationOnIcon />;

  const formSubmit = async (e: any) => {
    e.preventDefault();
    const data = await emailService.sendEmail(e.target);
    console.log(data);
  };

  const handleChange = (evt: any) => {
    const { id, value } = evt.target;
    setEmailData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    handleValidation(id, value);
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleValidation = (id: string, value: string) => {
    const list = document.querySelectorAll("#contactForm div.form-field");
    if (id === "from_name") {
      if (value) {
        if (!value.match(/^[a-zA-Z0-9]+$/)) {
          list[0].classList.add("error");
        } else {
          list[0].classList.remove("error");
        }
      } else {
        list[0].classList.add("error");
      }
    } else if (id === "email") {
      if (value) {
        let lastAtPos = value.lastIndexOf("@");
        let lastDotPos = value.lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            value.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            value.length - lastDotPos > 2
          )
        ) {
          list[1].classList.add("error");
        } else {
          list[1].classList.remove("error");
        }
      } else {
        list[1].classList.add("error");
      }
    } else if (id === "message") {
      if (value) {
        list[4].classList.remove("error");
      } else {
        list[4].classList.add("error");
      }
    }
  };

  const checkValidation = () => {
    const list = document.querySelectorAll("#contactForm div.form-field");
    let fields = emailData;
    let errors = {
      name: "",
      email: "",
    };
    let formIsValid = true;
    let errorMessage = "";
    //Name
    if (!fields["from_name"]) {
      formIsValid = false;
      list[0].classList.add("error");
    } else {
      if (!fields["from_name"].match(/^[a-zA-Z0-9]+$/)) {
        formIsValid = false;
        list[0].classList.add("error");
      } else {
        list[0].classList.remove("error");
      }
    }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      list[1].classList.add("error");
    } else {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        list[1].classList.add("error");
      } else {
        list[1].classList.remove("error");
      }
    }

    //message
    list[4].classList.remove("error");
    if (!fields["message"]) {
      formIsValid = false;
      list[4].classList.add("error");
    }

    return { formIsValid, errorMessage };
  };

  const sendEmail = async (e: any) => {
    const { formIsValid, errorMessage } = checkValidation();
    if (formIsValid) {
      notifySuccess("Form submitted");
      const form = document.querySelector("#contactForm");
      const data = await emailService.sendEmail(form);
      setEmailData({
        from_name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
      });
    } else {
      notifyError("Form has errors.");
    }
  };

  return (
    <div>
      <Particles
        style={{
          position: "absolute",
        }}
      />
      <MainLayout>
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Title title={"Contact"} span={"Contact"} />
        <ContactPageStyled>
          <InnerLayout className={"contact-section"}>
            <div className="left-content">
              <div className="contact-title">
                <h4>Get In Touch</h4>
              </div>
              <form id="contactForm" className="form" onSubmit={formSubmit}>
                <div className="form-field">
                  <label htmlFor="from_name">
                    {contactLabel[langType].name}
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={emailData.from_name}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">{contactLabel[langType].email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={emailData.email}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">{contactLabel[langType].phone}</label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    value={emailData.phone}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="subject">
                    {contactLabel[langType].subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={emailData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="text-area">
                    {contactLabel[langType].message}
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    cols={30}
                    rows={10}
                    required
                    value={emailData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-field f-button">
                  <PrimaryButton title={"Send Email"} onClick={sendEmail} />
                  {/* <input type="submit" id="button" value="Send Email"></input> */}
                </div>
              </form>
            </div>
            <div className="right-content">
              <ContactItem
                title={contactMenu[langType].tel}
                icon={phone}
                cont={contactData[langType].tel}
              />
              <ContactItem
                title={contactMenu[langType].email}
                icon={email}
                cont={contactData[langType].email}
              />
              <ContactItem
                title={contactMenu[langType].address}
                icon={location}
                cont={contactData[langType].address}
              />
            </div>
          </InnerLayout>
        </ContactPageStyled>
      </MainLayout>
    </div>
  );
};

const ContactPageStyled = styled.section`
  .contact-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2rem;
    @media screen and (max-width: 978px) {
      grid-template-columns: repeat(1, 1fr);
      .f-button {
        margin-bottom: 3rem;
      }
    }
    .right-content {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      @media screen and (max-width: 502px) {
        width: 70%;
      }
    }
    .contact-title {
      h4 {
        color: var(--white-color);
        padding: 1rem 0;
        font-size: 1.8rem;
      }
    }
    .form {
      width: 100%;
      @media screen and (max-width: 502px) {
        width: 100%;
      }
      .form-field {
        margin-top: 2rem;
        position: relative;
        width: 100%;
        label {
          position: absolute;
          left: 20px;
          top: -19px;
          display: inline-block;
          background-color: var(--background-dark-color);
          padding: 0 0.5rem;
          color: inherit;
        }
        input {
          border: 1px solid var(--border-color);
          outline: none;
          background: transparent;
          height: 50px;
          padding: 0 15px;
          width: 100%;
          color: inherit;
        }
        textarea {
          background-color: transparent;
          border: 1px solid var(--border-color);
          outline: none;
          color: inherit;
          width: 100%;
          padding: 0.8rem 1rem;
        }
      }
    }

    .error {
      input {
        box-sizing: border-box;
        border: 2px solid red !important;
        border-radius: 4px;
      }
      textarea {
        box-sizing: border-box;
        border: 2px solid red !important;
        border-radius: 4px;
      }
      label {
        color: red !important;
      }
    }
  }
`;

export default ContactPage;
