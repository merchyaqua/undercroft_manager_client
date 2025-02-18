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
import { fetchItems } from "./fetchItems";
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

      <Box></Box>
      <Details categoryItems={sampleCategories} />
    </>
  );
}

function Details() {
  const [formData, setFormData] = useState({});
  // Fetch a list of locations and categories as options
  const [locationItems, setLocationItems] = useState(sampleLocations);
  const [categoryItems, setCategoryItems] = useState(sampleCategories);
  // A general function to fetch results to avoid code repetition.

  useEffect(() => fetchItems("location", setLocationItems), []);
  useEffect(() => fetchItems("category", setCategoryItems), []);
  // instead of using the fetched results, we want the most up-to-date categories.
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  }
  function handleSubmit(e, noReload) {
    console.log("ere");
    console.log(JSON.stringify(formData));
    async function submitData() {
      const res = await fetch(tryurl + "prop", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data.propID);
      redirect("prop/" + data.propID);
    }
    submitData();
    if (!noReload) {
      setFormData({});
    } // Don't reload when save details
  }

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
                value={formData.isBroken}
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
            options={locationItems}
            value={formData.locationID}
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
            options={categoryItems}
            value={formData.categoryID}
            onChange={handleChange}
          />
        </FormGroup>
        <span>
          {/* All buttons will submit the data to the server. The third one resets the whole page. The second one will simply submit the data and do nothing.*/}
          <Button onClick={(e) => handleSubmit(e, true)} variant="contained">
            Keep adding but save details for next add
          </Button>
          <Button onClick={(e) => handleSubmit(e, false)} variant="contained">
            Keep adding without saving details for next add
          </Button>
        </span>
      </form>
    </Box>
  );
}

function DropdownMenu({ label, name, options, onChange, value }) {
  function handleAddNew() {
    // an optional function
    // make a request to the database to add it,
    // get the ID to retrieve the new list of categories
    // Make sure that the selected value in the dropdown is what had been just entered.
  }
  return (
    <>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {label}
      </InputLabel>
      <NativeSelect
        onChange={onChange}
        defaultValue={options[0].categoryid || options[0].locationid}
        value={value}
        inputProps={{
          name: name,
          id: "uncontrolled-native",
        }}
      >
        {/* uh oh the attributes - might have to end up returning categoryid as just id when being requested on its own */}
        {options.map((categoryItem) => {
          const id = categoryItem.categoryid || categoryItem.locationid;
          return (
            <option value={id} key={id}>
              {categoryItem.name}
            </option>
          );
        })}
        <option onClick={handleAddNew}>+ Add new...</option>
      </NativeSelect>
    </>
  );
}
