function initReveal() {
  Reveal.initialize({
    hash: true,
    controls: false,
    progress: true,
    center: false,
    transition: 'slide',
    plugins: [RevealMarkdown, RevealHighlight, RevealMath.KaTeX],
    width: '100%',
    height: '100%',
    margin: 0
  });

  document.getElementById('prev').addEventListener('click', () => Reveal.prev());
  document.getElementById('next').addEventListener('click', () => Reveal.next());

  function updateCounter() {
    setTimeout(() => {
      const total = Reveal.getTotalSlides();
      const current = Reveal.getIndices().h + 1;
      
      if (!isNaN(current) && !isNaN(total) && total > 1) {
        document.getElementById('slideNumber').textContent = `${current} / ${total}`;
      }
    }, 100);
  }
  
  Reveal.on('ready', () => {
    updateCounter();
    setTimeout(createMenu, 500);
  });
  
  Reveal.on('slidechanged', updateCounter);
  
  updateCounter();
}

function renderMath() {
  renderMathInElement(document.body, {
    delimiters: [
      {left: "$$", right: "$$", display: true},
      {left: "$", right: "$", display: false},
      {left: "\\(", right: "\\)", display: false},
      {left: "\\[", right: "\\]", display: true}
    ],
    throwOnError: false
  });
}

document.querySelectorAll('textarea').forEach(textarea => {
  textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });
  
  textarea.style.height = (textarea.scrollHeight) + 'px';
});

function goToSlide(index) {
  Reveal.slide(index);
}

function createMenu() {
  const slides = document.querySelectorAll('.reveal .slides section');
  
  const menuButton = document.createElement("button");
  menuButton.id = "menuButton";
  menuButton.textContent = "☰ Меню";
  menuButton.title = "Открыть меню навигации";

  const menuDropdown = document.createElement("div");
  menuDropdown.id = "menuDropdown";

  slides.forEach((slide, i) => {
    const link = document.createElement("a");
    link.href = "#";
    let slideTitle = "";
    
    const h1 = slide.querySelector("h1");
    const h2 = slide.querySelector("h2");
    const h3 = slide.querySelector("h3");

    if (h1) slideTitle = h1.textContent;
    else if (h2) slideTitle = h2.textContent;
    else if (h3) slideTitle = h3.textContent;
    else {
      const text = slide.textContent.trim();
      if (text) {
        slideTitle = text.split(/\s+/).slice(0, 5).join(' ');
      } else {
        slideTitle = `Слайд ${i + 1}`;
      }
    }

    if (slideTitle.length > 40) {
      slideTitle = slideTitle.substring(0, 37) + "...";
    }

    link.textContent = `${i + 1}. ${slideTitle}`;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      goToSlide(i);
      menuDropdown.style.display = "none";
      
      document.querySelectorAll('#menuDropdown a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
    
    if (i === Reveal.getIndices().h) {
      link.classList.add('active');
    }
    
    menuDropdown.appendChild(link);
  });

  document.body.appendChild(menuButton);
  document.body.appendChild(menuDropdown);

  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const isVisible = menuDropdown.style.display === "block";
    menuDropdown.style.display = isVisible ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!menuButton.contains(e.target) && !menuDropdown.contains(e.target)) {
      menuDropdown.style.display = "none";
    }
  });

  Reveal.on('slidechanged', () => {
    const currentIndex = Reveal.getIndices().h;
    document.querySelectorAll('#menuDropdown a').forEach((link, i) => {
      if (i === currentIndex) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initReveal();
  renderMath();
});

function parseMatrixInput(text) {
    return text.trim().split('\n').map(row => 
        row.trim().split(/\s+/).map(Number)
    );
}

function matrixToString(m) { 
    const rows = m.map(row => row.join(' & ')).join(' \\\\ ');
    return `\\begin{pmatrix} ${rows} \\end{pmatrix}`;
}

function calculateSum() {
    const A = parseMatrixInput(document.getElementById('matrixA-add').value);
    const B = parseMatrixInput(document.getElementById('matrixB-add').value);
    const res = MatrixOperations.addMatrices(A, B);
    const latex = matrixToString(res);
    document.getElementById('sum-result').innerHTML = `<div class="katex-result">$$${latex}$$</div>`;
    renderMathInElement(document.getElementById('sum-result'));
}

function calculateMultiply() {
    const A = parseMatrixInput(document.getElementById('matrixA-mult').value);
    const B = parseMatrixInput(document.getElementById('matrixB-mult').value);
    const res = MatrixOperations.multiplyMatrices(A, B);
    const latex = matrixToString(res);
    document.getElementById('mult-result').innerHTML = `<div class="katex-result">$$${latex}$$</div>`;
    renderMathInElement(document.getElementById('mult-result'));

}

function calculateDeterminant() {
    const m = parseMatrixInput(document.getElementById('matrix-det').value);
    let res;
    if (m.length === 2) res = MatrixOperations.determinant2x2(m);
    else if (m.length === 3) res = MatrixOperations.determinant3x3(m);
    else if (m.length === 4) res = MatrixOperations.determinant4x4(m);
    document.getElementById('det-result').innerHTML = `<div class="det-value">$$ \\det = ${res} $$</div>`;
    renderMathInElement(document.getElementById('det-result'));
}