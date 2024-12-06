import {
  MarchingCube,
  MarchingCubes,
  MarchingPlane,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from '@react-three/drei'
import { Loading } from '@t4/ui/src/Loading'
import { Suspense } from 'react'
import { Color } from 'three'

export function Common({
  color,
  orbit,
  enableZoom,
}: { color?: string; orbit?: boolean; enableZoom?: boolean }) {
  return (
    <Suspense fallback={<Loading />}>
      {color && <color attach='$background' args={[color]} />}
      <ambientLight />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 10]} />
      {orbit && <OrbitControls enableZoom={enableZoom} />}
    </Suspense>
  )
}
