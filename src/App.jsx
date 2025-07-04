import { useState, useEffect } from 'react';
import berserk from './assets/berserk.jpg';
import Slider from 'react-slick';
import SocialIcons from './SocialIcons';
import './no-scrollbar.css';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



function AnimatedParticles() {
  // Simple canvas particles background
  useEffect(() => {
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      o: Math.random() * 0.3 + 0.1
    }));
    let animationId;
    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(168,85,247,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > window.innerWidth) p.dx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.dy *= -1;
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener('resize', resize);
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <canvas id="particles-bg" className="fixed inset-0 w-full h-full z-0 pointer-events-none" />
  );
}

function RainEffect() {
  useEffect(() => {
    const section = document.getElementById('About_me');
    if (!section) return;
    let width = section.offsetWidth;
    let height = section.offsetHeight;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = 'absolute';
    canvas.style.top = 6;
    canvas.style.left = 6;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 1;
    section.prepend(canvas);
    const ctx = canvas.getContext('2d');
    let drops = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height-180)+180, 
      l: Math.random() * 18 + 12,
      ySpeed: Math.random() * 4 + 4,
      opacity: Math.random() * 0.3 + 0.3
    }));
    let animationId;
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.l);
        ctx.strokeStyle = `rgba(59, 130, 246, ${d.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        d.y += d.ySpeed;
        if (d.y > height) {
          d.y = -d.l+180;
          d.x = Math.random() * width;
        }
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    function handleResize() {
      width = section.offsetWidth;
      height = section.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      canvas.remove();
    };
  }, []);
  return null;
}


function CloudsBackdrop() {
  // SVG grande con muchas nubes superpuestas, difuminadas y anchas
  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none z-0" style={{height: '180px', minWidth: '100vw', overflow: 'hidden'}}>
      <svg width="100vw" height="180" viewBox={`0 0 ${window.innerWidth || 1440} 180`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{minWidth: '100vw'}}>
        {/* Nubes distribuidas proporcionalmente a lo ancho */}
        <ellipse cx={(window.innerWidth || 1440) * 0.12} cy="90" rx="180" ry="60" fill="#e0e7ef" fillOpacity="0.7" />
        <ellipse cx={(window.innerWidth || 1440) * 0.28} cy="60" rx="140" ry="50" fill="#cbd5e1" fillOpacity="0.6" />
        <ellipse cx={(window.innerWidth || 1440) * 0.45} cy="100" rx="200" ry="70" fill="#e0e7ef" fillOpacity="0.7" />
        <ellipse cx={(window.innerWidth || 1440) * 0.65} cy="60" rx="160" ry="55" fill="#f1f5f9" fillOpacity="0.7" />
        <ellipse cx={(window.innerWidth || 1440) * 0.83} cy="100" rx="180" ry="60" fill="#e0e7ef" fillOpacity="0.7" />
        <ellipse cx={(window.innerWidth || 1440) * 0.94} cy="60" rx="120" ry="40" fill="#cbd5e1" fillOpacity="0.5" />
        {/* Nubes extra para tapizar */}
        <ellipse cx={(window.innerWidth || 1440) * 0.21} cy="140" rx="100" ry="30" fill="#e0e7ef" fillOpacity="0.5" />
        <ellipse cx={(window.innerWidth || 1440) * 0.56} cy="150" rx="120" ry="35" fill="#cbd5e1" fillOpacity="0.4" />
        <ellipse cx={(window.innerWidth || 1440) * 0.76} cy="180" rx="90" ry="28" fill="#f1f5f9" fillOpacity="0.4" />
      </svg>
    </div>
  );
}

function App() {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // solo una slide visible a la vez
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-600 via-orange-200 to-orange-500 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 overflow-x-hidden scroll-smooth">
      <AnimatedParticles />
      <div className="text-white font-bold">En desarrollo...</div>
      <SocialIcons />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Avatar con animación */}
        <div className="mt-24 mb-8 animate-fade-in-up">
          <div className="w-40 h-40 rounded-full border-8 border-gradient-to-tr from-purple-500 via-orange-400 to-orange-600 shadow-xl overflow-hidden animate-avatar-glow">
            <img src={berserk} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Título principal animado */}
        <h1 className="text-5xl md:text-7xl font-extrabold font-serif text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-orange-500 to-orange-600 animate-gradient-x drop-shadow-lg animate-fade-in">
          ¡Hola! Soy <span className="text-orange-600 dark:text-teal-200 animate-pulse">Fabián Paillacán</span>
        </h1>

        {/* Subtítulo con efecto máquina de escribir */}
        <div className="mt-8 animate-fade-in-delay">
          <p className="text-2xl md:text-3xl font-mono text-gray-800 dark:text-gray-200 border-r-4 border-orange-500 pr-2 inline-block animate-typewriter overflow-hidden whitespace-nowrap">
            Frontend Developer & UI Enthusiast
          </p>
        </div>

        {/* Botón que hace scroll al section#sobre mi */}
        <section className="flex flex-row items-center mt-12">
        <button
          className="mt-12 p-8 py-4 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold rounded-full shadow-lg text-xl hover:scale-105 hover:from-orange-500 hover:to-purple-500 transition-all duration-200 animate-bounce w-full block focus:shadow-none active:shadow-none disabled:opacity-50 disabled:shadow-none"
          style={{ maxWidth: 'fit-content' }}
          onClick={() => {
            const el = document.getElementById('About_me');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Sobre mí
        </button>
        <button
          className="ml-6 mt-12 p-8 py-4 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold rounded-full shadow-lg text-xl hover:scale-105 hover:from-orange-500 hover:to-purple-500 transition-all duration-200 animate-bounce w-full block focus:shadow-none active:shadow-none disabled:opacity-50 disabled:shadow-none"
          style={{ maxWidth: 'fit-content' }}
          onClick={() => {
            const el = document.getElementById('projects');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Ver proyectos
        </button>
        </section>
        {/* Línea decorativa animada */}
        <div className="mt-16 w-32 h-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full animate-line-grow origin-left"></div>
      </main>
          {/* Seccion sobre mi y skills*/}
  <section id="About_me" className="relative z-10 py-20 flex items-center justify-center min-h-screen p-8 bg-gray-100 dark:bg-slate-800 overflow-hidden" data-section="about">
    <CloudsBackdrop />
    <RainEffect />
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-stretch">
        {/* Columna izquierda - Sobre mí */}
        <div className="lg:w-1/2 bg-white/80 dark:bg-gray-900/70 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
          <h2 className="text-4xl font-bold mb-6 text-teal-500 flex items-center gap-2">
            <span className="inline-block w-2 h-8 bg-gradient-to-b from-teal-400 to-blue-500 rounded-full mr-3"></span>
            Sobre mí
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Soy Ingeniero Civil en Computación, entusiasta y fiel al autoaprendizaje, con pasión por la tecnología y la innovación. Me motiva enfrentar desafíos que me permitan crecer constantemente, y disfruto explorar nuevas herramientas y metodologías para desarrollar soluciones eficientes y creativas.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {['Web Development', 'UI/UX Design', 'Cloud Computing', 'Backend'].map((skill) => (
              <div key={skill} className="flex justify-center items-center bg-gradient-to-r from-teal-500/10 to-blue-500/10 p-4 rounded-lg border border-teal-400/30 dark:border-blue-500/20 flex items-center gap-2">
                <h3 className="font-medium text-gray-800 dark:text-teal-200">{skill}</h3>
              </div>
            ))}
          </div>
        </div>
        {/* Columna derecha - Skills */}
        <div className="w-full lg:w-1/2 bg-white/80 dark:bg-gray-900/70 rounded-2xl shadow-xl p-4 md:p-8 border border-gray-200 dark:border-gray-700 mt-8 lg:mt-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-500 flex items-center gap-2">
            <span className="inline-block w-2 h-8 bg-gradient-to-b from-blue-400 to-teal-500 rounded-full mr-3"></span>
            Skills
          </h2>
          <div className="p-2 md:p-6 bg-gray-100/60 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700">
            <Slider {...settings}>
              {/* Slide 1: Lenguajes de Programación */}
              <div>
                <h4 className="flex justify-center text-lg md:text-xl font-semibold mb-4 text-teal-400">Lenguajes de Programación</h4>
                <div className="flex gap-2 md:gap-3 flex-wrap m-2 justify-center items-center">
                  {["Python", "JavaScript", "C++", "C"].map((lang) => (
                    <span key={lang} className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 border border-teal-400/30">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              {/* Slide 2: Frameworks */}
              <div>
                <h4 className="flex justify-center text-lg md:text-xl font-semibold mb-4 text-teal-400">Frameworks</h4>
                <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
                  {["React", "Vue", "Next.js", "FastAPI"].map((fw) => (
                    <span key={fw} className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 border border-teal-400/30">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
              {/* Slide 3: Bases de Datos */}
              <div>
                <h4 className="flex justify-center text-lg md:text-xl font-semibold mb-4 text-teal-400">Bases de Datos</h4>
                <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
                  {["MongoDB", "MySQL", "Firebase", "Sharepoint"].map((db) => (
                    <span key={db} className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 border border-teal-400/30">
                      {db}
                    </span>
                  ))}
                </div>
              </div>
              {/* Slide 4: Herramientas de Desarrollo */}
              <div>
                <h4 className="flex justify-center text-lg md:text-xl font-semibold mb-4 text-teal-400">Herramientas de Desarrollo</h4>
                <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
                  {["GitHub", "Figma", "VS Code", "PowerBI"].map((tool) => (
                    <span key={tool} className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 border border-teal-400/30">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
          <button
          className="ml-6 mt-12 p-8 py-4 bg-gradient-to-r from-red-400 to-red-700 text-white font-bold rounded-full shadow-lg text-xl hover:scale-105 hover:from-orange-500 hover:to-purple-500 transition-all duration-200 animate-bounce w-full block focus:shadow-none active:shadow-none disabled:opacity-50 disabled:shadow-none"
          style={{ maxWidth: 'fit-content' }}
          onClick={() => {
            const el = document.getElementById('projects');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Ver proyectos
        </button>
    </div>
  </section>


      {/* 🚨 Aquí es donde empiezan tus proyectos */}
      <section
        id="projects"
        className="relative z-10 py-20 flex flex-col items-center justify-center min-h-screen p-8 bg-white dark:bg-slate-900"
        data-section="projects"
      >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="relative text-white">
                Proyectos
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500"></span>
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((project) => (
                <div 
                  key={project}
                  className="group relative overflow-hidden rounded-xl bg-gray-900/50 border border-gray-700 hover:border-teal-400 transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-600/10"></div>
                    <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                      <span className="text-4xl">📊</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Project {project}</h3>
                    <p className="text-gray-300 mb-4">
                      Texto largo lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam libero ducimus sit...
                    </p>
                    <div className="flex justify-between items-center">
                      <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                        View Details →
                      </button>
                      <div className="flex space-x-2">
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded">React</span>
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded">Node.js</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </div>
  );
}


export default App;

/*
Agrega animaciones en tailwind.config.js o en tu CSS:
.animate-cloud-move { animation: cloudMove 32s linear infinite alternate; }
.animate-cloud-move-slow { animation: cloudMove 48s linear infinite alternate; }
.animate-cloud-move-fast { animation: cloudMove 20s linear infinite alternate; }
@keyframes cloudMove { 0% { transform: translateX(0); } 100% { transform: translateX(40px); } }
*/