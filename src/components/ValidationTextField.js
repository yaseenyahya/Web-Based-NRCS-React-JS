import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import validator from "validator";
import MaskedInput from "react-text-mask";
import clsx from "clsx";
const ValidationTextField = (props, ref) => {
  const valueDefault = props.value ? props.value : "";
  const [value, setValue] = useState(valueDefault);
  const [error, setError] = useState("");

  const inputRef = React.useRef();

  props.validate(() => validate_(value));

  useEffect(() => {
    var timeout = null;
    props.focus &&
      props.focus(() => {
        timeout = setTimeout(() => {
          inputRef.current.focus();
        }, 1000);
      });
    return () => {
      props.focus && clearTimeout(timeout);
    };
  }, []);

  function validate_(value) {
    let valid = true;
    if (props.notEmpty) {
      if (props.mask) {
        value = value
          .replace(/\*/g, "")
          .replace(/\(/g, "")
          .replace(/\)/g, "")
          .replace(/-/g, "")
          .replace(/ /g, "");
      }

      if (value.length < props.minValue) {
        setError(props.minValueErrorText);
        valid = false;
      }
      if (value === "") {
        setError("This field is required.");
        valid = false;
      }
      if (valid) {
        setError("");
      }
    }

    if (props.Email) {
      if (!validator.isEmail(value)) {
        setError("Invalid email address.");
      }
    }
    return valid;
  }

  function onInput(e) {
    setValue(e.target.value);
    validate_(e.target.value);
    props.onInput && props.onInput(e);
  }

  return (
    <TextField
      ref={ref}
      inputRef={inputRef}
      {...props}
     
      onInput={onInput}
      error={error != ""}
      helperText={error}
      autoComplete={"off"}
      InputProps={{
        inputComponent: props.mask ? TextMaskCustom : undefined,
        inputProps: { mask: props.mask },
        classes: {
          ...props.InputProps.classes,
          root: clsx({ [props.onErrorInputRootClass]: error,[props.InputProps.classes.root]: !error }),
        },
        
      }}
    />
  );
};
const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      onError={() => {}}
      mask={props.mask}
      placeholderChar={"*"}
      autoComplete={"off"}
      placeholder=""
    />
  );
};
export default React.forwardRef(ValidationTextField);
