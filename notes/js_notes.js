//html/javascript notes

//variables
var number = 5
var value = 'gluten free'
value = 'tons of gluten'

//arrays
var numbers = [ 5, 10, 15, 20 ];
numbers[3] //returns 15
var sexy_names = [ 'Gert', 'Brenda', 'Merle' ];

//for loops
for (var i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);  //Print value to console
}

//objects
var ross_butt = {
  kind: "cute",
  color: "white",
  quantity: 2,
  tasty: true
};

ross_butt.kind //returns "cute"

//objects + arrays
var lemurs = [
  {
  kind: 'slow loris',
  color: 'brown'
},
  {
    kind: 'sifaka',
    color: 'white'
  }
];

lemurs[0].kind //returns "slow loris"
lemurs[1].color //returns "white"

//JSON! - synta for organizating data as js objects
var jsonlemurs = {
  "kind":"slow loris",
  "color":"brown"
};

//geodata
var geodata = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [ 150.1282427, -24.471803 ]
            },
            "properties": {
                "type": "town"
            }
        }
    ]
};

//scales
/functions whose parameters you define
