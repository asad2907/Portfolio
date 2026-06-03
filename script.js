const COLOR_SCHEMES = {
  1: ["#c4b5fd", "#22d3ee", "#4f46e5", "#f59e0b", "#0f172a", "#e2e8f0"],
  2: ["#fca5a5", "#fb7185", "#be123c", "#7dd3fc", "#111827", "#f8fafc"],
  3: ["#86efac", "#14b8a6", "#0f766e", "#fde68a", "#052e16", "#ecfeff"],
  4: ["#f9a8d4", "#c084fc", "#6d28d9", "#67e8f9", "#1f1147", "#fdf4ff"],
  5: ["#fde047", "#fb923c", "#ea580c", "#38bdf8", "#0c0a09", "#fff7ed"],
};

const STORAGE_KEYS = {
  scheme: "portfolio.scheme",
  custom: "portfolio.customColors",
};

const cssVarForIndex = (index) => `--liquid-color-${index}`;

function setCssColors(colors) {
  colors.forEach((color, idx) => {
    document.documentElement.style.setProperty(cssVarForIndex(idx + 1), color);
  });
}

function getActiveColors() {
  return Array.from({ length: 6 }, (_, i) => {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(cssVarForIndex(i + 1))
      .trim();
    return raw || COLOR_SCHEMES[1][i];
  });
}

function normalizeHex(value) {
  if (!value) return "#000000";
  const v = value.trim();
  if (/^#[\da-f]{6}$/i.test(v)) return v.toUpperCase();
  if (/^#[\da-f]{3}$/i.test(v)) {
    return (
      "#" +
      v[1] +
      v[1] +
      v[2] +
      v[2] +
      v[3] +
      v[3]
    ).toUpperCase();
  }
  return "#000000";
}

function applyColorsToUI(colors) {
  for (let i = 1; i <= 6; i += 1) {
    const picker = document.getElementById(`colorPicker${i}`);
    const value = document.getElementById(`colorValue${i}`);
    const color = normalizeHex(colors[i - 1]);
    if (picker) picker.value = color;
    if (value) value.value = color;
  }
}

function applyScheme(id) {
  const schemeColors = COLOR_SCHEMES[id];
  if (!schemeColors) return;

  setCssColors(schemeColors);
  applyColorsToUI(schemeColors);

  document
    .querySelectorAll(".color-btn")
    .forEach((btn) => btn.classList.toggle("active", btn.dataset.scheme === String(id)));

  localStorage.setItem(STORAGE_KEYS.scheme, String(id));
  localStorage.removeItem(STORAGE_KEYS.custom);
}

function saveCustomColors(colors) {
  localStorage.setItem(STORAGE_KEYS.custom, JSON.stringify(colors));
}

function copyText(text, triggerBtn) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      if (!triggerBtn) return;
      const original = triggerBtn.textContent;
      triggerBtn.textContent = "Copied";
      triggerBtn.classList.add("copied");
      setTimeout(() => {
        triggerBtn.textContent = original;
        triggerBtn.classList.remove("copied");
      }, 1000);
    })
    .catch(() => {
      // Silent fallback for environments without clipboard access.
    });
}

function initColorControls() {
  const savedScheme = localStorage.getItem(STORAGE_KEYS.scheme);
  const savedCustom = localStorage.getItem(STORAGE_KEYS.custom);

  if (savedCustom) {
    try {
      const custom = JSON.parse(savedCustom);
      if (Array.isArray(custom) && custom.length === 6) {
        const normalized = custom.map(normalizeHex);
        setCssColors(normalized);
        applyColorsToUI(normalized);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEYS.custom);
    }
  } else {
    applyScheme(savedScheme || "1");
  }

  document.querySelectorAll(".color-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyScheme(btn.dataset.scheme));
  });

  for (let i = 1; i <= 6; i += 1) {
    const picker = document.getElementById(`colorPicker${i}`);
    const value = document.getElementById(`colorValue${i}`);

    if (picker) {
      picker.addEventListener("input", (event) => {
        const next = normalizeHex(event.target.value);
        document.documentElement.style.setProperty(cssVarForIndex(i), next);
        if (value) value.value = next;
        saveCustomColors(getActiveColors());
      });
    }

    if (value) {
      value.addEventListener("click", () => {
        value.select();
      });
    }
  }

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.copy || "0");
      if (!idx) return;
      const value = document.getElementById(`colorValue${idx}`)?.value;
      if (value) copyText(value, btn);
    });
  });

  const exportBtn = document.getElementById("exportAllBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const colors = getActiveColors().map(normalizeHex);
      const text = colors.join(", ");
      copyText(text, exportBtn);
    });
  }
}

function initAdjusterPanel() {
  const panel = document.getElementById("colorAdjusterPanel");
  const toggleBtn = document.getElementById("toggleAdjusterBtn");
  const closeBtn = document.getElementById("closeAdjusterBtn");

  if (!panel || !toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("open");
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => panel.classList.remove("open"));
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!panel.classList.contains("open")) return;

    if (!panel.contains(target) && !toggleBtn.contains(target)) {
      panel.classList.remove("open");
    }
  });
}

function initCustomCursor() {
  const cursor = document.getElementById("customCursor");
  if (!cursor || window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  window.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  const interactiveSelector = "a, button, input, textarea, [role='button']";
  document.querySelectorAll(interactiveSelector).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "56px";
      cursor.style.height = "56px";
      cursor.style.borderWidth = "1px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      cursor.style.borderWidth = "2px";
    });
  });
}

function initLiquidBackground() {
  const css = document.createElement("style");
  css.textContent = `
    :root {
      --liquid-color-1: ${COLOR_SCHEMES[1][0]};
      --liquid-color-2: ${COLOR_SCHEMES[1][1]};
      --liquid-color-3: ${COLOR_SCHEMES[1][2]};
      --liquid-color-4: ${COLOR_SCHEMES[1][3]};
      --liquid-color-5: ${COLOR_SCHEMES[1][4]};
      --liquid-color-6: ${COLOR_SCHEMES[1][5]};
    }

    .bg {
      background:
        radial-gradient(circle at 12% 14%, color-mix(in srgb, var(--liquid-color-1), transparent 62%), transparent 55%),
        radial-gradient(circle at 88% 16%, color-mix(in srgb, var(--liquid-color-2), transparent 62%), transparent 58%),
        radial-gradient(circle at 30% 72%, color-mix(in srgb, var(--liquid-color-3), transparent 64%), transparent 54%),
        radial-gradient(circle at 76% 82%, color-mix(in srgb, var(--liquid-color-4), transparent 68%), transparent 56%),
        linear-gradient(145deg, var(--liquid-color-5), #000 55%, var(--liquid-color-6));
      filter: saturate(115%);
    }
  `;
  document.head.appendChild(css);
}

document.addEventListener("DOMContentLoaded", () => {
  initLiquidBackground();
  initColorControls();
  initAdjusterPanel();
  initCustomCursor();
});
