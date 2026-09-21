* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000000;
  font-family: 'Comic Sans MS', 'Arial Rounded MT Bold', sans-serif;
}

#canvas-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.overlay {
  position: absolute;
  top: 6%;
  width: 100%;
  z-index: 10;
  text-align: center;
  pointer-events: none;
}

.glow-title {
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: bold;
  text-shadow: 0 0 10px #facc15, 0 0 20px #facc15, 0 0 30px #eab308;
  line-height: 1.3;
}

/* Estilos de las etiquetas de texto 3D */
.message-tag {
  position: absolute;
  color: #ffffff;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 15px;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.9), 0 0 15px #facc15;
  white-space: nowrap;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 5;
}
