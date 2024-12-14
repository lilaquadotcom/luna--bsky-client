import { useQuery } from '@tanstack/react-query';
import { useBlueskyStore } from '../store';

export function useProfile({ handle }: { handle: string }) {
  const { agent } = useBlueskyStore();

  return useQuery({
    queryKey: ['profile', handle],
    queryFn: async () => {
      if (!agent) {
        throw new Error('Not authenticated');
      }
      const response = await agent.app.bsky.actor.getProfile({ actor: handle });
      return response.data;
    },
    enabled: !!agent,
  });
}