import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import { fetchItems } from "./fetchItems";
import DataTable from "./Table";

export function PropsListPage() {
  const [propsListContent, setPropsListContent] = useState({
    productionTitle: "Play",
    productionID: null,
    propsListTitle: "Props",
    propsListItems: [],
  });

  const propsListID = useParams()["propsListID"];
  const [submitted, setSubmitted] = useState(true);

  // Load propslistitems on first load of page, then whenever submitted is changed, reloads again.
  useEffect(() => {
    fetchItems("props-list/" + propsListID, setPropsListContent);
  }, [submitted]);
  // With submitted in the dependency list, data is completely re-fetched once something gets submitted,
  // changing the submitted state - be it a new item, an edit, a toggle done, or a delete.

  return (
    <>
      <DeleteButton
        resource={"props-list/" + propsListID}
        setSubmitted={() => {
          // Redirect to production page after delete
          const navigate = useNavigate();
          navigate("production/" + productionID + "/props-lists");
        }}
      >
        Delete props list
      </DeleteButton>
      <DataTable
        title={
          propsListContent.propsListTitle +
          " for " +
          propsListContent.productionTitle
        }
        data={propsListContent.propsListItems}
        setSubmitted={setSubmitted}
        propsListID={propsListID}
      />
    </>
  );
}
