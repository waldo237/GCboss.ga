import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebookSquare,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

import  "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
    <div>
      <a
        rel="noopener noreferrer"
        href="https://twitter.com/WaldoMilanes"
        target="_blank"
        className="link hoverable-card social-link"
        // alt="The icon of Twitter"
      >
        <FaTwitter className="social" size={30} />
      </a>
      <a
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/waldomilanes/"
        target="_blank"
        className="link hoverable-card social-link"
        // alt="The icon of LinkedIn. Find Waldo Milanes on LinkedIn"
      >
        <FaLinkedin className="social" size={30} />
      </a>
      <a d
        rel="noopener noreferrer"
        href="https://www.facebook.com/milanes237/"
        target="_blank"
        className="link hoverable-card social-link"
        // alt="The icon of Facebook. Find Waldo Milanes on Facebook"
      >
        <FaFacebookSquare className="social" size={30} />
      </a>
      <a
        rel="noopener noreferrer"
        href="https://www.instagram.com/waldo237/?hl=en"
        target="_blank"
        className="link hoverable-card social-link"
        // alt="The icon of Instagram. Find Waldo Milanes on Instagram"
      >
        <FaInstagram className="social" size={30} />
      </a>
      <a
        rel="noopener noreferrer"
        href="https://github.com/waldo237"
        target="_blank"
        className="link hoverable-card social-link"
        // alt="The icon of Github. Find Waldo Milanes on Github"
      >
        <FaGithub className="social" size={30} />
      </a>
    </div>
    <div className="footer-credits flex-row-wrap">
      {" "}
      <span>
        &#9400; 2021-
        {new Date().getFullYear()} &nbsp;{" "}
      </span>{" "}

      <a
        rel="noopener noreferrer"
        href="https://waldomilanes.com/"
        target="_blank"
        className="link hoverable-card social-link">
        <span> | W PROGRAMMING | </span> <span>&nbsp;waldomilanes.com </span>

        </a>

    </div>

    <div>
      <div>developed by Waldo Milanes</div>
      <span>&reg;</span>
    </div>
  </footer>
  )
}


