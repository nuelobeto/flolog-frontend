import "./UserDashboard.scss";
import {
  CheckIcon,
  EditIcon,
  NotifiationIcon,
  VerifiedIcon,
} from "../../assets/icons";
import Select from "react-select";
import { DropdownIcon } from "./../../assets/icons";
import { useRef, useState } from "react";

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
const medical_history = [
  {
    label: "Past Medical/Surgical History",
    question:
      "What notable disease or illness have you had in the past? have you had any surgery before? if yes , write the name of the surgery",
  },
  {
    label: "Risk Factors, Social/Family History",
    question: `Do you smoke? Do you drink? 
    Also what prominent illness/disease do any of your parents or grand parents have?`,
  },
  {
    label: "Allergy Status",
    question: ` What drugs or substances do you react to?`,
  },
];

const UserDashboard = () => {
  const [openEditableField, setOpenEditableField] = useState<null | number>(
    null
  );
  const [address, setAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const [openBioData, setOpenBioData] = useState(false);
  const [openMedData, setOpenMedData] = useState(false);
  const [openShippingDetails, setOpenShippingDetails] = useState(false);
  const [openActivity, setOpenActivity] = useState(false);
  const [openSubHistory, setOpenSubHistory] = useState(false);

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
          <p className="name">Efosa Emonbeifo</p>
          <p className="email">efosaemonbeifo@flolog.co</p>
          <p className="mobile">081000000000</p>
        </div>

        <div className="premium">
          <span>Premium </span>
          <span>25/30</span>
        </div>

        <div className="info">
          <div className="title" onClick={() => setOpenBioData(!openBioData)}>
            <h3>Bio Data</h3>
            <DropdownIcon className={`${openBioData && "rotate"}`} />
          </div>
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

        <div className="info">
          <div className="title" onClick={() => setOpenMedData(!openMedData)}>
            <h3>Medical Data</h3>
            <DropdownIcon className={`${openMedData && "rotate"}`} />
          </div>
          {openMedData && (
            <div className="medical-data">
              {medical_history.map((item, index) => (
                <EditableField
                  key={index}
                  label={item.label}
                  question={item.question}
                  openEditableField={openEditableField}
                  handleOpen={() =>
                    openEditableField === index
                      ? setOpenEditableField(null)
                      : setOpenEditableField(index)
                  }
                  id={index}
                />
              ))}
            </div>
          )}
        </div>

        <div className="info">
          <div
            className="title"
            onClick={() => setOpenShippingDetails(!openShippingDetails)}
          >
            <h3>Shipping Details</h3>
            <DropdownIcon className={`${openShippingDetails && "rotate"}`} />
          </div>
          {openShippingDetails && (
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
                  <CheckIcon
                    className="save-icon"
                    onClick={stopEditingAddress}
                  />
                ) : (
                  <EditIcon className="edit-icon" onClick={onEditAddress} />
                )}
              </div>
            </div>
          )}
        </div>

        <div className="info">
          <div className="title" onClick={() => setOpenActivity(!openActivity)}>
            <h3>Activity</h3>
            <DropdownIcon className={`${openActivity && "rotate"}`} />
          </div>
          {openActivity && (
            <div className="activity">
              <p>12/01/23 - Live chat</p>
              <p>12/01/23 - Offline message</p>
              <p>12/01/23 - Video call</p>
              <p>12/01/23 -Medication request</p>
            </div>
          )}
        </div>

        <div className="info">
          <div
            className="title"
            onClick={() => setOpenSubHistory(!openSubHistory)}
          >
            <h3>Subscription History</h3>
            <DropdownIcon className={`${openSubHistory && "rotate"}`} />
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;

const EditableField = ({
  label,
  question,
  openEditableField,
  handleOpen,
  id,
}: {
  label: string;
  question: string;
  openEditableField: null | number;
  handleOpen: () => void;
  id: number;
}) => {
  return (
    <div className="editable-field">
      <div className={`input-header ${openEditableField === id && "border"}`}>
        <label>{label}</label>
        {openEditableField === id ? (
          <CheckIcon className="save-icon" onClick={handleOpen} />
        ) : (
          <EditIcon className="edit-icon" onClick={handleOpen} />
        )}
      </div>
      <div
        className={`input-body ${
          openEditableField === id && "open-input-body"
        }`}
      >
        <div className="question">{question}</div>
        <div className="answer">
          <textarea placeholder="Enter answer..."></textarea>
        </div>
      </div>
    </div>
  );
};
