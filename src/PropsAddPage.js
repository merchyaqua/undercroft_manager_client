import { useEffect, useState } from "react";
// import sampleProps from "./App"
import {
  FormControl,
  InputLabel,
  Input,
  Checkbox,
  FormHelperText,
  Box,
  Divider,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  Autocomplete,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  FormGroup,
  FormControlLabel,
  ToggleButton,
  NativeSelect,
} from "@mui/material";
import { redirect } from "react-router-dom";
import { fetchItems, handleFormSubmit, submitData } from "./fetchItems";
import { checkFormRequiredFilled } from "./helpers";
const tryurl = "http://127.0.0.1:5000/";

const sampleProps = [
  {
    name: "test",
    photopath: `logo192.png`,
    locationname: "locname",
    locationid: "loc",
    isbroken: "false",
    propid: "id",
    status: "status",
    description: "testdesc",
  },
];
const sampleCategories = [
  {
    name: "testCategory",
    categoryid: 123,
  },
  {
    name: "testCategory2",
    categoryid: 124,
  },
];
const sampleLocations = [{ name: "Undercroft", locationID: 1 }];

export default function PropAddPage({}) {
  return (
    // could have the image left half and details right half be a two split flex items or something
    <
      // sx={{ flexGrow: 1, width: `calc(100%-${100}px)`, ml: `${100}px` }}
    >
      <Typography variant="h2">Add a prop!</Typography>

      <Details categoryItems={sampleCategories} />
    </>
  );
}

function Details() {
  const defaultFormData = { isBroken: "off", name: "", description: "" };
  const requiredFields = ["name", "categoryID", "locationID"];
  const [formData, setFormData] = useState(defaultFormData);
  const [canSubmit, setCanSubmit] = useState(false);
  // check all values exist
  useEffect(() => {
    // No submitting while adding
    if (formData.locationID === "add" || formData.categoryID === "add") {
      setCanSubmit(false);
    } else{
      setCanSubmit(checkFormRequiredFilled(requiredFields, formData))
    }
    
  }, [formData]);
  // Fetch a list of locations and categories as options

  // instead of using the fetched results, we want the most up-to-date categories.
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    // handle add new for location and category
    setFormData((values) => ({ ...values, [name]: value }));
  }
  function handleSubmit(e, noReload) {
    const receivedData = handleFormSubmit(e, "prop", formData);
    if (!noReload) {
      setFormData({});
    } // Don't reload when save details
  }

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

  return (
    // https://stackoverflow.com/questions/65531477/how-to-post-form-data-using-material-ui-into-api
    <Box sx={{ display: "inline-block" }}>
      <form>
        <FormGroup>
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
            // UGHHHH
          />
          {/* <ToggleButton value={false}> dafsa</ToggleButton> */}
          {/* location needs to be a dropdown too */}
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

          <TextField
            label="Description"
            value={formData.description || ""}
            onChange={handleChange}
            name="description"
          />
          {/* Dropdown menu for categories */}
          <DropdownMenu
            label={"Category"}
            name="categoryID"
            value={formData.categoryID}
            options={categoryOptions}
            setOptions={setCategoryOptions}
            setValue={(val) => setFormData({ ...formData, categoryID: val })}
            onChange={handleChange}
          />
        </FormGroup>
        <span>
          {/* All buttons will submit the data to the server. The third one resets the whole page. The second one will simply submit the data and do nothing.*/}
          <Button
            disabled={!canSubmit}
            onClick={(e) => handleSubmit(e, true)}
            variant="contained"
          >
            Keep adding but save details for next add
          </Button>
          <Button
            disabled={!canSubmit}
            onClick={(e) => handleSubmit(e, false)}
            variant="contained"
          >
            Keep adding without saving details for next add
          </Button>
        </span>
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
        {/* uh oh the attributes - might have to end up returning categoryid as just id when being requested on its own */}
        {[...options].map((item) => {
          const id = item.categoryid || item.locationid;
          return (
            <>
              <option value={id} key={id}>
                {item.name}
              </option>
            </>
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
    async function handleSubmit() {
      // sends data, gets id as a response
      const data = await submitData(null, label.toLowerCase(), { name: name });
      console.log(data);
      return data;
    }
    const id = await handleSubmit();
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
