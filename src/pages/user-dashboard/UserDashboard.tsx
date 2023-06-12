import "./UserDashboard.scss";
import { EditIcon, NotifiationIcon, VerifiedIcon } from "../../assets/icons";
import Select from "react-select";
import { DropdownIcon } from "./../../assets/icons";

const UserDashboard = () => {
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
          <div className="title">
            <h3>Bio Data</h3>
            <DropdownIcon />
          </div>
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
        </div>

        <div className="info">
          <div className="title">
            <h3>Medical Data</h3>
            <DropdownIcon />
          </div>
          <div className="medical-data">
            <EditableField label={"Past Medical/Surgical History"} />
            <EditableField label={"Risk Factors, Social/Family History"} />
            <EditableField label={"Allergy Status"} />
          </div>
        </div>

        <div className="info">
          <div className="title">
            <h3>Shipping Details</h3>
            <DropdownIcon />
          </div>
          <div className="shipping-details">
            <div className="shipping-input-field">
              <input type="text" />
              <EditIcon className="edit-icon" />
              {/* <CheckIcon className="save-icon" /> */}
            </div>
          </div>
        </div>

        <div className="info">
          <div className="title">
            <h3>Activity</h3>
            <DropdownIcon />
          </div>
          <div className="activity">
            <p>12/01/23 - Live chat</p>
            <p>12/01/23 - Offline message</p>
            <p>12/01/23 - Video call</p>
            <p>12/01/23 -Medication request</p>
          </div>
        </div>

        <div className="info">
          <div className="title">
            <h3>Subscription History</h3>
            <DropdownIcon />
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;

const EditableField = ({ label }: { label: string }) => {
  return (
    <div className="editable-field">
      <div className="input-header">
        <label>{label}</label>
        <EditIcon className="edit-icon" />
      </div>
      <div className="question"></div>
      <div className="answer"></div>
    </div>
  );
};
