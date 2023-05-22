import { getGameDetails } from "./api.js";

document.addEventListener('DOMContentLoaded', () => {
   if (document.title.includes("Jogo")) {
      getGameDetails(3498)
   }
});