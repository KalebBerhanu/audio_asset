const DATA_URL =
  "https://raw.githubusercontent.com/KalebBerhanu/audio_asset/main/file.json";

const albumList = document.getElementById("albumList");
const hero = document.getElementById("hero");
const tracks = document.getElementById("tracks");

const audio = document.getElementById("audio");
const nowTitle = document.getElementById("nowTitle");
const nowAuthor = document.getElementById("nowAuthor");

let library = [];

fetch(DATA_URL)
  .then(r => r.json())
  .then(data => {
    library = data;
    renderSidebar();
    openAlbum(library[0]);
  });

function renderSidebar() {
  albumList.innerHTML = "";
  library.forEach(album => {
    const div = document.createElement("div");
    div.textContent = album.title;
    div.onclick = () => openAlbum(album);
    albumList.appendChild(div);
  });
}

function openAlbum(album) {
  hero.innerHTML = `
    <img src="${album.coverUrl}">
    <div>
      <span class="badge">${album.content_type}</span>
      <h1>${album.title}</h1>
      <p>${album.author}</p>
    </div>
  `;

  tracks.innerHTML = "";
  album.chapters.forEach((t, i) => {
    const row = document.createElement("div");
    row.className = "track";
    row.innerHTML = `
      <span>${i + 1}</span>
      <div>${t.title}</div>
      <span>${time(t.durationSeconds)}</span>
    `;
    row.onclick = () => play(t, album);
    tracks.appendChild(row);
  });
}

function play(track, album) {
  audio.src = track.audioUrl;
  audio.play();
  nowTitle.textContent = track.title;
  nowAuthor.textContent = album.author;
}

function time(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
