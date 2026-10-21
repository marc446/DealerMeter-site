// Demo-formulier: controleert de invoer en slaat de aanvraag op in Supabase.
(function () {
  const formulier = document.getElementById("demo-formulier");
  const melding = document.getElementById("formulier-melding");
  const knop = document.getElementById("verstuur");
  const config = window.DEALERMETER || {};

  const VERPLICHT = ["naam", "bedrijf", "email", "aantal", "werkwijze"];

  function toonMelding(soort, tekst) {
    melding.innerHTML = "";
    const p = document.createElement("p");
    p.className = "melding melding--" + soort;
    p.textContent = tekst;
    melding.appendChild(p);
  }

  function zetFout(veld, tekst) {
    veld.setAttribute("aria-invalid", "true");
    const fout = document.createElement("span");
    fout.className = "veld__fout";
    fout.id = veld.id + "-fout";
    fout.textContent = tekst;
    veld.setAttribute("aria-describedby", fout.id);
    veld.closest(".veld").appendChild(fout);
  }

  function wisFouten() {
    formulier.querySelectorAll(".veld__fout").forEach((el) => el.remove());
    formulier.querySelectorAll("[aria-invalid]").forEach((el) => {
      el.removeAttribute("aria-invalid");
      el.removeAttribute("aria-describedby");
    });
  }

  function controleer(data) {
    let eerste = null;
    for (const naam of VERPLICHT) {
      const veld = formulier.elements[naam];
      if (!data[naam]) {
        zetFout(veld, "Verplicht veld.");
        eerste = eerste || veld;
      }
    }
    const email = formulier.elements.email;
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      zetFout(email, "Vul een geldig e-mailadres in.");
      eerste = eerste || email;
    }
    const akkoordOntbreekt = !formulier.elements.akkoord.checked;
    if (akkoordOntbreekt) eerste = eerste || formulier.elements.akkoord;
    if (eerste) {
      const delen = [];
      if (eerste !== formulier.elements.akkoord) delen.push("Controleer de rood gemarkeerde velden.");
      if (akkoordOntbreekt) delen.push("Vink aan dat we contact met je mogen opnemen.");
      toonMelding("fout", delen.join(" "));
    }
    return eerste;
  }

  formulier.addEventListener("submit", async (e) => {
    e.preventDefault();
    wisFouten();
    melding.innerHTML = "";

    const f = formulier.elements;
    const data = {
      naam: f.naam.value.trim(),
      bedrijf: f.bedrijf.value.trim(),
      email: f.email.value.trim(),
      telefoon: f.telefoon.value.trim() || null,
      aantal: f.aantal.value,
      werkwijze: f.werkwijze.value,
      opmerking: f.opmerking.value.trim() || null,
    };

    // Spambots vullen het verborgen veld in; doe dan alsof het gelukt is.
    if (f.website.value) {
      formulier.reset();
      toonMelding("ok", "Bedankt! We nemen binnen twee werkdagen contact met je op.");
      return;
    }

    const eersteFout = controleer(data);
    if (eersteFout) {
      eersteFout.focus();
      return;
    }

    if (!config.supabaseUrl || !config.supabaseKey) {
      toonMelding("fout", "Het formulier is nog niet gekoppeld. Probeer het later opnieuw.");
      return;
    }

    knop.disabled = true;
    knop.textContent = "Bezig met versturen…";
    try {
      const antwoord = await fetch(config.supabaseUrl + "/rest/v1/demo_aanvragen", {
        method: "POST",
        headers: {
          apikey: config.supabaseKey,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(data),
      });
      if (!antwoord.ok) throw new Error(String(antwoord.status));
      formulier.reset();
      toonMelding("ok", "Bedankt! We nemen binnen twee werkdagen contact met je op.");
      melding.scrollIntoView({ block: "center", behavior: "smooth" });
    } catch {
      toonMelding("fout", "Versturen is niet gelukt. Probeer het opnieuw, of mail naar marcfolkertsma9@gmail.com.");
    } finally {
      knop.disabled = false;
      knop.textContent = "Demo aanvragen";
    }
  });
})();
