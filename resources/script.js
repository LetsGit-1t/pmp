// escape to avoid naive XSS if you ever inject raw text
function escapeText(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const windowEl = document.getElementById('chat-window');

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  // create a new message node
  const p = document.createElement('p');
  p.classList.add('message', 'outgoing'); // or 'incoming' based on your logic
  p.innerHTML = escapeText(text); // safe insertion

  windowEl.appendChild(p);
  input.value = '';
  input.focus();

  // optional: scroll to bottom if overflow
  windowEl.scrollTo({ top: windowEl.scrollHeight, behavior: 'smooth' });
  // simulate incoming message for demo purposes
  setTimeout(() => {
    const incomingMessage = document.createElement('p');
    incomingMessage.classList.add('message', 'incoming');
    incomingMessage.innerHTML = escapeText("This is a simulated response.");
    windowEl.appendChild(incomingMessage);
    windowEl.scrollTo({ top: windowEl.scrollHeight, behavior: 'smooth' });
  }, 1000); // simulate a delay for incoming message
});

// Handle conversation card selection via event delegation
document.querySelector('.conversations').addEventListener('click', e => {
  const card = e.target.closest('.conversation-card');
  if (card) {
    const id = card.getAttribute('data-conversation-id');
    // Load the selected conversation messages into the chat window
    windowEl.innerHTML = ''; // clear current messages
    // fetch messages for this conversation ID
    const messages = fetchMessagesForConversation(id); // assume this function fetches messages
    // For demo, we will just append a placeholder message
    const placeholderMessage = document.createElement('p');
    placeholderMessage.classList.add('message', 'incoming');
    placeholderMessage.innerHTML = escapeText(`Loaded messages for conversation ID: ${id}`);
    windowEl.appendChild(placeholderMessage);
    windowEl.scrollTo({ top: windowEl.scrollHeight, behavior: 'smooth' });
  }
});

// Handle new message button click
document.getElementById('new-message-button').addEventListener('click', e => {
  // create a new coversation card
  const newCard = document.createElement('div');
  newCard.classList.add('conversation-card');
  newCard.setAttribute('data-conversation-id', Date.now()); // use timestamp as ID
  newCard.innerHTML = `
    <div class="initials">NM</div>
    <section class="conversation-details">
      <div class="name">New Message</div>
      <div class="last-message">Start a new conversation...</div>
    </section>
  `;
  document.querySelector('.conversations').appendChild(newCard);
  // Optionally, you can also load this new conversation into the chat window
  windowEl.innerHTML = ''; // clear current messages
  const placeholderMessage = document.createElement('p');
  placeholderMessage.classList.add('message', 'incoming');
  placeholderMessage.innerHTML = escapeText(`Started a new conversation.`);
  windowEl.appendChild(placeholderMessage);
  windowEl.scrollTo({ top: windowEl.scrollHeight, behavior: 'smooth' });
});