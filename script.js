/* NEXUS / VICTOR RAMOS
 * PREENCHA SEUS CONTATOS AQUI. Não use números de exemplo em produção.
 * WhatsApp: país + DDD + número. Instagram: usuário sem @.
 */
const CONTACTS = {
  whatsapp: "",
  instagram: "",
  email: "",
  message: "Olá, Victor! Explorei seu portfólio e quero conversar sobre um projeto."
};

(() => {
  "use strict";
  const body = document.body;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reduced.matches;
  let activeView = "inicio";
  body.classList.add("enhanced");
  const views = [...document.querySelectorAll(".view")];
  const validViews = views.map(v => v.id);
  const dock = [...document.querySelectorAll(".dock a")];
  function navigate(id, writeHash = true) {
    if (!validViews.includes(id)) id = "inicio";
    activeView = id;
    body.dataset.view = id;
    views.forEach(view => {
      const active = view.id === id;
      view.classList.toggle("active", active);
      view.inert = !active;
      view.setAttribute("aria-hidden", String(!active));
      if (active) view.scrollTop = 0;
    });
    dock.forEach(link => {
      const active = link.dataset.go === id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (writeHash && location.hash !== `#${id}`) location.hash = id;
  }
  document.querySelectorAll("[data-go]").forEach(control => control.addEventListener("click", event => {
    event.preventDefault();
    navigate(control.dataset.go);
    if (!control.closest(".dock")) {
      const heading = document.querySelector(`#${activeView} h2`);
      heading.tabIndex = -1;
      heading.focus({preventScroll:true});
    }
  }));
  window.addEventListener("hashchange", () => navigate(location.hash.slice(1), false));
  navigate(location.hash.slice(1) || "inicio", false);

  const about = document.getElementById("aboutCard");
  const aboutTrigger = document.getElementById("aboutTrigger");
  aboutTrigger.addEventListener("click", () => {
    about.hidden = !about.hidden;
    aboutTrigger.setAttribute("aria-expanded", String(!about.hidden));
  });

  const technologies = {
    html: ["ESTRUTURA", "HTML5", "A base de cada experiência. Estrutura semântica para organizar conteúdo e navegação."],
    css: ["IDENTIDADE VISUAL", "CSS3", "Layouts responsivos, movimento e profundidade. Cada detalhe visual tem uma intenção."],
    js: ["COMPORTAMENTO", "JavaScript", "A camada que dá vida à interface: eventos, filtros, carrinhos e experiências interativas."],
    react: ["COMPONENTES", "React", "Interfaces organizadas em componentes reutilizáveis, com estado e comportamento dinâmico."],
    tailwind: ["ESTILIZAÇÃO", "Tailwind CSS", "Classes utilitárias para construir interfaces consistentes e adaptar layouts a diferentes telas."],
    git: ["VERSIONAMENTO", "Git & GitHub", "Organização do código e histórico de alterações, do desenvolvimento à publicação."]
  };
  document.querySelectorAll("[data-tech]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-tech]").forEach(node => { node.classList.remove("active"); node.setAttribute("aria-pressed", "false"); });
    button.classList.add("active"); button.setAttribute("aria-pressed", "true");
    const [category, name, description] = technologies[button.dataset.tech];
    document.getElementById("techCategory").textContent = category;
    document.getElementById("techName").textContent = name;
    document.getElementById("techDescription").textContent = description;
  }));

  const projects = [...document.querySelectorAll(".project-card")];
  let projectIndex = 0;
  function showProject(index) {
    projectIndex = (index + projects.length) % projects.length;
    projects.forEach((card, i) => {
      card.classList.toggle("active", i === projectIndex);
      card.inert = i !== projectIndex;
      card.setAttribute("aria-hidden", String(i !== projectIndex));
    });
    document.getElementById("projectCount").innerHTML = `${String(projectIndex + 1).padStart(2, "0")} <i>/ ${String(projects.length).padStart(2, "0")}</i>`;
  }
  document.getElementById("prevProject").addEventListener("click", () => showProject(projectIndex - 1));
  document.getElementById("nextProject").addEventListener("click", () => showProject(projectIndex + 1));
  document.getElementById("projetos").addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); showProject(projectIndex + (event.key === "ArrowRight" ? 1 : -1)); }
  });
  showProject(0);
  
  // PRÉVIA AO VIVO DOS PROJETOS
  // Atualiza o site exibido dentro do iframe.

  document.querySelectorAll("[data-preview-refresh]").forEach(button => {
    button.addEventListener("click", () => {
      const preview = button.closest(".browser-screen")?.querySelector(".live-preview");

      if (!preview) return;

      const url = new URL(preview.src);

      url.searchParams.set("_preview_refresh", String(Date.now()));

      preview.src = url.href;
    });
  });


  const phone = CONTACTS.whatsapp.replace(/\D/g, "");
  const instagram = CONTACTS.instagram.trim().replace(/^@/, "");
  const email = CONTACTS.email.trim();
  const contacts = {
    whatsapp: {valid: /^\d{10,15}$/.test(phone), href: `https://wa.me/${phone}?text=${encodeURIComponent(CONTACTS.message)}`, label: "Vamos conversar"},
    instagram: {valid: /^[a-zA-Z0-9._]{1,30}$/.test(instagram), href: `https://www.instagram.com/${encodeURIComponent(instagram)}/`, label: `@${instagram}`},
    email: {valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), href: `mailto:${encodeURIComponent(email)}`, label: email}
  };
  document.querySelectorAll("[data-contact]").forEach(link => {
    const data = contacts[link.dataset.contact];
    if (data.valid) {
      link.href = data.href; link.querySelector("small").textContent = data.label;
      if (link.dataset.contact !== "email") { link.target = "_blank"; link.rel = "noopener noreferrer"; }
    } else {
      link.setAttribute("aria-disabled", "true");
      link.addEventListener("click", event => { event.preventDefault(); document.getElementById("contactNotice").textContent = "Este canal ainda não foi disponibilizado. Volte em breve para entrar em contato."; });
    }
  });

  const motionButton = document.getElementById("motionToggle");
  function updateMotion() {
    body.classList.toggle("paused", paused);
    motionButton.setAttribute("aria-pressed", String(paused));
    motionButton.setAttribute("aria-label", paused ? "Retomar animações" : "Pausar animações");
    motionButton.title = paused ? "Retomar animações" : "Pausar animações";
    motionButton.innerHTML = paused ? '▷ <span>Retomar animações</span>' : 'Ⅱ <span>Pausar animações</span>';
  }
  motionButton.addEventListener("click", () => { paused = !paused; updateMotion(); });
  reduced.addEventListener("change", () => { paused = reduced.matches; updateMotion(); });
  updateMotion();

  // Abertura de apresentação. A porcentagem representa a animação, não um download.
  const intro = document.getElementById("intro");
  const experience = document.getElementById("experience");
  const skip = document.getElementById("skipIntro");
  let introFrame = 0, introTimer = 0, introOpen = false, replaying = false;
  function progress(value) {
    document.getElementById("loadFill").style.width = `${value}%`;
    document.getElementById("loadValue").textContent = `${String(value).padStart(2, "0")}%`;
    document.querySelector('[role="progressbar"]').setAttribute("aria-valuenow", String(value));
    document.getElementById("loadText").textContent = value < 35 ? "Inicializando universo" : value < 75 ? "Conectando ideias" : value < 100 ? "Preparando experiência" : "Acesso liberado";
  }
  function endIntro() {
    if (!introOpen) return;
    introOpen = false; cancelAnimationFrame(introFrame); clearTimeout(introTimer);
    progress(100); intro.classList.add("leaving"); experience.inert = false;
    if (intro.contains(document.activeElement)) {
      const focusTarget = replaying ? document.getElementById("replayIntro") : document.querySelector(".brand");
      focusTarget.focus({preventScroll:true});
    }
    introTimer = setTimeout(() => { intro.hidden = true; }, reduced.matches ? 0 : 1000);
  }
  function startIntro(replay = false) {
    cancelAnimationFrame(introFrame); clearTimeout(introTimer); replaying = replay;
    intro.hidden = false; intro.classList.remove("leaving"); introOpen = true;
    experience.inert = true; progress(0); skip.focus({preventScroll:true});
    const start = performance.now(), duration = reduced.matches ? 150 : 2700;
    function tick(now) {
      const value = Math.min(100, Math.round((now - start) / duration * 100));
      progress(value);
      if (value < 100) introFrame = requestAnimationFrame(tick);
      else introTimer = setTimeout(endIntro, reduced.matches ? 0 : 200);
    }
    introFrame = requestAnimationFrame(tick);
  }
  skip.addEventListener("click", endIntro);
  document.getElementById("replayIntro").addEventListener("click", () => startIntro(true));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (introOpen) endIntro();
      if (!about.hidden) { about.hidden = true; aboutTrigger.setAttribute("aria-expanded", "false"); aboutTrigger.focus(); }
    }
  });
  startIntro();

  // NÚCLEO 3D NATIVO: malhas de esfera + toroides, perspectiva, profundidade,
  // iluminação especular e rotação. Não utiliza bibliotecas ou CDN.
  function createCore() {
    const canvas = document.getElementById("webgl");
    const gl = canvas.getContext("webgl", {alpha:true, antialias:true, powerPreference:"low-power", premultipliedAlpha:false});
    if (!gl) return;
    const vertex = `
      attribute vec3 aPosition; attribute vec3 aNormal;
      uniform vec3 uRotation; uniform vec3 uOffset;
      uniform float uAspect; uniform float uScale;
      varying vec3 vNormal; varying vec3 vPosition; varying vec3 vLocal;
      mat3 rx(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}
      mat3 ry(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}
      mat3 rz(float a){float c=cos(a),s=sin(a);return mat3(c,s,0.,-s,c,0.,0.,0.,1.);}
      void main(){
        mat3 rotation=rz(uRotation.z)*ry(uRotation.y)*rx(uRotation.x);
        vec3 p=rotation*(aPosition*uScale)+uOffset;
        vLocal=aPosition;vPosition=p;vNormal=rotation*aNormal;
        p.z-=7.0;
        gl_Position=vec4(p.x*2.0/uAspect,p.y*2.0,-1.002002*p.z-.2002002,-p.z);
      }`;
    const fragment = `
      precision mediump float;
      varying vec3 vNormal; varying vec3 vPosition; varying vec3 vLocal;
      uniform vec3 uColor; uniform float uEmission; uniform float uTime; uniform float uCore;
      void main(){
        vec3 n=normalize(vNormal),v=normalize(vec3(0.,0.,7.)-vPosition);
        vec3 l=normalize(vec3(-3.,4.,5.)-vPosition);
        float diff=max(dot(n,l),0.);
        float spec=pow(max(dot(n,normalize(l+v)),0.),70.);
        float rim=pow(1.-max(dot(n,v),0.),3.);
        float band=pow(.5+.5*sin(vLocal.y*45.+sin(vLocal.x*12.)*1.7),22.);
        float seam=pow(.5+.5*cos(atan(vLocal.z,vLocal.x)*12.),40.);
        vec3 color=uColor*(.12+diff*.65)+vec3(.65,.85,1.)*spec*1.4;
        color+=vec3(.12,.49,1.)*rim*1.5;
        color+=uEmission*uColor;
        color+=uCore*(band*.25+seam*.15)*vec3(.12,.5,1.);
        gl_FragColor=vec4(color,1.);
      }`;
    function shader(type, source) {
      const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); throw new Error("Shader indisponível"); }
      return s;
    }
    const program = gl.createProgram();
    const vs = shader(gl.VERTEX_SHADER, vertex), fs = shader(gl.FRAGMENT_SHADER, fragment);
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    gl.deleteShader(vs); gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("WebGL indisponível");
    gl.useProgram(program);
    const loc = {};
    ["uRotation","uOffset","uAspect","uScale","uColor","uEmission","uTime","uCore"].forEach(name => { loc[name] = gl.getUniformLocation(program,name); });
    const positionLoc = gl.getAttribLocation(program,"aPosition"), normalLoc = gl.getAttribLocation(program,"aNormal");
    function mesh(fn, rows, columns) {
      const data = [], indices = [];
      for (let row=0; row<=rows; row++) for (let col=0; col<=columns; col++) data.push(...fn(row/rows,col/columns));
      for (let row=0;row<rows;row++) for (let col=0;col<columns;col++) {
        const a=row*(columns+1)+col, b=a+columns+1;
        indices.push(a,b,a+1,b,b+1,a+1);
      }
      const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
      const index=gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
      return {buffer,index,count:indices.length};
    }
    const sphere=mesh((u,v)=>{
      const a=u*Math.PI,b=v*Math.PI*2,x=Math.sin(a)*Math.cos(b),y=Math.cos(a),z=Math.sin(a)*Math.sin(b);
      return [x,y,z,x,y,z];
    },40,60);
    function torus(radius,tube) { return mesh((u,v)=>{
      const a=u*Math.PI*2,b=v*Math.PI*2,ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
      return [(radius+tube*cb)*ca,(radius+tube*cb)*sa,tube*sb,cb*ca,cb*sa,sb];
    },120,12); }
    const rings=[torus(1.5,.065),torus(1.88,.022),torus(2.12,.032)];
    gl.enable(gl.DEPTH_TEST); gl.clearColor(0,0,0,0);
    let width=0,height=0,time=0,last=0,frame=0,lost=false;
    const pointer={x:0,y:0}; const aim={x:0,y:0};
    window.addEventListener("pointermove",event=>{
      if (event.pointerType === "touch") return;
      aim.x=(event.clientX/innerWidth-.5)*.65; aim.y=(event.clientY/innerHeight-.5)*.5;
    },{passive:true});
    window.addEventListener("blur",()=>{aim.x=0;aim.y=0;});
    function drawMesh(item,rotation,scale,color,emission,core,offset=[0,0,0]) {
      gl.bindBuffer(gl.ARRAY_BUFFER,item.buffer);
      gl.enableVertexAttribArray(positionLoc);gl.vertexAttribPointer(positionLoc,3,gl.FLOAT,false,24,0);
      gl.enableVertexAttribArray(normalLoc);gl.vertexAttribPointer(normalLoc,3,gl.FLOAT,false,24,12);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,item.index);
      gl.uniform3fv(loc.uRotation,rotation); gl.uniform3fv(loc.uOffset,offset);
      gl.uniform1f(loc.uScale,scale);gl.uniform3fv(loc.uColor,color);
      gl.uniform1f(loc.uEmission,emission);gl.uniform1f(loc.uCore,core);
      gl.drawElements(gl.TRIANGLES,item.count,gl.UNSIGNED_SHORT,0);
    }
    function render(now) {
      if(lost) return;
      const dt=Math.min((now-last)/1000,.05); last=now;
      const moving=!paused&&!document.hidden;
      if(moving) {time+=dt;pointer.x+=(aim.x-pointer.x)*.04;pointer.y+=(aim.y-pointer.y)*.04;}
      const ratio=Math.min(devicePixelRatio||1,innerWidth<800?1.25:1.6);
      const nextW=Math.max(1,Math.floor(canvas.clientWidth*ratio)),nextH=Math.max(1,Math.floor(canvas.clientHeight*ratio));
      const resized=width!==nextW||height!==nextH;
      if(resized){width=canvas.width=nextW;height=canvas.height=nextH;gl.viewport(0,0,width,height);}
      if(moving||resized||time===0){
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        gl.uniform1f(loc.uAspect,width/height);gl.uniform1f(loc.uTime,time);
        const x=pointer.y,y=pointer.x;
        drawMesh(sphere,[.15+x,time*.14+y,-.2],.94,[.12,.22,.38],.03,1);
        drawMesh(rings[0],[1.02+x,.25+y+time*.13,.3],1,[.25,.48,.8],.2,0);
        drawMesh(rings[1],[.4+x,.9+y,-.55+time*.1],1,[.25,.65,1],.65,0);
        drawMesh(rings[2],[.95+x,-.35+y,time*-.09],1,[.15,.35,.7],.25,0);
        for(let i=0;i<5;i++){
          const a=time*.2+i*Math.PI*2/5;
          drawMesh(sphere,[0,time,0],.045+(i%2)*.025,[.4,.75,1],.7,0,[Math.cos(a)*2.3,Math.sin(a)*1.65,Math.sin(a+.7)*.8]);
        }
      }
      if(!document.hidden)frame=requestAnimationFrame(render);
    }
    document.addEventListener("visibilitychange",()=>{cancelAnimationFrame(frame);if(!document.hidden){last=performance.now();frame=requestAnimationFrame(render);}});
    canvas.addEventListener("webglcontextlost",event=>{event.preventDefault();lost=true;cancelAnimationFrame(frame);body.classList.remove("webgl-ready");});
    // Em caso de perda do contexto, a composição CSS permanece disponível até recarregar.
    body.classList.add("webgl-ready");frame=requestAnimationFrame(render);
  }
  try { createCore(); } catch(error) { body.classList.remove("webgl-ready"); }
})();
