# React UI Assignment - Senior Developer

Welcome to your React UI assignment! This is a practical coding challenge designed to evaluate your frontend development skills, React expertise, and ability to implement responsive, accessible user interfaces.

## 🎯 Assignment Overview

You'll be building a **Dashboard Application** with three main sections:
1. **Dashboard** - Overview with metrics cards and charts
2. **Analytics** - Data visualization and insights
3. **Users** - User management with search and filtering

**Time Estimate:** 4-6 hours

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Start the mock API (in a new terminal):**
   ```bash
   npm run api
   ```

4. **Run linting:**
   ```bash
   npm run lint
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

The app will be available at `http://localhost:3000` and the API at `http://localhost:3001`.

## 📋 Requirements

### Core Features (Must Have)

#### 1. Dashboard Page (`/`)
- [ ] **Metrics Cards**: Display 4 key metrics (total users, active sessions, revenue, conversion rate)
- [ ] **Chart Component**: Line/bar chart showing analytics data over time
- [ ] **Recent Activity**: List of recent user activities or system events
- [ ] **Responsive Design**: Must work on mobile, tablet, and desktop

#### 2. Analytics Page (`/analytics`)
- [ ] **Multiple Charts**: At least 2 different chart types (line, bar, pie, etc.)
- [ ] **Date Range Picker**: Filter data by date range
- [ ] **Export Functionality**: Button to export chart data as CSV/JSON
- [ ] **Interactive Charts**: Hover states, tooltips, or click interactions

#### 3. Users Page (`/users`)
- [ ] **User Table**: Display users with avatar, name, email, role, status
- [ ] **Search Functionality**: Real-time search by name or email
- [ ] **Filtering**: Filter by role (admin, user, moderator) and status
- [ ] **Sorting**: Sort by name, email, created date, last login
- [ ] **Pagination**: Handle large datasets with pagination
- [ ] **User Actions**: Edit/delete buttons (can be placeholder modals)

### Technical Requirements

#### Code Quality
- [ ] **TypeScript**: Proper typing throughout the application
- [ ] **Component Architecture**: Reusable, well-structured components
- [ ] **Custom Hooks**: Extract business logic into custom hooks
- [ ] **Error Handling**: Proper error states for API calls
- [ ] **Loading States**: Loading indicators for async operations

#### Performance
- [ ] **React.memo()**: Optimize re-renders where appropriate
- [ ] **useMemo/useCallback**: Prevent unnecessary calculations/recreations
- [ ] **Lazy Loading**: Implement code splitting for routes
- [ ] **Debounced Search**: Debounce search input to reduce API calls

#### Accessibility
- [ ] **Keyboard Navigation**: All interactive elements accessible via keyboard
- [ ] **ARIA Labels**: Proper ARIA attributes for screen readers
- [ ] **Focus Management**: Visible focus indicators
- [ ] **Color Contrast**: Meet WCAG AA standards

#### Testing
- [ ] **Unit Tests**: Test critical components and hooks
- [ ] **Integration Tests**: Test component interactions
- [ ] **Mock API Calls**: Properly mock HTTP requests

### Bonus Features (Nice to Have)

- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Data Persistence**: Store user preferences in localStorage
- [ ] **Real-time Updates**: WebSocket or polling for live data
- [ ] **Advanced Filtering**: Multiple filter combinations with tags
- [ ] **Bulk Actions**: Select multiple users for bulk operations
- [ ] **Infinite Scroll**: Alternative to pagination
- [ ] **Animation**: Smooth transitions and micro-interactions

## 🎨 Design Specifications

### Design Assets
- Check the `/designs` folder for high-fidelity mockups
- Use the provided design tokens in `tailwind.config.js`
- Follow the component hierarchy shown in the mockups

### Design System
- **Colors**: Primary blue (#3b82f6), neutral grays
- **Typography**: Inter font family
- **Spacing**: 4px base unit (Tailwind's spacing scale)
- **Borders**: Rounded corners (4px standard, 8px for cards)
- **Shadows**: Subtle shadows for elevation

### Responsive Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Technical Stack

**Core:**
- React 18 with TypeScript
- Vite for build tooling
- React Router for navigation
- Tailwind CSS for styling

**State Management:**
- Zustand (included) or React Context
- You may add Redux Toolkit if preferred

**HTTP Client:**
- Fetch API or add Axios if needed

**Icons:**
- Lucide React (already included)

**Testing:**
- Vitest + Testing Library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI elements (Button, Input, etc.)
│   ├── charts/         # Chart components
│   └── ...
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── store/              # State management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🌐 API Endpoints

The mock API provides the following endpoints:

- `GET /users` - List all users
- `GET /users?_search=term` - Search users
- `GET /metrics` - Dashboard metrics
- `GET /analytics` - Chart data

**Note:** The mock API supports query parameters for filtering, sorting, and pagination. Check [json-server documentation](https://github.com/typicode/json-server) for details.

## ✅ Evaluation Criteria

### Code Quality (40%)
- Clean, readable, and maintainable code
- Proper TypeScript usage
- Component composition and reusability
- Custom hooks for business logic
- Error handling and edge cases

### UI/UX Implementation (30%)
- Pixel-perfect implementation of designs
- Responsive behavior across devices
- Smooth interactions and animations
- Accessibility compliance
- Performance optimization

### Architecture & Best Practices (20%)
- Proper project structure
- State management approach
- API integration patterns
- Testing strategy
- Git commit quality

### Problem Solving (10%)
- Handling edge cases
- Creative solutions to complex problems
- Code comments explaining decisions
- Bonus feature implementation

## 🚨 Important Notes

1. **External Libraries**: It is allowed to add chart libraries (Chart.js, Recharts, etc.) - or build charts with SVG/Canvas or CSS
2. **Design Fidelity**: Match the provided designs as closely as possible
3. **Performance**: The app should feel fast and responsive
4. **Cross-browser**: Ensure compatibility with modern browsers
5. **Mobile First**: Start with mobile design and enhance for larger screens

## 📝 Submission Guidelines

1. **Clean Git History**: Make meaningful commits with clear messages
2. **README Updates**: Document any additional setup or decisions
3. **Demo**: Be prepared to walk through your implementation
4. **Testing**: Ensure all tests pass before submission

## 🤔 Questions?

If you have questions about requirements or need clarification:
- Check the design mockups first
- Review the provided API structure
- Make reasonable assumptions and document them
- Focus on demonstrating your skills and problem-solving approach

Good luck! We're excited to see your implementation. 🎉