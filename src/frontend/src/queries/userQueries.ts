import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import type { Time } from '../backend';

export function useUserRecord() {
  const { actor, isFetching: isActorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<[Time, Time]>({
    queryKey: ['userRecord', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getUserRecord();
    },
    enabled: !!actor && !isActorFetching && !!identity && !identity.getPrincipal().isAnonymous(),
    retry: false
  });
}

export function useRegisterOrGetUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.registerOrGetUser();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['userRecord', identity?.getPrincipal().toString()] 
      });
    }
  });
}

export function useIsRegistered() {
  const { actor, isFetching: isActorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ['isRegistered', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isRegistered();
    },
    enabled: !!actor && !isActorFetching && !!identity && !identity.getPrincipal().isAnonymous()
  });
}
