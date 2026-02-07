import { useEffect } from 'react';
import { useInternetIdentity } from './useInternetIdentity';
import { useRegisterOrGetUser } from '../queries/userQueries';
import { queryClient } from '../queryClient';

export function useAuthRefresh() {
  const { identity, loginStatus } = useInternetIdentity();
  const registerOrGetUser = useRegisterOrGetUser();

  useEffect(() => {
    if (loginStatus === 'success' && identity && !identity.getPrincipal().isAnonymous()) {
      registerOrGetUser.mutate();
    }
  }, [loginStatus, identity]);

  useEffect(() => {
    if (loginStatus === 'idle' && (!identity || identity.getPrincipal().isAnonymous())) {
      queryClient.clear();
    }
  }, [loginStatus, identity]);
}
