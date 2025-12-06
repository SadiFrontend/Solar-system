const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let centerX = canvas.width/2;
let centerY = canvas.height/2;

// Zoom
let zoom = 1;
let offsetX = 0;
let offsetY = 0;

// Stars
const stars = [];
for(let i=0;i<300;i++){
    stars.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        radius: Math.random()*1.5,
        alpha: Math.random()
    });
}

// Scale factor
const scaleFactor = Math.min(canvas.width, canvas.height)/800;

/* -------------------------
   Sun
---------------------------*/
const sun = { x:centerX, y:centerY, radius:25, color:"yellow" };

/* -------------------------
   Planets with moons and elliptical orbits
---------------------------*/
const planets = [
    { name:"Mercury", distanceX:80*scaleFactor, distanceY:70*scaleFactor, radius:4, speed:0.047, angle:0, color:"gray", trail:[], moons:[] },
    { name:"Venus", distanceX:120*scaleFactor, distanceY:110*scaleFactor, radius:6, speed:0.035, angle:0, color:"orange", trail:[], moons:[] },
    { name:"Earth", distanceX:160*scaleFactor, distanceY:150*scaleFactor, radius:8, speed:0.03, angle:0, color:"blue", trail:[], moons:[
        { distanceX:20*scaleFactor, distanceY:18*scaleFactor, radius:2, speed:0.1, angle:0, color:"white", trail:[] }
    ]},
    { name:"Mars", distanceX:200*scaleFactor, distanceY:180*scaleFactor, radius:7, speed:0.024, angle:0, color:"red", trail:[], moons:[
        { distanceX:15*scaleFactor, distanceY:13*scaleFactor, radius:2, speed:0.08, angle:0, color:"gray", trail:[] },
        { distanceX:22*scaleFactor, distanceY:20*scaleFactor, radius:1.5, speed:0.05, angle:0, color:"white", trail:[] }
    ]},
    { name:"Jupiter", distanceX:260*scaleFactor, distanceY:230*scaleFactor, radius:12, speed:0.013, angle:0, color:"orange", trail:[], moons:[
        { distanceX:25*scaleFactor, distanceY:22*scaleFactor, radius:3, speed:0.07, angle:0, color:"white", trail:[] },
        { distanceX:35*scaleFactor, distanceY:30*scaleFactor, radius:2.5, speed:0.05, angle:0, color:"lightgray", trail:[] }
    ]},
    { name:"Saturn", distanceX:320*scaleFactor, distanceY:290*scaleFactor, radius:10, speed:0.01, angle:0, color:"gold", trail:[], moons:[
        { distanceX:25*scaleFactor, distanceY:22*scaleFactor, radius:3, speed:0.06, angle:0, color:"white", trail:[] },
        { distanceX:35*scaleFactor, distanceY:30*scaleFactor, radius:2.5, speed:0.04, angle:0, color:"lightgray", trail:[] }
    ]},
    { name:"Uranus", distanceX:380*scaleFactor, distanceY:350*scaleFactor, radius:9, speed:0.007, angle:0, color:"lightblue", trail:[], moons:[
        { distanceX:20*scaleFactor, distanceY:18*scaleFactor, radius:2, speed:0.05, angle:0, color:"white", trail:[] }
    ]},
    { name:"Neptune", distanceX:440*scaleFactor, distanceY:400*scaleFactor, radius:9, speed:0.005, angle:0, color:"blue", trail:[], moons:[
        { distanceX:20*scaleFactor, distanceY:18*scaleFactor, radius:2, speed:0.04, angle:0, color:"white", trail:[] }
    ]}
];

/* -------------------------
   Asteroid belt
---------------------------*/
const asteroids = [];
for(let i=0;i<200;i++){
    const distX = Math.random()*50*scaleFactor + 210*scaleFactor;
    const distY = distX * 0.9;
    const angle = Math.random()*Math.PI*2;
    const speed = 0.01 + Math.random()*0.01;
    asteroids.push({ distanceX:distX, distanceY:distY, angle:angle, speed:speed, radius:1, color:"gray", trail:[] });
}

/* -------------------------
   Solar System time
---------------------------*/
let simTimeSeconds = 0;
const simulationSpeed = 3600*24; // 1 frame = 1 day

function updateSimTime(){
    simTimeSeconds += simulationSpeed;
    const seconds = Math.floor(simTimeSeconds%60);
    const minutes = Math.floor((simTimeSeconds/60)%60);
    const hours = Math.floor((simTimeSeconds/3600)%24);
    const days = Math.floor((simTimeSeconds/(3600*24))%365)+1;
    const months = Math.floor(days/30)+1;
    const years = Math.floor(simTimeSeconds/(3600*24*365))+1;

    document.getElementById("clock").innerText =
        `Solar System Time: Year ${years}, Month ${months}, Day ${days}, `+
        `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

/* -------------------------
   Draw stars
---------------------------*/
function drawStars(){
    stars.forEach(s=>{
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
        ctx.closePath();
        s.alpha += (Math.random()-0.5)*0.02;
        if(s.alpha>1) s.alpha=1;
        if(s.alpha<0) s.alpha=0;
    });
}

/* -------------------------
   Draw function
---------------------------*/
function draw(){
    // Background
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    drawStars();

    // Sun
    ctx.beginPath();
    ctx.arc(centerX + offsetX, centerY + offsetY, sun.radius*zoom, 0, Math.PI*2);
    ctx.fillStyle=sun.color;
    ctx.shadowColor = sun.color;
    ctx.shadowBlur = 25*zoom;
    ctx.fill();
    ctx.closePath();

    // Planets
    planets.forEach(p=>{
        const px = centerX + offsetX + p.distanceX*Math.cos(p.angle)*zoom;
        const py = centerY + offsetY + p.distanceY*Math.sin(p.angle)*zoom;

        // Planet trail
        p.trail.push({x:px,y:py});
        if(p.trail.length>200) p.trail.shift();
        ctx.beginPath();
        p.trail.forEach((pt,i)=>{ if(i===0) ctx.moveTo(pt.x,pt.y); else ctx.lineTo(pt.x,pt.y); });
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.closePath();

        // Planet
        ctx.beginPath();
        ctx.arc(px,py,p.radius*zoom,0,Math.PI*2);
        ctx.fillStyle=p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15*zoom;
        ctx.fill();
        ctx.closePath();

        // Planet label
        ctx.fillStyle="white";
        ctx.font=`${12*zoom}px Arial`;
        ctx.fillText(p.name, px + 10*zoom, py - 10*zoom);

        // Moons
        if(p.moons){
            p.moons.forEach(m=>{
                const mx = px + m.distanceX*Math.cos(m.angle)*zoom;
                const my = py + m.distanceY*Math.sin(m.angle)*zoom;

                // Moon trail
                m.trail.push({x:mx,y:my});
                if(m.trail.length>100) m.trail.shift();
                ctx.beginPath();
                m.trail.forEach((pt,i)=>{ if(i===0) ctx.moveTo(pt.x,pt.y); else ctx.lineTo(pt.x,pt.y); });
                ctx.strokeStyle = m.color;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();

                // Moon
                ctx.beginPath();
                ctx.arc(mx,my,m.radius*zoom,0,Math.PI*2);
                ctx.fillStyle = m.color;
                ctx.fill();
                ctx.closePath();
            });
        }
    });

    // Asteroids
    asteroids.forEach(a=>{
        const ax = centerX + offsetX + a.distanceX*Math.cos(a.angle)*zoom;
        const ay = centerY + offsetY + a.distanceY*Math.sin(a.angle)*zoom;

        a.trail.push({x:ax,y:ay});
        if(a.trail.length>50) a.trail.shift();
        ctx.beginPath();
        a.trail.forEach((pt,i)=>{ if(i===0) ctx.moveTo(pt.x,pt.y); else ctx.lineTo(pt.x,pt.y); });
        ctx.strokeStyle = a.color;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(ax,ay,a.radius*zoom,0,Math.PI*2);
        ctx.fillStyle=a.color;
        ctx.fill();
        ctx.closePath();
    });
}

/* -------------------------
   Update function
---------------------------*/
function update(){
    planets.forEach(p=>{
        p.angle += p.speed;
        if(p.moons) p.moons.forEach(m=>m.angle+=m.speed);
    });
    asteroids.forEach(a=>a.angle+=a.speed);
}

/* -------------------------
   Animation loop
---------------------------*/
function animate(){
    update();
    draw();
    updateSimTime();
    requestAnimationFrame(animate);
}

animate();

/* -------------------------
   Resize
---------------------------*/
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width/2;
    centerY = canvas.height/2;
});
