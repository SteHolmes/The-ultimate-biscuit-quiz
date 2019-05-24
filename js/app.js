const introSection = document.getElementsByClassName("intro")[0];
const introContent = document.getElementById("intro-content-area");
const startBtn = document.getElementsByClassName("start")[0];

const quizContainer = document.getElementById("quiz-container");
const quizSection = document.getElementById("quiz");
const option = document.getElementsByClassName("option")[0];

const submitSection = document.getElementById("submit");
const submitBtn = document.getElementsByClassName("submit-btn")[0];

const loadingScreen = document.getElementById("loading-screen");

const resultsSection = document.getElementById("results");
const refreshBtn = document.getElementById("refresh");


startBtn.addEventListener("click", function() {
  introContent.classList.add("slide-intro-left");
  introSection.classList.add("fade-out");
  setTimeout(function() {
    introSection.style.display = "none";
    quizContainer.style.display = "flex";
    quizContainer.classList.add("fade-in");
    createQuiz();
    submitSection.style.display = "flex";
  }, 1000)
  
})

// QUIZ SETUP //
var questions = [
  {
    question: "I would describe myself as...",
    answers: {
      a: "Completely disorganised",
      b: "Extremely funny",
      c: "A well rounded individual",
      d: "A bloody genius!"
    }
  },
  {
    question: "My ideal party would be...",
    answers: {
      a: "A takeaway feast ending in a drunken food fight",
      b: "A night on a giant bouncy castle floating down the Amazon",
      c: "A few bars then back to a friend's for a house party",
      d: "...Why would I spend time with other people at a party?"
    }
  },
  {
    question: "My plans for the future involve...",
    answers: {
      a: "Doing what I want when I want",
      b: "Skydiving",
      c: "My family and friends",
      d: "World domination"
    }
  },
  {
    question: "My Death Row dinner would be...",
    answers: {
      a: "<img class='img-option' src='https://i2-prod.liverpoolecho.co.uk/incoming/article11085721.ece/ALTERNATES/s615/JS53147434.jpg'>",
      b: "<img class='img-option' src='https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/the_perfect_roast_turkey_01155_16x9.jpg'>",
      c: "<img class='img-option' src='https://supervalu.co.uk/wp-content/uploads/2018/06/iStock-173239541.jpg'>",
      d: "<img class='img-option' src='https://images.unsplash.com/photo-1540713304937-18ad930d3594?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'>"
    }
  },
  {
    question: "I'm most content when I'm...",
    answers: {
      a: "On the toilet",
      b: "The centre of attention",
      c: "With friends",
      d: "Alone"
    }
  },
  {
    question: "I think we should all...",
    answers: {
      a: "Live on chocolate cake",
      b: "Be naked",
      c: "Get along",
      d: "Do what I say"
    }
  },
  {
    question: "My momma always said...",
    answers: {
      a: "Get a job",
      b: "You must be joking?",
      c: "Take your coat off inside, you won't feel the benefit",
      d: "You were a mistake"
    }
  },
  {
    question: "My ideal holiday destination looks a bit like this...",
    answers: {
      a: "<img class='img-option' src='https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5591931701001_5590712365001-vs.jpg?pubId=5104226627001&videoId=5590712365001'>",
      b: "<img class='img-option' src='https://images.unsplash.com/photo-1521989841745-2fded4328e13?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'>",
      c: "<img class='img-option' src='https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'>",
      d: "<img class='img-option' src='https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80'>"
    }
  },
  {
    question: "I'm invited to a friend's house party, where's my...",
    answers: {
      a: "Old Converses?",
      b: "Glow sticks?",
      c: "Bottle of wine?",
      d: "Microscope?"
    }
  },
  {
    question: "If there's one thing I've learnt, it's that...",
    answers: {
      a: "You should always invest in a comfy mattress",
      b: "Something will turn up, it always does",
      c: "Hard work pays off",
      d: "The square root of 1 is 1"
    }
  }
]

var type = {
   a: {
      name: ["Chocolate Chip Cookie", "Custard Cream", "Ginger Nut", "Chocolate Hobnob"],
      desc: "A bit of a loose cannon but always a crowd pleaser"
    },
   b: {
      name: ["Party Ring", "Pink Wafer", "Wagon Wheel", "Jammie Dodger"],
      desc: "The life and soul of the party and always game for a laugh"
    },
   c: {
      name: ["Chocolate Digestive", "Shortbread", "Viennese Sandwich", "Chocolate Bourbon"],
      desc: "Comfortable in most situations and great with a cup of tea"
    },
   d: {
      name: ["Jaffa Cake", "Rich Tea", "Chocolate Finger", "Garibaldi biscuit"],
      desc: "What is a biscuit anyway? What's the science behind all of this? Do you even care?"
    }
  };

// GENERATE QUIZ //
function createQuiz(){
  var output = [];
  
  for(var i = 0; i < questions.length; i++) {
    
  var answers = [];
    
    for(var letter in questions[i].answers) {      
        answers.push(
          `<input type="radio" value="${letter}" name="question${i}" class="option">
              <strong>${letter}:</strong> ${questions[i].answers[letter]}<br>`
        );
     }
    output.push(
      `<fieldset id="questions${i}">
          <legend><strong> Question ${i+1} </strong></legend>
          <div class="questions"> ${questions[i].question}</div><br>
          <div class="answers"> ${answers.join('')} </div>
       </fieldset>`
    );
    
    quizSection.innerHTML = output.join('');
  }
}

// CALCULATE RESULT BASED ON MOST FREQUENT ANSWER CHOICE //
function calculateResults(){ 
  var selectedAnswers = [];
  var answerList = document.getElementsByClassName("option");
  const errorMsg = document.getElementsByClassName("error-msg")[0];
  for(var i = 0; i < answerList.length; i++) {
    if(answerList[i].checked) {
      selectedAnswers.push(answerList[i].value);
    }
  }
  if(selectedAnswers.length === 0 && errorMsg === undefined) {
    addMsg("Please answer at least one question to discover your inner biscuit", quizContainer);
  } else { 
  resultsSection.innerHTML = `<p>You are a <br><span class='biscuit-result'>${mostFreqChoice(selectedAnswers)[0]}</span><br><span class="biscuit-desc">${mostFreqChoice(selectedAnswers)[1]}</span></p><p id='refresh'><i class='fas fa-redo-alt fa-0.5x'></i>Restart</p>`;
  transition(quizContainer, loadingScreen);
  setTimeout(function() {
    transition(loadingScreen, resultsSection)
  }, 4000);
  }
}

// FIND THE MOST FREQUENTLY SELECTED ANSWER/LETTER //
// AND ASSIGN A TYPE OF BISCUIT //
function mostFreqChoice(arr) {
  var obj = {}, mostFreq = 0, letter = [];

  arr.forEach(ea => {
    if (!obj[ea]) {
      obj[ea] = 1;
    } else {
      obj[ea]++;
    }

    if (obj[ea] > mostFreq) {
      mostFreq = obj[ea];
      letter = [ea];
    } else if (obj[ea] === mostFreq) {
      letter.push(ea);
    }
  });
  
  // RETURNING THE STRING AT THE FIRST INDEX OF 'LETTER' ARRAY PROVIDES THE MOST//
  // FREQ LETTER, AND ALSO AVOIDS ERRORS WHEN THERE ARE EQUAL INSTANCES OF MORE THAN ONE LETTER // 
  return biscuitType(letter[0]);
}

// ASSIGN LETTERS TO TYPES OF BISCUIT //
function biscuitType(mostFreqLetter) {
  
  var arr = [];
  
  function randomInt() {
    return (Math.floor((Math.random() * 4)));
  };
  
  arr.push(type[mostFreqLetter].name[randomInt()]);
  arr.push(type[mostFreqLetter].desc)
  return arr;
}



// FUNCTION TO ADD AN ERROR MSG TO THE //
// PAGE ON SUBMIT IF ALL INPUTS ARE UNCHECKED //
function addMsg(str, location) {
    const errorMsg = document.getElementsByClassName("error-msg")[0];
    var msg = document.createTextNode(str);
    var el = document.createElement("p");
    el.appendChild(msg);
    location.appendChild(el).setAttribute("class", "error-msg"); 
}

// TRANSITION ANIMATION TO DISPLAY SECTIONS //
function transition(eOut, eIn) {
  eOut.classList.add("fade-out");
  eOut.style.display = "none";
  eIn.style.display = "flex";
  eIn.classList.remove("fade-out");
  eIn.classList.add("fade-in");
}

// CLEAR INPUTS AND RESTART QUIZ //
function refresh() {
  const errorMsg = document.getElementsByClassName("error-msg")[0];
  var inputs = quizSection.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) { 
            inputs[i].checked = false;
    }
  transition(resultsSection, quizContainer); 
  quizContainer.firstChild.nextSibling.innerText = "Ready for another go?";
  if (errorMsg !== undefined) {
    errorMsg.parentNode.removeChild(errorMsg);
  }
}

// ON-CLICK EVENTS //

submitBtn.addEventListener("click", function() {
  calculateResults();
})

document.addEventListener("click", function(e) {
  if(e.target.id == 'refresh'){
    refresh();
  }
});