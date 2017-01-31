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
  else if (choice == "next" || choice == "next of kin" || choice == "kin") {
    var name = prompt("Please enter a name to find that person's next of kin.");
    findNextOfKin(people, name);
  }
  else if (choice == "feature" || choice == "features") {
    features = prompt("Please type your search terms, separated by commas.");
    initSearchByTraits(people, features);
  }
}

function findNames(people, name) {
  var splitNames = name.split(" ");
  if (splitNames.length != 2) {
    name = prompt("Please enter a first and last name.");
    findNames(people, name);
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
          }
        }
      alert(alertString);
      }
      else {
        alert("Name not found.")
      }
}

function findHeight(feature) {
  if (feature.includes("'") && feature.includes("\"")) {
    for (i = 0; i < feature.length; i++) {
      if (feature[i] == "'") {
        var singleQuote = i;
        break;
      }
    }
    for (j = 0; j < feature.length; j++) {
      if (feature[j] == "\"") {
        var doubleQuote = j;
        break;
      }
    }
    if (singleQuote > doubleQuote) {
      return [false, 0];
    }
      //find first Number
    if (Number(feature.slice(0, singleQuote)) != NaN) {
      var feet = Number(feature.slice(0, singleQuote));
    }
    else {
      return [false, 0];
    }
    if (Number(feature.slice(singleQuote+1, doubleQuote)) != NaN) {
      var inches = Number(feature.slice(singleQuote+1, doubleQuote));
    }
    else {
      return [false, 0];
    }
    var height = (feet*12) + inches;
    return [true, height];
  }
  else {
    return [false,0];
  }
}

function findAgeRange(feature) {
  if (!feature.includes("-")) {
    return [false, 0, 0];
  }
  for (i = 0; i < feature.length; i ++) {
    if (feature[i] == "-") {
      dash = i;
      break;
    }
  }
  if (feature.slice(0, dash) == NaN) {
    return [false, 0, 0];
  }
  else {
    var lowAge = feature.slice(0, dash);
  }
  if (feature.slice(dash+1, feature.length-1) == NaN) {
    return [false, 0, 0];
  }
  else {
    var highAge = feature.slice(dash+1, feature.length);
  }
  return [true, lowAge, highAge];
}

function findWord(feature) {
  feature = feature.toLowerCase;
  letters = "q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m".split(",");
  for (i = 0; i < feature.length; i++) {
    var found = false;
    for (j = 0; j < letters.length; j++) {
      if (feature[i] == letters[j]) {
        found = true;
      }
    }
    if (found == false) {
      return [false, ""];
    }
  }
  return [true, feature];
}

function findTraitFound(searchTypes) {
  for (i in searchTypes) {
    if (searchTypes[i][0] == "NotFound") {
      return false;
    }
  }
  return true;
}

function filterResults(people, searchTypes) {
  for (i in searchTypes) {
    var searchType = searchTypes[i];
    var type = searchType[0];
    var foundPeople = [];
    if (type == "Age") {
      foundPeople = (people.filter(function(person){
        return searchType[1] == person.age;
      }));
    }
    else if (type == "Weight") {
      foundPeople = (people.filter(function(person){
        return searchType[1] == person.weight;
      }));
    }
    else if (type == "Height") {
      foundPeople = (people.filter(function(person){
        return searchType[1] == person.height;
      }));
    }
    else if (type == "Word") {
      foundPeople = (people.filter(function(person){
        return searchType[1] == person.eyeColor || searchType[1] == person.occupation;
      }));
    }
    else if (type == "AgeRange") {
      foundPeople = (people.filter(function(person){
        return searchType[1] >= person.age && searchType[2] <= person.age;
      }));
    }
    return foundPeople;
  }
}

function initSearchByTraits(people, features){
    var featuresArray = features.replace(/\s/g,'').split(",");
    var searchTypes = [];
//    document.write(featuresArray);
    for (i in featuresArray) {
      var feature = featuresArray[i];
      if (Number(feature != NaN) && feature>-1 && feature<10000) {
        document.write("Found a 1 to 4 digit number. (Age)<br><br>");
        searchTypes[i] = ["Age", feature];
      }
      else if (feature.slice(feature.length-2, feature.length) == "lbs" && Number(feature.slice(0, feature.length-3)) != NaN) {
        document.write("Found lbs (weight).<br><br>");
        searchTypes[i] = ["Weight",feature.slice(0, feature.length-3)];
      }
      else if (findHeight(feature)[0]) {
        document.write("Found height.<br><br>");
        searchTypes[i] = ["Height", findHeight(feature)[1]];
      }
      else if (findAgeRange(feature)[0]) {
        document.write("Found Age Range.<br><br>");
        searchTypes[i] = ["AgeRange", findAgeRange(feature)[1], findAgeRange(feature)[2]];
      }
      else if (findWord(feature)[0]) {
        document.write("Found single word.<br><br>");
        searchTypes[i] = ["Word", findWord(feature)[1]];
      }
      else {
        document.write("No search term found.<br><br>");
        searchTypes[i] = ["NotFound"];
      }
     if (findTraitFound(searchTypes)) {
       var foundPeople = filterResults(people, searchTypes);
     }
   }
   var alertString = "";
   if (foundPeople == []) {
     alertString = "No names found.";
   }
   else {
     for (i in foundPeople) {
       alertString += foundPeople[i]["firstName"] + " " + foundPeople[i]["lastName"] + "\n";
     }
   }
   alert(alertString);
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

function findGrandchilden(person, people) {
  var grandchildren = [];
  var children = findChildren(person);
  for (i in children) {
    childrenChildren = findchildren(children[i]);
    for (j in childrenChildren) {
      grandchildren.push(childrenChildren[j])
    }
  }
  return grandchildren;
}

function findGrandParents(person, people) {
  grandParents = [];
  parents = person["parents"];
  for (i in parents) {
    grandParents.push(findPersonFromId(people, parents[i]));
  }
  return grandParents;
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

function findNiecesAndNephews(person, people) {
  //Find parents, find sibling of each parent, find children of each sibling, push children.
  var parents = person["parents"];
  var parentsSiblings = [];
  var niecesAndNephews = [];
  for (i in parents) {
    foundChildren = findChildren(findPersonFromID(parents[i]));
    for (j in foundChildren) {
      parentsSiblings.push(foundChildren[i]);
    }
  }
  for (i in parentsSiblings) {
    niecesAndNephews.push(findPersonFromName(parentsSiblings[i]))
  }
  return niecesAndNephews;
}

function findGreatGrandParents(person, people) {
  var greatGrandParents = [];
  var parents = person["parents"];
  for (i in parents) {
    var foundParents = findPersonFromID(parents[i])["parents"];
    for (j in foundParents) {
      greatGrandParents.push(findNameFromId(foundParents[j]));
    }
  }
  return greatGrandParents;
}

function findGreatGrandChildren(person, people) {
  grandChildren = findGrandchilden(person);
  var greatGrandChildren = [];
  for (i in grandChildren) {
    grandChildX = grandChildren[i];
    for (j in findChildren(grandChildX)) {
      greatGrandChildren.push(grandChildX[j])
    }
  }
  return greatGrandChildren;
}

function findPersonFromId(people, id) {
  var foundPerson = (people.filter(function(person){
    return id == person["id"];
  }));
  return foundPerson[0];
}

function findPersonFromName(people, name) {
  var names = name.split(" ");
  var foundPerson = (people.filter(function(person){
    return names[0] == person["firstName"] && names[1] == person["lastName"];
  }));
  return foundPerson[0];
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

function findAuntsAndUncles(person, people) {
  var parents = person["parents"];
  var parentsSiblings = [];
  var niecesAndNephews = [];
  for (var i in parents) {
    var foundChildren = findChildren(people, [findPersonFromId(people, parents[i])]);
    for (var j in foundChildren) {
      parentsSiblings.push(foundChildren[i]);
    }
  }
  return parentsSiblings;
}

function findOldestSpouse(people, person) {
  return findNameFromId(people, person["currentSpouse"]);
}

function findOldestChild(people, children) {
  var eldest = children[0];
  for (i in children) {
    if (getAge(people, children[i]) > getAge(people, eldest)) {
      eldest = children[i];
    }
  }
  return eldest;
}

function findOldestParent(people, parents) {
  var eldest = parents[0];
  for (i in parents) {
    if (getAge(people, parents[i]) > getAge(people, eldest)) {
      eldest = parents[i];
    }
  }
  return eldest["firstName"] + " " + eldest["lastName"];
}

function findOldestGrandParent(people, grandParents) {
  var eldest = grandParents[0];
  for (i in grandParents) {
    if (getAge(people, grandParents[i]) > getAge(people, eldest)) {
      eldest = grandParents[i];
    }
  }
  return eldest["firstName"] + " " + eldest["lastName"];
}

function findOldestSibling(people, siblings) {
  var eldest = siblings[0];
  for (i in siblings) {
    if (getAge(people, siblings[i]) > getAge(people, eldest)) {
      eldest = siblings[i];
    }
  }
  return eldest["firstName"] + " " + eldest["lastName"];
}

function findOldestGrandchild(people, grandChildren) {
  var eldest = grandChildren[0];
  for (i in grandChildren) {
    if (getAge(people, grandChildren[i]) > getAge(people, eldest)) {
      eldest = grandChildren[i];
    }
  }
  return eldest["firstName"] + " " + eldest["lastName"];
}

function findOldestAuntOrUncle(people, person) {
  var auntsAndUncles = findAuntsAndUncles(person);
  var eldest = auntsAndUncles[0];
  for (i in auntsAndUncles) {
    if (getAge(auntsAndUncles[i]) > age(eldest)) {
      eldest = auntsAndUncles[i];
    }
  }
  return eldest;
}

function findOldestGreatGrandchild(people, person) {
  greatGrandChildren = findGreatGrandChildren(person, people);
  var eldest = greatGrandChildren[0];
  for (i in greatGrandChildren) {
    if (getAge(greatGrandChildren[i]) > age(eldest)) {
      eldest = greatGrandChildren[i];
    }
  }
  return eldest;
}

function findOldestGreatGrandParent(people, person) {
  greatGrandParents = findGreatGrandParents(person, people);
  var eldest = greatGrandParents[0];
  for (i in greatGrandParents) {
    if (getAge(greatGrandParents[i]) > age(eldest)) {
      eldest = greatGrandParents[i];
    }
  }
  return eldest;
}

function findNextOfKin(people, name) {
  var foundPeople = findNames(people, name);
  var person = foundPeople[0];
  var alertString = "";
  if (person["currentSpouse"] != null) {
    alertString = findOldestSpouse(people, person);
  }
  else if (findChildren(foundPeople, people) != []) {
    alertString = findOldestChild(people, findChildren(foundPeople, people));
  }
  else if (person["parents"] != []) {
    alertString = findOldestParent(people, person["parents"]);
  }
  else if (findSiblings(person, people) != []) {
    alertString = findOldestSibling(people, person);
  }
  else if (findGrandchilden(person, people) != []) {
    alertString = findOldestGrandchild(people, person);
  }
  else if (findGrandParents(person, people) != []) {
    alertString = findOldestGrandParent(people, person);
  }
  else if (findNiecesAndNephews(person, people) != []) {
    alertString = findOldestNieceOrNephew(people, person);
  }
  else if (findAuntsAndUncles(person, people) != []) {
    alertString = findOldestAuntOrUncle(people, person);
  }
  else if (findGreatGrandChildren(person, people) != []) {
    alertString = findOldestGreatGrandchild(people, person);
  }
  else if (findGreatGrandParents(person, people) != []) {
    alertString = findOldestGreatGrandParent(people, person);
  }
  else {
    alertString = "No next of kin found.";
  }


  alert(alertString);
}
function findFeatures(people, features) {

}
function displayResults(){
	;
}
function isNumeric() {
	;
}
function findDobFromName(people, name) {
  var names = name.split(" ");
  var entry = (people.filter(function(person){
    return person["firstName"] == names[0] && person["lastName"] == names[1];
  }));
  return entry[0]["dob"];
}

function getAge(people, person) {
    var name = person["firstName"] + " " + person["lastName"];
    var dob = findDobFromName(people, name);
    var todaysDate = new Date();
    for (i = 0; i < dob.length; i++) {
      if (dob[i] == "/") {
        break;
      }
    }
//    document.write("i: " + i + "<br>");
    var month = dob.substr(0,i);
    for (j = i+1; j < dob.length; j++) {
      if (dob[j] == "/") {
        break;
      }
    }
    var day = dob.substr(i+1,j-2);
    if (day[1] == "/" || day[2] == "/") {
      day = dob.substr(i+1,j-3);
    }
    var year = dob.substr(dob.length-4, dob.length);

    var todaysMonth = todaysDate.getMonth()+1;
    var todaysDay = todaysDate.getDate();
    var todaysYear = todaysDate.getFullYear();
    var age = Number(todaysYear) - Number(year);
    if (Number(todaysMonth) <= Number(month) && Number(todaysDay) <= Number(day)) {
      age++;
    }
    return age;
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
