// Simple client-side state. No server needed.
const wallEl = document.getElementById('wall');
const msgInput = document.getElementById('message');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');

let wall = JSON.parse(localStorage.getItem('gitPracticeWall') || '[]');

function render() {
  wallEl.innerHTML = '';
  if (wall.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No messages yet. Add one!';
    li.style.opacity = 0.7;
    wallEl.appendChild(li);
    return;
  }
  wall.slice().reverse().forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${escapeHtml(item.text)}</span><small>${new Date(item.t).toLocaleString()}</small>`;
    wallEl.appendChild(li);
  });
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

addBtn.addEventListener('click', () => {
  const text = msgInput.value.trim();
  if (!text) return alert('Please type a message first.');
  wall.push({ text, t: Date.now() });
  localStorage.setItem('gitPracticeWall', JSON.stringify(wall));
  msgInput.value = '';
  render();
});

clearBtn.addEventListener('click', () => {
  if (!confirm('Clear all messages?')) return;
  wall = [];
  localStorage.removeItem('gitPracticeWall');
  render();
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(wall, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wall.json';
  a.click();
  URL.revokeObjectURL(url);
});

render();
