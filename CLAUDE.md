# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static web application for "Bootcamp Cosmos" - a training plan presentation for Mob Programming bootcamp. The project consists of a single-page application with space-themed animations and interactive elements.

## Architecture

### Core Files Structure
- `index.html` - Main application page with complete bootcamp content
- `styles.css` - Comprehensive CSS with space theme, animations, and responsive design
- `script.js` - Interactive features including scroll animations, ripple effects, and Easter eggs
- `Logo.svg` - Cosmos brand logo
- `Capacitacion.md` - Training plan documentation in markdown
- `Futuros-Especialistas.md` - Future specialists team organization

### Design System
- **Theme**: Space/cosmos with gradient backgrounds (#00010D to #5E7EBF)
- **Typography**: Poppins font family
- **Components**: Post-it note style cards with animations
- **Color Scheme**: 
  - Blue gradients for backgrounds
  - Yellow, green, orange, red, purple, pink post-its for different content types
  - White text with proper contrast

### Key Features
- Animated starfield background with parallax scrolling
- Floating post-it animations without rotation
- Interactive hover effects and ripple animations on click
- Scroll progress indicator
- Konami code Easter egg (rainbow mode)
- Responsive team organization display
- External link loading states

## Development Commands

No build system is required - this is a static website that can be opened directly in a browser.

### Testing
- Open `index.html` in any modern web browser
- Test responsive behavior by resizing browser window
- Verify animations work smoothly across different devices

### Deployment
- Simply copy all files to any web server
- Ensure all assets (SVG, CSS, JS) are properly linked

## Content Management

### Team Organization
Teams are organized in HTML within `.teams-section` and `.future-specialists-section`. Each team has:
- Team badges with space-themed icons
- Member rosters with roles and skill levels
- Responsive horizontal/vertical layouts

### Katas and Training
External links point to sammancoaching.org for kata descriptions. Update links in the `.katas-section` if kata sources change.

### Schedule and Timing
Daily schedule is hardcoded in `.schedule-section` with specific times (9:30 AM start, lunch at 1:00 PM, etc.).

## Animation System

The application uses CSS animations and JavaScript for interactivity:
- Intersection Observer for scroll-triggered animations
- CSS transforms for hover effects
- Dynamic style injection for floating animations
- Parallax scrolling for hero section and stars

## Browser Compatibility

Designed for modern browsers with support for:
- CSS Grid and Flexbox
- ES6+ JavaScript features
- CSS custom properties (variables)
- Intersection Observer API