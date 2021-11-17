const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name:')
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToButton()

    //Send to server
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

socket.on('message', (msg) => {
    // console.log(msg)
    appendMessage(msg, 'incoming')
    scrollToButton()
})

function scrollToButton() {
    messageArea.scrollTop = messageArea.scrollHeight
}


const student = {
    name: 'John'
    , surname: 'Doe'
    , age: 18
};

const RAPIDAPI_REQUEST_HEADERS = {
    'Content-Type': 'application/json'
};

const RAPIDAPI_API_URL = 'http://localhost:3000/test';

axios.post(RAPIDAPI_API_URL, student, { headers: RAPIDAPI_REQUEST_HEADERS })
  .then(response => {
          const data = response.data;
          console.log('data', data);
  })

  .catch(error => console.error('On create student error', error));