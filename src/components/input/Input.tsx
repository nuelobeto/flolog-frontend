import "./Input.scss";

type InputProps = {
  label?: string;
  type: string;
  placeholder?: string;
  name: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  error?: any;
};

export const FormInput = (props: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="form-group">
      {props.label && <label>{props.label}</label>}
      <div className="input-container">
        {props.leftIcon && <button className="left">{props.leftIcon}</button>}
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={handleChange}
          className={`${props.leftIcon && "pl"}`}
        />
        {props.rightIcon && (
          <button className="right">{props.rightIcon}</button>
        )}
      </div>
      {props.error && <div className="input-error">{props.error[0]}</div>}
    </div>
  );
};
