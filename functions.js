const axios = require('axios').default
const uuidv4 = require('uuid/v4');

const reqUuid = uuidv4();
const tempId = uuidv4();

const newProj = (sender, task) => {
  axios({
      method: 'post',
      url: 'https://api.todoist.com/sync/v8/sync',
      data : {
        token: '9a0f6ecddbf1a5ff14f92db52c4e48a3a2cea00b',
        commands: [{
          type: "item_add",
          temp_id: uuidv4(),
          uuid: uuidv4(),
          args: {
            content: `${task} | ${sender}`,
            project_id: "2214138921",
          }
        }]
      }
    })
    .then((res) => {
      console.log('rebst', res);
    })
}


const submitTask = (event) => {
  const sender = document.getElementById("td-sender").value;
  const task = document.getElementById("td-task").value;
  newProj(sender, task)
}
