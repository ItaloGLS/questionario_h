const questions = [
    { question: "Qual festival antigo é a origem do Halloween?", options: ["Nabann", "Lughnasadh", "Samhain", "Ovo cozinhado"], answer: "Samhain" },
    { question: "Por que os celtas usavam fantasias durante o Samhain?", options: ["Para celebrar a colheita", "Para confundir os espíritos", "Para pedir boas energias", "Para atrair sorte"], answer: "Para confundir os espíritos" },
    { question: "Qual vegetal era originalmente usado para fazer Jack-o'-Lanterns na Irlanda?", options: ["Abóbora", "Batata", "Frango de Porco queimado empenado", "Nabo"], answer: "Nabo" },
    { question: "Em que país começou a tradição de esculpir abóboras?", options: ["Escócia", "Inglaterra", "Irlanda", "Marrom"], answer: "Irlanda" },
    { question: "Qual é a origem da tradição de trick-or-treat?", options: ["Festival da Colheita", "Samhain", "Guising e Souling", "Festival Romano"], answer: "Guising e Souling" },
    { question: "Qual mês é o Halloween?", options: ["Setembro", "Outubro", "Novembro", "Dezembro"], answer: "Outubro" },
    { question: "Qual cor é associada ao Halloween?", options: ["Verde", "Amarelo", "Roxo", "Laranja"], answer: "Laranja" },
    { question: "Qual criatura é popular no Halloween?", options: ["Lobisomem", "Zumbi", "Múmia", "Vampiro"], answer: "Vampiro" },
    { question: "Qual símbolo é comum no Halloween?", options: ["Estrela", "Abóbora", "Arco-íris", "Flor"], answer: "Abóbora" },
    { question: "Em que continente o Halloween se originou?", options: ["Ásia", "Europa", "América", "África"], answer: "Europa" }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let selectedOption = null;

  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result");
  const scoreContainer = document.getElementById("score");
  const finalResultsContainer = document.getElementById("final-results");

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
    currentQuestionIndex++;
    setTimeout(displayQuestion, 2000);
  }

  function displayFinalResults() {
    questionContainer.style.display = "none";
    document.querySelector(".submit-btn").style.display = "none";
    resultContainer.style.display = "none";
    finalResultsContainer.style.display = "block";

    let finalResultHTML = `
      <h2>Resultados Finais</h2>
      <p class="final-score">Pontuação Final: ${score} de ${questions.length}</p>
      <button onclick="location.reload()" class="restart-btn">Reiniciar Quiz</button>
    `;

    finalResultsContainer.innerHTML = finalResultHTML;
  }

  displayQuestion();