import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormHelperText } from "@material-ui/core";
import validator from "validator";
import MaskedInput from "react-text-mask";

const ValidationSelectField = (props, ref) => {
  const valueDefault = props.value ? props.value : "";
  const [value, setValue] = useState(valueDefault);
  const [error, setError] = useState("");

  const inputRef = React.useRef();

  props.validate(() => validate_(value));

  function validate_(value) {

    let valid = true;
    if (props.notEmpty) {
    setError("");
    if (value == "") {
      setError("This field is required.");
      valid = false;
    }
    }
    return valid;
  }

  return (
    <>
      <Select
        error={error}
        style={error ? {border:"1px solid red"} : null}
        className={props.className}
        displayEmpty
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          validate_(event.target.value);
          props.onChange && props.onChange(event);
        }}
        renderValue={(selected) => {
          if (!selected || selected.length === 0) {
            return (
              <em style={{ color: "#b1b1b1",fontStyle:"normal" }}>
                {props.placeHolderValue}
              </em>
            );
          }

          return selected.text;
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {props.menuItems.map((ele) => {
          return <MenuItem value={ele}>{ele.text}</MenuItem>;
        })}
      </Select>
      {error && <FormHelperText style={{color:"red"}}>{error}</FormHelperText>}
    </>
  );
};

export default React.forwardRef(ValidationSelectField);
