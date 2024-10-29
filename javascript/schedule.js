async function fetchScheduleData() {
  const response = await fetch('/popa-muravya/assets/json/schedule.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

async function createSchedule() {
  const scheduleData = await fetchScheduleData();
  const scheduleTable = document.getElementById('scheduleTable');

  const dayMapping = {
    "Monday": 2,
    "Tuesday": 3,
    "Wednesday": 4,
    "Thursday": 5,
    "Friday": 6
  };

  const timeMapping = {
    "08:00": 2,
    "09:00": 3,
    "10:00": 4,
    "11:00": 5,
    "12:00": 6,
    "13:00": 7,
    "14:00": 8,
    "15:00": 9
  };

  // Create day headers
  Object.keys(dayMapping).forEach(day => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day', day.toLowerCase());
    dayDiv.textContent = day;
    scheduleTable.appendChild(dayDiv);
  });

  // Create time headers
  const times = Object.keys(timeMapping);
  times.forEach(time => {
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time', `${time.replace(':', '')}-time`);
    timeDiv.textContent = time;
    scheduleTable.appendChild(timeDiv);
  });

  // Create subject containers
  scheduleData.schedules.forEach(schedule => {
    console.log('Processing schedule:', schedule); // Log the current schedule entry

    const subjectContainer = document.createElement('div');
    const subjectClass = getSubjectClass(schedule);

    if (subjectClass) {
      subjectContainer.classList.add('subject-container', subjectClass);
    } else {
      console.warn(`Skipping schedule entry due to missing data:`, schedule);
      return; // Skip this entry if no valid class can be generated
    }

    const subjectDiv = document.createElement('div');
    subjectDiv.classList.add('subject');
    subjectDiv.textContent = getSubjectName(schedule.subject_id, scheduleData.subjects);

    // Calculate grid position using mappings
    const brst = schedule.start_time;
    const bret = schedule.end_time;
    const dayIndex = dayMapping[schedule.day];
    const startTime = getRoundedTime(brst);
    const endTime = getRoundedTime(bret);

    const startTimeIndex = timeMapping[startTime];
    const endTimeIndex = timeMapping[endTime];

    if (dayIndex && startTimeIndex !== undefined) {
      subjectContainer.style.gridColumn = dayIndex; // Set column based on day
      subjectContainer.style.gridRow = startTimeIndex; // Set row based on start time

      // Calculate how many rows to span based on the duration
      const rowSpan = endTimeIndex - startTimeIndex;
      if (rowSpan > 0) {
        subjectContainer.style.gridRowEnd = `span 1`; // Set row span
      } else {
        console.warn(`Invalid row span for schedule: ${schedule}`);
      }
      // Add specific class based on the time slot
      if (brst.endsWith(':15')) {
        subjectContainer.classList.add('start-hh-15');
      } else if (brst.endsWith(':30')) {
        subjectContainer.classList.add('start-hh-30');
      } else if (brst.endsWith(':45')) {
        subjectContainer.classList.add('start-hh-45');
      }
      if ((bret.endsWith(':15')) || (bret.endsWith(':30')) || (bret.endsWith(':45'))) {
        subjectContainer.classList.add('end-hh-15');
      } 
    }

    subjectContainer.appendChild(subjectDiv);
    scheduleTable.appendChild(subjectContainer);
  });
}

// Function to round times to the nearest hour or half-hour and display in "HH:00" format
function getRoundedTime(time) {
  const [hour, minute] = time.split(':').map(Number);

  if (minute < 45) {
    return `${hour.toString().padStart(2, '0')}:00`;
  } else {
    return `${(hour + 1).toString().padStart(2, '0')}:00`;
  }
}

function getSubjectClass(schedule) {
  if (!schedule || !schedule.subject_id || !schedule.day || !schedule.start_time) {
    return null; // Return null if any required property is missing
  }

  const subjectClass = {
    1: 'ds', // Discrete Method
    2: 'it', // Internet Technology
    3: 'cn', // Computer Network
    4: 'ch'  // General Chemistry
  };

  return subjectClass[schedule.subject_id] ? `${subjectClass[schedule.subject_id]}-${schedule.subject_id}` : null; // Use subject_id for differentiation
}

function getSubjectName(subjectId, subjects) {
  if (!subjectId || !subjects) {
    return null; // Return null if any required property is missing
  }

  const subjectName = subjects.find(subject => subject.id === subjectId)?.name;

  return subjectName;
}

createSchedule();