import { BackArrowIcon, EditIcon, SpinnerIcon } from "../../assets/icons";
import Footer from "../../components/footer/Footer";
import "./ConsultantDashboard.scss";
import useProfile from "./../../store/useProfile";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "./../../config/routes";
import { useEffect, useState } from "react";
import useAuth from "../../store/useAuth";
import profileServices from "../../services/profileServices";
import { toast } from "react-toastify";

const ConsultantDashboard = () => {
  const { consultantProfile, uuid, getConsultantProfile } = useProfile(
    (state) => state
  );
  const { token } = useAuth((state) => state);
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const updateProfile = async () => {
    const payload = {
      user: uuid,
      first_name: firstname,
      last_name: lastname,
      phone_number: mobile,
      email: consultantProfile.email,
    };
    if (token) {
      setSavingProfile(true);
      try {
        await profileServices.updateConsultantProfile(token, payload);
        setSavingProfile(false);
        toast.success("Profile Updated!");
        getConsultantProfile(token);
        setEditProfile(false);
      } catch (error) {
        setSavingProfile(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (consultantProfile) {
      setFirstname(consultantProfile?.first_name);
      setLastname(consultantProfile?.last_name);
      setMobile(consultantProfile?.phone_number);
    }
  }, [consultantProfile]);

  return (
    <>
      <main className="main consultant-dashboard">
        <div className="profile">
          <div className="consultant-info">
            <div className="user-img">
              <img src="/images/profile.webp" alt="" />
              <EditIcon onClick={() => setEditProfile(true)} />
            </div>
            <p className="name">
              {consultantProfile?.first_name} {consultantProfile?.last_name}
            </p>
            <p className="email">{consultantProfile?.email}</p>
            <p className="mobile">{consultantProfile?.phone_number}</p>
          </div>

          <div className="earnings">
            <p>
              Total Earnings <br /> <span>N{consultantProfile?.balance}</span>
            </p>
            <p>
              Available Payout <br /> <span>N{consultantProfile?.balance}</span>
            </p>
          </div>

          {editProfile && (
            <div className="edit-consultant-profile">
              <div className="edit-profile-header">
                <BackArrowIcon onClick={() => setEditProfile(false)} />
                <h3>Edit Profile</h3>
              </div>
              <input
                type="text"
                placeholder="First name..."
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name..."
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone number..."
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <Button
                size={"lg"}
                color={"primary"}
                variant={"filled"}
                rounded={"lg"}
                onClick={updateProfile}
              >
                {!savingProfile ? "Save" : <SpinnerIcon className="spinner" />}
              </Button>
            </div>
          )}
        </div>

        <div className="actions">
          <Button
            size={"sm"}
            color={"primary"}
            variant={"outlined"}
            style={{ background: "#FF3030", color: "#fff" }}
            onClick={() => navigate(ROUTES.consultant_chat)}
          >
            GO LIVE!
          </Button>
          <Button
            size={"sm"}
            color={"primary"}
            variant={"outlined"}
            style={{ background: "#2E83B5", color: "#fff" }}
            onClick={() => navigate(ROUTES.consultant_activities)}
          >
            ACTIVITY
          </Button>
          <Button
            size={"sm"}
            color={"primary"}
            variant={"outlined"}
            style={{ background: "#9c9c9c", color: "#fff" }}
          >
            TRAININGS
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ConsultantDashboard;
