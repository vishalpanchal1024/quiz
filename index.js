
let radioButton = document.querySelectorAll("input");
let secondMainDiv = document.querySelector("#second-main-div");
let thirdMainDiv = document.querySelector("#third-main-div");
let startButton = document.querySelector(".start-btn");
let displayQuestion = document.querySelector("h2");
let totalQuestion = document.querySelector(".total-Question");

let option1 = document.getElementById("001");
let option2 = document.getElementById("002");
let option3 = document.getElementById("003");
let option4 = document.getElementById("004");

let scoreResult = document.getElementById("heading-3");
let scoreDescription = document.getElementById("heading-4");
let thirdDiv = document.getElementById("third-div");
let firstMainDiv = document.getElementById("first-main-div");
let nextButton = document.getElementById("next");
let retakeBtn = document.getElementById("retake-btn");


var currentIndex = 0;
var score = 0;
let totalAnswers = 0;

var dataObj = fetch(`https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple`).then(res => res.json()).then(data => {

  totalQuestion.innerText = `Total Questions : ${currentIndex + 1} / ${data.results.length}`;
  displayQuestion.innerText = `${currentIndex + 1}. ${data.results[currentIndex].question}`;
  option1.innerText = data.results[currentIndex].incorrect_answers[0];
  option2.innerText = data.results[currentIndex].incorrect_answers[1];
  option3.innerText = data.results[currentIndex].correct_answer;
  option4.innerText = data.results[currentIndex].incorrect_answers[2];
  return data;
});


startButton.addEventListener("click", () => {
  firstMainDiv.style = "display:none;";
  secondMainDiv.style = "display:flex;";
});


retakeBtn.addEventListener("click", () => {
  window.location.reload();
});


nextButton.addEventListener("click", () => {

  dataObj.then(data => {

    if (data.results.length - 1 > currentIndex) {
      currentIndex++;
    }
    else {
      secondMainDiv.style = "display:none;";
      thirdMainDiv.style = "display:flex;";
    }

    if (data.results.length - 1 == currentIndex) {
      nextButton.innerText = "Submit";
    }

    totalQuestion.innerText = `Total Questions : ${currentIndex + 1} / ${data.results.length}`;
    displayQuestion.innerText = `${currentIndex + 1}. ${data.results[currentIndex].question}`;
    option1.innerText = data.results[currentIndex].incorrect_answers[0];
    option2.innerText = data.results[currentIndex].incorrect_answers[1];
    option3.innerText = data.results[currentIndex].correct_answer;
    option4.innerText = data.results[currentIndex].incorrect_answers[2];

    radioButton.forEach(val => {
      if (val.checked === true) {
        let selectedOption = document.getElementById(`00${val.id}`);
        if (selectedOption.innerText === data.results[currentIndex].correct_answer) {
          score++;
          console.log(score);
        }
        scoreResult.innerText = `Score : ${score} / ${data.results.length}`;

        if (score <= (data.results.length * 40) / 100) {
          scoreDescription.style = "color:red;";
          scoreDescription.innerText = `You shall not pass!`;

        } else if (score <= (data.results.length * 75) / 100) {
          scoreDescription.style = "color:green;";
          scoreDescription.innerText = `Well done! You have a good understanding.`;

        } else {
          scoreDescription.style = "color:green;";
          scoreDescription.innerText = `Congratulations! You answered all questions correctly!`;
        }
      }
      val.checked = false;
    });


  });

});

