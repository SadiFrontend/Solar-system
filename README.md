# 🌌 Solar System Simulation - True Real Positions

<div align="center">

![Solar System](https://img.shields.io/badge/Solar%20System-Simulation-blue?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-HTML5-yellow?style=for-the-badge&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Stars](https://img.shields.io/github/stars/SadiFrontend/Solar-system?style=for-the-badge)

**An interactive, astronomically accurate solar system simulation using real NASA orbital data**

[Live Demo](https://sadifrontend.github.io/Solar-system/) • [Features](#features) • [Installation](#installation) • [Usage](#usage)

</div>

---

## ✨ Features

### 🎯 **True Real-Time Positions**
- Uses **NASA JPL orbital elements** for accurate planet positions
- Implements **Kepler's equations** for precise orbital mechanics
- Calculates positions from the **J2000.0 epoch** (astronomical standard)
- Accounts for **elliptical orbits**, inclination, and orbital nodes

### 🎮 **Interactive Controls**
- **🌍 Real Time Mode** - See where planets are RIGHT NOW
- **Speed Control** - 0.5x to 10x simulation speed
- **Zoom & Pan** - Explore the solar system freely
- **Toggle Trails** - Visualize planetary orbits
- **Toggle Labels** - Show/hide planet names
- **Pause/Resume** - Control the simulation

### 🚀 **Performance Optimized**
- 60 FPS smooth animation
- Efficient canvas rendering
- Optimized trail drawing
- 300 twinkling background stars
- 200 asteroid belt objects

### 📊 **Accurate Data**
- Real orbital periods (Mercury: 88 days, Earth: 365.26 days, etc.)
- Proper orbital eccentricity and inclination
- Moon orbits for Earth, Mars, Jupiter, Saturn, Uranus, Neptune
- Saturn's iconic rings
- Asteroid belt between Mars and Jupiter

---

## 🚀 Quick Start

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SadiFrontend/Solar-system.git
cd Solar-system
```

2. **Open in browser**
```bash
# Simply open index.html in your browser
# No build process required!
```

Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

3. **Visit** `http://localhost:8000`

### Or visit the live demo:
**🌐 [https://sadifrontend.github.io/Solar-system/](https://sadifrontend.github.io/Solar-system/)**

---

## 📖 Usage

### Controls

| Control | Action |
|---------|--------|
| **🌍 Real Time Mode** | Toggle real astronomical positions |
| **0.5x - 10x** | Adjust simulation speed |
| **Zoom +/-** | Zoom in/out |
| **Reset** | Reset view to center |
| **Toggle Trails** | Show/hide orbital paths |
| **Toggle Labels** | Show/hide planet names |
| **⏯ Pause/Resume** | Pause/resume simulation |
| **Click & Drag** | Pan the view |
| **Mouse Wheel** | Zoom in/out |

### Modes

#### 🎮 Simulation Mode (Default)
- Start from January 1, 2000
- Adjustable speed (0.5x to 10x)
- Perfect for education and visualization

#### 🌍 Real Time Mode
- Shows **current actual positions** of planets
- Updates in real-time
- Based on NASA orbital elements
- Astronomically accurate

---

## 🔬 Technical Details

### Astronomical Calculations

The simulation uses **real orbital mechanics**:

1. **Orbital Elements** (from NASA JPL):
   - Semi-major axis (a)
   - Eccentricity (e)
   - Inclination (I)
   - Mean longitude (L)
   - Longitude of perihelion (ϖ)
   - Longitude of ascending node (Ω)

2. **Kepler's Equation**:
   ```
   M = E - e·sin(E)
   ```
   Solved iteratively to find the eccentric anomaly (E)

3. **True Anomaly** (ν):
   ```
   ν = 2·atan2(√(1+e)·sin(E/2), √(1-e)·cos(E/2))
   ```

4. **3D Coordinate Transformation**:
   - Rotate from orbital plane to ecliptic plane
   - Account for inclination and node positions

### Technology Stack

- **Pure JavaScript** - No frameworks required
- **HTML5 Canvas** - High-performance 2D rendering
- **NASA JPL Data** - Accurate orbital elements
- **Responsive Design** - Works on all screen sizes

---

## 🎓 Educational Value

Perfect for:
- 🏫 **Schools** - Teaching orbital mechanics
- 📚 **Students** - Understanding planetary motion
- 🔭 **Astronomy Enthusiasts** - Visualizing current planet positions
- 👨‍💻 **Developers** - Learning canvas and orbital calculations

---

## 🌟 Planets Included

| Planet | Orbital Period | Moons | Special Features |
|--------|---------------|-------|------------------|
| ☿ Mercury | 88 days | 0 | Smallest, fastest orbit |
| ♀ Venus | 225 days | 0 | Hottest planet |
| 🌍 Earth | 365.26 days | 1 | Our home |
| ♂ Mars | 687 days | 2 | The Red Planet |
| ♃ Jupiter | 11.86 years | 2+ | Largest planet |
| ♄ Saturn | 29.46 years | 2+ | Beautiful rings |
| ♅ Uranus | 84.01 years | 1+ | Rotates on side |
| ♆ Neptune | 164.79 years | 1+ | Farthest planet |

---

## 🛠️ Customization

### Modify Orbital Elements
Edit the `orbitalElements` object in `index.html`:
```javascript
const orbitalElements = {
    Mercury: {
        elements: [a, e, I, L, longPeri, longNode],
        rates: [da, de, dI, dL, dlongPeri, dlongNode]
    },
    // ...
};
```

### Adjust Visual Settings
```javascript
const AU = 80;              // 1 AU = 80 pixels
const scaleFactor = ...;    // Planet size scale
const stars = 300;          // Number of stars
const asteroids = 200;      // Number of asteroids
```

### Change Colors
```javascript
const planets = [
    { name:"Mercury", color:"gray", ... },
    { name:"Venus", color:"orange", ... },
    // Customize colors here
];
```

---

## 📊 Performance

- **60 FPS** - Smooth animation
- **Optimized rendering** - Efficient canvas drawing
- **Responsive** - Adapts to window size
- **Memory efficient** - Trail limiting

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🔨 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. ✅ Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

### Ideas for Contributions
- Add more moons with accurate orbits
- Implement planet rotation
- Add comet trajectories
- Include dwarf planets (Pluto, Ceres, etc.)
- Add planet information panels
- Implement search functionality
- Add date picker for specific dates
- Include planet phases (like Moon phases)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **NASA JPL** - Orbital element data
- **Astronomical Algorithms** - Jean Meeus
- **Canvas API** - HTML5 rendering
- Inspired by real astronomical simulation software

---

## 📧 Contact

Project Link: [https://github.com/SadiFrontend/Solar-system](https://github.com/SadiFrontend/Solar-system)

Live Demo: [https://sadifrontend.github.io/Solar-system/](https://sadifrontend.github.io/Solar-system/)

---

<div align="center">

### ⭐ Star this repository if you find it useful!

Made with ❤️ and ☕

[Report Bug](https://github.com/SadiFrontend/Solar-system/issues) • [Request Feature](https://github.com/SadiFrontend/Solar-system/issues)

</div>

---

## 🔮 Future Plans

- [ ] Add more celestial bodies (dwarf planets, major moons)
- [ ] Implement 3D view option
- [ ] Add planet information cards
- [ ] Include historical comet data
- [ ] Add constellation backgrounds
- [ ] Implement time travel (view any date)
- [ ] Add spacecraft trajectories
- [ ] Mobile touch controls optimization
- [ ] Dark/light theme toggle
- [ ] Export orbit data as JSON

---

## 📚 References

- [NASA JPL Horizons System](https://ssd.jpl.nasa.gov/horizons/)
- [Astronomical Algorithms by Jean Meeus](https://www.willbell.com/math/MC1.HTM)
- [Keplerian Elements](https://en.wikipedia.org/wiki/Orbital_elements)
- [J2000 Epoch](https://en.wikipedia.org/wiki/Epoch_(astronomy)#Julian_years_and_J2000)

</div>
