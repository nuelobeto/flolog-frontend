import "./UserDashboard.scss";
import {
  AsteriskIcon,
  CheckIcon,
  EditIcon,
  HistoryIcon,
  NotifiationIcon,
  UserIcon,
  VerifiedIcon,
  WarningIcon,
} from "../../assets/icons";
import Select from "react-select";
import { DropdownIcon } from "./../../assets/icons";
import { useRef, useState } from "react";
import useProfile from "../../store/useProfile";
import { formatStringDate } from "../../utils/dateConverter";
import profileServices from "./../../services/profileServices";

const sex = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
const age = [
  { value: "18 - 20", label: "18 - 20" },
  { value: "20 - 25", label: "20 - 25" },
  { value: "25 - 30", label: "25 - 30" },
];
const blood_group = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
];
const genotype = [
  { value: "AA", label: "AA" },
  { value: "AS", label: "AS" },
  { value: "AC", label: "AC" },
  { value: "SS", label: "SS" },
  { value: "SC", label: "SC" },
];

const medHistory = [
  "Stomach Ulcer",
  "Intestinal Surgery",
  "Brain Surgery",
  "Eye Surgery",
  "Pile (Haemorrhoid)",
  "Appendectomy",
];

const riskFactors = [
  "Smoker",
  "Drinks alcohol",
  "Use Glasses",
  "Parent had hypertension",
  "Hypertension",
  "Overweight",
  "Air poution",
];

const allergies = [
  "Peanut",
  "Milk",
  "Groundnut",
  "Egg",
  "Augmetin",
  "Quinine",
  "Artesunate",
  "Dust",
  "Cereals, wheat, rice",
];

const UserDashboard = () => {
  const { profile, getProfileLoading, userActivity, bioData } = useProfile(
    (state) => state
  );
  const [address, setAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const [openBioData, setOpenBioData] = useState(false);
  const [openMedHistory, setOpenMedHistory] = useState(false);
  const [openRiskFactors, setOpenRiskFactors] = useState(false);
  const [openAllergies, setOpenAllergies] = useState(false);

  const onEditAddress = (e: any) => {
    e.preventDefault();

    setIsEditingAddress(true);
    if (addressRef.current) {
      addressRef.current.focus();
    }
  };

  const stopEditingAddress = (e: any) => {
    if (e) {
      e.preventDefault();
    }

    setIsEditingAddress(false);
    setAddress("");
  };

  return (
    <>
      <main className="user-dashboard">
        <div className="complete-profile-prompt">
          <NotifiationIcon />{" "}
          <p>Please complete your profile to get access to live chat</p>
        </div>

        <h2>My Dashboard</h2>

        <div className="profile-info">
          <div className="verification-status">
            <VerifiedIcon /> Not Verified
          </div>
          <div className="user-img">
            <img src="/images/profile.webp" alt="" />
            <EditIcon />
          </div>
          {!getProfileLoading ? (
            <>
              <p className="name">
                {profile?.first_name} {profile?.last_name}
              </p>
              <p className="email">{profile?.email}</p>
              <p className="mobile">0{profile?.phone_number}</p>
            </>
          ) : (
            <>
              <p className="name loading"></p>
              <p className="email loading"></p>
              <p className="mobile loading"></p>
            </>
          )}
        </div>

        <div className="premium">
          <span>Premium </span>
          <span>25/30</span>
        </div>

        <div className="info">
          <div className="title">
            <h3>Medical Records</h3>
          </div>
          <div className="medical-data">
            <div className="sub-info">
              <SubInfoHeader
                icon={<UserIcon />}
                text={"Bio Data"}
                subtext={"Basic details about you"}
                dropdown={
                  <DropdownIcon className={`${openBioData && "rotate"}`} />
                }
                onClick={() => setOpenBioData(!openBioData)}
              />
              {openBioData && (
                <div className="bio-data">
                  <div className="select-bio-data">
                    <label>Sex</label>
                    <Select className="select" options={sex} />
                  </div>
                  <div className="select-bio-data">
                    <label>Age</label>
                    <Select options={age} />
                  </div>
                  <div className="select-bio-data">
                    <label>Weight</label>
                    <Select options={[]} />
                  </div>
                  <div className="select-bio-data">
                    <label>Height</label>
                    <Select options={[]} />
                  </div>
                  <div className="select-bio-data">
                    <label>Blood Group</label>
                    <Select options={blood_group} />
                  </div>
                  <div className="select-bio-data">
                    <label>Genotype</label>
                    <Select options={genotype} />
                  </div>
                </div>
              )}
            </div>

            <div className="sub-info">
              <SubInfoHeader
                icon={<HistoryIcon />}
                text={"Past Medical History"}
                subtext={"Select notable medical experiences you have had"}
                dropdown={
                  <DropdownIcon className={`${openMedHistory && "rotate"}`} />
                }
                onClick={() => setOpenMedHistory(!openMedHistory)}
              />
              {openMedHistory && <MedInfoSelection options={medHistory} />}
            </div>

            <div className="sub-info">
              <SubInfoHeader
                icon={<AsteriskIcon />}
                text={"Risk factors, Social/Family History"}
                subtext={"Select the options that apply to you"}
                dropdown={
                  <DropdownIcon className={`${openRiskFactors && "rotate"}`} />
                }
                onClick={() => setOpenRiskFactors(!openRiskFactors)}
              />
              {openRiskFactors && <MedInfoSelection options={riskFactors} />}
            </div>

            <div className="sub-info">
              <SubInfoHeader
                icon={<WarningIcon />}
                text={"Allergy Status"}
                subtext={"Food, medicines or substances you react to"}
                dropdown={
                  <DropdownIcon className={`${openAllergies && "rotate"}`} />
                }
                onClick={() => setOpenAllergies(!openAllergies)}
              />
              {openAllergies && <MedInfoSelection options={allergies} />}
            </div>
          </div>
        </div>

        <div className="info">
          <div className="title">
            <h3>Shipping Details</h3>
          </div>
          <div className="shipping-details">
            <div className="shipping-input-field">
              <input
                type="text"
                placeholder="142, Akpapava road, oppodite benin agb....."
                value={address}
                ref={addressRef}
                readOnly={!isEditingAddress}
                onChange={(e) => setAddress(e.target.value)}
              />
              {isEditingAddress ? (
                <CheckIcon className="save-icon" onClick={stopEditingAddress} />
              ) : (
                <EditIcon className="edit-icon" onClick={onEditAddress} />
              )}
            </div>
          </div>
        </div>

        <div className="info">
          <div className="title">
            <h3>Activity</h3>
          </div>
          <div className="activity">
            {userActivity.map((activity, index) => (
              <p key={index}>
                {formatStringDate(activity.timestamp)} - {activity.action}
              </p>
            ))}
          </div>
        </div>

        <div className="info">
          <div className="title">
            <h3>Subscription History</h3>
          </div>
        </div>
      </main>
    </>
  );
};

const SubInfoHeader = ({
  text,
  subtext,
  icon,
  dropdown,
  onClick,
}: {
  text: string;
  subtext: string;
  icon: React.ReactNode;
  dropdown: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div className="sub-info-header" onClick={onClick}>
      <div className="icon">{icon}</div>
      <div className="text">
        <h4>{text}</h4>
        <p>{subtext}</p>
      </div>
      {dropdown}
    </div>
  );
};

const MedInfoSelection = ({ options }: { options: any[] }) => {
  const [selected, setSelected] = useState<any[]>([]);

  const handleSelect = (option: string) => {
    setSelected([...selected, option]);
  };

  return (
    <div className="med-info-selection">
      <div className="options">
        {options.map((option, index) => (
          <div className="option" key={index}>
            <div
              className={`check-circle ${
                selected.includes(option) && "selected"
              }`}
              onClick={() => handleSelect(option)}
            ></div>
            <label>{option}</label>
          </div>
        ))}
      </div>

      <div className="custom-options">
        <label>Others:</label>
        <input type="text" />
      </div>
    </div>
  );
};

export default UserDashboard;
