function initSearch(people, choice){
  if (choice == "name" || choice == "names") {
    var name = prompt("Please enter a name to search for.");
    initSearchByName(people, name);
  }
  else if (choice == "feature" || choice == "features") {
    var features = prompt("Please type your search terms, separated by commas”.");
    initSearchByTraits(people, features);
  }
  else if (choice == "descendants" || "descendant") {
    var name = prompt("Please enter a name to search descendants of.");
    findDescendants(people, name);
  }
  else {
    nameFeatures = prompt("Please enter name or feature.");
    initSearch(people, nameFeatures);
  }
}

function findNames(people, name) {
  var splitNames = name.split(" ");
  if (splitNames.length != 2) {
    name = prompt("Please enter a first and last name.")
    initSearchByName(people, name);
  }
  foundPeople = (people.filter(function(person){
    return splitNames[0] == person.firstName && splitNames[1] == person.lastName;
  }));
  return foundPeople;
}

function initSearchByName(people, name){
  var foundPeople = findNames(people, name);
  var alertString = "";
    if (foundPeople.length > 0) {
      for (var key in foundPeople[0]) {
        if (foundPeople[0].hasOwnProperty(key)) {
            alertString += key + ": ";
            alertString += foundPeople[0][key] + "\n";
            alert(alertString);
          }
        }
      }
      else {
        alert("Name not found.")
      }
}

function initSearchByTraits(people, features){
    var featuresArray = features.replace(/\s/g,'').split(",");
}

function findChildren(foundPeople, people) {
  var foundDescendants = [];
  var id = foundPeople[0]["id"];
  foundDescendants = (people.filter(function(person){
    return id == person.parents[0] || id == person.parents[1];
  }));
  for (i in foundDescendants) {
    foundDescendants.concat(findChildren([foundDescendants[i]], people));
  }
  return foundDescendants;
}

function findDescendants(people, name){
  foundPeople = findNames(people, name);
  var alertString = "";
    if (foundPeople.length > 0) {
        foundDescendants = findChildren(foundPeople, people);
      }
      else {
        alert("Name not found.")
      }
      for (i in foundDescendants) {
        alertString += foundDescendants[i]["firstName"] + " " + foundDescendants[i]["lastName"] + "\n";
      }
      alert(alertString);

}
function displayResults(){
	;
}
function isNumeric() {
	;
}
function getAge(){
	;
}
function getHeight(){
	;
}
function getWeight(){
	;
}
function getEye(){
	;
}
function getOccupation(){
	;
}
