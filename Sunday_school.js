  // Кнопка "Наверх"
const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
  if (document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Поля формы
const dateInput = document.getElementById('date');
const groupSelect = document.getElementById('group');
const teacherSelect = document.getElementById('teacher');
const notesInput = document.getElementById('notes');
const homeworkInput = document.getElementById('homework');
const addButton = document.getElementById('addRecordBtn');
const recordsList = document.getElementById('recordsList');

// Функция сохранения списка
function saveRecords() {
  localStorage.setItem("recordsData", recordsList.innerHTML);
}

// Функция удаления с плавной анимацией
function deleteRecord(li) {
  li.classList.add("removing"); // добавляем CSS класс для анимации
  setTimeout(() => {
    li.remove();                // удаляем элемент после анимации
    saveRecords();              // сохраняем обновлённый список
  }, 300); // время должно совпадать с transition в CSS
}

// Загрузка списка из localStorage
function loadRecords() {
  const saved = localStorage.getItem("recordsData");
  if (saved) {
    recordsList.innerHTML = saved;

    // Восстановление кнопок удаления для каждой записи
    document.querySelectorAll(".delete-btn").forEach(btn => {
      const li = btn.parentElement;
      btn.addEventListener("click", function() {
        deleteRecord(li);
      });
    });
  }
}

// Добавление новой записи
addButton.addEventListener('click', function() {
  const date = dateInput.value.trim();
  const group = groupSelect.value;
  const teacher = teacherSelect.value;
  const notes = notesInput.value.trim();
  const homework = homeworkInput.value.trim() || "—";

  if (!date || !group || !teacher || !notes) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `${date} | ${group} | ${teacher} | ${notes} | Домашнее задание: ${homework}
      <button class="delete-btn">Удалить</button>`;

  recordsList.appendChild(li);

  // Назначаем кнопку удаления для новой записи
  li.querySelector(".delete-btn").addEventListener("click", function() {
    deleteRecord(li);
  });

  saveRecords();

  // Очищаем форму
  dateInput.value = '';
  groupSelect.value = '';
  teacherSelect.value = '';
  notesInput.value = '';
  homeworkInput.value = '';
});

// Загружаем записи при старте
loadRecords();
