import './App.css';
import lightningSvgPath from './assets/2031288.svg'; // Імпортуємо шлях до SVG
import { useEffect, useState, useRef } from 'react';

function App() {
  const allLightningBolts = [
    { id: 1, top: '-12%', left: '25%', rotation: 85, scale: 10, active: false, transformOrigin: 'top center' },   
    { id: 2, top: '5%', left: '84%', rotation: 93, scale: 10, active: true, transformOrigin: 'top center' },   
    { id: 3, top: '-50%', left: '50%', rotation: 85, scale: 10, active: false, transformOrigin: 'top center' },   
    { id: 4, top: '-12%', left: '70%', rotation: 95, scale: 10, active: false, transformOrigin: 'top center' },   
    { id: 5, top: '-2%', left: '90%', rotation: 88, scale: 10, active: true, transformOrigin: 'top center' },
    { id: 6, top: '-5%', left: '10%', rotation: 92, scale: 10, active: false, transformOrigin: 'top center' },   
    { id: 7, top: '-6%', left: '120%', rotation: 92, scale: 10, active: false, transformOrigin: 'top center' }  
  ];

  const activeBolts = allLightningBolts.filter(bolt => bolt.active);
  const [sparks, setSparks] = useState([]);
  const animationFrameRef = useRef();

  // Визначаємо назву анімації, що відповідає в App.css
  const animationName = 'lightningFlash';
  
  // Генеруємо початкові дані іскор
  useEffect(() => {
    // Створюємо початкові іскри
    const initialSparks = Array.from({ length: 150 }, () => createSpark());
    setSparks(initialSparks);
    
    // Функція для оновлення позицій іскор за допомогою requestAnimationFrame для плавнішого руху
    let lastTime = 0;
    const updateSparks = (timestamp) => {
      // Оновлюємо кожні ~100мс для кращої продуктивності
      if (lastTime === 0 || timestamp - lastTime > 100) {
        lastTime = timestamp;
        
        setSparks(prevSparks => prevSparks.map(spark => {
          // Обчислюємо нову позицію на основі векторів напрямку
          const newX = spark.x + spark.speedX * 0.1;
          const newY = spark.y + spark.speedY * 0.1;
          
          // Перевіряємо, чи іскра вийшла за межі
          if (newX < -10 || newX > 110 || newY < -10 || newY > 110) {
            // Створюємо нову іскру з вищим пріоритетом лівої сторони для іскор поза межами
            const newSpark = createSpark();
            // Додатковий 20% шанс примусової появи зліва для іскор поза межами
            if (Math.random() < 0.2) {
              newSpark.x = Math.random() * 40; // 0-40% (сильніший лівий зсув)
            }
            return newSpark;
          }
          
          return {
            ...spark,
            x: newX,
            y: newY,
            // Час від часу змінюємо напрямок трохи для природнішого руху
            speedX: Math.random() > 0.95 ? spark.speedX + (Math.random() - 0.5) * 0.2 : spark.speedX,
            speedY: Math.random() > 0.95 ? spark.speedY + (Math.random() - 0.5) * 0.2 : spark.speedY
          };
        }));
      }
      
      animationFrameRef.current = requestAnimationFrame(updateSparks);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateSparks);
    
    // Очищення
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Створюємо нову іскру з випадковими властивостями
  const createSpark = () => {
    // Випадкова позиція з нахилом до лівої сторони
    let x;
    if (Math.random() > 0.4) {
      // 60% шанс створення зліва
      x = Math.random() * 50; // 0-50%
    } else {
      // 40% шанс створення справа
      x = 50 + Math.random() * 50; // 50-100%
    }
    const y = Math.random() * 100;
    
    // Випадковий вектор напрямку
    const angle = Math.random() * Math.PI * 2; // Випадковий кут в радіанах
    const speed = 0.05 + Math.random() * 0.1; // Повільна швидкість руху
    
    // Розмір та зовнішній вигляд
    const size = 2 + Math.random() * 10;
    const hue = 30 + Math.random() * 30;
    const brightness = 60 + Math.random() * 20;
    
    return {
      id: Math.random().toString(36).substring(2, 9),
      x, 
      y,
      size,
      speedX: Math.cos(angle) * speed,
      speedY: Math.sin(angle) * speed,
      opacity: 0.3 + Math.random() * 0.7,
      color: `hsla(${hue}, 100%, ${brightness}%, 0.9)`,
      shadowColor: `hsla(${hue}, 100%, ${brightness - 10}%, 0.7)`,
      shadowSize: Math.floor(size / 2 + Math.random() * 2)
    };
  };

  return (
    <div className="App">
      {/* Контейнер частинок */}
      <div id="particles-container">
        {sparks.map(spark => (
          <div
            key={spark.id}
            style={{
              position: 'absolute',
              left: `${spark.x}%`,
              top: `${spark.y}%`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${spark.color} 0%, ${spark.shadowColor} 50%, transparent 70%)`,
              boxShadow: `0 0 ${spark.shadowSize}px ${spark.shadowColor}`,
              opacity: spark.opacity,
              zIndex: 25,
              mixBlendMode: 'screen',
              filter: 'blur(0.5px)',
              pointerEvents: 'none',
              transition: 'none'
            }}
          />
        ))}
      </div>
      
      {/* Сучасне навігаційне меню */}
      <nav className="navbar">
        <div className="navbar-logo">
          <span className="lightning-icon">⚡</span>
          <div className="logo-text">
            <span className="logo-letter">C</span>
            <span className="logo-letter">h</span>
            <span className="logo-letter">a</span>
            <span className="logo-letter">r</span>
            <span className="logo-letter">g</span>
            <span className="logo-letter">e</span>
            <span className="logo-letter">T</span>
            <span className="logo-letter">a</span>
            <span className="logo-letter">p</span>
          </div>
        </div>
        <div className="navbar-links">
          <div className="dropdown">
            <span onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>Про ChargeTap</span>
            <i className="dropdown-arrow">▼</i>
          </div>
          <span onClick={() => document.getElementById('advantages').scrollIntoView({ behavior: 'smooth' })}>Переваги</span>
          <span onClick={() => document.getElementById('use-cases').scrollIntoView({ behavior: 'smooth' })}>Технологія</span>
        </div>
        <div className="navbar-action">
          <button className="try-button" onClick={() => document.getElementById('cta').scrollIntoView({ behavior: 'smooth' })}>Замовити</button>
        </div>
      </nav>

      <header className="App-header">
        <img src="/Zevs2.png" alt="Зевс" className="zevs-image" />

        {activeBolts.map((bolt) => {
          // Знаходимо оригінальний індекс для послідовної затримки анімації
          const originalIndex = allLightningBolts.findIndex(b => b.id === bolt.id);
          let transformStyle = `rotate(${bolt.rotation}deg)`;
          if (bolt.scale) { 
            transformStyle += ` scale(${bolt.scale})`;
          }

          return (
            <div 
              key={bolt.id} 
              className="svg-lightning-bolt-container"
              style={{
                top: bolt.top,
                left: bolt.left,
                width: 'auto', 
                height: 'auto', 
                transform: transformStyle,
                transformOrigin: bolt.transformOrigin || 'top center'
              }}
            >
              <img 
                src={lightningSvgPath} 
                alt="Блискавка SVG" 
                className="lightning-svg-itself" 
                style={{ animationDelay: `${originalIndex * 0.4}s` }}
              />
            </div>
          );
        })}

        <div className="main-brand-title-container">
          <h1 className="main-brand-title">ChargeTap</h1>
        </div>
        
        <div className="page-lower-content">
          <div className="marquee-sign-container">
            <div className="marquee-text">
              Забудь про дроти та розряджені пристрої. Майбутнє зарядки в твоїй руці.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Забудь про дроти та розряджені пристрої. Майбутнє зарядки в твоїй руці.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
          <button onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>Дізнатися більше</button>
        </div>

      </header>

      {/* Розділ функцій */}
      <section className="features-section" id="features">
        <div className="container">
          <h2 className="section-title">Як це працює</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Двостороння передача енергії</h3>
              <p>NFC-чіп з двосторонньою енергопередачею дозволяє пристроям обмінюватися енергією без кабелів.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Універсальна сумісність</h3>
              <p>Працює з смартфонами, навушниками, смарт-годинниками та IoT-пристроями.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Миттєва активація</h3>
              <p>Заряджання починається автоматично при наближенні пристроїв — жодних додаткових дій.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔋</div>
              <h3>Енергоефективність</h3>
              <p>Спеціально оптимізовані схеми та алгоритми для максимально ефективного збору та передачі енергії.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Розділ переваг */}
      <section className="advantages-section" id="advantages">
        <div className="container">
          <h2 className="section-title">Переваги</h2>
          <div className="advantages-list">
            <div className="advantage-item">
              <div className="advantage-icon">✓</div>
              <div className="advantage-content">
                <h3>Швидка зарядка без кабелю</h3>
                <p>Забудьте про пошуки зарядного кабелю та розетки</p>
              </div>
            </div>
            <div className="advantage-item">
              <div className="advantage-icon">✓</div>
              <div className="advantage-content">
                <h3>Повна мобільність</h3>
                <p>Заряджайте пристрої навіть у дорозі або віддалених місцях</p>
              </div>
            </div>
            <div className="advantage-item">
              <div className="advantage-icon">✓</div>
              <div className="advantage-content">
                <h3>Автоматична активація</h3>
                <p>Зарядка починається миттєво при наближенні пристроїв</p>
              </div>
            </div>
            <div className="advantage-item">
              <div className="advantage-icon">✓</div>
              <div className="advantage-content">
                <h3>Інтеграція з більшістю пристроїв</h3>
                <p>Сумісність з усіма сучасними NFC-пристроями</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Розділ випадків використання */}
      <section className="use-cases-section" id="use-cases">
        <div className="container">
          <h2 className="section-title">Вирішуємо реальні проблеми</h2>
          <div className="use-cases-grid">
            <div className="use-case-card">
              <img src="/use-case-1.svg" alt="Розряджений пристрій" className="use-case-img" />
              <h3>Нема розетки поруч?</h3>
              <p>ChargeTap дозволяє заряджати пристрої без доступу до електромережі, коли ви в дорозі або на природі.</p>
            </div>
            <div className="use-case-card">
              <img src="/use-case-2.svg" alt="Багато кабелів" className="use-case-img" />
              <h3>Заплутались у кабелях?</h3>
              <p>ChargeTap позбавляє від необхідності носити з собою численні зарядні кабелі та адаптери.</p>
            </div>
            <div className="use-case-card">
              <img src="/use-case-3.svg" alt="IoT пристрої" className="use-case-img" />
              <h3>IoT пристрої без живлення?</h3>
              <p>ChargeTap ідеально підходить для живлення малопотужних IoT-пристроїв та датчиків.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Розділ CTA */}
      <section className="cta-section" id="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Готові до революції в зарядці пристроїв?</h2>
            <p>Приєднуйтесь до технологічної революції вже сьогодні</p>
            <button className="cta-button">Замовити ChargeTap</button>
          </div>
        </div>
      </section>
      
      {/* Футер */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="lightning-icon">⚡</span>
              <span>ChargeTap</span>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Компанія</h4>
                <ul>
                  <li>Про нас</li>
                  <li>Команда</li>
                  <li>Контакти</li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Продукти</h4>
                <ul>
                  <li>NFC-чіп</li>
                  <li>Інтеграції</li>
                  <li>Для бізнесу</li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Зв'язатися</h4>
                <ul>
                  <li>info@chargetap.com</li>
                  <li>+380 44 123 4567</li>
                  <li>Київ, Україна</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} ChargeTap. Всі права захищені.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
