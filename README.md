
Built by https://www.blackbox.ai

---

```markdown
# FilterMind

## Project Overview
FilterMind is a web application designed to assist users in managing their thoughts and emotions through journaling and breathing exercises. It provides features to log entries about thoughts and feelings, visualize emotional trends, and practice various breathing techniques to promote mental well-being.

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/FilterMind.git
   cd FilterMind
   ```

2. **Open the project**:
   You can open the `index.html` file in any web browser to view the application.

## Usage
Once you have the application open in your browser, you can:

- **Log Thoughts**:
  - Navigate to the "Diario de Pensamientos" (Thought Journal) section.
  - Click on "Nueva Entrada" to create a new journal entry.
  - Fill in the title and text, and click "Guardar" to save the entry.

- **Track Emotions**:
  - In the "Registro de Emociones" (Emotion Registry) section, click "Nueva Entrada" to log a new emotion.
  - Select the emotion from the dropdown, rate its intensity, add notes, and save it.

- **Enact Breathing Exercises**:
  - Use the "Respiración" (Breathing) section to select and practice various breathing techniques. Follow the prompts and duration for each exercise.

- **Emergency Help**:
  - The emergency button triggers a confirmation modal that, upon confirming, will simulate a call to a specified emergency number.

## Features
- **Thought Journaling**: Ability to log and review thoughts and feelings.
- **Emotion Tracking**: A way to log emotional states and their intensities over time.
- **Breathing Exercises**: Various guided breathing exercises for relaxation.
- **Emergency Functionality**: Quick access to emergency help through a double-click button.

## Dependencies
- Tailwind CSS for styling:
  - Loaded from CDN: `https://cdn.tailwindcss.com`
- Font Awesome for icons:
  - Loaded from CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css`

## Project Structure
```
FilterMind/
├── index.html           # Main HTML file for the application
├── index_backup.html    # Backup of the main HTML file
├── script.js            # Main JavaScript for functionality
├── script_backup.js     # Backup of the JavaScript file
├── script_debug.js      # Debug version of the JavaScript file
└── README.md            # Project documentation
```

### Notes
- Local storage is utilized to save journal entries and emotional logs.
- Ensure to test the application in a modern browser for compatibility.

---

For any issues or contributions, please feel free to open an issue or submit a pull request in the project repository.
```