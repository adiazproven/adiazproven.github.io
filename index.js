var all_uppercase_letters =
[
  { letter: "A", description: "victory", category:"hands" },
  { letter: "B", description: "perfect", category:"hands" },
  { letter: "C", description: "thumb up", category:"hands" },
  { letter: "D", description: "thumb down", category:"hands" },
  { letter: "E", description: "left", category:"hands" },
  { letter: "F", description: "right", category:"hands" },
  { letter: "G", description: "up", category:"hands" },
  { letter: "H", description: "down", category:"hands" },
  { letter: "I", description: "hello", category:"hands" },

  { letter: "J", description: "happy", category:"faces" },
  { letter: "K", description: "neutral", category:"faces" },
  { letter: "L", description: "sad", category:"faces" },

  { letter: "M", description: "bomb", category:"objects" },
  { letter: "N", description: "skull", category:"objects" },
  { letter: "O", description: "square flag", category:"objects" },
  { letter: "P", description: "spiky flag", category:"objects" },
  { letter: "Q", description: "plane", category:"objects" },

  { letter: "R", description: "sun", category:"weather" },
  { letter: "S", description: "rain", category:"weather" },
  { letter: "T", description: "snow", category:"weather" },

  { letter: "U", description: "cross", category:"religion" },
  { letter: "V", description: "shadowed cross", category:"religion" },
  { letter: "W", description: "celtic cross", category:"religion" },
  { letter: "X", description: "maltese cross", category:"religion" },
  { letter: "Y", description: "star of david", category:"religion" },
  { letter: "Z", description: "crescent and star", category:"religion" }
]

var all_lowercase_letters =
[
  { letter: "a", description: "cancer", category:"horoscope" },
  { letter: "b", description: "leo", category:"horoscope" },
  { letter: "c", description: "virgo", category:"horoscope" },
  { letter: "d", description: "libra", category:"horoscope" },
  { letter: "e", description: "scorpio", category:"horoscope" },
  { letter: "f", description: "saggitarius", category:"horoscope" },
  { letter: "g", description: "capricorn", category:"horoscope" },
  { letter: "h", description: "aquarius", category:"horoscope" },
  { letter: "i", description: "pisces", category:"horoscope" },

  { letter: "j", description: "et", category:"and" },
  { letter: "k", description: "ampersand", category:"and" },

  { letter: "l", description: "black circle", category:"circles" },
  { letter: "m", description: "shadowed circle", category:"circles" },

  { letter: "n", description: "black square", category:"squares" },
  { letter: "o", description: "square", category:"squares" },
  { letter: "p", description: "bold square", category:"squares" },
  { letter: "q", description: "shadowed square up", category:"squares" },
  { letter: "r", description: "shadowed square down", category:"squares" },

  { letter: "s", description: "small lozenge", category:"rhomboids" },
  { letter: "t", description: "lozenge", category:"rhomboids" },
  { letter: "u", description: "rhombus", category:"rhomboids" },
  { letter: "v", description: "rhombus ex", category:"rhomboids" },
  { letter: "w", description: "small rhombus", category:"rhomboids" },

  { letter: "x", description: "clear", category:"commands" },
  { letter: "y", description: "escape", category:"commands" },
  { letter: "z", description: "command", category:"commands" }
];

var all_numbers =
[
  { letter: "0", description: "closed folder", category: "folders" },
  { letter: "1", description: "open folder", category: "folders" },
  { letter: "2", description: "earmarked page", category: "papers" },
  { letter: "3", description: "page", category: "papers" },
  { letter: "4", description: "pages", category: "papers" },
  { letter: "5", description: "cabinet", category: "furniture" },
  { letter: "6", description: "hourglass", category: "furniture" },
  { letter: "7", description: "keyboard", category: "devices" },
  { letter: "8", description: "mouse", category: "devices" },
  { letter: "9", description: "trackball", category: "devices" },
];

var latin_to_wd = false;

var correct_answer;

var score = 0;

var showing_all_options = false;

function nextLetter()
{
  // STEP 0: HIDE SOLUTION AND SHOW 'OK' BUTTON
  document.getElementById("selectedOption").removeAttribute('readonly');
  document.getElementsByClassName("solution")[0].style.visibility = "hidden";
  document.getElementById("okbutton").style.visibility = "visible";

  // STEP 1: SWITCH MODE LATIN->WD / WD->LATIN
  latin_to_wd = !latin_to_wd;

  // STEP 1 AND A HALF: RANDOMIZE BETWEEN UPPERCASE, LOWERCASE, NUMBERS AND SYMBOLS
  // check checkboxes
  let uppercaseChecked = document.getElementById("option_uppercase").checked;
  let lowercaseChecked = document.getElementById("option_lowercase").checked;
  let numbersChecked = document.getElementById("option_numbers").checked;

  // gather all possible arrays of characters
  let arrays = [];
  if (uppercaseChecked) arrays.push(all_uppercase_letters);
  if (lowercaseChecked) arrays.push(all_lowercase_letters);
  if (numbersChecked) arrays.push(all_numbers);
  if (arrays.length == 0) arrays.push(all_uppercase_letters) // if none selected, will be uppercase by default

  // choose one of the arrays
  let random_index = Math.floor(Math.random() * arrays.length);
  let chosen_array = arrays[random_index];

  // STEP 2: PREPARE DATALIST (LETTERS OR DESCRIPTIONS DEPENDING ON MODE)
  let options = '';
  if (latin_to_wd)
  {
    chosen_array.forEach(element => {
      options += '<option value="' + element.description + '" />';
    });
  }
  else
  {
    chosen_array.forEach(element => {
      options += '<option value="' + element.letter + '" />';
    });
  }
  document.getElementById("characters").innerHTML = options;

  // STEP 3: RANDOMIZE ANSWER
  let answerIndex = Math.floor(Math.random() * chosen_array.length);
  correct_answer = chosen_array[answerIndex];

  // STEP 4: FROM THAT ANSWER, SET INNERHTML OF TOP-LETTER, BOTTOM-LETTER, BOTTOM-DESC, CATEGORY
  document.getElementById("top_letter").innerHTML = correct_answer.letter;
  document.getElementById("bottom_letter").innerHTML = correct_answer.letter;

  if (latin_to_wd)
  {
    document.getElementById("top_letter").classList.remove("wd");
    document.getElementById("bottom_letter").classList.add("wd");
    document.getElementById("top_desc").innerHTML = "";
    document.getElementById("bottom_desc").innerHTML = correct_answer.description;
  }
  else
  {
    document.getElementById("top_letter").classList.add("wd");
    document.getElementById("bottom_letter").classList.remove("wd");
    document.getElementById("top_desc").innerHTML = correct_answer.description;
    document.getElementById("bottom_desc").innerHTML = "";
  }

  // STEP 5: PREPARE CORRECT CATEGORY TO BE SHOWN
  prepareCategory(chosen_array, correct_answer.category);
  
  // STEP 6: FOCUS ON OK BUTTON
  document.getElementById("selectedOption").focus();
}

function prepareCategory (chosen_array, category)
{
  document.getElementById("category_name").innerHTML = category;
  let categoryDiv = document.getElementById("category_div");
  categoryDiv.innerHTML = "";

  switch (category)
  {
    // UPPERCASE
    case "hands":
      appendParagraph(categoryDiv, "AB");
      appendParagraph(categoryDiv, "CD");
      appendParagraph(categoryDiv, "EFGH");
      appendParagraph(categoryDiv, "I");
      break;
    case "faces":
      appendParagraph(categoryDiv, "JKL");
      break;
    case "objects": 
      appendParagraph(categoryDiv, "MN");
      appendParagraph(categoryDiv, "OP");
      appendParagraph(categoryDiv, "Q");
      break;
    case "weather": 
      appendParagraph(categoryDiv, "RST");
      break;
    case "religion": 
      appendParagraph(categoryDiv, "UVWX");
      appendParagraph(categoryDiv, "YZ");
      break;
    
    // LOWERCASE
    case "horoscope": 
      appendParagraph(categoryDiv, "abc");
      appendParagraph(categoryDiv, "def");
      appendParagraph(categoryDiv, "ghi");
      break;
    case "and":
      appendParagraph(categoryDiv, "jk");
      break;
    case "circles":
      appendParagraph(categoryDiv, "lm");
      break;
    case "squares":
      appendParagraph(categoryDiv, "nop");
      appendParagraph(categoryDiv, "qr");
      break;
    case "rhomboids":
      appendParagraph(categoryDiv, "st");
      appendParagraph(categoryDiv, "uvw");
      break;
    case "commands":
      appendParagraph(categoryDiv, "xy");
      appendParagraph(categoryDiv, "z");
      break;
    
    // NUMBERS
    case "folders": 
      appendParagraph(categoryDiv, "01");
      break;
    case "papers": 
      appendParagraph(categoryDiv, "234");
      break;
    case "furniture": 
      appendParagraph(categoryDiv, "56");
      break;
    case "devices": 
      appendParagraph(categoryDiv, "789");
      break;
  }
}

function appendParagraph (div, letters)
{
  // paragraph
  let para = document.createElement("p");

  for (let i = 0; i < letters.length; i++)
  {
    // normal letter
    let txt1 = document.createTextNode(" " + letters.charAt(i));
    para.appendChild(txt1);

    // wd letter
    let span = document.createElement("span");
    span.classList.add("wd");
    let txt2 = document.createTextNode(letters.charAt(i));
    span.appendChild(txt2);
    para.appendChild(span);
  }

  div.appendChild(para);
}

function showSolution()
{
  // STEP 1: CHECK IF SELECTED OPTION IS CORRECT
  let correct = false;
  let selectedOption = document.getElementById("selectedOption").value;
  if (latin_to_wd) correct = selectedOption.toLowerCase() == correct_answer.description.toLowerCase();
  else correct = selectedOption == correct_answer.letter;

  // STEP 2: MODIFY SCORE AND MESSAGE DEPENDING ON CORRECT
  if (correct)
  {
    score++;
    document.getElementById("msg").innerHTML = "THAT IS CORRECT!";
  }
  else
  {
    if (score > 0) score--;
    document.getElementById("msg").innerHTML = "THAT'S NOT IT... CORRECT SOLUTION:";
  }
  document.getElementById("score").innerHTML = score;

  // STEP 2 AND A HALF: IF SCORE IS 20 OR MORE AND showing_all_options IS FALSE, SHOW THE OPTION
  if (/*score >= 20 &&*/ !showing_all_options)
  {
    console.log("aaaa");
    showing_all_options = true;
    let array = document.getElementsByClassName("show_option");
    while (array.length) array[0].classList.remove('show_option');
  }

  // STEP 3: SHOW SOLUTION AND HIDE 'OK' BUTTON
  document.getElementById("selectedOption").setAttribute('readonly', '');
  document.getElementsByClassName("solution")[0].style.visibility = "visible";
  document.getElementById("okbutton").style.visibility = "hidden";

  // STEP 4: FOCUS ON 'NEXT' BUTTON
  document.getElementById("nextButton").focus();
}

function clearTextbox (elm)
{
  if (!elm.hasAttribute('readonly')) elm.value = '';
}

document.getElementById("selectedOption")
    .addEventListener("keypress", function(event) {
    //event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("okbutton").click();
    }
});

nextLetter();