import React, { useEffect, useRef, useState } from 'react';
import imageMatador from '../assets/matador.png';
import variantMove from './VariantsMatadorMovement';
import aud from '../assets/aplas.wav'

interface Matador {
  applause?: number;
  setMatadorPosition?: Function
  matadorPosition?: number;
}


function nextMoveMatador(cells: number[], position:number) {
  const res = Math.floor(Math.random()*cells.length);
  console.log(`Matador is moving from ${position} to ${cells[res]}`);
  return cells[res];
}

const areEqual = (prevProps: Matador, nextProps: Matador) => {
  if(prevProps.applause !== nextProps.applause && prevProps.applause !==3 && nextProps.applause === 3){
    return false;
}return true;
  
};


const Matador: React.FC<Matador> = React.memo(({applause, setMatadorPosition, matadorPosition}) => {

    let position: number = matadorPosition as number;

    const[lastApplause, setLastApplause] = useState<Number | undefined >(undefined);

 useEffect(() => {

  const run = (event: Event) => {
    const customEvent = event as CustomEvent;
    if(matadorPosition === customEvent.detail.position && setMatadorPosition !== undefined){
      setMatadorPosition(nextMoveMatador(variantMove[position], position));
    }
  }
    document.addEventListener('bullRun', run);

    return () => {
      document.removeEventListener('bullRun', run);
    };
  }, []);

 useEffect(()=>{
  if(applause === 3 && lastApplause !== 3){
    const audio = new Audio(aud);
    audio.play();
  }
    setLastApplause(applause);    
  },[applause, lastApplause]);
    
  return (
     <div>
        <img src={imageMatador} alt="Matador" />
        </div>
  );
}, areEqual);

  export default Matador;