import './App.css';
import lightningSvgPath from './assets/2031288.svg'; // Импортируем путь к SVG

function App() {
  const lightningBolts = [
    { id: 1, top: '-10%', left: '30%', rotation: 87, scale: 13 },      
    { id: 2, top: '-5%', left: '85%', rotation: 93, scale: 15 },      
    { id: 3, top: '0%', left: '50%', rotation: 85, scale: 12 },      
    { id: 4, top: '-12%', left: '70%', rotation: 95, scale: 16 },     
    { id: 5, top: '-2%', left: '95%', rotation: 88, scale: 14.5 },   
    { id: 6, top: '-8%', left: '15%', rotation: 90, scale: 12.5 },
    { id: 7, top: '-6%', left: '120%', rotation: 92, scale: 13.5 } // Added 7th bolt back, far right
  ];

  // Define the animation name matching the one in App.css
  const animationName = 'lightningFlash'; // Make sure 'lightningFlash' keyframes are defined in App.css

  return (
    <div className="App">
      <header className="App-header">
        {lightningBolts.map((bolt, index) => (
          <div 
            key={bolt.id} 
            className="svg-lightning-bolt-container"
            style={{
              top: bolt.top,
              left: bolt.left,
              transform: `rotate(${bolt.rotation}deg) scale(${bolt.scale})`,
              transformOrigin: 'top center',
              // Further varied animation timings
              animation: `${animationName} ${2.8 + index * 0.25}s linear ${index * 0.22}s infinite`,
            }}
          >
            <img src={lightningSvgPath} alt="Lightning Bolt SVG" className="lightning-svg-itself" />
          </div>
        ))}

        <h1 className="main-brand-title">ChargeTap: Заряджай гаджети одним дотиком кільця!</h1>
        <p className="subtitle-text">Забудь про дроти та розряджені пристрої. Майбутнє зарядки на твоїй руці.</p>
        <button>Дізнатися більше</button>
        <img src="/nfc-device.png" alt="NFC Device" className="floating-nfc-device" /> 
      </header>
    </div>
  );
}

export default App;
