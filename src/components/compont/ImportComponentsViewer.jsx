import React, { useState, useEffect } from 'react';
import ComponentLivePreview from './LivePreview';

export default function ImportComponentsViewer() {
  const API_URL = import.meta.env.VITE_API_URL || '/api';
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`${API_URL}/import-components`);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        if (mounted) setItems(data);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-4">Loading components from DB…</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!items || items.length === 0) return <div className="p-4">No components found in database.</div>;

  return (
    <div className="space-y-8 p-4">
      {items.map((c) => (
        <section key={c._id} className="border rounded-lg p-4 bg-white/5">
          <h3 className="text-lg font-semibold mb-2">{c.name}</h3>
          <div className="mt-2">
            <ComponentLivePreview code={c.code} />
          </div>
        </section>
      ))}
    </div>
  );
}
