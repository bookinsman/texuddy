import { useMemo } from 'react';
import type { Email } from '@texuddy/types';
import { getEmailsByAge, getEmailById } from '@/lib/data/emails';
import type { User } from '@texuddy/types';

export function useEmails(user: User) {
  const emails = useMemo(() => getEmailsByAge(user.studentAge), [user.studentAge]);
  
  const getEmail = (id: string) => getEmailById(id);
  
  const getAvailableEmails = (completedIds: string[]) => {
    return emails.filter(email => !completedIds.includes(email.id));
  };
  
  return {
    emails,
    getEmail,
    getAvailableEmails
  };
}

