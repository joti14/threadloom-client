import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns false during SSR and the first client render, true afterward.
 * Used to gate rendering of localStorage-persisted state (e.g. the cart) so
 * the server and first client render agree and don't trigger a hydration
 * mismatch. Uses useSyncExternalStore rather than a useEffect+setState flag to
 * stay clear of the react-hooks/set-state-in-effect rule.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
