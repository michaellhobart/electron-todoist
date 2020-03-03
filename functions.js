const axios = require('axios').default
const uuidv4 = require('uuid/v4');

const reqUuid = uuidv4();
const tempId = uuidv4();

const submitButton = document.getElementById('submit-task-button');
const sendMessage = document.getElementById('sending-message');

const newProj = (sender, task) => {
  submitButton.classList.toggle('flex')
  submitButton.classList.toggle('dn')
  sendMessage.classList.toggle('flex')
  sendMessage.classList.toggle('dn')
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
            project_id: "<project id>",
          }
        }]
      }
    })
    .then((res) => {
      console.log('repsonse', res);
      // Adds a little bit of time for the message to display to user properly.
      setTimeout(function(){
        submitButton.classList.toggle('flex')
        submitButton.classList.toggle('dn')
        sendMessage.classList.toggle('flex')
        sendMessage.classList.toggle('dn')
      }, 1000)

    })
}


const submitTask = (event) => {
  const sender = document.getElementById("td-sender").value;
  const task = document.getElementById("td-task").value;
  newProj(sender, task)
}
