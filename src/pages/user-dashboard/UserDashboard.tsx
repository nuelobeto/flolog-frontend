import "./UserDashboard.scss";
import {
  AsteriskIcon,
  BackArrowIcon,
  CheckIcon,
  EditIcon,
  HistoryIcon,
  NotifiationIcon,
  SpinnerIcon,
  UserIcon,
  VerifiedIcon,
  WarningIcon,
} from "../../assets/icons";
import { DropdownIcon } from "./../../assets/icons";
import { useEffect, useRef, useState } from "react";
import useProfile from "../../store/useProfile";
import { formatStringDate } from "../../utils/dateConverter";
import Select from "./../../components/select/Select";
import { Button } from "../../components/button/Button";
import profileServices from "../../services/profileServices";
import useAuth from "../../store/useAuth";
import { toast } from "react-toastify";

const sexArray = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
const ageArray = [
  { value: "16 - 20", label: "16 - 20" },
  { value: "21 - 30", label: "21 - 30" },
  { value: "31 - 40", label: "31 - 40" },
  { value: "41 - 50", label: "41 - 50" },
  { value: "51 - 60", label: "51 - 60" },
  { value: "61 - 70", label: "61 - 70" },
  { value: "71 - 80", label: "71 - 80" },
  { value: "81 - 90", label: "81 - 90" },
  { value: "91 - 100", label: "91 - 100" },
];
const blood_group_array = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
];
const genotypeArray = [
  { value: "AA", label: "AA" },
  { value: "AS", label: "AS" },
  { value: "AC", label: "AC" },
  { value: "SS", label: "SS" },
  { value: "SC", label: "SC" },
];
const medHistoryArray = [
  "Stomach Ulcer",
  "Intestinal Surgery",
  "Brain Surgery",
  "Eye Surgery",
  "Pile (Haemorrhoid)",
  "Appendectomy",
];
const riskFactorsArray = [
  "Smoker",
  "Drinks alcohol",
  "Use Glasses",
  "Parent had hypertension",
  "Hypertension",
  "Overweight",
  "Air poution",
];
const allergiesArray = [
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
  const { token } = useAuth((state) => state);
  const {
    profile,
    getProfileLoading,
    userActivity,
    bioData,
    medicalHistory,
    riskFactors,
    allergies,
    uuid,
    getProfile,
  } = useProfile((state) => state);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const [openBioData, setOpenBioData] = useState(false);
  const [openMedHistory, setOpenMedHistory] = useState(false);
  const [openRiskFactors, setOpenRiskFactors] = useState(false);
  const [openAllergies, setOpenAllergies] = useState(false);
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [genotype, setGenotype] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [otherHistory, setOtherHistory] = useState("");
  const [risk_factors, setRisk_factors] = useState<any[]>([]);
  const [otherRiskFactors, setOtherRiskFactors] = useState("");
  const [allergy_status, setAllergy_status] = useState<any[]>([]);
  const [otherAllergies, setOtherAllergies] = useState("");

  const [loadingBioData, setLoadingBioData] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingRiskFactors, setLoadingRiskFactors] = useState(false);
  const [loadingAllergies, setLoadingAllergies] = useState(false);

  const [editProfile, setEditProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

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

  const updateProfile = async () => {
    const payload = {
      user: uuid,
      first_name: firstname,
      last_name: lastname,
      phone_number: mobile,
      email: profile.email,
    };

    if (token) {
      setSavingProfile(true);
      try {
        await profileServices.updateProfile(token, payload);
        setSavingProfile(false);
        toast.success("Profile Updated!");
        getProfile(token);
        setEditProfile(false);
      } catch (error) {
        setSavingProfile(false);
        console.log(error);
      }
    }
  };

  const updateBioData = async () => {
    const payload = {
      sex,
      age,
      weight,
      height,
      blood_group: bloodGroup,
      genotype,
    };

    if (token) {
      setLoadingBioData(true);
      try {
        await profileServices.updateBioData(token, payload);
        setLoadingBioData(false);
      } catch (error) {
        setLoadingBioData(false);
        console.log(error);
      }
    }
  };

  const updateMedicalHistory = async () => {
    const payload = {
      histories: history.join(", "),
      others: otherHistory,
    };

    if (token) {
      setLoadingHistory(true);
      try {
        await profileServices.updateMedicalHistory(token, payload);
        setLoadingHistory(false);
      } catch (error) {
        setLoadingHistory(false);
        console.log(error);
      }
    }
  };

  const updateRiskFactors = async () => {
    const payload = {
      risks: risk_factors.join(", "),
      others: otherRiskFactors,
    };

    if (token) {
      setLoadingRiskFactors(true);
      try {
        await profileServices.updateRiskFactors(token, payload);
        setLoadingRiskFactors(false);
      } catch (error) {
        setLoadingRiskFactors(false);
        console.log(error);
      }
    }
  };

  const updateAllergies = async () => {
    const payload = {
      allergies: allergy_status.join(", "),
      others: otherAllergies,
    };

    if (token) {
      setLoadingAllergies(true);
      try {
        await profileServices.updateAllergies(token, payload);
        setLoadingAllergies(false);
      } catch (error) {
        setLoadingAllergies(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (profile) {
      setFirstname(profile?.first_name);
      setLastname(profile?.last_name);
      setMobile(profile?.phone_number);
    }
  }, [profile]);

  useEffect(() => {
    if (bioData) {
      setSex(bioData.sex);
      setAge(bioData.age);
      setWeight(bioData.weight);
      setHeight(bioData.height);
      setBloodGroup(bioData.blood_group);
      setGenotype(bioData.genotype);
    }
  }, [bioData]);

  useEffect(() => {
    if (medicalHistory) {
      if (medicalHistory.histories) {
        setHistory(medicalHistory?.histories?.split(", "));
      }
      if (medicalHistory.others) {
        setOtherHistory(medicalHistory?.others);
      }
    }
  }, [medicalHistory]);

  useEffect(() => {
    if (riskFactors) {
      if (riskFactors.risks) {
        setRisk_factors(riskFactors?.risks?.split(", "));
      }
      if (riskFactors.others) {
        setOtherRiskFactors(riskFactors?.others);
      }
    }
  }, [riskFactors]);

  useEffect(() => {
    if (allergies) {
      if (allergies.allergies) {
        setAllergy_status(allergies?.allergies?.split(", "));
      }
      if (allergies.others) {
        setOtherAllergies(allergies?.others);
      }
    }
  }, [allergies]);

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
            <EditIcon onClick={() => setEditProfile(true)} />
          </div>
          {!getProfileLoading ? (
            <>
              <p className="name">
                {profile?.first_name} {profile?.last_name}
              </p>
              <p className="email">{profile?.email}</p>
              <p className="mobile">{profile?.phone_number}</p>
            </>
          ) : (
            <>
              <p className="name loading"></p>
              <p className="email loading"></p>
              <p className="mobile loading"></p>
            </>
          )}

          {editProfile && (
            <div className="edit-profile">
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

        <div className="premium">
          <span>Tokens:</span> <span>{profile?.coin}</span>
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
                <>
                  <div className="bio-data">
                    <div className="select-bio-data">
                      <label>Sex</label>
                      <Select
                        height="40px"
                        placeholder="Select"
                        value={sex}
                        setValue={setSex}
                        options={sexArray}
                      />
                    </div>
                    <div className="select-bio-data">
                      <label>Age</label>
                      <Select
                        height="40px"
                        placeholder="Select"
                        value={age}
                        setValue={setAge}
                        options={ageArray}
                      />
                    </div>
                    <div className="select-bio-data">
                      <label>Weight</label>
                      <input
                        type="text"
                        placeholder="Enter Kg"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                    <div className="select-bio-data">
                      <label>Height</label>
                      <input
                        type="text"
                        placeholder="Enter height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                    <div className="select-bio-data">
                      <label>Blood Group</label>
                      <Select
                        height="40px"
                        placeholder="Select"
                        value={bloodGroup}
                        setValue={setBloodGroup}
                        options={blood_group_array}
                      />
                    </div>
                    <div className="select-bio-data">
                      <label>Genotype</label>
                      <Select
                        height="40px"
                        placeholder="Select"
                        value={genotype}
                        setValue={setGenotype}
                        options={genotypeArray}
                      />
                    </div>
                  </div>
                  <Button
                    size={"md"}
                    color={"primary"}
                    variant={"filled"}
                    rounded={"md"}
                    onClick={updateBioData}
                  >
                    {!loadingBioData ? (
                      "Save"
                    ) : (
                      <SpinnerIcon className="spinner" />
                    )}
                  </Button>
                </>
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
              {openMedHistory && (
                <MedInfoSelection
                  options={medHistoryArray}
                  selected={history}
                  setSelected={setHistory}
                  others={otherHistory}
                  setOthers={setOtherHistory}
                  save={updateMedicalHistory}
                  loading={loadingHistory}
                />
              )}
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
              {openRiskFactors && (
                <MedInfoSelection
                  options={riskFactorsArray}
                  selected={risk_factors}
                  setSelected={setRisk_factors}
                  others={otherRiskFactors}
                  setOthers={setOtherRiskFactors}
                  save={updateRiskFactors}
                  loading={loadingRiskFactors}
                />
              )}
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
              {openAllergies && (
                <MedInfoSelection
                  options={allergiesArray}
                  selected={allergy_status}
                  setSelected={setAllergy_status}
                  others={otherAllergies}
                  setOthers={setOtherAllergies}
                  save={updateAllergies}
                  loading={loadingAllergies}
                />
              )}
            </div>
          </div>
        </div>

        {/* <div className="info">
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
        </div> */}

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

        {/* <div className="info">
          <div className="title">
            <h3>Subscription History</h3>
          </div>
        </div> */}
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

const MedInfoSelection = ({
  options,
  selected,
  setSelected,
  others,
  setOthers,
  save,
  loading,
}: {
  options: any[];
  selected: any[];
  setSelected: React.Dispatch<React.SetStateAction<any[]>>;
  others: string;
  setOthers: React.Dispatch<React.SetStateAction<string>>;
  save: () => void;
  loading: boolean;
}) => {
  const handleSelect = (option: string) => {
    if (selected.some((item) => item === option)) {
      setSelected(selected.filter((item) => item !== option));
      return;
    }
    setSelected([...selected, option]);
  };

  return (
    <>
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
          <input
            type="text"
            value={others}
            onChange={(e) => setOthers(e.target.value)}
          />
        </div>
      </div>

      <Button
        size={"md"}
        color={"primary"}
        variant={"filled"}
        rounded={"md"}
        onClick={save}
      >
        {!loading ? "Save" : <SpinnerIcon className="spinner" />}
      </Button>
    </>
  );
};

export default UserDashboard;
