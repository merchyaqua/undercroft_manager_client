import { Stack } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsForm } from "./PropsAddPage";
// import sampleProps from "./App"
const tryurl = "http://127.0.0.1:5000/";

import { Box, Button, Card, Typography } from "@mui/material";
import { fetchItems, submitData } from "./fetchItems";
import { fetchOptionsTree } from "./helpers";

const sampleProps = [
  {
    propname: "test",
    photopath: "http://localhost:3000/logo192.png",
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
export default function PropDetailsPage() {
  const [propItem, setPropItem] = useState(sampleProps[0]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const { propID } = useParams();
  function handleSaveDetails() {}
  // Fetching data for this prop
  useEffect(() => fetchItems("prop/" + propID, setPropItem), []);
  console.log(propID);

  return (
    // could have the image left half and details right half be a two split flex items or something
    <
      // sx={{ flexGrow: 1, width: `calc(100%-${100}px)`, ml: `${100}px` }}
    >
      <div sx={{ display: "block", width: "100%" }}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ float: "left" }}
        >
          ⬅️Back
        </Button>
        <Button variant="outlined" sx={{ float: "right" }}>
          ⭐Star
        </Button>
      </div>
      <Box sx={{ display: "grid" }}>
        <Box>
          <Box sx={{ display: "inline-block", width: "50%" }}>
            <img src={propItem.photopath} style={{ maxWidth: "100%" }} />
            <Button variant="contained" sx={{ width: "100%" }}>
              View use history
            </Button>
          </Box>
          {editing ? (
            <>
              <Button
                variant="outlined"
                color="warning"
                sx={{ width: "1px" }}
                onClick={() => setEditing(false)}
              >
                ❌
              </Button>
              <Button
                variant="contained"
                sx={{ width: "10px" }}
                onClick={handleSaveDetails}
              >
                Save
              </Button>
              <EditDetailsForm defaultFormData={propItem} />
            </>
          ) : (
            <>
              <Details propItem={propItem} />

              <Button
                variant="contained"
                sx={{ width: "10px" }}
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

function Details({ propItem }) {
  return (
    <Box sx={{ display: "inline-block", width: "300px" }}>
      <Card>
        <Typography variant="h2"> {propItem.propname}</Typography>
        {propItem.isbroken ? "Broken" : ""}
        <Typography>
          <b>Location:</b> {propItem.locationname}{" "}
        </Typography>
        <Typography>
          <b>Description:</b> {propItem.description}
        </Typography>
      </Card>
      <span>
        <LinkPropMenu />
      </span>
    </Box>
  );
}

function EditDetailsForm({ defaultFormData }) {
  const data = {
    name: defaultFormData.name,
    photoPath: defaultFormData.photopath,
    locationName: defaultFormData.locationname,
    locationID: defaultFormData.locationid,
    isBroken: defaultFormData.isbroken,
    propID: defaultFormData.propID,
    status: defaultFormData.status,
    description: defaultFormData.description,
  };
  // Since we are reusing existing data returned (meaning it has no capitalisation),
  // we must do manual mapping before giving to form, which records details with capitalisation.
  // It also need to request to the update route instead of the POST route.
  // And the default selected.
  return <DetailsForm defaultFormData={data} />;
}

function LinkPropMenu({ propID }) {
  const Prod_PropList_PropListItem = fetchOptionsTree()
  // const Prod_PropList_PropListItem = [
  //   {
  //     id: "grid",
  //     label: "Data Grid",
  //     children: [
  //       { id: "grid-community", label: "@mui/x-data-grid" },
  //       { id: "grid-pro", label: "@mui/x-data-grid-pro" },
  //       { id: "grid-premium", label: "@mui/x-data-grid-premium" },
  //     ],
  //   },
  //   {
  //     id: "pickers",
  //     label: "Date and Time Pickers",
  //     children: [
  //       { id: "pickers-community", label: "@mui/x-date-pickers" },
  //       { id: "pickers-pro", label: "@mui/x-date-pickers-pro" },
  //     ],
  //   },
  // ];

  const [selectedItem, setSelectedItem] = useState(null);

  function handleSelectedItemChange(event, id) {
    setSelectedItem(id);
  }
  function handleSubmitLink() {
    const res = submitData(`props-list-item/${selectedItem}/link`, {
      propID: selectedItem,
    });
  }
  return (
    <Stack spacing={2}>
      <Box sx={{ minHeight: 352, minWidth: 250 }}>
        {selectedItem} HELLO
        <RichTreeView
          items={Prod_PropList_PropListItem}
          selectedItems={selectedItem}
          onSelectedItemsChange={handleSelectedItemChange}
        />
        <Button onClick={handleSubmitLink}>Submit</Button>
      </Box>
    </Stack>
  );
}
