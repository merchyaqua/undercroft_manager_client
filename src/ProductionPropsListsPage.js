
import { fetchItems } from "./fetchItems";
import DataTable from "./Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { List, ListItem, ListItemButton } from "@mui/material";
const tryurl = "127.0.0.0:5000";
    
export  function ProductionPropsListsPage() {
    const samplePropsLists = [
        {
            title: "Set",
            propsListID: 122,
          },{
            title: "Set",
            propsListID: 122,
          },
    ];
    const productionID = useParams()["production-id"];
    const [propsLists, setPropsLists] = useState(samplePropsLists);
    const navigate = useNavigate();
    useEffect(()=>fetchItems(`/production/${productionID}/props-list/`, setPropsLists), []);
    return (
      <>
        Rushing so I can beat the line, but what if all I want is conversation and
        time?
        <List>
          {samplePropsLists.map((propsListDetails) =>
            {const id = propsListDetails.propsListID
            return <Link to={"/props-list/"+id}>
              <ListItemButton key={id}>
                {propsListDetails.title}
              </ListItemButton>
            </Link>}
          )}
        </List>
      </>
    );
  }
  