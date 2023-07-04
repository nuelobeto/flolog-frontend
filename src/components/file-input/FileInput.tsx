import "./FileInput.scss";

type FileInputT = {
  image: any;
  text: string;
  file: null | any;
  setFile: React.Dispatch<React.SetStateAction<any>>;
};

const FileInput = ({ image, text, setFile, file }: FileInputT) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
  };

  return (
    <div className="file_input_wrapper">
      <label htmlFor="file">
        <span>{file ? file.name : text}</span>
        {image}
      </label>
      <input type="file" id="file" onChange={handleChange} />
    </div>
  );
};

export default FileInput;
