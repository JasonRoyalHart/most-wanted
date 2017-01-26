function initSearch(people, choice){
  if (choice == "name" || choice == "names") {
    var name = prompt("Please enter a name to search for.");
    initSearchByName(people, name);
  }
  else if (choice == "feature" || choice == "features") {
    var features = prompt("Please type your search terms, separated by commas”.");
    initSearchByTraits(people, features);
  }
  else if (choice == "descendants" || choice == "descendant") {
    var name = prompt("Please enter a name to search descendants of.");
    findDescendants(people, name);
  }
  else if (choice == "family") {
    var name = prompt("Please enter a name to find that person's family.");
    findFamily(people, name);
  }
  else {
    nameFeatures = prompt("Please enter name or feature.");
    findFeatures(people, nameFeatures);
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
  var children = [];
  foundDescendants = (people.filter(function(person){
    return id == person.parents[0] || id == person.parents[1];
  }));
  for (i in foundDescendants) {
    children.push(foundDescendants[i]["firstName"] + " " + foundDescendants[i]["lastName"]);
  }
  return children;
}

function findAllChildren(foundPeople, people) {
  var foundDescendants = [];
  var id = foundPeople[0]["id"];
  foundDescendants = (people.filter(function(person){
    return id == person.parents[0] || id == person.parents[1];
  }));
  for (i in foundDescendants) {
    foundDescendants = foundDescendants.concat(findAllChildren([foundDescendants[i]], people));
  }
  return foundDescendants;
}

function findDescendants(people, name){
  foundPeople = findNames(people, name);
  var alertString = "";
    if (foundPeople.length > 0) {
        foundDescendants = findAllChildren(foundPeople, people);
      }
      else {
        alert("Name not found.")
      }
      for (i in foundDescendants) {
        alertString += foundDescendants[i]["firstName"] + " " + foundDescendants[i]["lastName"] + "\n";
      }
      alert(alertString);

}
function findSiblings(foundPerson, people) {
  //Returns an array of Sibling's names.
  var siblings = [];
  var id = foundPerson["id"];
  //Find people with the same parents as the person.
  for (i in foundPerson["parents"]) {
    foundParents = (people.filter(function(person){
      return person["parents"][0] == foundPerson["parents"][i] || person["parents"][1] == foundPerson["parents"][i];
    }));
    for (i in foundParents) {
      if (id != foundParents[i]["id"]) {
        siblings.push(foundParents[i]["firstName"] + " " + foundParents[i]["lastName"]);
      }
    }
  }
  return siblings;
}

function findNameFromId(people, id) {
  var foundPerson = (people.filter(function(person){
    return id == person["id"];
  }));
  //document.write(foundPerson[0]['firstName']);
  return foundPerson[0]["firstName"] + " " + foundPerson[0]["lastName"];
}

function findFamily(people, name) {
  var foundPeople = findNames(people, name);
  var person = foundPeople[0];
  var family = [];
  children = findChildren(foundPeople, people);
  family = family.concat(children);
  if (person["currentSpouse"] != null) {
    family.push(findNameFromId(people, person["currentSpouse"]));
  }
  for (i in person["parents"]) {
    family.push(findNameFromId(people, person["parents"][i]))
  }

  family = family.concat(findSiblings(person, people));
  var alertString = "";
  if (family.length > 0) {
    for (i in family) {
      alertString += family[i] + "\n";
    }
  }
  alert(alertString);

}
function findFeatures(people, nameFeatures) {

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
