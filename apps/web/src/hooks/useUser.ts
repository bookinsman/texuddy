'use client';

import { useState, useEffect, useCallback } from 'react';
import type { User } from '@texuddy/types';
import { mockUser } from '@/lib/data/users';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call to Supabase
      // const response = await fetch('/api/user');
      // const data = await response.json();
      // setUser(data.user);

      // For now, using mock data
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch user'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/user', {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates),
      // });
      // const data = await response.json();
      // setUser(data.user);

      // For now, just update local state
      setUser(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update user'));
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    updateUser,
    refetch: fetchUser,
  };
}

