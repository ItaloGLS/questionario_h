let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result");
const scoreContainer = document.getElementById("score");
const finalResultsContainer = document.getElementById("final-results");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.querySelector(".submit-btn");

function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    displayFinalResults();
    return;
  }

  const questionData = questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <div class="question">${questionData.question}</div>
    <div class="options">
      ${questionData.options.map((option, index) => `
        <div class="option" onclick="selectOption(${index})" id="option-${index}">
          ${option}
        </div>
      `).join('')}
    </div>
  `;

  resultContainer.textContent = '';
  resultContainer.style.backgroundColor = ''; 
  scoreContainer.textContent = `Pontuação: ${score}`;
  nextBtn.style.display = "none";  // Esconde o botão "Próximo"
  submitBtn.style.display = "inline-block";  // Mostra o botão "Verificar Resposta"
}

function selectOption(index) {
  const options = document.querySelectorAll(".option");
  options.forEach(option => option.style.backgroundColor = "#3d3d5c");
  document.getElementById(`option-${index}`).style.backgroundColor = "#4e4e99";
  selectedOption = index;
}

function checkAnswer() {
  if (selectedOption === null) {
    resultContainer.textContent = "Por favor, selecione uma resposta.";
    resultContainer.style.color = "#e84118";
    return;
  }

  const questionData = questions[currentQuestionIndex];
  const chosenAnswer = questionData.options[selectedOption];

  if (chosenAnswer === questionData.answer) {
    resultContainer.textContent = "Correto! 🎉";
    resultContainer.style.color = "#ffffff";
    resultContainer.style.backgroundColor = "#28a745";
    score++;
  } else {
    resultContainer.textContent = `Incorreto. A resposta correta é: ${questionData.answer}`;
    resultContainer.style.color = "#ffffff";
    resultContainer.style.backgroundColor = "#e84118";
  }

  scoreContainer.textContent = `Pontuação: ${score}`;
  selectedOption = null;

  // Esconde o botão "Verificar Resposta" e mostra o botão "Próximo"
  submitBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestionIndex++;
  displayQuestion();
}

function displayFinalResults() {
  questionContainer.style.display = "none";
  submitBtn.style.display = "none";
  resultContainer.style.display = "none";
  nextBtn.style.display = "none";  // Esconde o botão "Próximo"
  finalResultsContainer.style.display = "block";

  let finalResultHTML = `
    <h2>Resultados Finais</h2>
    <p class="final-score">Pontuação Final: ${score} de ${questions.length}</p>
    <button onclick="location.reload()" class="restart-btn">Reiniciar Quiz</button>
  `;

  finalResultsContainer.innerHTML = finalResultHTML;
}

displayQuestion();
