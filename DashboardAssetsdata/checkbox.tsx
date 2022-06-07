import React from "react";

interface Props {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox = (props: Props) => {
  return (
    <div className="chb">
      <input
        type="checkbox"
        id={props.label}
        className="sch1"
        checked={props.isChecked}
        onChange={props.handleChange}
      />
      <label className="sch2" htmlFor={props.label}>
        {props.label}
      </label>
    </div>
  );
};
export default Checkbox;
