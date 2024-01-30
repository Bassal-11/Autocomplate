const search = document.querySelector("#search") as HTMLInputElement;
const matchList = document.querySelector("#match-list") as HTMLDivElement;

// functions
const searchState = async (searchText) => {
  const res = await fetch("../data/state.json");
  const datas = await res.json();
  //   console.log(data);

  //   get matches data
  let matches = datas.filter((data) => {
    const pattern = new RegExp(`^${searchText}`, "gi");

    return data.name.match(pattern) || data.abbr.match(pattern);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }
  outPutHtml(matches);

  // console.log(matches);
};

const outPutHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) =>
          `<div class=" card card-body mb-1" >
  <h4> ${match.name} (${match.abbr})  <span class="text-primary">${match.capital}</span></h4>
  <small>lat: ${match.lat} long:${match.long}</small>
  
  </div>`
      )
      .join("");
    matchList.innerHTML = html;
  }
};




// Events

search.addEventListener("input", () => searchState(search.value));
