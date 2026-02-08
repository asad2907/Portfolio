// ========================================
// PRELOADER
// ========================================
class SliderLoadingManager {
  constructor() {
    this.overlay = null;
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
    this.startTime = null;
    this.duration = 3000;
    this.createLoadingScreen();
  }

  createLoadingScreen() {
    this.overlay = document.createElement("div");
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000000;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;

    this.canvas = document.createElement("canvas");
    this.canvas.width = 300;
    this.canvas.height = 300;

    this.ctx = this.canvas.getContext("2d");
    this.overlay.appendChild(this.canvas);
    document.body.appendChild(this.overlay);

    this.startAnimation();
  }

  startAnimation() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    let time = 0;
    let lastTime = 0;

    const dotRings = [
      { radius: 20, count: 8 },
      { radius: 35, count: 12 },
      { radius: 50, count: 16 },
      { radius: 65, count: 20 },
      { radius: 80, count: 24 },
    ];

    const colors = {
      primary: "#ffffff",
      accent: "#dddddd",
    };

    const easeInOutSine = (t) => {
      return -(Math.cos(Math.PI * t) - 1) / 2;
    };

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const smoothstep = (edge0, edge1, x) => {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    };

    const hexToRgb = (hex) => {
      if (hex.startsWith("#")) {
        return [
          parseInt(hex.slice(1, 3), 16),
          parseInt(hex.slice(3, 5), 16),
          parseInt(hex.slice(5, 7), 16),
        ];
      }
      const match = hex.match(/\d+/g);
      return match
        ? [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])]
        : [255, 255, 255];
    };

    const interpolateColor = (color1, color2, t, opacity = 1) => {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * t);
      const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * t);
      const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * t);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const animate = (timestamp) => {
      if (!this.startTime) this.startTime = timestamp;

      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      time += deltaTime * 0.001;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      const rgb = hexToRgb(colors.primary);
      this.ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.9)`;
      this.ctx.fill();

      dotRings.forEach((ring, ringIndex) => {
        for (let i = 0; i < ring.count; i++) {
          const angle = (i / ring.count) * Math.PI * 2;
          const pulseTime = time * 2 - ringIndex * 0.4;
          const radiusPulse =
            easeInOutSine((Math.sin(pulseTime) + 1) / 2) * 6 - 3;
          const x = centerX + Math.cos(angle) * (ring.radius + radiusPulse);
          const y = centerY + Math.sin(angle) * (ring.radius + radiusPulse);

          const opacityPhase = (Math.sin(pulseTime + i * 0.2) + 1) / 2;
          const opacityBase = 0.3 + easeInOutSine(opacityPhase) * 0.7;
          const highlightPhase = (Math.sin(pulseTime) + 1) / 2;
          const highlightIntensity = easeInOutCubic(highlightPhase);

          this.ctx.beginPath();
          this.ctx.arc(x, y, 2, 0, Math.PI * 2);
          const colorBlend = smoothstep(0.2, 0.8, highlightIntensity);
          this.ctx.fillStyle = interpolateColor(
            colors.primary,
            colors.accent,
            colorBlend,
            opacityBase
          );
          this.ctx.fill();
        }
      });

      if (timestamp - this.startTime >= this.duration) {
        this.complete();
        return;
      }

      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  }

  complete() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.overlay) {
      this.overlay.style.opacity = "0";
      this.overlay.style.transition = "opacity 0.8s ease";
      setTimeout(() => {
        this.overlay?.remove();

        setTimeout(() => {
          const sliderWrapper = document.querySelector(".slider-wrapper");
          if (sliderWrapper) {
            sliderWrapper.classList.add("loaded");
          }
        }, 500);
      }, 800);
    }
  }
}

// Initialize preloader
document.addEventListener("DOMContentLoaded", function () {
  const loadingManager = new SliderLoadingManager();
});

// ========================================
// VISUAL EFFECTS SLIDER CONFIGURATION
// ========================================

const SLIDER_CONFIG = {
  // Core settings
  settings: {
    // Timing settings
    transitionDuration: 2.5,
    autoSlideSpeed: 5000,
    // Current state
    currentEffect: "glass",
    currentEffectPreset: "Default",
    // Global settings that affect all effects
    globalIntensity: 1.0,
    speedMultiplier: 1.0,
    distortionStrength: 1.0,
    colorEnhancement: 1.0,
    // Effect-specific settings (will be overridden by presets)
    glassRefractionStrength: 1.0,
    glassChromaticAberration: 1.0,
    glassBubbleClarity: 1.0,
    glassEdgeGlow: 1.0,
    glassLiquidFlow: 1.0,
    frostIntensity: 1.5,
    frostCrystalSize: 1.0,
    frostIceCoverage: 1.0,
    frostTemperature: 1.0,
    frostTexture: 1.0,
    rippleFrequency: 25.0,
    rippleAmplitude: 0.08,
    rippleWaveSpeed: 1.0,
    rippleRippleCount: 1.0,
    rippleDecay: 1.0,
    plasmaIntensity: 1.2,
    plasmaSpeed: 0.8,
    plasmaEnergyIntensity: 0.4,
    plasmaContrastBoost: 0.3,
    plasmaTurbulence: 1.0,
    timeshiftDistortion: 1.6,
    timeshiftBlur: 1.5,
    timeshiftFlow: 1.4,
    timeshiftChromatic: 1.5,
    timeshiftTurbulence: 1.4,
  },
  // Effect-specific presets
  effectPresets: {
    glass: {
      Subtle: {
        glassRefractionStrength: 0.6,
        glassChromaticAberration: 0.5,
        glassBubbleClarity: 1.3,
        glassEdgeGlow: 0.7,
        glassLiquidFlow: 0.8,
      },
      Default: {
        glassRefractionStrength: 1.0,
        glassChromaticAberration: 1.0,
        glassBubbleClarity: 1.0,
        glassEdgeGlow: 1.0,
        glassLiquidFlow: 1.0,
      },
      Crystal: {
        glassRefractionStrength: 1.5,
        glassChromaticAberration: 1.8,
        glassBubbleClarity: 0.7,
        glassEdgeGlow: 1.4,
        glassLiquidFlow: 0.5,
      },
      Liquid: {
        glassRefractionStrength: 0.8,
        glassChromaticAberration: 0.4,
        glassBubbleClarity: 1.2,
        glassEdgeGlow: 0.8,
        glassLiquidFlow: 1.8,
      },
    },
    frost: {
      Light: {
        frostIntensity: 0.8,
        frostCrystalSize: 1.3,
        frostIceCoverage: 0.6,
        frostTemperature: 0.7,
        frostTexture: 0.8,
      },
      Default: {
        frostIntensity: 1.5,
        frostCrystalSize: 1.0,
        frostIceCoverage: 1.0,
        frostTemperature: 1.0,
        frostTexture: 1.0,
      },
      Heavy: {
        frostIntensity: 2.2,
        frostCrystalSize: 0.7,
        frostIceCoverage: 1.4,
        frostTemperature: 1.5,
        frostTexture: 1.3,
      },
      Arctic: {
        frostIntensity: 2.8,
        frostCrystalSize: 0.5,
        frostIceCoverage: 1.8,
        frostTemperature: 2.0,
        frostTexture: 1.6,
      },
    },
    ripple: {
      Gentle: {
        rippleFrequency: 15.0,
        rippleAmplitude: 0.05,
        rippleWaveSpeed: 0.7,
        rippleRippleCount: 0.8,
        rippleDecay: 1.2,
      },
      Default: {
        rippleFrequency: 25.0,
        rippleAmplitude: 0.08,
        rippleWaveSpeed: 1.0,
        rippleRippleCount: 1.0,
        rippleDecay: 1.0,
      },
      Strong: {
        rippleFrequency: 35.0,
        rippleAmplitude: 0.12,
        rippleWaveSpeed: 1.4,
        rippleRippleCount: 1.3,
        rippleDecay: 0.8,
      },
      Tsunami: {
        rippleFrequency: 45.0,
        rippleAmplitude: 0.18,
        rippleWaveSpeed: 1.8,
        rippleRippleCount: 1.6,
        rippleDecay: 0.6,
      },
    },
    plasma: {
      Calm: {
        plasmaIntensity: 0.8,
        plasmaSpeed: 0.5,
        plasmaEnergyIntensity: 0.2,
        plasmaContrastBoost: 0.1,
        plasmaTurbulence: 0.6,
      },
      Default: {
        plasmaIntensity: 1.2,
        plasmaSpeed: 0.8,
        plasmaEnergyIntensity: 0.4,
        plasmaContrastBoost: 0.3,
        plasmaTurbulence: 1.0,
      },
      Storm: {
        plasmaIntensity: 1.8,
        plasmaSpeed: 1.3,
        plasmaEnergyIntensity: 0.7,
        plasmaContrastBoost: 0.5,
        plasmaTurbulence: 1.5,
      },
      Nuclear: {
        plasmaIntensity: 2.5,
        plasmaSpeed: 1.8,
        plasmaEnergyIntensity: 1.0,
        plasmaContrastBoost: 0.8,
        plasmaTurbulence: 2.0,
      },
    },
    timeshift: {
      Subtle: {
        timeshiftDistortion: 0.5,
        timeshiftBlur: 0.6,
        timeshiftFlow: 0.5,
        timeshiftChromatic: 0.4,
        timeshiftTurbulence: 0.6,
      },
      Default: {
        timeshiftDistortion: 1.6,
        timeshiftBlur: 1.5,
        timeshiftFlow: 1.4,
        timeshiftChromatic: 1.5,
        timeshiftTurbulence: 1.4,
      },
      Intense: {
        timeshiftDistortion: 2.2,
        timeshiftBlur: 2.0,
        timeshiftFlow: 2.0,
        timeshiftChromatic: 2.2,
        timeshiftTurbulence: 2.0,
      },
      Dreamlike: {
        timeshiftDistortion: 2.8,
        timeshiftBlur: 2.5,
        timeshiftFlow: 2.5,
        timeshiftChromatic: 2.6,
        timeshiftTurbulence: 2.5,
      },
    },
  },
};
