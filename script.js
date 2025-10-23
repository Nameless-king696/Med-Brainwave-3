// ---------- صفحة الطلاب ----------
if(document.getElementById("questionText")){
  const yearSelect = document.getElementById("yearSelect");
  const subjectSelect = document.getElementById("subjectSelect");
  const questionText = document.getElementById("questionText");
  const choicesContainer = document.getElementById("choicesContainer");
  const nextBtn = document.getElementById("nextBtn");
  const result = document.getElementById("result");

  let currentIndex = 0;
  let score = 0;
  let questions = [];

  function loadSubjects(){
    const year = yearSelect.value;
    const allQuestions = JSON.parse(localStorage.getItem('questions')) || {};
    subjectSelect.innerHTML = '<option value="">اختر المادة</option>';
    if(allQuestions[year]){
      Object.keys(allQuestions[year]).forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub;
        opt.textContent = sub;
        subjectSelect.appendChild(opt);
      });
    }
    questions = [];
    questionText.textContent = "اختر المادة للبدء";
    choicesContainer.innerHTML = "";
    nextBtn.style.display = "none";
    result.textContent = "";
  }

  function loadQuestions(){
    const year = yearSelect.value;
    const subject = subjectSelect.value;
    const allQuestions = JSON.parse(localStorage.getItem('questions')) || {};
    questions = (allQuestions[year] && allQuestions[year][subject]) || [];
    currentIndex = 0;
    score = 0;
    if(questions.length > 0){
      showQuestion();
    } else {
      questionText.textContent = "لا توجد أسئلة لهذه المادة بعد.";
      choicesContainer.innerHTML = "";
      nextBtn.style.display = "none";
      result.textContent = "";
    }
  }

  function showQuestion(){
    const q = questions[currentIndex];
    questionText.textContent = q.question;
    choicesContainer.innerHTML = "";
    result.textContent = "";
    q.choices.forEach((choice,index)=>{
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.classList.add("choice-btn");
      btn.onclick = () => checkAnswer(index);
      choicesContainer.appendChild(btn);
    });
    nextBtn.style.display = "inline-block";
  }

  function checkAnswer(selectedIndex){
    const q = questions[currentIndex];
    if(selectedIndex === q.answer){
      score++;
      result.textContent = "إجابة صحيحة!";
      result.style.color = "green";
    } else {
      result.textContent = `إجابة خاطئة. الإجابة الصحيحة: ${q.choices[q.answer]}`;
      result.style.color = "red";
    }
    Array.from(choicesContainer.children).forEach(btn=>btn.disabled=true);
  }

  nextBtn.addEventListener("click",()=>{
    currentIndex++;
    if(currentIndex < questions.length){
      showQuestion();
    } else {
      questionText.textContent = `انتهت الأسئلة! مجموع النقاط: ${score} من ${questions.length}`;
      choicesContainer.innerHTML="";
      nextBtn.style.display = "none";
    }
  });

  yearSelect.addEventListener("change", loadSubjects);
  subjectSelect.addEventListener("change", loadQuestions);
}
