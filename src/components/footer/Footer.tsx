import { Link } from "react-router-dom";
import { AppleIcon, PlaystoreIcon } from "../../assets/icons";
import "./Footer.scss";

const links = [
  {
    title: "Quick Links",
    urls: ["Home", "About Us", "Blog"],
  },
  {
    title: "Solutions",
    urls: ["Logistics Portal", "EMS"],
  },
  {
    title: "Policies",
    urls: ["Privacy Policy", "Terms & Conditions"],
  },
  {
    title: "Social Media",
    urls: ["Facebook", "Instagram", " Whatsapp", "Gmail"],
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary py-[4rem] px-6">
      <div className="links">
        {links.map((link, index) => (
          <div key={index}>
            <h2>{link.title}</h2>
            <div className="line"></div>
            <div className="urls">
              {link.urls.map((url, index) => (
                <Link key={index} to={"/"} className="py-2">
                  {url}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="app-store">
        <div>
          <PlaystoreIcon />
          <p>
            Available on the <br />
            <span>Google Play</span>
          </p>
        </div>

        <div>
          <AppleIcon />
          <p>
            Available on the <br />
            <span>App Store</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
