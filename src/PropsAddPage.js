import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";
import {
  fetchItems,
  handleFormSubmit,
  submitData,
  uploadToImgur,
} from "./fetchItems";
import { checkFormRequiredFilled } from "./helpers";
import { sampleCategories } from "./testData";

export default function PropAddPage({}) {
  return (
    <>
      <Typography variant="h2">Add a prop!</Typography>
      <DetailsForm categoryItems={sampleCategories} />
    </>
  );
}

export function DetailsForm({
  defaultFormData = {
    isBroken: "off",
    name: "",
    description: "",
    photoPath: null,
  },
  addingProp,
  onEdited,
}) {
  // States to manage the form
  const requiredFields = ["name", "categoryID", "locationID"];
  const [formData, setFormData] = useState(defaultFormData);
  const [image, setImage] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const navigate = useNavigate();

  // On change of any of the form data, check all values exist
  useEffect(() => {
    // No submitting prop while adding a new location or category option.
    if (formData.locationID === "add" || formData.categoryID === "add") {
      setCanSubmit(false);
    } else {
      // Check required fields are filled. If so, you can submit.
      setCanSubmit(checkFormRequiredFilled(requiredFields, formData));
    }
  }, [formData]);

  // Set up location and category states for fetching
  const [locationOptions, setLocationOptions] = useState([
    { name: "Loading...", locationid: null },
  ]);
  const [categoryOptions, setCategoryOptions] = useState([
    { name: "Loading...", categoryid: null },
  ]);
  // Fetch options, append the add new option to the end.
  useEffect(() => {
    fetchItems("location", (o) => {
      setLocationOptions([...o, { name: "+ Add New", locationid: "add" }]);
    });
  }, []);
  useEffect(() => {
    fetchItems("category", (o) => {
      setCategoryOptions([...o, { name: "+ Add New", categoryid: "add" }]);
    });
  }, []);

  // Ensure that once there is a change - whether a fetch or and add, the default value is set to the first
  useEffect(
    () =>
      setFormData((values) => ({
        ...values,
        locationID: locationOptions[0].locationid,
      })),
    [locationOptions]
  );
  useEffect(() => {
    setFormData((values) => ({
      ...values,
      categoryID: categoryOptions[0].categoryid,
    }));
  }, [categoryOptions]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    // handle add new for location and category
    setFormData((values) => ({ ...values, [name]: value }));
  }
  async function handleSubmitProp(
    e,
    reload = false,
    redirect = false,
    addingProp = true
  ) {
    // Upload photo if exists, then submit form data with the photo URL.
    let photoPath = null;
    if (image) {
      // Directly upload to imgur and get a link.
      console.log("Uploading to imgur");
      photoPath = await uploadToImgur(image, "idk", formData.name);
    }
    let receivedData = null;
    console.log(addingProp);
    if (!addingProp) {
      console.log("hdejd");
      receivedData = await submitData(
        "prop/" + formData.propID,
        photoPath
          ? {
              ...formData,
              photoPath: photoPath,
            }
          : formData,
        "PUT"
      );
    } else {
      receivedData = await handleFormSubmit(e, "prop", {
        ...formData,
        photoPath: photoPath,
      });
      console.log(receivedData);
    }

    if (reload) {
      setFormData({});
    } else if (redirect) {
      if (onEdited) onEdited();
      console.log(formData.propID, receivedData.propid);
      navigate("/prop/" + receivedData.propid || formData.propID);
    }
  }
  return (
    <Box sx={{ display: "inline-block" }}>
      <form>
        <FormGroup>
          <FileUpload setFile={setImage} />
          <TextField
            name="name"
            label="Prop name"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="warning"
                value={formData.isBroken || "off"}
                onChange={handleChange}
              />
            }
            label="Broken"
            name="isBroken"
          />
          <DropdownMenu
            label="Location"
            name="locationID"
            fetchResource="location"
            value={formData.locationID}
            options={locationOptions}
            setOptions={setLocationOptions}
            setValue={(val) => setFormData({ ...formData, locationID: val })}
            onChange={handleChange}
          />
          <DropdownMenu
            label={"Category"}
            name="categoryID"
            value={formData.categoryID}
            options={categoryOptions}
            setOptions={setCategoryOptions}
            setValue={(val) => setFormData({ ...formData, categoryID: val })}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            value={formData.description || ""}
            onChange={handleChange}
            name="description"
          />
        </FormGroup>
        <PropDetailsButtonGroup
          canSubmit={canSubmit}
          handleSubmitProp={handleSubmitProp}
          addingProp={addingProp}
        />
      </form>
    </Box>
  );
}

function DropdownMenu({
  label,
  name,
  onChange,
  value,
  setValue,
  options,
  setOptions,
}) {
  const isAddingNew = value === "add";

  return (
    <>
      {isAddingNew && (
        <DropdownAddNewForm
          label={label}
          items={options}
          setItems={setOptions}
          setValue={setValue}
        />
      )}
      <InputLabel
        variant="standard"
        htmlFor="uncontrolled-native"
        key={"label"}
      >
        {label}
      </InputLabel>
      <NativeSelect
        onChange={onChange}
        key={label}
        value={value}
        inputProps={{
          name: name,
          id: "uncontrolled-native",
        }}
      >
        {[...options].map((item) => {
          const id = item.categoryid || item.locationid;
          return (
            <option value={id} key={id}>
              {item.name}
            </option>
          );
        })}
      </NativeSelect>
    </>
  );
}

function DropdownAddNewForm({
  label,
  handleAddNew,
  items,
  setItems,
  setValue,
}) {
  const [name, setName] = useState("");
  async function handleAddNew() {
    async function handleSubmitDropdown() {
      // sends data, gets id as a response
      const data = await submitData(label.toLowerCase(), { name: name });
      console.log(data);
      return data;
    }
    const id = await handleSubmitDropdown();
    // make a request to the database to add it,
    // test without fetch assigning arbitrary id: const data = {locationid: 3}
    // get the ID to retrieve the new list of categories/locations
    const newItem = { name: name, [label.toLowerCase() + "id"]: id };
    console.log(newItem);
    // Make sure that the selected value in the dropdown is what had been just entered.
    setItems([newItem, ...items]);
    setValue(name);
  }
  return (
    <Box centered display="inline-flex">
      <TextField
        label={"New " + label + "name:"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleAddNew}>Submit</Button>
    </Box>
  );
}

function PropDetailsButtonGroup({
  canSubmit,
  handleSubmitProp,
  addingProp = true,
}) {
  return (
    <>
      {addingProp && (
        <span>
          {/* All buttons will submit the data to the server. The third one resets the whole page. The second one will simply submit the data and do nothing.*/}

          <Button
            disabled={!canSubmit}
            onClick={(e) => handleSubmitProp(e, false, true)}
          >
            Add and view
          </Button>
          <Button
            disabled={!canSubmit}
            onClick={(e) => handleSubmitProp(e, false)}
            variant="contained"
          >
            Keep adding but persist details
          </Button>
          <Button
            disabled={!canSubmit}
            onClick={(e) => handleSubmitProp(e, true)}
            variant="contained"
          >
            Keep adding without saving details
          </Button>
        </span>
      )}
      {!addingProp && (
        <Button
          onClick={(e) =>
            handleSubmitProp(e, false, true, (addingProp = false))
          }
        >
          Save edit
        </Button>
      )}
    </>
  );
}
