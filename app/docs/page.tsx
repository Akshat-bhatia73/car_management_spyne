'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocs() {
  const [spec, setSpec] = useState<any>(null);

  useEffect(() => {
    fetch('/api/docs')  // This path remains the same as it's fetching from the API
      .then((response) => response.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="docs-container">
      <SwaggerUI spec={spec} />
      <style jsx global>{`
        .swagger-ui .topbar {
          display: none;
        }
        .docs-container {
          margin: 0 auto;
          max-width: 1200px;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
} 