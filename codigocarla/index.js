const questions = [
  { 
    question: "Qual era a principal razão dos celtas usarem fantasias durante o festival de Samhain?",
    options: ["Para celebrar a colheita", "Para confundir os espíritos", "Para se proteger contra fantasmas", "Para atrair boas colheitas"],
    answer: "Para confundir os espíritos"
  },
  { 
    question: "O que representava o fogo nos antigos festivais celtas de Samhain?",
    options: ["Renovação da vida", "A morte do verão e o início do inverno", "A vitória sobre os espíritos malignos", "Purificação dos participantes"],
    answer: "A morte do verão e o início do inverno"
  },
  { 
    question: "Em qual país a tradição de esculpir Jack-o'-Lanterns originalmente utilizava nabos ao invés de abóboras?",
    options: ["Escócia", "Inglaterra", "Irlanda", "Alemanha"],
    answer: "Irlanda"
  },
  { 
    question: "Qual lenda inspirou a criação das Jack-o'-Lanterns?",
    options: ["A lenda de Tom the Red", "A lenda de Stingy Jack", "A história de Sweeney Todd", "A lenda de Samhain"],
    answer: "A lenda de Stingy Jack"
  },
  { 
    question: "Qual é a origem da tradição de ‘trick-or-treat’ (doce ou travessura)?",
    options: ["Guising e Souling", "Samhain", "O festival de Pomona", "Festa de All Souls' Day"],
    answer: "Guising e Souling"
  },
  { 
    question: "Qual a origem histórica do símbolo da abóbora no Halloween?",
    options: ["Representa fertilidade", "Representa a alma das colheitas", "Era um símbolo de prosperidade", "Era usado para afastar os espíritos malignos"],
    answer: "Era usado para afastar os espíritos malignos"
  },
  { 
    question: "Durante o festival de Samhain, os celtas acreditavam que...",
    options: ["O véu entre os vivos e os mortos ficava mais fino", "As estrelas se alinhavam com o sol", "Os mortos visitavam suas casas para coletar ofertas", "Os espíritos eram banidos para o além"],
    answer: "O véu entre os vivos e os mortos ficava mais fino"
  },
  { 
    question: "Qual cor simboliza a morte no contexto do Halloween e suas tradições antigas?",
    options: ["Roxo", "Preto", "Laranja", "Branco"],
    answer: "Preto"
  },
  { 
    question: "Por que os gatos pretos estão associados ao Halloween?",
    options: ["Eles eram considerados guardiões das almas", "Eram vistos como 'familiars' de bruxas", "Simbolizam boa sorte", "Eles caçavam ratos durante as festas de Samhain"],
    answer: "Eram vistos como 'familiars' de bruxas"
  },
  { 
    question: "Em que século a Igreja Católica influenciou a criação do Halloween ao associá-lo ao Dia de Todos os Santos?",
    options: ["VIII", "X", "XII", "V"],
    answer: "VIII"
  },
  { 
    question: "Qual símbolo do Halloween está diretamente relacionado a um antigo ritual romano de adoração à deusa Pomona?",
    options: ["Maçã", "Abóbora", "Caveira", "Vela"],
    answer: "Maçã"
  }
];

// Função de embaralhamento (Fisher-Yates Shuffle)
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Gera um índice aleatório
    [questions[i], questions[j]] = [questions[j], questions[i]]; // Troca os elementos
  }
}

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result");
const scoreContainer = document.getElementById("score");
const finalResultsContainer = document.getElementById("final-results");
const nextButton = document.getElementById("next-btn");
const submitButton = document.querySelector(".submit-btn");

// Embaralha as perguntas quando a página for carregada
shuffleQuestions();

function displayQuestion() {
  console.log(`Exibindo pergunta ${currentQuestionIndex + 1}`);

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
  nextButton.style.display = "none"; 
  submitButton.style.display = "inline-block"; 
}

function selectOption(index) {
  console.log(`Opção ${index} selecionada`);
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

  submitButton.style.display = "none"; 
  nextButton.style.display = "inline-block"; 
}

function nextQuestion() {
  currentQuestionIndex++;
  displayQuestion();
}

function displayFinalResults() {
  questionContainer.style.display = "none";
  submitButton.style.display = "none";
  resultContainer.style.display = "none";
  nextButton.style.display = "none"; 
  finalResultsContainer.style.display = "block";

  let finalResultHTML = `
    <h2>Resultados Finais</h2>
    <p class="final-score">Pontuação Final: ${score} de ${questions.length}</p>
    <button onclick="location.reload()" class="restart-btn">Reiniciar Quiz</button>
  `;

  finalResultsContainer.innerHTML = finalResultHTML;
}

displayQuestion();
