import { Box, Button, List, ListItemButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchItems, handleFormSubmit } from "./fetchItems";

const samplePropsLists = [
  {
    title: "Set",
    propsListID: 122,
  },
  {
    title: "Set",
    propsListID: 122,
  },
];
export function ProductionPropsListsPage() {
  const productionID = useParams()["productionID"];
  const [productionTitle, setProductionTitle] = useState("");
  useEffect(
    () =>
      fetchItems(`production/${productionID}`, (p) =>
        setProductionTitle(p.title)
      ),
    []
  );

  const [propsLists, setPropsLists] = useState([]);
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  useEffect(
    () => fetchItems(`production/${productionID}/props-list`, setPropsLists),
    []
  );

  useEffect(() => console.log(propsLists), [propsLists]);
  return (
    <>
      <h2>Props Lists for {productionTitle}</h2>
      Rushing so I can beat the line, but what if all I want is conversation and
      time?
      <Button variant="outlined" onClick={() => setAdding(!adding)}>
        {!adding ? "+ Add new props list" : "- Close"}
      </Button>
      {adding && <PropsListForm productionID={productionID} />}
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

function PropsListForm({ productionID }) {
  const [formData, setFormData] = useState({
    // isCostumeList: false,
  });
  function handleChange(e) {
    // check im giving creds to this code
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
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
        onClick={(e) =>
          handleFormSubmit(e, `production/${productionID}/props-list`, formData)
        }
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  );
}
