"use client";

import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    // Charger les scripts existants pour conserver le comportement actuel
    const mainScript = document.createElement("script");
    mainScript.src = "/js/main.js";
    mainScript.defer = true;
    document.body.appendChild(mainScript);

    const appScript = document.createElement("script");
    appScript.src = "/js/app.js";
    appScript.defer = true;
    document.body.appendChild(appScript);

    const sanitizeScript = document.createElement("script");
    sanitizeScript.src = "/js/sanitize.js";
    sanitizeScript.defer = true;
    document.body.appendChild(sanitizeScript);

    return () => {
      mainScript.remove();
      appScript.remove();
      sanitizeScript.remove();
    };
  }, []);

  return (
    <main
      // On garde ton HTML tel quel pour le design initial
      dangerouslySetInnerHTML={{
        __html: `
${""}
        `,
      }}
    />
  );
}
