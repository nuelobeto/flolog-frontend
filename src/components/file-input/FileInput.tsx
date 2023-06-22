import "./FileInput.scss";

type FileInputT = {
  image: any;
  text: string;
  setFile: React.Dispatch<React.SetStateAction<any>>;
};

const FileInput = ({ image, text, setFile }: FileInputT) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
  };

  return (
    <div className="file_input_wrapper">
      <label htmlFor="file">
        <span>{text}</span>
        {image}
      </label>
      <input type="file" id="file" onChange={handleChange} />
    </div>
  );
};

export default FileInput;
