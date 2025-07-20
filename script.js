let tasks = [];
let rescheduleIndex = null;

function goToTodo() {
  hideAll();
  document.getElementById('todoPage').style.display = 'block';
  renderTasks();
}

function goToHome() {
  hideAll();
  tasks = [];
  document.getElementById('homePage').style.display = 'block';
}

function hideAll() {
  const sections = ['homePage', 'todoPage', 'completionPage', 'reschedulePage', 'deletePage', 'allDonePage'];
  sections.forEach(id => document.getElementById(id).style.display = 'none');
}

function addTask() {
  const name = document.getElementById('taskInput').value.trim();
  const date = document.getElementById('taskDateTime').value;
  if (!name || !date) return;

  tasks.push({ name, date });
  document.getElementById('taskInput').value = '';
  document.getElementById('taskDateTime').value = '';
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  const completedList = document.getElementById('completedList');
  taskList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach((task, index) => {
    if (task.completed) {
      const li = document.createElement('li');
      li.innerText = `${task.name} (${task.date})`;
      completedList.appendChild(li);
    } else {
      const li = document.createElement('li');
      li.className = 'task';
      li.innerHTML = `${task.name} (${task.date})`;

      const doneBtn = document.createElement('button');
      doneBtn.innerText = 'Done';
      doneBtn.onclick = () => completeTask(index);
      li.appendChild(doneBtn);

      const rescheduleBtn = document.createElement('button');
      rescheduleBtn.innerText = 'Reschedule';
      rescheduleBtn.onclick = () => openRescheduleDialog(index);
      li.appendChild(rescheduleBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      deleteBtn.onclick = () => deleteTask(index);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    }
  });

  if (tasks.length > 0 && tasks.every(t => t.completed)) {
    hideAll();
    document.getElementById('allDonePage').style.display = 'block';
  }
}

function completeTask(index) {
  tasks[index].completed = true;
  document.getElementById('completedTaskName').innerText = tasks[index].name;
  hideAll();
  document.getElementById('completionPage').style.display = 'block';
}

function openRescheduleDialog(index) {
  rescheduleIndex = index;
  const task = tasks[index];
  document.getElementById("modalTaskName").innerText = task.name;
  document.getElementById("modalOldDate").innerText = task.date;
  document.getElementById("newDateInput").value = task.date;
  document.getElementById("rescheduleModal").style.display = "flex";
}

function confirmReschedule() {
  const newDate = document.getElementById("newDateInput").value;
  const task = tasks[rescheduleIndex];
  const oldDate = task.date;
  task.date = newDate;
  document.getElementById("rescheduleModal").style.display = "none";
  document.getElementById("rescheduleMsg").innerText = `${task.name} rescheduled from ${oldDate} to ${newDate}`;
  hideAll();
  document.getElementById("reschedulePage").style.display = "block";
}

function closeModal() {
  document.getElementById("rescheduleModal").style.display = "none";
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    const taskName = tasks[index].name;
    tasks.splice(index, 1);
    document.getElementById('deletedTaskName').innerText = taskName;
    hideAll();
    document.getElementById('deletePage').style.display = 'block';
  }
}