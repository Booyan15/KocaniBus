// Sample data
const busSchedule = [
    { bus: 'ТАСИМ КОМПАНИ', station: 'ОРИЗАРИ', area: 'РЕКА', time: '19:30' },
    { bus: '102', station: 'АТОМСКИ', area: 'centar', time: '16:00' },
    { bus: '103', station: 'УСОВА ЧЕШМА', area: 'main square', time: '19:15' },
    { bus: '104', station: 'АВТОБУСКА', area: 'east park', time: '19:45' },
    { bus: '105', station: 'ПОШТА', area: 'south terminal', time: '19:45' },
    { bus: '106', station: 'ХОТЕЛ ЛЕДЕР', area: 'north gate', time: '19:50' },
    { bus: '106', station: 'ПЛОШТАД', area: 'north gate', time: '19:45' },
    { bus: '106', station: 'БАВЧАЛУК', area: 'north gate', time: '19:45' },
    { bus: '106', station: 'БОЛНИЦА', area: 'north gate', time: '19:45' },

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
  
  // Function to display the schedule
  function displaySchedule(schedule) {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = '';
    if (schedule.length === 0) {
      scheduleContainer.innerHTML = `<p style="text-align:center; font-weight:bold; color:#dc3545;">Моментално нема автобуси за оваа линија</p>`;
      return;
    }
    schedule.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>Автобус: ${item.bus}</h3>
        <p><strong>Станица:</strong> ${item.station}</p>
        <p><strong>Постојка:</strong> ${item.area}</p>
        <p><strong>Пристигнува во:</strong> ${item.time}</p>
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
  