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
  p.innerHTML = escapeText(text); // safe insertion

  windowEl.appendChild(p);
  input.value = '';
  input.focus();

  // optional: scroll to bottom if overflow
  windowEl.scrollTop = windowEl.scrollHeight;
});

