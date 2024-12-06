import { ShaderMaterial } from 'three'

// Custom ShaderMaterial for a radial gradient originating from the center
export const RastaShaderMaterial = new ShaderMaterial({
  uniforms: {
    uColor1: { value: [1, 0, 0] }, // Red (center)
    uColor2: { value: [1, 1, 0] }, // Yellow (midpoint)
    uColor3: { value: [0, 1, 0] }, // Green (outer edge)
    uRadius: { value: 6 }, // Radius for the radial gradient effect
  },
  vertexShader: `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vPosition;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uRadius;

    void main() {
      // Calculate the radial distance from the center of the object
      vec2 centeredPosition = vPosition.xy - vec2(0.5);  // Shift coordinates to center
      float distance = length(centeredPosition) / uRadius;

      // Constrain distance to range [0, 1]
      distance = clamp(distance, 0.0, 1.0);

      // Interpolate colors based on radial distance
      vec3 color;
      if (distance < 0.5) {
        color = mix(uColor1, uColor2, distance / 0.5);  // Red to Yellow
      } else {
        color = mix(uColor2, uColor3, (distance - 0.5) / 0.5);  // Yellow to Green
      }

      gl_FragColor = vec4(color, 1.0);
    }
  `,
})
