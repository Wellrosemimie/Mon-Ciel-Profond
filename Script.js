function showForm() {
  document.getElementById('formSection').style.display = "block";
}

function hideForm() {
  document.getElementById('formSection').style.display = "none";
}

function showMessage() {
  const msg = document.getElementById('message');
  msg.style.display = 'block';
  setTimeout(() => {
    msg.style.display = 'none';
  }, 2000);
}

function loadObservations() {
  const saved = localStorage.getItem("observations");
  if (saved) {
    const data = JSON.parse(saved);
    data.forEach(createCard);
  }
}

function saveObservation(data) {
  const saved = localStorage.getItem("observations");
  const observations = saved ? JSON.parse(saved) : [];
  observations.push(data);
  localStorage.setItem("observations", JSON.stringify(observations));
}

document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const imageInput = document.getElementById('imageInput');
  const titleInput = document.getElementById('titleInput');
  const dateInput = document.getElementById('dateInput');
  const typeInput = document.getElementById('typeInput');
  const commentInput = document.getElementById('commentInput');
  const watermark = document.getElementById('watermark').checked;

  const reader = new FileReader();
  reader.onload = function(event) {
    const data = {
      image: event.target.result,
      title: titleInput.value,
      date: dateInput.value,
      type: typeInput.value,
      comment: commentInput.value,
      watermark: watermark
    };
    createCard(data);
    saveObservation(data);
    showMessage();
  };

  reader.readAsDataURL(imageInput.files[0]);
  this.reset();
});

function createCard(data) {
  const gallery = document.getElementById('gallery');
  const card = document.createElement('div');
  card.classList.add('card');

  const img = new Image();
  img.src = data.image;
  img.alt = data.title;
  img.style.cursor = "pointer";
  img.onclick = () => openModal(data.image);

  card.appendChild(img);
  const caption = document.createElement("div");
  caption.innerHTML = `
    <h3>${data.title}</h3>
    <p><strong>Type :</strong> ${data.type}</p>
    <p><strong>Date :</strong> ${data.date}</p>
    <p>${data.comment}</p>
    <label><input type="checkbox"> Cochez si vous souhaitez refaire cette observation</label>
  `;
  card.appendChild(caption);
  gallery.appendChild(card);
}

function filterType(type) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (type === 'Tous' || card.innerHTML.includes(type)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

document.getElementById('toggleMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});

if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark-mode');
}

function openModal(src) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  modal.style.display = "block";
  modalImg.src = src;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.addEventListener("DOMContentLoaded", loadObservations);
