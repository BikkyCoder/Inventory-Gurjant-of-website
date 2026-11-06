import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to connect to SSE endpoint for real-time component updates.
 * When a component change is detected, it calls the provided onUpdate callback
 * so the component can re-fetch data from the API.
 * 
 * @param {string} apiUrl - The base API URL
 * @param {function} onUpdate - Callback to invoke when a component change is detected
 * @param {number} pollingInterval - Fallback polling interval in ms (default: 30000 = 30s)
 */
export default function useComponentSSE(apiUrl, onUpdate, pollingInterval = 30000) {
  const eventSourceRef = useRef(null);
  const pollingRef = useRef(null);
  const onUpdateRef = useRef(onUpdate);
  const sseFailedRef = useRef(false);

  // Keep the callback ref updated
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  const connectSSE = useCallback(() => {
    // Don't retry SSE if it already failed
    if (sseFailedRef.current) {
      return;
    }

    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const url = `${apiUrl}/components/events`;
      const es = new EventSource(url);

      es.onopen = () => {
        console.log('[SSE] Connection established');
      };

      es.addEventListener('component_change', (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('[SSE] Component change detected:', data.action, data.component?.name);
          // Trigger re-fetch
          if (onUpdateRef.current) {
            onUpdateRef.current();
          }
        } catch (e) {
          console.error('[SSE] Error parsing message:', e);
        }
      });

      es.onerror = (err) => {
        // Mark SSE as failed and close
        sseFailedRef.current = true;
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }
        // Fall back to polling - don't spam console with errors
      };

      eventSourceRef.current = es;
    } catch (e) {
      sseFailedRef.current = true;
      // Fall back to polling silently
    }
  }, [apiUrl]);

  useEffect(() => {
    // Try SSE first (will fail silently and fallback to polling)
    connectSSE();

    // Fallback: Polling as backup (main mechanism)
    pollingRef.current = setInterval(() => {
      if (onUpdateRef.current) {
        onUpdateRef.current();
      }
    }, pollingInterval);

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [connectSSE, pollingInterval]);
}
