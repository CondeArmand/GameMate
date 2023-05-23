function toggleSearch() {
	let searchInput = document.getElementById("searchInput");
	if (searchInput.style.display === "none") {
		searchInput.style.display = "block";
	} else {
		searchInput.style.display = "none";
	}
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
      var searchTerm = document.getElementById("searchInput").value;
      if (searchTerm.trim() !== "") {
        var newUrl = "../pages/telaBusca.html?termo=" + encodeURIComponent(searchTerm);
        window.location.href = newUrl;
      }
    }
  }
  