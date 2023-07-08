import React, { useState, useContext } from "react";

//STEP 4 for our redirects
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

//STEP 1 - import our custom HTTP hook
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { AuthContext } from "../../shared/context/auth-context";

const NewPlace = () => {
  //STEP 2 - lets use object destructoring
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  //STEP 5 - setup history object
  const history = useHistory();

  //STEP 3 - lets use of custom HTTP hook
  const placeSubmitHandler = async (event) => {
    console.log("hi!!");
    event.preventDefault();
    console.log(formState.inputs);

    try {
      const formData = new FormData();

      //2) value for identifer
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", auth.userId);
      formData.append(
        "location",
        JSON.stringify({
          lat: 39.709973,
          lng: -75.1213819,
        })
      );
      formData.append("image", formState.inputs.image.value);
      await sendRequest("http://localhost:3001/api/places", "POST", formData);

      //STEP 4
      //Note that we want to redirect user to another page when done
      //if we succeed then we redirect
      //need to IMPORT "userHistory" hook from React-Router-DOM
      //HISTORY object has a PUSH and a REPLACE methods
      //1) go to new page by push to add on a stack
      //2) replacing the current page
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <ImageUpload center id="image" onInput={inputHandler} />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
