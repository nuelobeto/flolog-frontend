import { useState } from "react";
import {
  AddIcon,
  BackArrowIcon,
  CloseIcon,
  FileIcon,
  RightArrow,
  SpinnerIcon,
} from "../../assets/icons";
import { Button } from "../../components/button/Button";
import FileInput from "../../components/file-input/FileInput";
import Select from "../../components/select/Select";
import "./RequestMedication.scss";
import medicationServices from "./../../services/medicationServices";
import useAuth from "../../store/useAuth";
import useProfile from "./../../store/useProfile";

type UploadPrescriptionProps = {
  next?: () => void;
  back?: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  file: null | any;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  dosageForm: string;
  setDosageForm: React.Dispatch<React.SetStateAction<string>>;
  prescriptions: any[];
  setPrescriptions: React.Dispatch<React.SetStateAction<any[]>>;
};

type AddAddressProps = {
  next?: () => void;
  back?: () => void;
  file: null | any;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  prescriptions: any[];
};

const UploadPrescription = ({
  next,
  formData,
  setFormData,
  dosageForm,
  setDosageForm,
  prescriptions,
  setPrescriptions,
  file,
  setFile,
}: UploadPrescriptionProps) => {
  const addPrescription = () => {
    const payload = {
      generic_name: formData.generic_name,
      brand_name: formData.brand_name,
      dosage_form: dosageForm.toUpperCase(),
      dosage_strength: formData.dosage_strength,
      extra_info: formData.quantity,
    };
    setPrescriptions([...prescriptions, payload]);
  };

  const removePrescription = (name: string) => {
    setPrescriptions(
      prescriptions.filter((item) => item.generic_name !== name)
    );
  };

  return (
    <div className="screen">
      <h1>Place Request</h1>

      <div className="upload-prescription">
        <div>
          <FileInput
            image={<FileIcon style={{ fontSize: "30px" }} />}
            text={"Select file"}
            setFile={setFile}
            file={file}
          />
        </div>

        <Button
          size={"md"}
          color={"primary"}
          variant={"filled"}
          rounded={"md"}
          style={{ background: "#2E83B5", border: "1px solid #2E83B5" }}
          onClick={next}
        >
          Upload Prescription
        </Button>
      </div>

      <div className="or">OR</div>

      <p className="subtitle">
        Please fill with the information on your prescription.
      </p>

      {prescriptions?.length !== 0 && (
        <div className="prescriptions">
          {prescriptions.map((item, index) => (
            <div className="prescription-wrapper" key={index}>
              <div className="prescription">
                {item.generic_name} - {item.brand_name} - {item.dosage_form}
              </div>
              <CloseIcon
                onClick={() => removePrescription(item.generic_name)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="form">
        <FormGroup
          label={"Generic Name"}
          type={"text"}
          placeholder={"e.g Paracetamol"}
          name={"generic_name"}
          value={formData.generic_name}
          setValue={setFormData}
        />

        <FormGroup
          label={"Brand Name"}
          type={"text"}
          placeholder={"e.g Emzor"}
          name={"brand_name"}
          value={formData.brand_name}
          setValue={setFormData}
        />

        <div className="request-medication-form-group">
          <label>
            Dosage Form <span>*</span>
          </label>
          <Select
            height={"50px"}
            placeholder={"Select"}
            value={dosageForm}
            setValue={setDosageForm}
            options={[{ label: "Tablets", value: "Tablet" }]}
          />
        </div>

        <FormGroup
          label={"Dose/Strength"}
          type={"text"}
          placeholder={"e.g 100mg"}
          name={"dosage_strength"}
          value={formData.dosage_strength}
          setValue={setFormData}
        />

        <FormGroup
          label={"Quantity"}
          type={"text"}
          placeholder={"e.g 1 satchet"}
          name={"quantity"}
          value={formData.quantity}
          setValue={setFormData}
        />

        <textarea placeholder="Add comments or extra details here"></textarea>

        <Button
          size={"md"}
          color={"white"}
          variant={"filled"}
          leftIcon={<AddIcon style={{ fontSize: "30px" }} />}
          style={{ gap: "0.5rem" }}
          onClick={addPrescription}
        >
          Add
        </Button>
      </div>

      <Button
        size={"md"}
        color={"primary"}
        variant={"filled"}
        rounded={"md"}
        rightIcon={<RightArrow style={{ fontSize: "30px" }} />}
        style={{ margin: "4rem auto 1rem" }}
        onClick={next}
      >
        NEXT
      </Button>
    </div>
  );
};

const AddAddress = ({
  next,
  back,
  formData,
  setFormData,
  state,
  setState,
  file,
  prescriptions,
}: AddAddressProps) => {
  const { token } = useAuth((state) => state);
  const { uuid } = useProfile((state) => state);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [showWhatsappLink, setShowWhatsappLink] = useState(false);

  const handleRequestMedication = async () => {
    const payload = {
      owner: uuid,
      upload_prescription: file,
      medication_details: prescriptions,
      recipent_name: formData.name,
      recipent_phone_number: formData.number,
      recipent_address: formData.address,
      state,
      city: formData.city,
    };

    if (token) {
      setLoadingRequest(true);
      try {
        await medicationServices.requestMedication(token, payload);
        console.log("request sent");
        setLoadingRequest(false);
        setOpenConfirmation(false);
        setShowWhatsappLink(true);
      } catch (error) {
        setLoadingRequest(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="screen">
        <div className="header" onClick={back}>
          <BackArrowIcon /> <span>Back</span>
        </div>

        <h1>Delivery Details</h1>

        <p className="subtitle">
          Please fill in information on your delivery destination with much
          detail as possible
        </p>

        <div className="address-form">
          <FormGroup
            label={"Recipents Phone Number"}
            type={"text"}
            placeholder={"Phone Number"}
            name={"number"}
            value={formData.number}
            setValue={setFormData}
          />

          <FormGroup
            label={"Recipients Full Name"}
            type={"text"}
            placeholder={"Full Name"}
            name={"name"}
            value={formData.name}
            setValue={setFormData}
          />

          <FormGroup
            label={"Recipient’s Address"}
            type={"text"}
            placeholder={"Recipient’s Address"}
            name={"address"}
            value={formData.address}
            setValue={setFormData}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "1rem",
            }}
          >
            <div className="request-medication-form-group">
              <label>
                State <span>*</span>
              </label>
              <Select
                height={"50px"}
                placeholder={"Select"}
                value={state}
                setValue={setState}
                options={[{ label: "Edo State", value: "Edo State" }]}
              />
            </div>

            <FormGroup
              label={"City/Town"}
              type={"text"}
              placeholder={"City"}
              name={"city"}
              value={formData.city}
              setValue={setFormData}
            />
          </div>
        </div>

        <Button
          size={"md"}
          color={"primary"}
          variant={"filled"}
          rounded={"md"}
          rightIcon={<RightArrow style={{ fontSize: "30px" }} />}
          style={{
            margin: "4rem auto 1rem",
            background: "#02DA7F",
            border: "1px solid #02DA7F",
          }}
          onClick={() => setOpenConfirmation(true)}
        >
          NEXT
        </Button>
      </div>

      {openConfirmation && (
        <div className="modal-wrapper confirm-request">
          <div className="modal confirm-request-modal">
            <p>
              Click “YES’ to confirm request and continue to Flolog’s whatsapp
              Admin
            </p>
            <div>
              <Button
                size={"sm"}
                color={"primary"}
                variant={"filled"}
                rounded={"md"}
                style={{ background: "#F22B0C", border: "1px solid #F22B0C" }}
                onClick={() => setOpenConfirmation(false)}
              >
                No
              </Button>
              <Button
                size={"sm"}
                color={"primary"}
                variant={"filled"}
                rounded={"md"}
                onClick={handleRequestMedication}
              >
                {!loadingRequest ? "Yes" : <SpinnerIcon className="spinner" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showWhatsappLink && (
        <div className="modal-wrapper confirm-request">
          <div className="modal confirm-request-modal">
            <CloseIcon
              className="close-modal"
              onClick={() => setShowWhatsappLink(false)}
            />
            <p>WhatsApp Link</p>
          </div>
        </div>
      )}
    </>
  );
};

const RequestMedication = () => {
  const [file, setFile] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    generic_name: "",
    brand_name: "",
    dosage_strength: "",
    quantity: "",
    comments: "",
    number: "",
    name: "",
    address: "",
    city: "",
  });
  const [dosageForm, setDosageForm] = useState("");
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [state, setState] = useState("");
  const [screen, setScreen] = useState(1);

  const next = () => {
    setScreen(screen + 1);
  };

  const back = () => {
    if (screen === 1) {
      return;
    }
    setScreen(screen - 1);
  };

  return (
    <>
      <main className="request-medication main">
        {screen === 1 && (
          <UploadPrescription
            next={next}
            formData={formData}
            setFormData={setFormData}
            dosageForm={dosageForm}
            setDosageForm={setDosageForm}
            prescriptions={prescriptions}
            setPrescriptions={setPrescriptions}
            file={file}
            setFile={setFile}
          />
        )}
        {screen === 2 && (
          <AddAddress
            next={next}
            back={back}
            formData={formData}
            setFormData={setFormData}
            state={state}
            setState={setState}
            file={file}
            prescriptions={prescriptions}
          />
        )}
      </main>
    </>
  );
};

const FormGroup = ({
  label,
  type,
  placeholder,
  name,
  value,
  setValue,
}: {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="request-medication-form-group">
      <label>
        {label} <span>*</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default RequestMedication;
