var $map = $("#map");
var $money = $("#money");
var $env = $("#environment");

/*
Initialize position of markers in the
page relative to the map
*/
// Homelessness
$("#0").offset({
  top: $map.offset().top + 165, 
  left: $map.offset().left + 55 
});
// China's pollution
$("#1").offset({
  top: $map.offset().top + 160, 
  left: $map.offset().left + 710 
});
//Michigan's water pollution
$("#2").offset({
  top: $map.offset().top + 135, 
  left: $map.offset().left + 140
});
//Deforestation
$("#3").offset({
  top: $map.offset().top + 320, 
  left: $map.offset().left + 230
});
//Acid Rain
$("#4").offset({
  top: $map.offset().top + 100, 
  left: $map.offset().left + 440
});

/*
Initialize progress bars with the resources
object variable
*/
var resource = {
  money: 50,
  environment: 50
}
$money.val(resource.money);
$env.val(resource.environment);

/*
Locations database, core piece of the website
*/
var locations = [
  {
    title: "Homelessness",
    description:"Due to high rent, San Francisco has a homelessness problem.",
    link: "/homelessness.html",
    completed: false,
    scenario: "You see a homeless person, who needs money to buy food. <br>should you give your money away?",
    options: {
      yes: [-10, 20],
      no: [10, -20]
    }
  },
  {
    title: "Air Pollution",
    description:"Air pollution is a mixture of solid particles and gases in the air. Car emissions, chemicals from factories, dust, pollen and mold spores may be suspended as particles.",
    link:"/pollution.html",
    scenario: "A bill is introduced to lower taxes on coal plants. <br>Should you intervene to prevent its introduction?",
    completed: false,
    options: {
      yes: [-10, 15],
      no: [20, -20]
    }
  },
  {
    title: "Water Pollution",
    description:"Water pollution is the contamination of water bodies. Water bodies include for example lakes, rivers, oceans, aquifers and groundwater.",
    link: "/waterpollution.html",
    scenario: "There is a poll to decide if the state should stop using Flint's river and switch back to the original water supply. Should we?",
    completed: false,
    options: {
      yes: [-10, 20],
      no: [10, -20]
    }
  },
  {
    title: "Deforestation",
    description: "Deforestation is a decline in forestry than a the rate that is grown. ",
    link: "/Deforestation.html",
    scenario: "Trees are being cut down, do you want to invest money to try and stop it?",
    completed: false,
    options: {
      yes: [-10, 15],
      no: [20, -20]
    }
  },
  {
    title: "Acid rain",
    description: "Acid rain is the condensation of rain water and pollutant that cause contamination and environment harm.",
    link: "/acidRain.html",
    scenario: "A new coal factory is being built, do you want to buy the land and turn it into a park?",
    completed: false,
    options: {
      yes: [-10, 15],
      no: [20, -20]
    }
  },
  /*
  {
    title: "Ozone Depletion",
    description: "Hugh amount UV rays intercepts earth's surface",
    link: ""
  },
  {
    title: "Climate change",
    description: "changes of weather pattern",
    link: ""
  },
  {
    title: "Ocean Pollution",
    description: "Debris or trash that end up in the ocean.",
    link: ""
  },
  */

];

var currentLocation = locations[0];
var currentLocationIndex = 0;
var completed = 0;

$(".marker").click(function() {
  const id = $(this).attr("id");
  fetchLocation(id);
})

function fetchLocation(index) {
  currentLocation = locations[index];
  currentLocationIndex = index;
  renderCurrentLocation();
}

function renderCurrentLocation() {
  // Create tags for the pins
  const title = "<h1>" + currentLocation.title + "</h1>";
  const description = "<p>" + currentLocation.description + "</p>";
  const link = '<a href="' + currentLocation.link + '" target="_blank">Learn more</a>';
  const scenario = "<p>" + currentLocation.scenario + "</p>";
  const yes_button = "<button id='yes'>Yes</button>";
  const no_button = "<button id='no'>No</button>";
  $("#info-container").html(title + description + link + scenario + yes_button + no_button);
  // Assign click handlers to buttons
  $("#yes").click(function() {
    console.log(currentLocation.options.yes);
    if(currentLocation.completed === false) {
      changeResources(currentLocation.options.yes);
      currentLocation.completed = true;
      locations[currentLocationIndex].completed = true;
      completed += 1;
    } else {
      alert("Already completed");
    }
  });
  $("#no").click(function() {
    console.log(currentLocation.options.no);
    if(currentLocation.completed === false) {
      changeResources(currentLocation.options.no);
      currentLocation.completed = true;
      locations[currentLocationIndex].completed = true;
      completed += 1;
    } else {
      alert("Already completed");
    }
  });
}

function changeResources(arr) {
  resource.money += arr[0];
  resource.environment += arr[1];
  $money.val(resource.money);
  $env.val(resource.environment);
  
}

renderCurrentLocation();
