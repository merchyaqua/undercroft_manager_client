import { fetchItemsReturnData } from "./fetchItems";

// Loop through the form to check that all required entries are filled
export function checkFormRequiredFilled(requiredFields, formData) {
  for (const field of requiredFields) {
    if (formData[field] === null || formData[field] === "") {
      return false;
    }
  }
  return true;
}

// Generating Options by fetching
export function fetchOptionsTree() {
  // Post-order traversal
  const order = [
    {
      getResource: () => "base",
      idName: "baseID",
      getChildrenData: (data) => data,
    },
    {
      getResource: () => "production",
      idName: "productionid",
      getChildrenData: (data) => data,
    },
    {
      getResource: (productionID) => `production/${productionID}/props-list`,
      idName: "propslistid",
      getChildrenData: (data) => data,
    },
    {
      getResource: (propsListID) => "props-list/" + propsListID,
      idName: "propslistitemid",
      getChildrenData: (data) => data.propsListItems,
    },
  ];
  async function getChildren(dataItem, orderIndex) {
    console.log("call");
    // Return when reached bottom of hierarchy - leaf node.
    if (orderIndex == order.length - 1) {
      console.log("end");
      return dataItem["propsListItems"];
    }
    let childNodes = [];
    const idName = order[orderIndex].idName;
    const itemID = dataItem[idName];
    // When the node is not a propsListItem, the ID should not be valid for the linking. This will be how the form rejects item being selected. It's weird using MUI so potentially using custom List tree would work.
    let node = {
      id: (dataItem.name || dataItem.title) + itemID,
      label: dataItem.name || dataItem.title,
    };
    // Get the children data: get the URL to fetch the next level down for this parent item
    let resource = order[orderIndex + 1].getResource(itemID);
    console.log(resource);
    // Carry out the fetch
    const childrenResults = await fetchItemsReturnData(resource);
    const childrenDataList =
      order[orderIndex + 1].getChildrenData(childrenResults);
    for (const childDataItem of childrenDataList) {
      // Move on to the next level
      const childNode = await getChildren(childDataItem, orderIndex + 1);
      childNodes.push(childNode);
    }
    // After all the children have assembled their children, this is assembled as its own children list
    node.children = childNodes;
    return node;
  }
  const data = getChildren({ name: "base", baseID: "" }, 0);
  console.log(data);
  return data;
}

// function fakeFetch(resource, fakeSetState){
//   const data = {
//     'production': sampleProductions,
//     'props-list': samplePropsLists,
//     'props-list-item':
// }
