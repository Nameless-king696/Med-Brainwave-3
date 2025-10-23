const yearSelect = document.getElementById('yearSelect');
const questionInput = document.getElementById('questionInput');
const answerInput = document.getElementById('answerInput');
const addBtn = document.getElementById('addQuestionBtn');
const container = document.getElementById('questionsContainer');

// تحميل الأسئلة عند تغيير السنة
yearSelect.addEventListener('change', loadQuestions);

// إضافة سؤال جديد
addBtn.addEventListener('click', () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();
  const year = yearSelect.value;

  if (question && answer) {
    const allQuestions = JSON.parse(localStorage.getItem('questions')) || {};
    if (!allQuestions[year]) allQuestions[year] = [];
    allQuestions[year].push({ question, answer });
    localStorage.setItem('questions', JSON.stringify(allQuestions));

    questionInput.value = '';
    answerInput.value = '';
    loadQuestions();
  } else {
    alert("من فضلك اكتب السؤال والإجابة أولاً.");
  }
});

// تحميل الأسئلة الخاصة بالسنة المحددة
function loadQuestions() {
  const year = yearSelect.value;
  const allQuestions = JSON.parse(localStorage.getItem('questions')) || {};
  const yearQuestions = allQuestions[year] || [];

  container.innerHTML = '';
  if (yearQuestions.length === 0) {
    container.innerHTML = '<p>لا توجد أسئلة بعد لهذه السنة.</p>';
    return;
  }

  yearQuestions.forEach((q, index) => {
    const div = document.createElement('div');
    div.classList.add('question');
    div.innerHTML = `
      <h3>${index + 1}. ${q.question}</h3>
      <p class="answer">${q.answer}</p>
    `;
    container.appendChild(div);
  });
}

// تحميل أسئلة السنة الأولى عند فتح الموقع
loadQuestions();
