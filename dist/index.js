var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const root = document.querySelector(".root");
const itemsPerPage = 9;
let currentPage = 1;
const fetchData = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=${itemsPerPage}`);
        const data = yield response.json();
        updateInterface(data);
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
});
const updateInterface = (data) => {
    root.innerHTML = "";
    data.items.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = 'cardItem';
        const imageElement = document.createElement("img");
        imageElement.src = item.image;
        itemElement.appendChild(imageElement);
        const nameElement = document.createElement("h2");
        nameElement.textContent = item.name;
        itemElement.appendChild(nameElement);
        const dialog = document.createElement("dialog");
        dialog.className = 'dialogCard';
        dialog.innerHTML = `
      <strong>Name:</strong> ${item.name}</p>
      <strong>Ki:</strong> ${item.ki}</p>
      <strong>Max Ki:</strong> ${item.maxKi}</p>
      <strong>Race:</strong> ${item.race}</p>
      <strong>Gender:</strong> ${item.gender}</p>
      <strong>Affiliation:</strong> ${item.affiliation}</p>
      <button>Close</button>
    `;
        document.body.appendChild(dialog);
        dialog.querySelector("button").addEventListener("click", () => {
            dialog.close();
        });
        itemElement.addEventListener('click', () => {
            dialog.showModal();
        });
        root.appendChild(itemElement);
    });
    const navContainer = document.createElement("div");
    navContainer.className = 'pagination';
    const prevButton = document.createElement("button");
    prevButton.className = 'prevButton';
    prevButton.textContent = "Prev";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchData(currentPage);
        }
    });
    const nextButton = document.createElement("button");
    nextButton.className = 'nextButton';
    nextButton.textContent = "Next";
    nextButton.disabled = data.items.length < itemsPerPage;
    nextButton.addEventListener("click", () => {
        currentPage++;
        fetchData(currentPage);
    });
    navContainer.appendChild(prevButton);
    navContainer.appendChild(prevButton);
    navContainer.appendChild(nextButton);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    prevButton.addEventListener("click", scrollToTop);
    nextButton.addEventListener("click", scrollToTop);
    root.appendChild(navContainer);
};
fetchData(currentPage);
export {};
