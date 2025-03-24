export const tryurl = "https://silly-gabriela-undercroft-manager-245ea55f.koyeb.app/";
// const tryurl = "http://127.0.0.1:5000/"

export function fetchItems(resource, setState) {
  // A general function to fetch data from servers and setting a state to the data.
  async function fetchItemData() {
    try {
      const res = await fetch(tryurl + resource);
      const data = await res.json();
      setState(data);
    } catch (error) {
      console.log(error);
    } 
  }
  fetchItemData();
}
// Wrapper function for use as event handler, simply submits the data
export function handleFormSubmit(e, resource, formData) {
  console.log(JSON.stringify(formData));
  return submitData(resource, formData);
}

export async function submitData(resource, formData, method = "POST") {
  // The async function that will return something and you can do whatever with it, 
  // and does not return anything until a response is received so allows for flexibility.
  const res = await fetch(tryurl + resource, {
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*"
    },
    method: method,
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  return data;
}

// A general function to fetch data from servers, and returning the data itself instead of setting state.
export async function fetchItemsReturnData(resource) {
  let d= null;
    try {
      const res = await fetch(tryurl + resource);
      const data = await res.json();
      console.log(data)
      d = data;
      return d;
    } catch (error) {
      console.log(error);
    }
}

export async function uploadToImgur(file, filename, title) {
  // From docs
  var myHeaders = new Headers();
  const clientID = "66f3b9ac2826ead";

  myHeaders.append(`Authorization`, `Client-ID ${clientID}`);

  var formdata = new FormData();
  formdata.append("image", file, filename);
  formdata.append("type", "image");
  formdata.append("title", title);
  formdata.append("description", "");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  try {
    const res = await fetch("https://api.imgur.com/3/image", requestOptions);
    const result = await res.json();

    const link = result.data.link;
    console.log(link);
    return link;
  } catch (error) {
    console.log(error);
  }
}
