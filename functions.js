const axios = require('axios').default
const uuidv4 = require('uuid/v4');

const reqUuid = uuidv4();
const tempId = uuidv4();

const token = ""

const submitButton = document.getElementById('submit-task-button');
const sendMessage = document.getElementById('sending-message');

const projectsList = document.getElementById('projects-list')

function sendingTemp(){
  submitButton.classList.toggle('flex')
  submitButton.classList.toggle('dn')
  sendMessage.classList.toggle('flex')
  sendMessage.classList.toggle('dn')
}

var state = {
  currentProj: ""
}


function handleProjectClick(e){
  state.currentProj = e.target.id
  Array.from(document.getElementsByClassName('project-button')).map(btn => btn.style.fontWeight = "400")
  document.getElementById(e.target.id).style.fontWeight = "900"
}


window.addEventListener("load", () => {
  axios.get('https://api.todoist.com/rest/v1/projects',{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then( res => {
    state.currentProj = res.data[0].id
    res.data.map(proj => {
      const projLI = document.createElement("li")
      projLI.innerText = proj.name
      projLI.id = proj.id
      projLI.classList.add("project-button")
      projLI.style.cursor = "pointer"
      projLI.addEventListener("click", e => handleProjectClick(e))
      projectsList.appendChild(projLI)
    })
    document.getElementById(state.currentProj).style.fontWeight = "900"
  })
})

const newProj = (sender, task) => {
  sendingTemp()
  axios({
      method: 'post',
      url: 'https://api.todoist.com/sync/v8/sync',
      data : {
        token: token,
        commands: [{
          type: "item_add",
          temp_id: uuidv4(),
          uuid: uuidv4(),
          args: {
            content: `${task} | ${sender}`,
            project_id: state.currentProj,
          }
        }]
      }
    })
    .then((res) => {
      console.log('repsonse', res);
      // Adds a little bit of time for the message to display to user properly.
      setTimeout(function(){
        sendingTemp()
      }, 1000)

    })
}




const submitTask = (event) => {
  const sender = document.getElementById("td-sender").value;
  const task = document.getElementById("td-task").value;
  newProj(sender, task)
}
