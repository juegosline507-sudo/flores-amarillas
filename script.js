function createFloatingFlower() {
  const container = document.getElementById('falling-flowers');
  const flower = document.createElement('div');
  flower.classList.add('floating-flower');
  
  const icons = ['🌻', '🌼', '✨', '💛', '🌸'];
  flower.innerText = icons[Math.floor(Math.random() * icons.length)];
  
  flower.style.left = Math.random() * 100 + 'vw';
  flower.style.fontSize = (Math.random() * 20 + 15) + 'px';
  
  const duration = Math.random() * 3 + 4;
  flower.style.animationDuration = duration + 's';
  
  container.appendChild(flower);
  
  setTimeout(() => {
    flower.remove();
  }, duration * 1000);
}

setInterval(createFloatingFlower, 300);

