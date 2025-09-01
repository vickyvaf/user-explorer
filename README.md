# User Explorer

## Preview
<img width="1440" height="724" alt="Screenshot 2025-09-01 at 21 50 15" src="https://github.com/user-attachments/assets/93015815-684b-42c0-b6b5-6fd0c45b35af" />

## Technology Stack

- React.js + Vite
- TypeScript
- Antd
- React Query

## Features

- Display users in a clean, responsive layout
- Show user list and user details:
  - Name
  - Email
  - City
  - Company
  - Phone
  - Website
- Search and Filter
  - Search by user name
  - Filter by city
  - Filter by company
  - Clear all filters
  - Combine multiple filters

```
src/
├─ components/
│  ├─ filter-section.tsx
│  ├─ user-list-section.tsx
├─ screens/
│  └─ user-list-screen.tsx
├─ types/
│  └─ user.ts
├─ App.tsx
└─ index.tsx
```
