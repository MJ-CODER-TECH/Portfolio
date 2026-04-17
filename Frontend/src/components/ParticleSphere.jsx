import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleSphere() {
  const meshRef = useRef();

useFrame(({ clock }) => {
  const t = clock.getElapsedTime();

  if (!meshRef.current) return;

  // ❌ no perfect rotation circle
  meshRef.current.rotation.y += 0.001;

  meshRef.current.material.uniforms.uTime.value = t;

  // 🔥 subtle breathing (no orbit feel)
  const scale = 1 + Math.sin(t * 1.5) * 0.03;
  meshRef.current.scale.set(scale, scale, scale);
});

  return (
    <points ref={meshRef}>
      <sphereGeometry args={[1.5, 128, 128]} />

      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          uniform float uTime;

          void main() {
            vec3 pos = position;

            float wave1 = sin(pos.y * 5.0 + uTime * 2.0) * 0.1;
            float wave2 = sin(pos.x * 4.0 + uTime) * 0.1;

            pos += normal * (wave1 + wave2);

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 2.5;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));

            float alpha = smoothstep(0.5, 0.0, d);

            // ⚫ dark core illusion + ⚪ white glow
            vec3 color = mix(vec3(0.0), vec3(1.0), alpha * 0.2);

            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </points>
  );
}