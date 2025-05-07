const form = document.getElementById('driver-form');
const dashboard = document.querySelector('.dashboard');
const infoList = document.getElementById('infoList');

let map = null;
let driverCount = 0;
const drivers = {}; // id -> { marker, name, vehicle, lat, lng }

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('driverName').value.trim();
  const vehicle = document.getElementById('vehicleType').value.trim();

  if (!name || !vehicle) {
    alert('Preencha todos os campos!');
    return;
  }

  form.reset();
  dashboard.style.display = 'grid';

  const id = `driver_${++driverCount}`;
  addDriver(id, name, vehicle);
});

function addDriver(id, name, vehicle) {
  const card = document.createElement('div');
  card.className = 'driver-card';
  card.innerHTML = `
    <p><strong>${name}</strong></p>
    <p>${vehicle}</p>
  `;
  card.addEventListener('click', () => {
    const driver = drivers[id];
    if (driver && map) {
      map.setView([driver.lat, driver.lng], 18);
      driver.marker.openPopup();
    }
  });
  infoList.appendChild(card);

  // Simula rastreamento com a localização do navegador
  if (!navigator.geolocation) {
    alert("Geolocalização não suportada.");
    return;
  }

  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;

    if (!map) {
      map = L.map('map').setView([latitude, longitude], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);
    }

    const marker = L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(`<b>${name}</b><br>${vehicle}`)
      .openPopup();

    drivers[id] = {
      marker,
      name,
      vehicle,
      lat: latitude,
      lng: longitude
    };
  });
}
