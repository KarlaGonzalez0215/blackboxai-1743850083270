// Debug version of script.js with console logs

// Emergency button functionality
const emergencyBtn = document.getElementById('emergencyBtn');
const confirmModal = document.getElementById('confirmModal');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

console.log('Debug: Checking emergency button elements');
console.log('Emergency button:', emergencyBtn);
console.log('Confirm modal:', confirmModal);
console.log('Confirm buttons:', confirmYes, confirmNo);

if (emergencyBtn && confirmModal && confirmYes && confirmNo) {
  console.log('Debug: All emergency elements found');
  let clickCount = 0;
  let clickTimer = null;

  emergencyBtn.addEventListener('click', () => {
    console.log('Debug: Emergency button clicked');
    clickCount++;
    
    if (clickCount === 1) {
      clickTimer = setTimeout(() => {
        console.log('Debug: Showing confirmation modal');
        confirmModal.classList.remove('hidden');
        clickCount = 0;
      }, 300);
    } else if (clickCount >= 2) {
      console.log('Debug: Double click detected - emergency call');
      clearTimeout(clickTimer);
      makeEmergencyCall();
      clickCount = 0;
    }
  });

  confirmYes.addEventListener('click', () => {
    console.log('Debug: Confirm yes clicked');
    confirmModal.classList.add('hidden');
    makeEmergencyCall();
  });

  confirmNo.addEventListener('click', () => {
    console.log('Debug: Confirm no clicked');
    confirmModal.classList.add('hidden');
    clickCount = 0;
  });
} else {
  console.error('Emergency button elements not found');
}

// [Rest of the original script.js content remains unchanged]
// Include all other functions and event listeners from original script.js
// with their respective debug console.log statements