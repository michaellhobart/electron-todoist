const axios = require('axios').default
const uuidv4 = require('uuid/v4');

const reqUuid = uuidv4();
const tempId = uuidv4();

const newProj = (sender, task) => {
  axios({
      method: 'post',
      url: 'https://api.todoist.com/sync/v8/sync',
      data : {
        token: "<token>",
        commands: [{
          type: "item_add",
          temp_id: uuidv4(),
          uuid: uuidv4(),
          args: {
            content: `${task} | ${sender}`,
            project_id: "<project id",
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
