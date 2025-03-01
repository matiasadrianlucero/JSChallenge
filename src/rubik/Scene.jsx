import * as THREE from 'three';
import { useEffect,useRef,useState  } from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import checkRayIntersections from './onMouseClick/checkRayIntersections';
import getMouseVector2 from './onMouseClick/getMouseVector2';
import determineCamera from './onMouseClick/determineCamera';

import rotateArr from './movements/rotateArr';
import rotateColumn from './movements/rotateColumn';
import rotateRow from './movements/rotateRow';


import getBlocks from './selectGroup/getBlocks';
export default function Scene(){
  const canvasRef = useRef(null);
  let [positions,setPositions]=useState([
    [
      1,2,3,
      4,5,6,
      7,8,9
    ],
    [
      10,11,12,
      13,null,14,
      15,16,17
    ],
    [
      18,19,20,
      21,22,23,
      24,25,26

    ],
  ])
  function funcSetPositions(arr){
    setPositions(arr)
  }
  useEffect(()=>{
    let func = async () => {
			const pointer = new THREE.Vector2();
      let raycaster = new THREE.Raycaster();
      const scene = new THREE.Scene();
      const color = new THREE.Color().setRGB( 0, 0, 0 );
      const result = await new GLTFLoader().loadAsync('/src/assets/rubikLast.glb');
      const light = new THREE.AmbientLight( 0x404040 );
      const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true
      });
      const controls = new OrbitControls( camera, renderer.domElement );
      controls.minPolarAngle = Math.PI/9; 
      controls.maxPolarAngle = Math.PI/1.1; // radians

      const group = new THREE.Group();
      
      let direction=null
      var timer;
      let lastPoint = {x: null, y: null}
      let initialClickPoint = {x: null, y: null}
      let currentMovement = {x: null, y: null}

      let invertOnAxis = {x: null, y: null}
      let rotation
      let camPos
      let cube
      let axis

      let arrPositions=[
        [
          1,2,3,
          4,5,6,
          7,8,9
        ],
        [
          10,11,12,
          13,null,14,
          15,16,17
        ],
        [
          18,19,20,
          21,22,23,
          24,25,26
    
        ],
      ]

      light.intensity=25
      scene.background=color
      scene.add(group)

      scene.add(result.scene)
      
      scene.add(light)

      camera.position.set( 0, 5, 50 );

      renderer.setSize(window.innerWidth, window.innerHeight)
      controls.enableZoom=false
      controls.enablePan=false
      
      controls.update();
      document.addEventListener('mouseup',mouseUp,false)
      document.addEventListener('mousedown',onMouseClick,false)

      function onMouseClick(e){
        
        group.rotation.x=0
        group.rotation.y=0
        group.rotation.z=0
        rotation=null
        lastPoint = {x: null, y: null}
        initialClickPoint = {x: e.clientX, y: e.clientY}
        currentMovement = {x: null, y: null}
        invertOnAxis= {x: false, y: false}
        direction=null
        controls.enabled = false;

        let mousePointer=getMouseVector2(e,window)
        const getFirstValue=true
        const intersections=checkRayIntersections(mousePointer,camera,raycaster,scene,getFirstValue)
      
        if(intersections==undefined){
          controls.enabled = true;          
        } else {
          let res=determineCamera(camera.position)
          camPos=res.face
          invertOnAxis.x=res.invertX
          invertOnAxis.y=res.invertY

          cube=intersections.object.name
          window.addEventListener('mousemove', mouseMove,false)
        }
      }
      function initialMovement(e){
        if(initialClickPoint.x-e.clientX>10||
          e.clientX-initialClickPoint.x>10 ||
          e.clientX-initialClickPoint.x<-10 ||
          initialClickPoint.x-e.clientX<-10 
        ){
          direction="hor"  
        }
        if(initialClickPoint.y-e.clientY>10 ||
          e.clientY-initialClickPoint.y>10 ||
          e.clientY-initialClickPoint.y<-10 ||
          initialClickPoint.y-e.clientY<-10 
        ){
          direction="ver"  
        }
        if(direction){
          let toRotate=getBlocks(camPos,arrPositions,cube,direction)
          axis=toRotate.axis
          arrangeSelection(toRotate.cubes)          
        }
        
      }
      function mouseMove(e){
        currentMovement.x=e.clientX > lastPoint.x ? 'right' : e.clientX < lastPoint.x ? 'left' : 'none'
        currentMovement.y=e.clientY > lastPoint.y ? 'up' : e.clientY < lastPoint.y ? 'down': 'none'
        lastPoint.y= e.clientY
        lastPoint.x= e.clientX
        if(direction==null 
        ){
          initialMovement(e)
        }
        if(direction){
          if(currentMovement.x=='right' && rotation<90 && invertOnAxis.x==false || currentMovement.y=='up' && rotation<90 && invertOnAxis.y==false||
            currentMovement.x=='left' && rotation<90 && invertOnAxis.x==true || currentMovement.y=='down' && rotation<90 && invertOnAxis.y==true
           ){
            if(rotation>70 ){
              rotation+=.2
            } else {
              rotation+=1
            }
          }
          if(currentMovement.x=='left' && rotation>-90 && invertOnAxis.x==false||  currentMovement.y=='down' && rotation>-90 && invertOnAxis.y==false||
             currentMovement.x=='right' && rotation<90 && invertOnAxis.x==true||currentMovement.y=='up' && rotation>-90 && invertOnAxis.y==true
          ){
            if(rotation>70 ){
              rotation-=.2
            } else {
              rotation-=1
            }
          } 
          rotateCube(axis,rotation)
        }
        clearTimeout(timer);
        timer=setTimeout(()=>{
          currentMovement.y='none'
          currentMovement.x='none'
        },100);
      }
      function arrangeSelection(arr){        
        arr.map((obj)=>{
          result.scene.children.map((aObj,i)=>{
            if(aObj.name==obj){
              group.add(aObj)
            }
          })
        })
      }
      function rotateCube(axis,ammount){
        console.log(axis)
        switch (axis){
          case 'x':
            group.rotation.x= Math.PI / 180 *  ammount
          break
          case 'y':
            group.rotation.y= Math.PI / 180 * ammount
          break
          case 'z':
            group.rotation.z= Math.PI / 180 * ammount
          break
        }
      }
      function rotatePositions(cube,direction,axis){
        switch (axis){
          case 'x':
            arrPositions=rotateArr(arrPositions,cube,direction)
          break
          case 'y':
            arrPositions=rotateRow(arrPositions,cube,direction)
          break
          case 'z':
            arrPositions=rotateColumn(arrPositions,cube,direction)
          break
        }
      }
      function mouseUp(){
        window.removeEventListener('mousemove', mouseMove, false);
        direction=null
        if(rotation>70){
          rotatePositions(cube,'forward',axis)
          rotateCube(axis,90)
          commitMovement()
          funcSetPositions(arrPositions)
          return
        }
        if(rotation<-70){
          rotatePositions(cube,'backwards',axis)
          rotateCube(axis,-90)
          commitMovement()
          funcSetPositions(arrPositions)
          return
        }
        cancelMovement()
      }


      function cancelMovement(){
        if(group.children.length>0){
          for(let i=0;i<=8;i++){
            result.scene.add(group.children[0])
          }
        }
      }
      function commitMovement(){
        if(group.children.length>0){
          for(let i=0;i<=8 && group.children[0]!=null;i++){
            result.scene.attach(group.children[0])
            
          }
        }
        return true
      }
      let scrambleButton=document.getElementById('scramble')
      scrambleButton.addEventListener('click',scrambleRubik,false)
      // setInterval(()=>{
      //   scrambleRubik()
      // },5000)
      async function scrambleRubik(){

        let toScramble=document.getElementById('scrambleNumber').value
        for(let i=0;i<toScramble;i++){
          let camTemp=Math.floor(Math.random() * 2)
          let direction=Math.floor(Math.random() * 2)
          let cubeR=Math.floor(Math.random() * 26) + 1;
          let rotationTemp=Math.floor(Math.random() * 2)          
          let cubesTemp=getBlocks(camTemp==0 ? 'topFront' : 'front',arrPositions,cubeR,camTemp=='front' ? 'hor' : direction==0 ? 'ver' : 'hor')
          
          arrangeSelection(cubesTemp.cubes)
          rotatePositions(cubeR,rotationTemp==0 ? 'forward' : 'backwards',cubesTemp.axis)
          await rotateGradually(rotationTemp,cubesTemp.axis)
          commitMovement()
          funcSetPositions(arrPositions)
          
          
          group.rotation.x=0
          group.rotation.y=0
          group.rotation.z=0
        }
      }
      async function rotateGradually(rotationTemp,axis){
        let rotationTotal=0
        while(rotationTotal<90 ||rotationTotal>-90 ){
          rotationTotal+=rotationTemp==0 ? 1 : -1
          rotateCube(axis, rotationTotal)
        }
      }
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        
      }
      animate();
  
      return () => {
        renderer.dispose();
        window.removeEventListener("mouseup", mouseUp,false);
        window.removeEventListener('mousemove', mouseMove,false)
        window.removeEventListener('mousedown', onMouseClick,false)

      };
    }
    func()  

  },[])
  return (<>
        <div style={{position:"absolute",color:"white"}}>
        {positions.map((obj,i)=>{
           
          return (
            <div key={i}> 
{            obj.map((oobj,ii)=>{
              return ii==2 ? <span key={ii}>{oobj}<br></br></span> : ii==5 ? <span key={ii}>{oobj}<br></br></span> : <span key={ii}>{oobj}-</span>
            }) }
            </div>
          )
          
          
            
        })}
        <input id='scrambleNumber' defaultValue='12' type='number' min="1"></input>
        <button id='scramble'>Scramble</button>
      </div>
      <canvas ref={canvasRef} />


      
      </>
  )
}



// function addToGroup()