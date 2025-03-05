export default async function uploadToImgur(file, filename, title) {
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
