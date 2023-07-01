import * as THREE from 'three'
import { Vector3 } from 'three'
import * as CONST from '../const'
import { countryInfos, CountryInfoType } from '../data/contry'

export default class Earth extends THREE.Group {

  public world: THREE.Mesh
  public countryPoints: THREE.Group[] = []

  constructor() {
    super();
    const loader = new THREE.TextureLoader()
    const geometry = new THREE.SphereGeometry(100, 60, 60)
    const material = new THREE.MeshPhongMaterial({
      map: loader.load(`/images/world-map-dot-white.png`),
      transparent: true,
      side: THREE.DoubleSide,

    })
    this.world = new THREE.Mesh(geometry, material);
    this.world.receiveShadow = true;
    this.createCountryPoints();    
  }

  public update = (): void => {
    this.world.rotation.y += 0.001
  }

  private createCountryPoints(): void {
    
    countryInfos.forEach((country: CountryInfoType) => {
      const latitude = country.latlng[0]
      const longitude = country.latlng[1]
      const point = new THREE.Group()
      point.name = country.name

      this.createFlagOnGround(point)
      this.setPointPos(point, latitude, longitude)

      this.countryPoints.push(point) //マウスとの交差を調べたいものは配列に格納
      this.world.add(point)
    })

    this.add(this.world)
  }

  private createFlagOnGround(point: THREE.Group): void {
    const texture = new THREE.TextureLoader().load(`/images/test.jpeg`);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });
  
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const plane = new THREE.Mesh(planeGeometry, material);
  
    plane.rotateX(-Math.PI / 2); // 평면을 수평으로 회전
    plane.position.set(0, 0, 0); // 평면의 위치 설정
    
    const group = new THREE.Group();
    group.add(plane);  
    point.add(group);
  }

  private setPointPos(
    point: THREE.Group,
    latitude: number,
    longitude: number,
  ): void {
    point.position.copy(this.translateGeoCoords(latitude, longitude, 98))
    point.lookAt(new THREE.Vector3(0, 0, 0))
    point.rotateX(80)
    point.translateY(2.5)
  }

  private translateGeoCoords(
    latitude: number,
    longitude: number,
    radius: number,
  ): THREE.Vector3 {

    const phi = (latitude * Math.PI) / 180
    const theta = ((longitude - 180) * Math.PI) / 180

    const x = -radius * Math.cos(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi)
    const z = radius * Math.cos(phi) * Math.sin(theta)

    return new THREE.Vector3(x, y, z)
  }
}