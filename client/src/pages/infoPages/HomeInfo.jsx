import logo from "../../logo.svg";
import "../../App.css";
import "./homeinfo.scss";
import React, { useEffect } from "react";
import { Carousel, Layout } from "antd";
const { Content } = Layout;

function HomePageInfo(props) {
  const initCanvas = () => {
    var canvas = document.createElement("canvas");
    const att = document.createAttribute("class");
    att.value = "canvasclass";
    canvas.setAttributeNode(att);
    var container = document.getElementById("container");

    var width = (canvas.width = window.innerWidth * 0.75);
    var height = (canvas.height = window.innerHeight * 0.75);
    container.appendChild(canvas);
    var gl = canvas.getContext("webgl");

    var mouse = { x: 0, y: 0 };

    var numMetaballs = 20;
    var metaballs = [];

    for (var i = 0; i < numMetaballs; i++) {
      var radius = Math.random() * 60 + 10;
      metaballs.push({
        x: Math.random() * (width - 2 * radius) + radius,
        y: Math.random() * (height - 2 * radius) + radius,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        r: radius * 0.75,
      });
    }

    var vertexShaderSrc = `
    attribute vec2 position;
    
    void main() {
    // position specifies only x and y.
    // We set z to be 0.0, and w to be 1.0
    gl_Position = vec4(position, 0.0, 1.0);
    }
    `;

    var fragmentShaderSrc =
      `
    precision highp float;
    
    const float WIDTH = ` +
      (width >> 0) +
      `.0;
    const float HEIGHT = ` +
      (height >> 0) +
      `.0;
    
    uniform vec3 metaballs[` +
      numMetaballs +
      `];
    
    void main(){
    float x = gl_FragCoord.x;
    float y = gl_FragCoord.y;
    
    float sum = 0.0;
    for (int i = 0; i < ` +
      numMetaballs +
      `; i++) {
    vec3 metaball = metaballs[i];
    float dx = metaball.x - x;
    float dy = metaball.y - y;
    float radius = metaball.z;
    
    sum += (radius * radius) / (dx * dx + dy * dy);
    }
    
    if (sum >= 0.99) {
    gl_FragColor = vec4(mix(vec3(x / WIDTH, y / HEIGHT, 1.0), vec3(0, 0, 0), max(0.0, 1.0 - (sum - 0.99) * 100.0)), 1.0);
    return;
    }
    
    gl_FragColor = vec4(255, 252, 252, 1.0);
    }
    
    `;

    var vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
    var fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    var vertexData = new Float32Array([
      -1.0,
      1.0, // top left
      -1.0,
      -1.0, // bottom left
      1.0,
      1.0, // top right
      1.0,
      -1.0, // bottom right
    ]);
    var vertexDataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

    var positionHandle = getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionHandle);
    gl.vertexAttribPointer(
      positionHandle,
      2, // position is a vec2
      gl.FLOAT, // each component is a float
      gl.FALSE, // don't normalize values
      2 * 4, // two 4 byte float components per vertex
      0 // offset into each span of vertex data
    );

    var metaballsHandle = getUniformLocation(program, "metaballs");

    loop();
    function loop() {
      for (var i = 0; i < numMetaballs; i++) {
        var metaball = metaballs[i];
        metaball.x += metaball.vx;
        metaball.y += metaball.vy;

        if (metaball.x < metaball.r || metaball.x > width - metaball.r)
          metaball.vx *= -1;
        if (metaball.y < metaball.r || metaball.y > height - metaball.r)
          metaball.vy *= -1;
      }

      var dataToSendToGPU = new Float32Array(3 * numMetaballs);
      for (var i = 0; i < numMetaballs; i++) {
        var baseIndex = 3 * i;
        var mb = metaballs[i];
        dataToSendToGPU[baseIndex + 0] = mb.x;
        dataToSendToGPU[baseIndex + 1] = mb.y;
        dataToSendToGPU[baseIndex + 2] = mb.r;
      }
      gl.uniform3fv(metaballsHandle, dataToSendToGPU);

      //Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(loop);
    }

    function compileShader(shaderSource, shaderType) {
      var shader = gl.createShader(shaderType);
      gl.shaderSource(shader, shaderSource);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
      }

      return shader;
    }

    function getUniformLocation(program, name) {
      var uniformLocation = gl.getUniformLocation(program, name);
      if (uniformLocation === -1) {
        throw "Can not find uniform " + name + ".";
      }
      return uniformLocation;
    }

    function getAttribLocation(program, name) {
      var attributeLocation = gl.getAttribLocation(program, name);
      if (attributeLocation === -1) {
        throw "Can not find attribute " + name + ".";
      }
      return attributeLocation;
    }

    canvas.onmousemove = function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
  };

  useEffect(() => {
    //initCanvas()
  }, []);

  return (
    <Content className="contentsMain">
      <Carousel className="carousel" dotPosition="Bottom">
        <div className="back-one">
          <div className="back">
            <img
              className="Logo"
              src="https://www.jobari.com/wp-content/themes/jobari/img/jobari-logo.png"
              alt="imjob"
            ></img>

            <svg
              viewBox="0 0 800 500"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              xlink="http://www.w3.org/1999/xlink"
              width="115vh"
              id="blobSvg"
            >
              <g transform="translate(200, 14)">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" id="stop-one"></stop>
                    <stop offset="100%" id="stop-two"></stop>
                  </linearGradient>
                </defs>
                <path
                  class="blob"
                  d="M493,288.5Q487,327,424,329Q361,331,377.5,390Q394,449,356.5,455Q319,461,284.5,475Q250,489,222.5,453.5Q195,418,185,385.5Q175,
    353,143.5,351.5Q112,350,94,328Q76,306,39,278Q2,250,8.5,212Q15,174,77,172Q139,170,122.5,111Q106,52,153.5,76Q201,100,225.5,79Q250,58,277.5,
    70Q305,82,346.5,71Q388,60,402.5,94.5Q417,129,414,163.5Q411,198,455,224Q499,250,493,288.5Z"
                  fill="url(#gradient)"
                ></path>
              </g>
            </svg>
          </div>
        </div>

        <div className="back-two">
          <svg
            viewBox="0 0 800 500"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            width="50vw"
            id="blobSvg"
          >
            <g transform="translate(96.10440826416016, 5.0639495849609375)">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" id="stop-one"></stop>
                  <stop offset="100%" id="stop-two"></stop>
                </linearGradient>
              </defs>
              <path
                className="blob"
                d="M487.5,300.5Q477,351,394.5,334.5Q312,318,318.5,400Q325,482,276.5,470.5Q228,459,180.5,456Q133,453,132,395Q131,337,152.5,301.5Q174,266,144.5,243.5Q115,221,119.5,189.5Q124,158,125,97Q126,36,175,20.5Q224,5,251,84Q278,163,345.5,116Q413,69,386.5,135Q360,201,429,225.5Q498,250,487.5,300.5Z"
                fill="url(#gradient)"
              ></path>
            </g>
          </svg>
        </div>
        <div className="back-thre">
          <h3 className="contentStyle">3</h3>
        </div>
        <div className="back-four">
          <h3 className="contentStyle">4</h3>
        </div>
      </Carousel>
    </Content>
  );
}

export default HomePageInfo;
