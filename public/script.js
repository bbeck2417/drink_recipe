// var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes'
var url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

var axiosbtn = document.querySelector("#axios");
var display = document.querySelector("#drinkName");
var img = document.querySelector("#drink-img");
var instructions = document.querySelector(".instructions");





axiosbtn.addEventListener("click",function(){
  axios.get(url)
  .then(function(res){
  	var drinksArray = res.data.drinks;
  	var drinkIntructions = res.data.drinks[0].strInstructions;
  	var drinkName = res.data.drinks[0].strDrink;
  	var drinkImg = res.data.drinks[0].strDrinkThumb;
    display.innerText = drinkName;
    instructions.innerText = drinkIntructions;
    var drinksObject = drinksArray[0];
    console.log(Object.values(drinksArray));
    

	var newdrinksObject = removeEmpty(drinksObject);
	values = Object.entries(newdrinksObject);

	console.log(values);
	// console.log(Object.keys(newdrinksObject));
	Object.values(newdrinksObject).forEach(function (value) {
   // do something with obj[key]
   // console.log(value);
});

	
	img.src = drinkImg;
	scrollToTop();
	
    })
  	.catch(function(err){
  	console.log(err);
    alert("ERROR!");
  })
});

const removeEmpty = (obj) => {
  const o = JSON.parse(JSON.stringify(obj)); // Clone source oect.

  Object.keys(o).forEach(key => {
    if (o[key] && typeof o[key] === 'object')
      o[key] = removeEmpty(o[key]);  // Recurse.
    else if (o[key] === undefined || o[key] === null || o[key] === "" || o[key] === " ")
      delete o[key]; // Delete undefined and null.
    else
      o[key] = o[key];  // Copy value.

  });
  return o; // Return new object.
};

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function scrollToTop(scrollDuration) {
    var cosParameter = window.scrollY / 2,
        scrollCount = 0,
        oldTimestamp = performance.now();
    function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

// axios({
//   method:'get',
//   url:'https://www.thecocktaildb.com/api/json/v1/1/random.php',
//   responseType:'json'
// })
//   .then(function(response) {
//   response.data.drinks;
//   console.log(response.data.drinks[0]);
// });