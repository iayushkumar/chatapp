
const johnSelectorBtn=document.querySelector('#john-selector')
const janeSelectorBtn=document.querySelector('#jane-selector')

const chatHeader=document.querySelector('.chat-header')
const chatMessages=document.querySelector('.chat-messages')
const chatInputForm=document.querySelector('.chat-input-form')
const chatInput=document.querySelector('.chat-input')
const clearChatBtn=document.querySelector('.clear-chat-button')

const messages=JSON.parse(localStorage.getItem('messages'))|| []


const createChatMessageElement=(message)=>`
<div class="message ${message.sender==='Ayush' ? 'blue-bg':'gray-bg'}">
<div class="message-sender">${message.sender}</div>
<div class="message-text">${message.text}</div>
<div class="message-timestamp">${message.timestamp}</div>
</div>
`

window.onload=()=>
{
    messages.forEach((message)=>{
        chatMessages.innerHTML+=createChatMessageElement(message)
    })
}

let messageSender='Ayush'

const updateMessageSender=(name)=>
{
    messageSender=name
    chatHeader.innerText=`${messageSender} chatting...`
    chatInput.placeholder=`type here,${messageSender}...`

    if(name==='Ayush')
    {
        johnSelectorBtn.classList.add('active-person')
        janeSelectorBtn.classList.remove('active-person')
    }

   if(name==='Ankit')
   {
        
        janeSelectorBtn.classList.add('active-person')
        johnSelectorBtn.classList.remove('active-person')
   }

   chatInput.focus()
}

johnSelectorBtn.onclick=()=>updateMessageSender('Ayush')
janeSelectorBtn.onclick=()=>updateMessageSender('Ankit')

const sendMessage=(e)=>
{
    e.preventDefault()

    const timestamp=new Date().toLocaleDateString('en-Us',{hour:'numeric',minute:'numeric',hour12:true})

    const message={
        sender:messageSender,
        text:chatInput.value,
        timestamp,
    }

    messages.push(message)
    localStorage.setItem('messages',JSON.stringify(messages))


chatMessages.innerHTML+=createChatMessageElement(message)


chatInputForm.reset()

chatMessages.scrollTop = chatMessages.scrollHeight
}


chatInputForm.addEventListener('submit',sendMessage);

clearChatBtn.addEventListener('click',()=>
{
    localStorage.clear();
    chatMessages.innerHTML=''
})