# Design Mockups

This folder contains the design specifications and mockups for the React UI assignment.

## Design Specifications

### Color Palette
- **Primary Blue**: #3b82f6 (primary-500)
- **Primary Blue Light**: #dbeafe (primary-100)
- **Primary Blue Dark**: #1d4ed8 (primary-700)
- **Gray Scale**: #f9fafb (gray-50) to #111827 (gray-900)
- **Success**: #10b981 (green-500)
- **Warning**: #f59e0b (yellow-500)
- **Error**: #ef4444 (red-500)

### Typography
- **Font Family**: Inter
- **Headings**:
  - H1: 2xl (24px), font-bold
  - H2: xl (20px), font-semibold
  - H3: lg (18px), font-medium
- **Body**: sm (14px), font-normal
- **Captions**: xs (12px), font-normal

### Spacing
- **Base Unit**: 4px (Tailwind's spacing scale)
- **Component Padding**: 24px (p-6)
- **Card Padding**: 24px (p-6)
- **Section Margins**: 32px (mb-8)

### Layout Specifications

#### Sidebar
- **Width**: 256px (w-64)
- **Background**: White with subtle border
- **Navigation**: Active state with blue accent and background

#### Header
- **Height**: Auto with py-4
- **Search Bar**: Max width 320px on desktop
- **Icons**: 24px (h-6 w-6)

#### Main Content
- **Padding**: 24px (p-6)
- **Background**: Gray-50 (#f9fafb)
- **Cards**: White background with subtle shadow

## Mockup Descriptions

Since this is a code-based assignment, here are detailed descriptions of what each page should look like:

### 1. Dashboard Page

#### Metrics Section (Top Row)
- 4 metric cards in a responsive grid
- Each card contains:
  - Icon (24px) in top-left
  - Title (gray-600, text-sm)
  - Large value (gray-900, text-2xl, font-bold)
  - Change indicator with arrow and percentage (green for positive, red for negative)

#### Chart Section (Middle)
- Full-width white card with shadow
- Chart title "Analytics Overview" (text-lg, font-medium)
- Line chart showing monthly data
- Y-axis labels on left, X-axis with month names
- Blue line with circle markers

#### Recent Activity (Bottom)
- White card with user activity list
- Each item has avatar, name, action, and timestamp
- Hover states for interactivity

### 2. Analytics Page

#### Filter Section (Top)
- Date range picker component
- Export button (primary blue)
- Filter tabs for different metrics

#### Charts Grid
- 2x2 grid of different chart types:
  - Top-left: Line chart (User Growth)
  - Top-right: Bar chart (Revenue by Month)
  - Bottom-left: Donut chart (Traffic Sources)
  - Bottom-right: Area chart (Conversions)

### 3. Users Page

#### Header Section
- Page title and description
- Search input (full-width on mobile, 320px on desktop)
- Filter dropdowns for Role and Status
- "Add User" button (primary blue)

#### Users Table
- Responsive table with columns:
  - Avatar + Name
  - Email
  - Role (with colored badges)
  - Status (with colored indicators)
  - Last Login
  - Actions (edit/delete icons)
- Pagination at bottom
- 10 users per page

#### Mobile Layout
- Cards instead of table rows
- Stacked information with clear hierarchy
- Swipe actions for edit/delete

## Responsive Behavior

### Mobile (320px - 768px)
- Single column layout
- Sidebar becomes slide-out menu
- Metrics cards stack vertically
- Tables become card layouts
- Search and filters stack

### Tablet (768px - 1024px)
- 2-column metrics grid
- Sidebar remains visible
- Tables remain tabular but condensed

### Desktop (1024px+)
- Full 4-column metrics grid
- All components at full size
- Optimal spacing and typography

## Interactive States

### Buttons
- **Default**: Blue background, white text
- **Hover**: Darker blue (primary-700)
- **Active**: Even darker blue with shadow
- **Disabled**: Gray background, reduced opacity

### Form Inputs
- **Default**: Gray border (border-gray-300)
- **Focus**: Blue border and ring (focus:ring-primary-500)
- **Error**: Red border and text
- **Success**: Green border

### Cards
- **Default**: White background, subtle shadow
- **Hover**: Slightly elevated shadow (where appropriate)

This specification should give the candidate clear guidance on what to build while allowing them to demonstrate their implementation skills.