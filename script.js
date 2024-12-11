// Sample data
const busSchedule = [
  { bus: 'ТАСИМ КОМПАНИ', station: 'ОРИЗАРИ', area: 'РЕКА', time: '19:30' },
  { bus: '102', station: 'АТОМСКИ', area: 'Руен', time: '16:00' },
  { bus: '103', station: 'УСОВА ЧЕШМА', area: 'Такси Ројал', time: '20:15' },
  { bus: '104', station: 'АВТОБУСКА', area: 'Пазарче', time: '22:45' },
  { bus: '105', station: 'ПОШТА', area: 'Пошта', time: '20:45' },
  { bus: '106', station: 'ХОТЕЛ ЛЕДЕР', area: 'Хотел Ледер', time: '22:50' },
  { bus: '106', station: 'ПЛОШТАД', area: 'Собрание', time: '20:15' },
  { bus: '106', station: 'БАВЧАЛУК', area: 'Мост', time: '21:00' },
  { bus: '106', station: 'БОЛНИЦА', area: 'Маркет Кај Тоше', time: '21:45' },
];

// Get unique stations from the schedule
const stations = [...new Set(busSchedule.map(item => item.station))];

// State variable to track current station filter
let currentStation = null;

// Function to display stations as buttons
function displayStations() {
  const stationsContainer = document.getElementById('stations');
  stations.forEach(station => {
      const button = document.createElement('button');
      button.textContent = station;
      button.className = 'station-btn';
      button.onclick = () => {
          currentStation = station; // Set current station
          filterByStationAndTime();
      };
      stationsContainer.appendChild(button);
  });

  // Add "Show All" button
  const showAllButton = document.createElement('button');
  showAllButton.textContent = 'ПРИКАЖИ ГИ СИТЕ';
  showAllButton.className = 'station-btn';
  showAllButton.style.backgroundColor = '#ffc107'; // Yellow button
  showAllButton.onclick = () => {
      currentStation = null; // Reset station filter
      filterByStationAndTime();
  };
  stationsContainer.appendChild(showAllButton);
}

// Function to calculate time difference in minutes
function getTimeDifference(currentTime, busTime) {
  const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
  const [busHours, busMinutes] = busTime.split(':').map(Number);

  const currentTotalMinutes = currentHours * 60 + currentMinutes;
  const busTotalMinutes = busHours * 60 + busMinutes;

  return busTotalMinutes - currentTotalMinutes;
}

// Function to display the schedule
function displaySchedule(schedule) {
  const scheduleContainer = document.getElementById('schedule');
  scheduleContainer.innerHTML = '';
  if (schedule.length === 0) {
      scheduleContainer.innerHTML = `<p style="text-align:center; font-weight:bold; color:#dc3545;">Моментално нема автобуси за оваа линија</p>`;
      return;
  }
  schedule.forEach(item => {
      const currentTime = new Date();
      const currentTimeString = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
      const minutesLeft = getTimeDifference(currentTimeString, item.time);

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
          <h3>Автобус: ${item.bus}</h3>
          <p><strong>Станица:</strong> ${item.station}</p>
          <p><strong>Постојка:</strong> ${item.area}</p>
          <p><strong>Пристигнува во:</strong> ${item.time}</p>
          <p><strong>Пристигнува за:</strong> ${minutesLeft} минути</p>
      `;
      scheduleContainer.appendChild(card);
  });
}

// Function to filter schedule by station and time
function filterByStationAndTime() {
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTimeString = `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;

  // Filter by current station and time
  const filtered = busSchedule.filter(item =>
      (!currentStation || item.station === currentStation) &&
      item.time > currentTimeString
  );

  displaySchedule(filtered);
}

// Initial setup
displayStations();
filterByStationAndTime(); // Show all stations initially
