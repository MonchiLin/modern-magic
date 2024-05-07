import {Mesh, Object3D} from "three";

export function isMesh(object: Object3D): object is Mesh {
  return object.type === 'Mesh';
}
