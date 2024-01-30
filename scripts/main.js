var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");
const searchState = (searchText) => __awaiter(this, void 0, void 0, function* () {
    const res = yield fetch("../data/state.json");
    const datas = yield res.json();
    let matches = datas.filter((data) => {
        const pattern = new RegExp(`^${searchText}`, "gi");
        return data.name.match(pattern) || data.abbr.match(pattern);
    });
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    outPutHtml(matches);
});
const outPutHtml = (matches) => {
    if (matches.length > 0) {
        const html = matches
            .map((match) => `<div class=" card card-body mb-1" >
  <h4> ${match.name} (${match.abbr})  <span class="text-primary">${match.capital}</span></h4>
  <small>lat: ${match.lat} long:${match.long}</small>
  
  </div>`)
            .join("");
        matchList.innerHTML = html;
    }
};
search.addEventListener("input", () => searchState(search.value));
//# sourceMappingURL=main.js.map