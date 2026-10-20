# JUVELOOK 3D 구현 참고

정리일: 2026-10-20

## JUVELOOK con1 섹션

- Figma 노드 `228:7347`을 video 바로 아래 HTML/CSS 섹션으로 구현한다. 데스크톱에서는 1920px 디자인 비율을 유지하고 모바일에서는 세로로 재배치한다.
- 제품 병, 현미경 이미지, 분자 이미지, 궤도선과 장식 표시는 `public/assets/con1-*`의 Figma 원본 자산을 사용한다.

## 2026-10-21 기준 수정

### 스크롤 모션 추가

- 사용자 후속 요청으로 스크롤에 따른 회전·이동을 허용한다. 클릭 회전은 계속 비활성화한다.
- 목표는 Figma `228:7566` 안의 `409:2232`: 1920×1011 기준 x430, y71, 1010×915. 이미지 자체는 사용하지 않는다.
- `src/hero-scroll.js`: hero를 sticky로 고정한 160svh 스크롤 구간에서 기존 프레임을 목표 높이로 이동시키고 Torus Knot의 Y 회전을 180도, X 회전을 30도 증가시킨다.
- 구간 종료 후 일반 스크롤, 역방향 진행, 모바일, reduced motion을 지원한다. 반사광은 `#0061AE`다.
- 명암 대비 요청에 맞춰 Torus Knot의 Matcap alpha를 0.85로 높이고 흰색 Directional Light 2개의 강도를 각각 3배로 높였다. 청색 Point Light 색상은 `#0061AE`로 유지한다.
- 중심에 작은 Sphere를 Torus Knot의 자식으로 추가했다. 본체의 Matcap 반사 레이어를 복사하고 같은 조명을 받게 하여 메탈 느낌을 맞췄다.

- 사용자 기준은 Figma 이미지가 아닌 Spline `glassknotvortex` 형태다.
- 공개 페이지의 `app.start([...])`에 포함된 실제 장면 바이트를 `public/assets/hero-glass-knot.splinecode`에 저장했다.
- `src/hero-metal.js`에서 runtime 2.0.95로 원본 형상과 재질을 렌더링한다. `interactive: false`와 `pointer-events: none`으로 입력을 차단한다.
- zoom은 .85로 고정하며 스크롤·클릭 핸들러는 없다. Figma는 배치 프레임 기준으로만 사용한다.
- 아래 예제는 참고 코드이며 현재 화면 형상을 정의하지 않는다. 이전 “원본 미확보” 설명은 당시 상황이며 지금은 공개 런타임 데이터를 확보했다. 편집용 프로젝트 전체를 확보한 것은 아니다.

## 사용자 의도와 프로젝트 맥락

- 요청은 iframe 삽입법이 아니라 3D를 직접 만드는 코드와 제어 방법을 조사하고 저장하는 것이다.
- 참고 장면: https://my.spline.design/glassknotvortex-c22vuF7EzYWZW5m5ZvlUkz2Y/
- 이 공개 URL만으로 장면의 원본 모델, 재질 수치, 애니메이션 코드까지 확보한 것은 아니다. 아래 예제는 독립적으로 작성한 구현 참고이며 원본의 정확한 복제가 아니다.
- 배치 대상 Figma: 파일 `jxp5tdkuQjP61rtIPW8D4Z`, 노드 `409:2231` (`hero-image-box`).
- 이전 확인 좌표: hero 내부 x431, y726, 1009×915. hero는 1920×1011이므로 아래로 630px 돌출한다. 시각적으로 hero와 video의 경계에 걸치는 위치다.
- 실제 배치 시 현재 hero의 `overflow: hidden`에 의해 잘리지 않도록 레이아웃을 검토한다.
- 영상은 Figma 원본을 다운로드할 수 없으면 기존 이미지만 유지한다. 공식 사이트의 다른 영상으로 대체하지 않는다.

## 구현 영역

| 영역 | 코드에서 다루는 내용 |
| --- | --- |
| 형상 | 기본 geometry, 곡선 기반 튜브, 정점·인덱스·법선·UV, 모델 로딩 |
| 표면 | 색상, roughness, metalness, transmission, IOR, thickness |
| 광원 | 직접 조명, 환경 반사, 그림자, 노출과 색 공간 |
| 구도 | 원근/직교 카메라, 종횡비, 거리, 대상 중심 |
| 움직임 | 시간 기반 회전, 보간, 감쇠, 상태 전환 |
| 입력 | 포인터 정규화, raycasting, 스크롤 진행도 |
| 셰이더 | 정점 변형, fragment 색상, uniform 시간·입력 전달 |
| 수명 | resize, 화면 밖 렌더 중지, 이벤트 해제, GPU 자원 해제 |

## 직접 만드는 코드

아래 `three` 모듈 예제는 형상부터 렌더링과 정리까지 한 흐름으로 작성한 참고 코드다.
현재 프로젝트에는 `three`를 설치하거나 이 코드를 연결하지 않았다. 실행 검증도 하지 않았다.
호출 시 실제 크기가 있는 컨테이너를 전달한다.

```js
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function createKnot(host) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  host.append(renderer.domElement);

  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();

  const geometry = new THREE.TorusKnotGeometry(0.9, 0.28, 160, 24, 2, 3);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xf2f6ff,
    metalness: 0,
    roughness: 0.12,
    transmission: 1,
    thickness: 0.6,
    ior: 1.45,
    opacity: 1,
  });
  const knot = new THREE.Mesh(geometry, material);
  scene.add(knot);

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(3, 4, 5);
  scene.add(light);

  const pointer = new THREE.Vector2();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = THREE.MathUtils.clamp;
  let visible = true;
  let previousTime;
  let elapsed = 0;

  function move(event) {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
  }
  function leave() { pointer.set(0, 0); }
  host.addEventListener('pointermove', move);
  host.addEventListener('pointerleave', leave);

  const resizeObserver = new ResizeObserver(() => {
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
  resizeObserver.observe(host);

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    previousTime = undefined;
  });
  visibilityObserver.observe(host);

  renderer.setAnimationLoop((time) => {
    const dt = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    if (!visible || document.hidden) return;
    elapsed += dt;
    const rect = host.getBoundingClientRect();
    const progress = clamp(
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
      0, 1,
    );
    const moving = !reducedMotion.matches;
    const blend = 1 - Math.exp(-6 * dt);
    const targetX = moving ? pointer.y * 0.2 : 0;
    const targetY = moving ? pointer.x * 0.3 + progress * 0.5 : 0;
    knot.rotation.x += (targetX - knot.rotation.x) * blend;
    knot.rotation.y += (targetY - knot.rotation.y) * blend;
    knot.rotation.z = moving ? Math.sin(elapsed * 0.3) * 0.08 : 0;
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    host.removeEventListener('pointermove', move);
    host.removeEventListener('pointerleave', leave);
    scene.environment = null;
    geometry.dispose();
    material.dispose();
    environment.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
```

### 형상·재질을 수정할 때

- 매듭의 반지름, 튜브 두께, 감김 수는 `TorusKnotGeometry` 생성 인자로 조절한다. 원본의 유기적인 실루엣은 별도 곡선이나 모델이 필요할 수 있다.
- 유리는 `transmission`, `ior`, `thickness`를 함께 조절한다. transmission을 쓸 때 opacity는 1로 둔다.
- 크롬 예시: `metalness: 1`, `transmission: 0`, `roughness: 0.15`. 반사되는 환경의 명암과 형태가 결과에 크게 영향을 준다.
- 유리의 투과는 WebGL 장면 안의 배경을 대상으로 한다. 캔버스 뒤 HTML을 실제로 굴절시키는 기능으로 해석하지 않는다.
- 재질을 바꿀 때 투과 기능 유무 등 셰이더 구성이 달라지면 `material.needsUpdate = true`를 설정한다.

### 정점 변형과 입력 처리 설계

CPU 변형은 원본 정점 배열을 보관하고 매 프레임 원본 기준으로 계산한다. 이전 프레임 결과에 계속 변형을 누적하면 형상이 흐트러진다. 변경 후 position attribute의 `needsUpdate`를 켜고 필요한 법선과 bounding volume을 갱신한다.

GPU 변형은 vertex shader에서 좌표를 바꾸고 시간·진폭·포인터를 uniform으로 전달한다. 조명을 쓰려면 변형에 맞는 법선도 계산해야 한다. GPU에서만 바꾼 형태는 CPU raycasting과 자동으로 일치하지 않는다.

포인터 선택은 컨테이너 좌표를 -1~1로 변환한 뒤 `Raycaster.setFromCamera(pointer, camera)`와 `intersectObject(mesh)`로 처리한다. 드래그 회전과 hover 반응은 상태를 분리한다.

## Spline 자체를 코드로 조작하는 경우

Spline Code Tab은 장면 내부에서 제공하는 `spline` API로 객체, 변수, 이벤트, 런타임 형상을 제어한다. 외부 `Application` API와 동일한 메서드라고 가정하지 않는다. 실행 중 변경은 원본 파일에 자동 저장되는 편집이 아니다.

외부 runtime 2.0.93 문서에서 확인한 주요 범위:

| 목적 | API |
| --- | --- |
| 객체 조회 | `findObjectByName`, `findObjectById`, `getAllObjects` |
| 생성과 삭제 | `createObject`, `cloneObject`, `removeObject` |
| 이벤트 | `addEventListener`, `removeEventListener`, `emitEvent` |
| 변수 | `setVariable`, `getVariable`, `setVariables` |
| 렌더 제어 | `requestRender`, `play`, `stop`, `dispose` |

생성 옵션의 회전 단위는 degrees, 반환 객체의 rotation은 radians이므로 혼용하지 않는다.
런타임 객체 생성은 세션에만 적용된다. 공개 URL로 원본 `.splinecode` 주소를 추측하지 않는다.

## 구현 순서

1. 원본 실루엣과 카메라 구도를 먼저 맞춘다.
2. 무채색 재질로 형상의 법선과 표면을 확인한다.
3. 환경 반사와 광원을 구성한다.
4. 유리 또는 금속 재질 수치를 조정한다.
5. 시간 기반 애니메이션을 넣고 입력 목표값을 감쇠시킨다.
6. 화면 크기, 장면 가림, reduced motion, 정리 함수를 처리한다.
7. 실제 적용 요청이 오면 프로젝트 버전에 맞춰 API를 확인하고 필요한 의존성과 코드를 연결한다.

## 공식 자료

- [Three.js TorusKnotGeometry](https://threejs.org/docs/pages/TorusKnotGeometry.html)
- [Three.js MeshPhysicalMaterial](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)
- [Three.js RoomEnvironment](https://threejs.org/docs/pages/RoomEnvironment.html)
- [Three.js API](https://threejs.org/docs/)
- [Spline Code Tab](https://docs.spline.design/interaction-states-events-and-actions/code-tab)
- [Spline runtime 2.0.93 API 참고](https://app.unpkg.com/@splinetool/runtime@2.0.93/files/AGENTS.md)
- [Spline 성능 최적화](https://docs.spline.design/exporting-your-scene/how-to-optimize-your-scene)

이 파일은 후속 작업에서 다시 읽을 수 있는 프로젝트 기록이다. 모든 3D 기술이나 제공 장면의 비공개 소스를 확보했다는 의미는 아니다.
