// Cookie Banner Fallback Script
// Diese Datei wird geladen, wenn der React-Cookie-Banner nicht funktioniert

(function() {
  console.log("Cookie Banner Fallback Script geladen");
  
  // Prüfen, ob bereits Consent gegeben wurde
  function hasConsent() {
    try {
      return localStorage.getItem('cookieConsent') === 'true';
    } catch(e) {
      console.error("Fehler beim Prüfen des Cookie-Consents:", e);
      return false;
    }
  }
  
  // Banner nach einer Verzögerung anzeigen
  setTimeout(function() {
    if (!hasConsent()) {
      console.log("Kein Cookie-Consent gefunden, zeige Fallback-Banner an");
      createBanner();
    } else {
      console.log("Cookie-Consent bereits vorhanden");
    }
  }, 3000);
  
  // Banner erstellen und anzeigen
  function createBanner() {
    var banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.bottom = '0';
    banner.style.left = '0';
    banner.style.right = '0';
    banner.style.backgroundColor = 'rgba(20, 20, 20, 0.9)';
    banner.style.borderTop = '1px solid #333';
    banner.style.padding = '15px';
    banner.style.color = 'white';
    banner.style.zIndex = '9999';
    banner.style.fontFamily = 'Inter, system-ui, sans-serif';
    
    var content = document.createElement('div');
    content.style.maxWidth = '1200px';
    content.style.margin = '0 auto';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.gap = '10px';
    
    var textContainer = document.createElement('div');
    
    var heading = document.createElement('h3');
    heading.textContent = 'Cookie-Einstellungen';
    heading.style.fontSize = '18px';
    heading.style.margin = '0 0 8px 0';
    
    var description = document.createElement('p');
    description.textContent = 'Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.';
    description.style.fontSize = '14px';
    description.style.margin = '0';
    description.style.color = '#aaa';
    
    var buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.marginTop = '10px';
    
    var rejectButton = document.createElement('button');
    rejectButton.textContent = 'Ablehnen';
    rejectButton.style.padding = '8px 16px';
    rejectButton.style.border = '1px solid #444';
    rejectButton.style.borderRadius = '4px';
    rejectButton.style.backgroundColor = 'transparent';
    rejectButton.style.color = 'white';
    rejectButton.style.cursor = 'pointer';
    
    var acceptButton = document.createElement('button');
    acceptButton.textContent = 'Alle akzeptieren';
    acceptButton.style.padding = '8px 16px';
    acceptButton.style.border = 'none';
    acceptButton.style.borderRadius = '4px';
    acceptButton.style.backgroundColor = '#8AE234';
    acceptButton.style.color = 'black';
    acceptButton.style.cursor = 'pointer';
    
    // Event-Listener für die Buttons
    rejectButton.addEventListener('click', function() {
      try {
        localStorage.setItem('cookieConsent', 'true');
        localStorage.setItem('cookieConsents', JSON.stringify({
          necessary: true,
          analytics: false,
          marketing: false
        }));
        banner.remove();
      } catch(e) {
        console.error("Fehler beim Ablehnen von Cookies:", e);
      }
    });
    
    acceptButton.addEventListener('click', function() {
      try {
        localStorage.setItem('cookieConsent', 'true');
        localStorage.setItem('cookieConsents', JSON.stringify({
          necessary: true,
          analytics: true,
          marketing: true
        }));
        banner.remove();
        window.location.reload();
      } catch(e) {
        console.error("Fehler beim Akzeptieren von Cookies:", e);
      }
    });
    
    // DOM zusammenbauen
    textContainer.appendChild(heading);
    textContainer.appendChild(description);
    
    buttonContainer.appendChild(rejectButton);
    buttonContainer.appendChild(acceptButton);
    
    content.appendChild(textContainer);
    content.appendChild(buttonContainer);
    
    banner.appendChild(content);
    
    // Banner zur Seite hinzufügen
    document.body.appendChild(banner);
  }
})(); 