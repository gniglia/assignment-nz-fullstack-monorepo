# React Query Setup

This directory contains the React Query (TanStack Query) configuration and setup for the application.

## Files

- `query-client.ts` - QueryClient configuration with default options for caching, retries, and error handling

## Key Features

- **Intelligent Caching**: 5-minute stale time, 30-minute garbage collection time
- **Smart Retries**: Automatic retry for network errors, but not for 4xx client errors
- **Development Tools**: React Query DevTools enabled in development mode
- **Error Handling**: Custom error handling with proper status codes

## Usage

The QueryClient is automatically provided to the entire app through the `QueryClientProvider` in `main.tsx`. All components can now use React Query hooks for data fetching.

## Available Hooks

See `src/hooks/use-api.ts` for pre-configured hooks:

- `useUsers()` - Fetch all users
- `useUser(id)` - Fetch single user
- `useAnalytics()` - Fetch analytics data with 30s auto-refetch
- `useDashboard()` - Fetch dashboard data
- `useCreateUser()` - Create user mutation
- `useUpdateUser()` - Update user mutation
- `useDeleteUser()` - Delete user mutation

## Best Practices

1. **Query Keys**: Use the centralized `queryKeys` object for consistency
2. **Error Handling**: Handle errors gracefully in components
3. **Loading States**: Always show loading states for better UX
4. **Cache Invalidation**: Use `invalidateQueries` after mutations to keep data fresh
5. **Optimistic Updates**: Use `setQueryData` for immediate UI updates
