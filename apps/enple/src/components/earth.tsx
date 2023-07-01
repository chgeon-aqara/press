import * as th from 'three'
import { Vector3 } from 'three'
import * as CONST from '../const'
import { countryInfos, CountryInfoType } from '../data/contry'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { press } from '@lib/press';


class Earth extends th.Group {

  public world: th.Mesh
  public countryPoints: th.Group[] = []

  constructor() {
    super();
    const loader = new th.TextureLoader()
    const geometry = new th.SphereGeometry(100, 60, 60)
    const material = new th.MeshPhongMaterial({
      map: loader.load(`/images/world-map-dot-white.png`),
      transparent: true,
      side: th.DoubleSide,

    })
    this.world = new th.Mesh(geometry, material);
    this.world.receiveShadow = true;
    this.createCountryPoints();    
  }

  public update = () => this.world.rotation.y += 0.005;

  private createCountryPoints(): void {
    
    countryInfos.forEach((country: CountryInfoType) => {
     
      const g = new th.Group()
      g.name = country.name

      this.createFlagOnGround(g);
      this.setPointPos(g, country.latlng[0], country.latlng[1]);

      this.countryPoints.push(g);
      this.world.add(g);

    })

    this.add(this.world)
  }

  private createFlagOnGround(point: th.Group): void {
    
    const material = new th.MeshBasicMaterial({
      map: new th.TextureLoader().load(`/images/images.jpeg`),
      transparent: true,
      opacity: 1,
      side: th.DoubleSide,
    });
  
    const planeGeometry = new th.PlaneGeometry(10, 10);
    const mesh = new th.Mesh(planeGeometry, material);
  
    mesh.rotateX(-Math.PI / 2); // 평면을 수평으로 회전
    mesh.position.set(0, 0, 0); // 평면의 위치 설정
    
    const group = new th.Group();
    group.add(mesh);  
    point.add(group);
  }

  private setPointPos( point: th.Group, latitude: number, longitude: number ): void {
    point.position.copy(this.translateGeoCoords(latitude, longitude, 98))
    point.lookAt(new th.Vector3(0, 0, 0))
    point.rotateX(80)
    point.translateY(2.5)
  }

  private translateGeoCoords( latitude: number, longitude: number, radius: number ): th.Vector3 {

    const phi = (latitude * Math.PI) / 180
    const theta = ((longitude - 180) * Math.PI) / 180

    const x = -radius * Math.cos(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi)
    const z = radius * Math.cos(phi) * Math.sin(theta)

    return new th.Vector3(x, y, z)
  }
}

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
    const directionalLight = new THREE.DirectionalLight(0x33ffff, 0.7);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
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
