# Naruto Shinobi Archives

An interactive Naruto and Naruto Shippuden Wiki developed for the SE 3355 Web Programming Midterm Project.

## Project Overview

Naruto Shinobi Archives allows users to explore the Naruto universe through an interactive, responsive, and themed web application. The project combines public API integration with custom React components, animations, and additional interactive features.

## Technologies Used

- React
- Vite
- Tailwind CSS
- JavaScript
- React Router
- Context API
- LocalStorage
- React PageFlip
- Git and GitHub

## Main Features

### Home

- Introduction to the Naruto universe
- Featured shinobi
- Interactive navigation
- Random shinobi summoning system

### Characters

- API-based character listing
- Character search and pagination
- Dynamic character detail pages
- Favorite character management
- Naruto and Naruto Shippuden scope filtering

### Clans

- Clan archive
- Clan search
- Dynamic clan details
- Registered clan members
- Animated clan-themed backgrounds

### Villages

- Village archive
- Village search
- Dynamic village details
- Territory-themed cards
- Animated village backgrounds

### Bingo Book

- Interactive book with 40 shinobi records
- Realistic page-turning animations
- Page-turning sound effects
- Classified character dossiers
- API-based character information

### Watch Guide

- Naruto and Naruto Shippuden watch order
- Guide covering 720 episodes and 10 movies
- Canon and filler classifications
- Movie information retrieved from Kitsu API
- Personal watch progress tracking

### Favorites

- Add and remove favorite characters
- Search saved characters
- Persistent storage using LocalStorage

### Shinobi Battle Arena

- 50 supported shinobi with 97 character forms
- Six selectable battle locations
- Character power comparison
- Dynamic HP bars
- Animated battle simulation
- Background music and sound effects

## API Integration

The application uses the following public APIs:

- Dattebayo API: https://dattebayo-api.onrender.com
- Kitsu API: https://kitsu.io/api/edge

API responses are used to populate character, clan, village, and movie information. Loading states, error handling, and retry mechanisms are included.

## Project Structure

- `src/components` — Reusable UI components
- `src/pages` — Application pages
- `src/services` — API integration and application services
- `src/context` — Global state management
- `src/hooks` — Custom React hooks
- `src/data` — Additional feature data
- `src/utils` — Utility functions
- `public/images` — Image assets
- `public/sounds` — Audio assets

## Installation

Clone the repository:

`git clone https://github.com/beratbicen161/Naruto-Shinobi-Archives.git`

Navigate to the project directory:

`cd Naruto-Shinobi-Archives`

Install dependencies:

`npm install`

Start the development server:

`npm run dev`

## Production Build

Create a production build:

`npm run build`

Preview the production build:

`npm run preview`

## Responsive Design

The application supports desktop, tablet, and mobile layouts. It includes responsive navigation, flexible grids, and light and dark themes.

## Performance Optimization

- WebP image optimization
- Lazy loading of selected images
- Optimized image delivery
- Font loading improvements
- Lighthouse performance testing
- Reduced-motion support in selected animations

## Disclaimer

This is an unofficial, non-commercial educational fan project inspired by Naruto and Naruto Shippuden.

Naruto characters, artwork, music, and related intellectual property belong to their respective rights holders.

Battle Arena power ratings and unofficial Bingo Book bounty values are fan-made and are not official Naruto statistics.

## Repository

https://github.com/beratbicen161/Naruto-Shinobi-Archives

## Course

SE 3355 — Web Programming

Midterm Project — Fall 2026