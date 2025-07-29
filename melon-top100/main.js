const DATA_URL = "https://pyhub.kr/melon/20231204.json";

async function fetchData() {
  const res = await fetch(DATA_URL);
  return await res.json();
}

function renderSongList(songs) {
  const list = document.getElementById("song-list");
  list.innerHTML = "";
  songs.forEach(song => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${song.rank}</strong>위</span>
      <span>${song.title} - ${song.artist}</span>
    `;
    list.appendChild(li);
  });
}

function renderArtistChart(songs) {
  const artistCount = {};
  songs.forEach(song => {
    artistCount[song.artist] = (artistCount[song.artist] || 0) + 1;
  });
  const labels = Object.keys(artistCount);
  const data = Object.values(artistCount);

  const ctx = document.getElementById('artistChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '곡 수',
        data: data,
        backgroundColor: '#4e73df'
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { title: { display: true, text: '아티스트' } },
        y: { title: { display: true, text: '곡 수' }, beginAtZero: true }
      }
    }
  });
}

async function init() {
  const data = await fetchData();
  renderSongList(data);
  renderArtistChart(data);
}

init();