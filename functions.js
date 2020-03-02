const submitTask = (event) => {
  const sender = document.getElementById("td-sender").value;
  const task = document.getElementById("td-task").value;
  console.log(`${sender} sent the task ${task}`);
}
