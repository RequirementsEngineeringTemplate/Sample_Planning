# Sample Planning Scheduler

A simple and intuitive React-based scheduling system for planning and event management.

![Monthly View](https://github.com/user-attachments/assets/c5ba343a-45bd-4354-b660-da97e1aad888)

## Features

- **Calendar Views**: Switch between monthly and weekly calendar views
- **Event Management**: Add, edit, and delete events with ease
- **Event Details**: Include title, date, time, and optional description for each event
- **Local Storage**: Events are automatically saved to browser's local storage
- **Responsive Design**: Clean and minimal UI that works on different screen sizes
- **Interactive Interface**: Click on calendar dates to add events, click on events to edit them

## Screenshots

### Monthly View
![Monthly View with Event](https://github.com/user-attachments/assets/339c3eb0-0622-4a95-bdf4-dc1ee8ef96f5)

### Weekly View
![Weekly View](https://github.com/user-attachments/assets/70d8130b-639c-4205-a7b2-ac8a64fd166c)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RequirementsEngineeringTemplate/Sample_Planning.git
cd Sample_Planning
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To create a production build:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Usage

### Adding Events

1. **Method 1**: Click the "+ Add Event" button in the top right
2. **Method 2**: Click on any date in the calendar view
3. Fill in the event details:
   - **Title** (required): Name of your event
   - **Date** (required): When the event takes place
   - **Time** (optional): Specific time for the event
   - **Description** (optional): Additional details about the event
4. Click "Save" to create the event

### Viewing Events

- **Monthly View**: Events appear as colored blocks on the calendar showing time and title
- **Weekly View**: Events display with full details including description
- **Today Highlight**: The current date is highlighted in blue

### Editing Events

1. Click on any existing event in the calendar
2. Modify the event details in the form that appears
3. Click "Update" to save changes
4. Click "Delete" to remove the event entirely

### Navigation

- **Previous/Next**: Navigate between months (in monthly view) or weeks (in weekly view)
- **Today**: Jump to the current date
- **Month/Week**: Switch between calendar view modes

## Technical Details

### File Structure

```
src/
├── components/
│   ├── Scheduler.js          # Main scheduler component
│   └── EventForm.js          # Form for adding/editing events
├── App.js                    # Main application component
└── index.js                  # Application entry point
public/
└── index.html               # HTML template
```

### Component Architecture

#### Scheduler.js
- Main calendar component that handles:
  - Calendar rendering (monthly and weekly views)
  - Event state management
  - Navigation between dates
  - Local storage integration

#### EventForm.js
- Modal form component for event creation and editing
- Handles form validation and event data

#### App.js
- Root application component
- Provides overall styling and integrates the Scheduler

### Data Storage

Events are stored in the browser's `localStorage` under the key `scheduler-events`. The data structure for each event is:

```javascript
{
  id: string,        // Unique identifier (timestamp)
  title: string,     // Event title
  date: string,      // Date in YYYY-MM-DD format
  time: string,      // Time in HH:MM format (optional)
  description: string // Event description (optional)
}
```

### Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Styling

The scheduler uses inline styles for simplicity. Key style objects can be modified in the components:

- Calendar grid colors and spacing
- Event appearance and colors
- Modal and form styling
- Button and navigation styles

### Adding Features

The modular architecture makes it easy to extend functionality:

- **Event Categories**: Add category field and color coding
- **Recurring Events**: Implement repeat functionality
- **Event Reminders**: Add notification features
- **Export/Import**: Add calendar export capabilities
- **Backend Integration**: Replace localStorage with API calls

## Development

### Available Scripts

- `npm start`: Run development server
- `npm run build`: Create production build
- `npm test`: Run test suite (if tests are added)

### Code Quality

The project uses:
- ESLint for code linting
- React best practices
- Modern JavaScript (ES6+)
- Functional components with hooks

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with React 18
- Uses React Hooks for state management
- Responsive design principles
- Clean and minimal UI design approach