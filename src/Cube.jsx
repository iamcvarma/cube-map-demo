import { useEffect, useRef } from "react";
import { Scene,Engine,StandardMaterial,Texture,MeshBuilder, ArcRotateCamera,Vector3, HemisphericLight} from "@babylonjs/core";

const Cube = ({ texture }) => {
    const reactCanvas = useRef(null);
  
    useEffect(() => {
      const { current: canvas } = reactCanvas;
  
      if (!canvas) return;
  
      const engine = new Engine(canvas);
      const scene = new Scene(engine);
  
      // Create a new material using the provided texture
      const material = new StandardMaterial("textureMaterial", scene);
      material.diffuseTexture = new Texture(texture, scene);

      material.diffuseTexture.uScale = .7
      const light = new HemisphericLight("light",new Vector3(0, 1, 0), scene);
      light.intensity = 3
      // Create a new box mesh with the specified width and apply the material
    
      const box = MeshBuilder.CreateBox("box", { size: 4 }, scene);
      box.material = material;

      // Set the camera position and target
      const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), scene);
      camera.setTarget(Vector3.Zero());
  
      engine.runRenderLoop(() => {
        scene.render();
      });
  
      return () => {
        scene.dispose();
        engine.dispose();
      };
    }, [texture]);
  
    return <canvas ref={reactCanvas}  width={700} height={700}/>;
  };

export default Cube;
