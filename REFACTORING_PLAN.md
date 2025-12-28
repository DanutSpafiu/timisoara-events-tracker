# Refactoring Plan for index.tsx

## Current State

- Single file: `app/(tabs)/index.tsx` (~2000 lines)
- Contains: types, constants, icons, 6 screen components, main App component, and all styles

## Target Structure

```
types/
  └── events.ts              # Type definitions (TicketLink, Eveniment)

constants/
  └── events.ts               # Mock data (EVENIMENTE array)

components/
  ├── icons.tsx               # Icon components
  └── screens/
      ├── LoginScreen.tsx
      ├── EventListScreen.tsx
      ├── EventDetailScreen.tsx
      ├── SavedShowsScreen.tsx
      ├── FilterScreen.tsx
      ├── DatePickerScreen.tsx
      └── styles/
          ├── loginStyles.ts
          ├── eventListStyles.ts
          ├── eventDetailStyles.ts
          ├── savedShowsStyles.ts
          ├── filterStyles.ts
          └── datePickerStyles.ts

hooks/
  └── useAppState.ts           # Custom hook for app state management

app/(tabs)/
  └── index.tsx                # Main App component (orchestrator only)
```

## Benefits

1. **Separation of Concerns**: Each component has its own file
2. **Reusability**: Components can be easily reused or tested
3. **Maintainability**: Easier to find and modify specific features
4. **Scalability**: Easy to add new screens or features
5. **Readability**: Smaller, focused files are easier to understand

## Implementation Steps

1. ✅ Extract types to `types/events.ts`
2. ✅ Extract constants to `constants/events.ts`
3. ✅ Extract icons to `components/icons.tsx`
4. ✅ Extract LoginScreen
5. ✅ Extract EventListScreen
6. ⏳ Extract remaining screens
7. ⏳ Extract styles to separate files
8. ⏳ Create useAppState hook
9. ⏳ Update main index.tsx
