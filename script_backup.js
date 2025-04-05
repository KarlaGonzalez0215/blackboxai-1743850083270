// Emergency button functionality
const emergencyBtn = document.getElementById('emergencyBtn');
const confirmModal = document.getElementById('confirmModal');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

if (emergencyBtn && confirmModal && confirmYes && confirmNo) {
  let clickCount = 0;
  let clickTimer = null;

  emergencyBtn.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 1) {
      clickTimer = setTimeout(() => {
        confirmModal.classList.remove('hidden');
        clickCount = 0;
      }, 300);
    } else if (clickCount >= 2) {
      clearTimeout(clickTimer);
      makeEmergencyCall();
      clickCount = 0;
    }
  });

  confirmYes.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
    makeEmergencyCall();
  });

  confirmNo.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
    clickCount = 0;
  });
} else {
  console.error('Emergency button elements not found');
}

function makeEmergencyCall() {
  alert('Llamando al número de emergencia: 072');
  console.log('Llamada realizada al 072');
}

// Breathing exercise functionality
const exerciseContent = document.getElementById('exercise-content');
const exerciseTitle = document.getElementById('exercise-title');
const exerciseInstructions = document.getElementById('exercise-instructions');
const progressBar = document.getElementById('progressBar');
const countdownDisplay = document.getElementById('countdown');
const exercisePhase = document.getElementById('exercise-phase');
const startButton = document.getElementById('start-exercise');
const stopButton = document.getElementById('stop-exercise');
const historyPanel = document.getElementById('historyPanel');
const historyList = document.getElementById('historyList');
const showHistory = document.getElementById('showHistory');

const exercises = {
  '478': {
    title: '4-7-8 Respiración',
    instructions: 'Inhala por 4 segundos, sostén por 7, exhala por 8. Repite 4 veces.',
    phases: [
      { name: 'Inhala', duration: 4, color: 'bg-green-500' },
      { name: 'Sostén', duration: 7, color: 'bg-yellow-500' },
      { name: 'Exhala', duration: 8, color: 'bg-blue-500' }
    ]
  },
  'diafragmatica': {
    title: 'Respiración Diafragmática',
    instructions: 'Respira profundamente por la nariz, llenando el abdomen. Exhala lentamente.',
    phases: [
      { name: 'Inhala', duration: 5, color: 'bg-green-500' },
      { name: 'Exhala', duration: 5, color: 'bg-blue-500' }
    ]
  },
  'cuadrada': {
    title: 'Respiración Cuadrada',
    instructions: 'Inhala 4s, sostén 4s, exhala 4s, pausa 4s. Repite 4 veces.',
    phases: [
      { name: 'Inhala', duration: 4, color: 'bg-green-500' },
      { name: 'Sostén', duration: 4, color: 'bg-yellow-500' },
      { name: 'Exhala', duration: 4, color: 'bg-blue-500' },
      { name: 'Pausa', duration: 4, color: 'bg-gray-500' }
    ]
  },
  'alterna': {
    title: 'Respiración Alterna',
    instructions: 'Alterna la respiración entre fosas nasales. 4s inhala, 4s exhala.',
    phases: [
      { name: 'Inhala derecha', duration: 4, color: 'bg-green-500' },
      { name: 'Exhala izquierda', duration: 4, color: 'bg-blue-500' },
      { name: 'Inhala izquierda', duration: 4, color: 'bg-green-500' },
      { name: 'Exhala derecha', duration: 4, color: 'bg-blue-500' }
    ]
  }
};

let currentExercise = null;
let timer = null;
let currentPhase = 0;
let currentCount = 0;
let repetitions = 0;
let exerciseHistory = [];

// Handle exercise selection
document.querySelectorAll('[data-exercise]').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('[data-exercise]').forEach(i => i.classList.remove('bg-blue-700'));
    item.classList.add('bg-blue-700');
    
    currentExercise = item.dataset.exercise;
    exerciseTitle.textContent = exercises[currentExercise].title;
    exerciseInstructions.textContent = exercises[currentExercise].instructions;
    exerciseContent.classList.remove('hidden');
    resetExercise();
  });
});

// Start exercise
startButton.addEventListener('click', () => {
  if (!currentExercise) {
    alert('Por favor selecciona un ejercicio primero');
    return;
  }
  startExercise();
});

// Stop exercise
stopButton.addEventListener('click', () => {
  stopExercise();
});

// Show/hide history
showHistory.addEventListener('click', () => {
  historyPanel.classList.toggle('hidden');
  showHistory.textContent = historyPanel.classList.contains('hidden') ? 
    'Mostrar Historial' : 'Ocultar Historial';
});

function startExercise() {
  startButton.classList.add('hidden');
  stopButton.classList.remove('hidden');
  runExercisePhase();
}

function stopExercise() {
  clearInterval(timer);
  resetExercise();
  startButton.classList.remove('hidden');
  stopButton.classList.add('hidden');
}

function runExercisePhase() {
  const phases = exercises[currentExercise].phases;
  const phase = phases[currentPhase];
  
  exercisePhase.textContent = phase.name;
  countdownDisplay.textContent = phase.duration;
  currentCount = phase.duration;
  progressBar.style.width = '100%';
  progressBar.style.backgroundColor = phase.color.replace('bg-', '');
  
  timer = setInterval(() => {
    currentCount--;
    countdownDisplay.textContent = currentCount;
    progressBar.style.width = `${(currentCount / phase.duration) * 100}%`;
    
    if (currentCount <= 0) {
      clearInterval(timer);
      currentPhase = (currentPhase + 1) % phases.length;
      if (currentPhase === 0) {
        repetitions++;
        if (repetitions >= 4) {
          logExercise();
          stopExercise();
          return;
        }
      }
      runExercisePhase();
    }
  }, 1000);
}

function resetExercise() {
  clearInterval(timer);
  currentPhase = 0;
  currentCount = 0;
  repetitions = 0;
  countdownDisplay.textContent = '0';
  exercisePhase.textContent = '';
  progressBar.style.width = '0%';
}

function logExercise() {
  const now = new Date();
  const entry = {
    exercise: exercises[currentExercise].title,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  };
  exerciseHistory.unshift(entry);
  updateHistoryUI();
  historyPanel.classList.remove('hidden');
}

function updateHistoryUI() {
  historyList.innerHTML = exerciseHistory
    .slice(0, 5)
    .map(entry => `
      <li class="p-2 border-b border-gray-200">
        <span class="font-medium">${entry.exercise}</span><br>
        <span class="text-sm text-gray-500">${entry.date} ${entry.time}</span>
      </li>
    `)
    .join('');
}

// Journal Configuration
const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

function initJournal() {
  const journalToggle = document.getElementById('journalToggle');
  const journalList = document.getElementById('journalList');
  const journalIcon = document.getElementById('journalIcon');
  if (!journalToggle || !journalList || !journalIcon) {
    console.error('Journal elements not found');
    return;
  }

  const newEntryBtn = document.getElementById('newEntryBtn');
  const historyBtn = document.getElementById('historyBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const journalForm = document.getElementById('journalForm');
  const cancelEntry = document.getElementById('cancelEntry');
  const saveEntry = document.getElementById('saveEntry');
  const entriesList = document.getElementById('entriesList');
  const entriesContainer = document.getElementById('entriesContainer');

  // Toggle journal visibility
  journalToggle?.addEventListener('click', function(e) {
    e.stopPropagation();
    const wasHidden = journalList.classList.contains('hidden');
    
    journalList.classList.toggle('hidden');
    journalIcon.classList.toggle('rotate-180', !wasHidden);
  });

  // New entry button
  newEntryBtn?.addEventListener('click', () => {
    journalForm.classList.remove('hidden');
  });

  // Cancel entry
  cancelEntry?.addEventListener('click', () => {
    journalForm.classList.add('hidden');
  });

  // Save entry
  saveEntry?.addEventListener('click', () => {
    const title = document.getElementById('entryTitle').value;
    const text = document.getElementById('entryText').value;
    
    if (title && text) {
      const newEntry = {
        id: Date.now(),
        title,
        text,
        date: new Date().toLocaleString()
      };
      
      journalEntries.unshift(newEntry);
      localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
      journalForm.classList.add('hidden');
      updateEntriesList();
    }
  });

  // History button
  historyBtn?.addEventListener('click', () => {
    entriesList.classList.toggle('hidden');
    updateEntriesList();
  });

  // Clear all button
  clearAllBtn?.addEventListener('click', () => {
    if (confirm('¿Borrar todas las entradas del diario?')) {
      localStorage.removeItem('journalEntries');
      journalEntries.length = 0;
      updateEntriesList();
    }
  });

  function updateEntriesList() {
    if (!entriesContainer) return;
    
    entriesContainer.innerHTML = journalEntries
      .map(entry => `
        <li class="p-4 border-b border-gray-200">
          <h4 class="font-bold">${entry.title}</h4>
          <p class="text-gray-600 text-sm">${entry.date}</p>
          <p class="mt-2">${entry.text}</p>
        </li>
      `)
      .join('');
  }

  // Initialize entries list
  updateEntriesList();
}

// Breathing exercises toggle functionality
const respiracionToggle = document.getElementById('respiracionToggle');
const respiracionList = document.getElementById('respiracionList');
const respiracionIcon = document.getElementById('respiracionIcon');

if (respiracionToggle && respiracionList && respiracionIcon) {
  respiracionToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    const wasHidden = respiracionList.classList.contains('hidden');
    
    respiracionList.classList.toggle('hidden');
    respiracionIcon.classList.toggle('rotate-180', !wasHidden);
  });
} else {
  console.error('Breathing exercises elements not found');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initJournal);
} else {
  initJournal();
}

// Initialize history panel
historyPanel.classList.add('hidden');
