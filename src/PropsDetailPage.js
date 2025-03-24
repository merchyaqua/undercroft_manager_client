import { Stack } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsForm } from "./PropsAddPage";
import { sampleProps } from "./testData";

import { Box, Button, Card, Typography } from "@mui/material";
import { fetchItems, submitData } from "./fetchItems";
import { fetchOptionsTree } from "./helpers";
import DeleteButton from "./DeleteButton";

export default function PropDetailsPage() {
  const [propItem, setPropItem] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const { propID } = useParams();
  function handleSaveDetails() {
    sub
  }
  // Fetching data for this prop
  useEffect(() => fetchItems("prop/" + propID, setPropItem), []);
  console.log(propID);

  return (
    !propItem ? "Not found" :
    <>
      <div sx={{ display: "block", width: "100%" }}>
        <Box sx={{ float: "right" }}>

        <Button variant="outlined">
          ⭐Star
        </Button>
        <DeleteButton resource={'prop/'+propID} navigate={navigate}>Delete prop</DeleteButton>
        </Box>
      </div>
      <Box sx={{ display: "grid", marginLeft: "10px"}}>
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
          <b>Category:</b> {propItem.categoryid}{" "}
        </Typography>
        <Typography>
          <b>Description:</b> {propItem.description}
        </Typography>
      </Card>
      <span>
        {propItem.available}
        {
          propItem.available === "In use" ?
          "In use" : <LinkPropMenu propID={propItem.propid} /> 

        }
      </span>
    </Box>
  );
}

function EditDetailsForm({ defaultFormData }) {
  const data = {
    name: defaultFormData.propname,
    photoPath: defaultFormData.photopath,
    locationName: defaultFormData.locationname,
    locationID: defaultFormData.locationid,
    isBroken: defaultFormData.isbroken,
    propID: defaultFormData.propid,
    status: defaultFormData.status,
    description: defaultFormData.description,
  };
  // Since we are reusing existing data returned (meaning it has no capitalisation),
  // we must do manual mapping before giving to form, which records details with capitalisation.
  // It also need to request to the update route instead of the POST route.
  // And the default selected.
  return <DetailsForm defaultFormData={data} adding={false}/>;
}

function LinkPropMenu({ propID }) {
  const [optionsTree, setOptionsTree] = useState([]);
  useEffect(() => {
    async function fetchOp() {
      const data = await fetchOptionsTree();
      setOptionsTree(data);
    }
    fetchOp();
  }, []);
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
  // Valid number means a propsListItem is selected and can be submitted to link
  const canSubmit = !isNaN(selectedItem) && selectedItem ;

  function handleSelectedItemChange(event, id) {
    setSelectedItem(id);
  }
  function handleSubmitLink() {
    console.log(propID)
    const res = submitData(`props-list-item/${selectedItem}/link`, {
      propID: propID,
    }, "PUT");
  }
  return (
    <Stack spacing={2}>
      <Box sx={{ minHeight: 352, minWidth: 250 }}>
        {/* {Number(selectedItem)} {canSubmit && "Hi"} */}
        <RichTreeView
          items={optionsTree}
          selectedItems={selectedItem}
          onSelectedItemsChange={handleSelectedItemChange}
        />
        <Button disabled={!canSubmit} onClick={handleSubmitLink}>Link</Button>
      </Box>
    </Stack>
  );
}
