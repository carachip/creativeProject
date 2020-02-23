

document.getElementById("inputSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("userInput").value;
    if (value === "")
      return;
    const url = "https://cors-anywhere.herokuapp.com/https://owlbot.info/api/v4/dictionary/" + value;
    fetch(url, {mode: "cors", headers: {Authorization: "Token 582abfda2d9a5c10e57548b285a1a0589d8313d4", "Set-Cookie": "HttpOnly; Secure; SameSite=None"}})
        .then(function(response) {
        return response.json();
        }).then(function(json) {
            let results = "";
            results += "<div id='dictName'><h1>" + json.word + "</h1>";
            if (json.pronunciation) {
                results += "<div>[" + json.pronunciation + "]</div>";
            }
            results += "</div>";
            for (let i = 0; i < json.definitions.length; i++) {
                results += "<div class='singleDefinition'><div><div class='numberAndType'><div>" + (i+1) + ". </div>";
                results += "<em>" + json.definitions[i].type + "</em></div>";
                results += "<div class='definition'><div>" + json.definitions[i].definition + "</div>";
                if (json.definitions[i].example) {
                    results += "<em class='exampleSentence'>Example: " + json.definitions[i].example + "</em>";
                }
                results += "</div></div>";
                if (json.definitions[i].image_url) {
                    results += "<img class='dictImage' src=" + json.definitions[i].image_url + "></img>";
                }
                results += "</div>";
                if (i != json.definitions.length - 1) {
                    results += "<div class='lineBreak'></div>";
                }
            }
            
            document.getElementById("dictionaryResults").innerHTML = results;
            document.getElementById("notFound").innerHTML = "";
        })
        .catch(function (error) {
            document.getElementById("notFound").innerHTML = "<h1>Word not found</h1>";
            document.getElementById("dictionaryResults").innerHTML = "";
        });
  });

