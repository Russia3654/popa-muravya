async function fetchScheduleData() {
  const response = await fetch('/popa-muravya/assets/json/schedule.json');
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return await response.json();
}

document.getElementById('semesterSelect').addEventListener('change', async (event) => {
  const selectedSemester = event.target.value;
});

async function createSchedule(semesterId) {
  const scheduleData = await fetchScheduleData();
  const scheduleTable = document.getElementById('scheduleTable');
  const scheduleInfo = document.getElementById('scheduleInfo');

  // Clear the previous schedule
  scheduleTable.innerHTML = '';

  // Filter schedules based on the selected semester
  const filteredSchedules = scheduleData.schedules.filter(schedule => schedule.semester_id === parseInt(semesterId));

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
      "15:00": 9,
      "16:00": 10
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

  // Create subject containers based on filtered schedules
  filteredSchedules.forEach(schedule => {

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

      // Add click event to show subject info
      subjectContainer.addEventListener('click', () => {
        // Check if the info container already exists
        let subjectInfoContainer = document.getElementById('subjectInfoContainer');
        if (!subjectInfoContainer) {
            // Create the information container if it doesn't exist
            subjectInfoContainer = document.createElement('div');
            subjectInfoContainer.id = 'subjectInfoContainer';
            subjectInfoContainer.className = 'subject-info-container';
            subjectInfoContainer.style.display = 'none';

            // Create content area
            const subjectInfoContent = document.createElement('div');
            subjectInfoContent.id = 'subjectInfoContent';
            subjectInfoContainer.appendChild(subjectInfoContent);

            // Create close button
            const closeInfoButton = document.createElement('button');
            closeInfoButton.id = 'closeInfoButton';
            closeInfoButton.textContent = 'Close';
            subjectInfoContainer.appendChild(closeInfoButton);

            // Append the container to the body
            scheduleInfo.appendChild(subjectInfoContainer);

            // Close button functionality
            closeInfoButton.addEventListener('click', () => {
                subjectInfoContainer.style.display = 'none'; // Hide the info container
            });
        }

        // Populate the information container with relevant data
        const subjectName = getSubjectName(schedule.subject_id, scheduleData.subjects);
        const teacherName = getTeacherName(schedule.subject_id, scheduleData.subjects, scheduleData.teachers);
        subjectInfoContent.innerHTML = `
            <h2>${subjectName}</h2>
            <p><strong>Teacher:</strong> ${teacherName}</p>
            <p><strong>Day:</strong> ${schedule.day}</p>
            <p><strong>Start Time:</strong> ${schedule.start_time}</p>
            <p><strong>End Time:</strong> ${schedule.end_time}</p>
        `;
        subjectInfoContainer.style.display = 'flex'; // Show the info container
    });

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
              subjectContainer.style.gridRowEnd = `span ${rowSpan}`; // Set row span
          } else {
              console.warn(`Invalid row span for schedule: ${schedule}`);
          }
          // Add specific class based on the time slot
          if (brst.endsWith(':15')) {
              subjectContainer.classList.add('start-hh-15');
          } else if (brst.endsWith(':20')) {
            subjectContainer.classList.add('start-hh-20');
          } else if (brst.endsWith(':30')) {
              subjectContainer.classList.add('start-hh-30');
          } else if (brst.endsWith(':45')) {
              subjectContainer.classList.add('start-hh-45');
          }
          if (rowSpan === 1){
            subjectContainer.classList.add('duration-1h');
          } else if (rowSpan === 2){
            subjectContainer.classList.add('duration-2h');
          }
      }

      subjectContainer.appendChild(subjectDiv);
      scheduleTable.appendChild(subjectContainer);
  });
}

// Function to round times to the nearest hour or half-hour and display in "HH:00" format
function getRoundedTime(time) {
  const [hour, minute] = time.split(':').map(Number);

  if (minute < 60) {
      return `${hour.toString().padStart(2, '0')}:00`;
  }
  if (minute < 45){
      return `${hour.toString().padStart(2, '0')}:45`;
  }
  if (minute < 30) {
      return `${hour.toString().padStart(2, '0')}:30`;
  }
  if (minute < 15) {
      return `${hour.toString().padStart(2, '0')}:15`;
  }
}

// Function to get the subject name based on subject ID
function getSubjectName(subjectId, subjects) {
  const subject = subjects.find(sub => sub.id === subjectId);
  return subject ? subject.name : 'Unknown Subject';
}

// Function to get the teacher name based on teacher ID
function getTeacherName(subjectId, subjects ,teachers) {
  const subject = subjects.find(sub => sub.id === subjectId);
  const teacher = teachers.find(tea => tea.id === subject.teacher_id);
  return teacher ? teacher.name : 'Unknown Teacher'
}

// Function to get the subject class based on schedule
function getSubjectClass(schedule) {
  return schedule.class_type || 'default-class';
}

// Initial call to create the schedule for the default semester
document.addEventListener('DOMContentLoaded', async () => {
  const semesterSelect = document.getElementById('semesterSelect');
  const showScheduleButton = document.getElementById('showScheduleButton');

  // Add event listener for the button click
  showScheduleButton.addEventListener('click', async () => {
      const selectedSemesterId = semesterSelect.value; // Get the selected semester ID
      await createSchedule(selectedSemesterId); // Create the schedule for the selected semester
  });
});