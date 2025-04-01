import { Box, Button, List, ListItemButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import { fetchItems, handleFormSubmit } from "./fetchItems";

export function ProductionPropsListsPage() {
  // Extract productionID from URL
  const productionID = useParams()["productionID"];
  // Retrieve the name of the production once
  const [productionTitle, setProductionTitle] = useState("");
  useEffect(
    () => fetchItems(`production/${productionID}`, (p) =>
        setProductionTitle(p.title)
      ),
    []
  );
  const [propsLists, setPropsLists] = useState([]);
  const [adding, setAdding] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Retrieve the names and IDs of prop lists belonging to this production
  useEffect(() => fetchItems(`production/${productionID}/props-list`, setPropsLists),
    [submitted]
  );
  return (
    <>
      <h2>Props Lists for {productionTitle}</h2>
      {/* Toggle the props list adding form */}
      <Button variant="outlined" onClick={() => setAdding(!adding)}>
        {!adding ? "+ Add new props list" : "- Close"}
      </Button>
      {adding && (
        <PropsListForm
          productionID={productionID}
          onSubmit={() => {
            setSubmitted(true);
            setAdding(false);
          }}
        />
      )}
      {/* Display a list of props lists */}
      <DeleteButton resource={"production/" + productionID}>
        Delete production{" "}
      </DeleteButton>
      <List>
        {propsLists.map((propsListDetails) => {
          const id = propsListDetails.propslistid;
          return (
            <Link to={"/props-list/" + id}>
              <ListItemButton key={id}>
                {propsListDetails.propslisttitle}
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </>
  );
}

function PropsListForm({ productionID, onSubmit }) {
  const [formData, setFormData] = useState({
    // isCostumeList: false,
  });
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  }
  function handleSubmitPropsList(e){
      handleFormSubmit(
        e,
        `production/${productionID}/props-list`,
        formData
      );
      onSubmit();
      // console.log("workign");
  }
  return (
    <Box centered display="inline-flex">
      <TextField
        name="title"
        label="Props List Title"
        value={formData.title || ""}
        required
        onChange={(e) => handleChange(e)}
      />
      <Button
        onClick={handleSubmitPropsList}
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  );
}
