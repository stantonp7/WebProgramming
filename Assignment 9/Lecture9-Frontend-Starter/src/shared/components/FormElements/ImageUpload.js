import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";

import Button from "./Button";

const ImageUpload = (props) => {
  //create on click to open image picker
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(true);

  //useEffect to update previewUrl
  useEffect(() => {
    if (!file) {
      return;
    }
    //create file reader
    const fileReader = new FileReader();
    //when fileReader is done loading
    fileReader.onload = () => {
      //set previewUrl to result of fileReader
      setPreviewUrl(fileReader.result);
    };
    //read file as data url
    fileReader.readAsDataURL(file);
  }, [file]);

  //function to pick file
  const pickedHandler = (event) => {
    //check if event has files
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      //set pickedFile to first file
      pickedFile = event.target.files[0];
      //setFile to pickedFile
      setFile(pickedFile);
      //setIsValid to true
      setIsValid(true);
      //set fileIsValid to true
      fileIsValid = true;
    } else {
      //setIsValid to false
      setIsValid(false);
      //set fileIsValid to false
      fileIsValid = false;
    }
    //call props.onInput with props.id and pickedFile and fileIsValid
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  //function to open file picker
  const pickImageHandler = () => {
    //click filePickerRef
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>Error has ocurred</p>}
    </div>
  );
};

export default ImageUpload;
