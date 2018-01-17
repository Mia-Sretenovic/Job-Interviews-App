(function () {

    var candidatesList = [];

    function openPage() {

        var search = document.querySelector("#search");
        search.addEventListener("input", filterCandidates);
        getData();
        setUpLink();
    }

    function filterCandidates() {
        var search = document.querySelector("#search");
        var searchValue = search.value.toLowerCase();
        var filteredCandidates = candidates.filter(function (candidate) {
            return candidate.name.toLowerCase().includes(searchValue);
        })
        candidatesData(filteredCandidates);
    }

    function candidatesData(candidates) {
        var main = document.querySelector(".candidateInfo")
        main.innerHTML = "";

        if (candidates.length) {

            for (var i = 0; i < candidates.length; i++) {

                var elementAvatar = candidates[i].avatar || "http://style.anu.edu.au/_anu/4/images/placeholders/person.png";
                var elementName = candidates[i].name;
                var elementEmail = candidates[i].email;
                var elementId = candidates[i].id;

                var candidateRow = document.createElement("div");
                candidateRow.setAttribute("class", "row");

                var candidateCard = document.createElement("div");
                candidateCard.setAttribute("class", " mt-5 col-lg-12 col-md-6 col-sm-12 p-3 my-2");

                var imgCard = document.createElement("div");
                imgCard.setAttribute("class", " mt-5 col-lg-3 col-md-3 col-sm-12 p-3 my-2");
                var bodyCard = document.createElement("div");
                bodyCard.setAttribute("class", " mt-5 col-lg-6 col-md-6 col-sm-12 p-3 my-2");

                var candidateImage = document.createElement("img");
                candidateImage.setAttribute("class", "card-img-top");
                candidateImage.setAttribute("src", elementAvatar);
                candidateImage.setAttribute("alt", "Card iage cap");
                candidateImage.setAttribute("style", "width: 12rem");
                candidateImage.setAttribute("style", "height: 12rem");
                imgCard.appendChild(candidateImage);


                var candidateCardBody = document.createElement("div");
                candidateCardBody.setAttribute("class", "card-body p-1");
                bodyCard.appendChild(candidateCardBody);

                var candidateNameLink = document.createElement("a");
                candidateNameLink.setAttribute("href", "report.html");
                candidateNameLink.setAttribute("class", "candidate-name");
                candidateNameLink.setAttribute("data-id", elementId);
                var candidateNameText = document.createTextNode(elementName);
                candidateNameLink.appendChild(candidateNameText);
                candidateCardBody.appendChild(candidateNameLink);

                var candidateEmail = document.createElement("p");
                var candidateEmailText = document.createTextNode(elementEmail);
                candidateEmail.appendChild(candidateEmailText);
                candidateCardBody.appendChild(candidateEmail);

                candidateRow.appendChild(imgCard);
                candidateRow.appendChild(bodyCard);

                var main = document.querySelector(".candidateInfo")

                main.appendChild(candidateRow);

            }

        } else {
            errorMessage("No candidates.");
        }
    }


    function errorMessage(error) {
        var main = document.querySelector(".candidateInfo")
        var errorMessageText = document.createElement("h5");

        errorMessageText.textContent = error;
        errorMessageText.setAttribute("class", "mx-auto text-justify mt-4 p-3");
        main.appendChild(errorMessageText);
    }


    function getData() {
        var request = new XMLHttpRequest();
        var url = "http://localhost:3333/api/candidates";


        request.open("GET", url);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                candidates = JSON.parse(request.responseText);
                candidatesData(candidates);
            } else {
                errorMessage("Error.");
            }
        };

        request.onerror = function () {
            errorMessage("Server not responding.");
        };

        request.send();
    }


    function setUpLink() {
        document.addEventListener("click", function (event) {
            if (event.target.hasAttribute("data-id")) {

                var idValue = event.target.getAttribute("data-id");
                localStorage.setItem("id", idValue);

            }
        })
    };

    openPage();
})();