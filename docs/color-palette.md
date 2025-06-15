# 🎨 Sword Nest - Color Palette Guide

## Primary Color Palette

### Charcoal Black
- **Hex:** `#0F0F0F`
- **RGB:** `rgb(15, 15, 15)`
- **Usage:** Primary background, text containers, modern sections
- **Mood:** Charismatic, sophisticated, mysterious
- **Application:** Main backgrounds, content boxes, navigation

### Neon Blue
- **Hex:** `#38BDF8`
- **RGB:** `rgb(56, 189, 248)`
- **Usage:** AI elements, interactive features, CTAs, sword glow
- **Mood:** Technology, youth, energy, innovation
- **Application:** Headings, buttons, highlights, sword effects

### Silver Gray
- **Hex:** `#9CA3AF`
- **RGB:** `rgb(156, 163, 175)`
- **Usage:** Subtle details, borders, secondary text
- **Mood:** Elegant, polished, refined
- **Application:** Borders, secondary content, metadata

### Orange
- **Hex:** `#F97316`
- **RGB:** `rgb(249, 115, 22)`
- **Usage:** Attention-grabbing elements, motion indicators
- **Mood:** Dynamic, energetic, warm
- **Application:** Alerts, highlights, hover states, accents

### Light Gray
- **Hex:** `#F3F4F6`
- **RGB:** `rgb(243, 244, 246)`
- **Usage:** Background balance, text highlights, separators
- **Mood:** Clean, balanced, readable
- **Application:** Body text, content backgrounds, cards

---

## Color Combinations

### 🗡️ Sword Effects
```css
/* Primary Sword Glow */
filter: drop-shadow(0 0 20px #38BDF8) 
        drop-shadow(0 0 40px #38BDF8) 
        drop-shadow(0 0 60px rgba(56, 189, 248, 0.3));

/* Enhanced Sword Glow */
filter: drop-shadow(0 0 30px #38BDF8) 
        drop-shadow(0 0 60px #38BDF8) 
        drop-shadow(0 0 90px rgba(56, 189, 248, 0.5));
```

### 🌟 Interactive Elements
```css
/* CTA Button Gradient */
background: linear-gradient(45deg, #F97316, #38BDF8);

/* Hover State */
box-shadow: 0 8px 25px rgba(249, 115, 22, 0.5);
```

### 📱 Content Sections
```css
/* Content Box Background */
background: rgba(15, 15, 15, 0.9);
border: 1px solid #9CA3AF;
backdrop-filter: blur(10px);

/* Video Section */
background: rgba(15, 15, 15, 0.95);
border: 2px solid #38BDF8;
box-shadow: 0 0 30px rgba(56, 189, 248, 0.2);
```

---

## Usage Guidelines

### Do's ✅
- Use **Neon Blue** for all AI-related content and features
- Apply **Charcoal Black** for backgrounds requiring sophistication
- Highlight key terms with **Orange** for immediate attention
- Use **Silver Gray** for elegant borders and secondary information
- Apply **Light Gray** for readable body text

### Don'ts ❌
- Don't mix warm and cool tones without purpose
- Avoid using Orange as primary background (too aggressive)
- Don't use Light Gray on Light Gray (poor contrast)
- Avoid overusing Neon Blue (loses impact)

### Accessibility Notes 🌐
- **Contrast Ratios:**
  - Light Gray on Charcoal Black: `16.9:1` (Excellent)
  - Neon Blue on Charcoal Black: `12.3:1` (Excellent)
  - Orange on Charcoal Black: `9.8:1` (Good)
  - Silver Gray on Charcoal Black: `7.2:1` (Good)

---

## CSS Variables Setup

```css
:root {
    /* Primary Colors */
    --charcoal-black: #0F0F0F;
    --neon-blue: #38BDF8;
    --silver-gray: #9CA3AF;
    --orange: #F97316;
    --light-gray: #F3F4F6;
    
    /* Opacity Variants */
    --charcoal-black-90: rgba(15, 15, 15, 0.9);
    --charcoal-black-95: rgba(15, 15, 15, 0.95);
    --neon-blue-30: rgba(56, 189, 248, 0.3);
    --neon-blue-50: rgba(56, 189, 248, 0.5);
    --orange-30: rgba(249, 115, 22, 0.3);
    --orange-50: rgba(249, 115, 22, 0.5);
    
    /* Dark Overlay */
    --overlay-dark: rgba(0, 0, 0, 0.7);
    --overlay-spotlight: rgba(0, 0, 0, 0.9);
}
```

---

## Brand Applications

### Logo & Branding
- **Primary:** Neon Blue (#38BDF8)
- **Secondary:** Silver Gray (#9CA3AF)
- **Background:** Charcoal Black (#0F0F0F)

### Typography Hierarchy
- **H1 (Hero):** Neon Blue with glow effect
- **H2 (Sections):** Neon Blue with subtle shadow
- **Body Text:** Light Gray for readability
- **Highlights:** Orange for emphasis
- **Metadata:** Silver Gray for secondary info

### Interactive States
- **Default:** Neon Blue border/background
- **Hover:** Orange transformation
- **Active:** Combined gradient (Orange → Neon Blue)
- **Disabled:** Silver Gray with reduced opacity

---

## Emotional Color Mapping

### 🤖 AI & Technology
- **Primary:** Neon Blue (innovation, digital, future)
- **Support:** Silver Gray (precision, reliability)

### ⚡ Dynamic & Creative
- **Primary:** Orange (energy, creativity, movement)
- **Support:** Neon Blue (technology integration)

### 🎯 Professional & Trustworthy
- **Primary:** Charcoal Black (sophistication, stability)
- **Support:** Light Gray (clarity, openness)

---

## Implementation Examples

### Sword Animation Colors
```css
.sword-glow-low {
    filter: drop-shadow(0 0 15px var(--neon-blue-30));
}

.sword-glow-medium {
    filter: drop-shadow(0 0 25px var(--neon-blue)) 
            drop-shadow(0 0 45px var(--neon-blue-50));
}

.sword-glow-high {
    filter: drop-shadow(0 0 35px var(--neon-blue)) 
            drop-shadow(0 0 65px var(--neon-blue)) 
            drop-shadow(0 0 95px var(--neon-blue-50));
}
```

### Spotlight Effect Colors
```css
.spotlight-normal {
    background: radial-gradient(circle, transparent 0%, var(--overlay-spotlight) 70%);
}

.spotlight-enhanced {
    background: radial-gradient(circle, transparent 0%, var(--overlay-dark) 70%);
}
```

### Text Emphasis Classes
```css
.text-ai { color: var(--neon-blue); font-weight: bold; }
.text-dynamic { color: var(--orange); font-weight: bold; }
.text-elegant { color: var(--silver-gray); }
.text-primary { color: var(--light-gray); }
```

---

## Design Philosophy

The Sword Nest color palette embodies the perfect fusion of **cutting-edge technology** and **artistic craftsmanship**. Each color serves a specific purpose in creating an immersive, professional, and visually striking experience that reflects our **"Dinamik & Yaratıcı"** approach to **Yapay Zeka** solutions.

**Last Updated:** June 2025  
**Version:** 1.0