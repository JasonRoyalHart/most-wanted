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
    findFamily(people, name);
  }
  else {
    nameFeatures = prompt("Please enter name or feature.");
    initSearch(people, nameFeatures);
  }
}


function initSearchByName(people, name){
  splitNames = name.split(" ");
  if (splitNames.length != 2) {
    name = prompt("Please enter a first and last name.")
    initSearchByName(people, name);
  }
  foundPeople = (people.filter(function(person){
    return splitNames[0] == person.firstName && splitNames[1] == person.lastName;
  }));
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
function findFamily(people, name){
  splitNames = name.split(" ");
  if (splitNames.length != 2) {
    name = prompt("Please enter a first and last name.")
    initSearchByName(people, name);
  }
  foundPeople = (people.filter(function(person){
    return splitNames[0] == person.firstName && splitNames[1] == person.lastName;
  }));
  var alertString = "";
    if (foundPeople.length > 0) {
        var id = foundPeople[0]["id"];
        foundDescendants = (people.filter(function(person){
          return id == person.parents[0] || id == person.parents[1];
        }))
      }
      else {
        alert("Name not found.")
      }
      alert(foundDescendants);

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
