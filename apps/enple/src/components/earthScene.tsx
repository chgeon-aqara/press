import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Earth from './earth';
import * as CONST from '../const'
import { press } from '@lib/press';


const EarthScene = () => {
  const containerRef = useRef(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    const container = containerRef.current as any;

    if( container == null ) return;

    const { offsetWidth: width, offsetHeight: height } = container as any;

    // Scene, Camera, Renderer 생성
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, (width + 40) / height, 0.5, 2000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // OrbitControls 추가 (마우스 드래그로 화면 이동)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 300;
    controls.maxDistance = 300;
    
    const earth = new Earth();
    const ambientLight = new THREE.AmbientLight(press.palette.ocean, 1 )
    scene.add(ambientLight);
    scene.add(earth);

    // Camera 위치 설정
    camera.position.z = 300;

    // Render Loop
    const animate = function () {
      animationRef.current = requestAnimationFrame(animate);
      earth.update();
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 컴포넌트 unmount 시에 event handler, animate loop 제거
    return () => {
      cancelAnimationFrame(animationRef.current);
      controls.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ position:'relative', height: '400px' }} />;
};

export default EarthScene;
