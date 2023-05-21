import { CheckIcon, ForwardArrowIcon, WhatsAppIcon } from "../../assets/icons";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import "./Landing.scss";

const Landing = () => {
  return (
    <>
      <header>
        <section className="hero-section">
          <h1>Connect with Expert Pharmacists Anytime, Anywhere with Flolog</h1>
          <button>Get Started</button>
        </section>
      </header>

      <main>
        <section className="section-i">
          <img
            src="https://res.cloudinary.com/dk9bt9lkn/image/upload/v1683866269/flo-log/Group_12625_pqixke.png"
            alt=""
          />
          <div>
            <h2>Maximize Your Medication Safety and Convenience with Flolog</h2>
            <p>
              Your Personalized <br /> Pharmacy on the Go
            </p>
            <Button
              size={"lg"}
              color={"white"}
              variant={"filled"}
              rounded={"lg"}
              style={{ marginTop: "0.5rem", width: "fit-content" }}
            >
              Sign Up
            </Button>
          </div>
        </section>

        <section className="section-ii">
          <img
            src="https://res.cloudinary.com/dk9bt9lkn/image/upload/v1683866439/flo-log/Rectangle_46_msxtbm.png"
            alt=""
          />

          <div>
            <div>
              <h2>
                We guarantee you the <br /> CAPS of healthcare
              </h2>

              <div>
                <div>
                  <CheckIcon />
                  <span>Convenience</span>
                </div>
                <div>
                  <CheckIcon />
                  <span>Accessibility</span>
                </div>
                <div>
                  <CheckIcon />
                  <span>Privacy</span>
                </div>
                <div>
                  <CheckIcon />
                  <span>Speed</span>
                </div>
              </div>
            </div>

            <h3>
              HEALTHCARE AT <br /> YOUR FINGERTIPS
            </h3>
          </div>

          <div className="arc"></div>
        </section>

        <section className="section-iii">
          <h2>
            In 15 months of operations, <br /> we have become a trusted <br />
            healthcare partner to
          </h2>
          <div>
            <div>
              <img
                src="https://res.cloudinary.com/dk9bt9lkn/image/upload/v1683954847/flo-log/Pharmacy_tah3kh.webp"
                alt=""
              />
              <span>100+</span>
              <span>Pharmacies</span>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dk9bt9lkn/image/upload/v1683954847/flo-log/Hospital_keyhgx.webp"
                alt=""
              />
              <span>50+</span>
              <span>Hospital</span>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dk9bt9lkn/image/upload/v1683954847/flo-log/Patient_viqx2m.webp"
                alt=""
              />
              <span>5,000+</span>
              <span>Patients</span>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dk9bt9lkn/image/upload/v1683954847/flo-log/Health-Professional_ep7hct.webp"
                alt=""
              />
              <span>10,000+</span>
              <span>Healthcare Providers</span>
            </div>
          </div>
        </section>

        <section className="section-iv">
          <div className="arc"></div>

          <h2>PARTNER BRANDS</h2>

          <img
            src="https://res.cloudinary.com/dk9bt9lkn/image/upload/v1683956722/flo-log/Adobe_Express_20220630_0045450-2_pr4xlp.webp"
            alt=""
          />

          <Button
            size={"lg"}
            color={"primary"}
            variant={"outlined"}
            style={{ margin: "auto" }}
          >
            Scroll to see more <ForwardArrowIcon />
          </Button>
        </section>

        <section className="section-v">
          <h2>
            Be the first to find out about <br /> new products and services.
          </h2>
          <p>Sign up for our newsletter</p>
          <input type="text" placeholder="Enter your email address" />
          <Button
            size={"lg"}
            color={"white"}
            variant={"filled"}
            rounded={"md"}
            style={{ margin: "auto", width: "150px" }}
          >
            Subscribe
          </Button>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Landing;
