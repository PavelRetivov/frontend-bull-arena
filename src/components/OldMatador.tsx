import React, { useEffect, Component, memo } from "react";
import soundApplause from '../assets/aplas.wav'
import imageMatador from '../assets/matador.png';
import variantMove from './VariantsMatadorMovement';

interface MatadorProps {
  applause?: number;
  setMatadorPosition?: Function
  matadorPosition?: number;
}
interface MatadorState {
  position?: number;
}

class OldMatador extends Component<MatadorProps, MatadorState>{
constructor(props: MatadorProps){
  super(props);
  this.state = {
    position: undefined
  };  
}

componentDidMount(): void{
  document.addEventListener('bullRun',this.moveMatador); 
}

componentDidUpdate(prevProps: Readonly<MatadorProps>): void {
  console.log('props: ' +this.props.applause);
  console.log('preProv: ' +  prevProps.applause);
  if(this.props.applause === 3 && this.props.applause !== prevProps.applause){
    this.applauseSound();    
  };

}
componentWillUnmount(): void {
  document.removeEventListener('bullRun',this.moveMatador);
}
setPosition = (newPosition: number) =>{
  this.setState({position: newPosition});
}

nextMoveMatador = (cells: number[], position:number) => {
  const res = Math.floor(Math.random()*cells.length);
  console.log(`Matador is moving from ${position} to ${cells[res]}`);
  return cells[res] as number;
}

moveMatador = (event: Event) => {
    this.setPosition(this.props.matadorPosition as number);
    const customEvent = event as CustomEvent;

    if(this.props.matadorPosition === customEvent.detail.position && this.props.setMatadorPosition !== undefined
      && this.state.position !== undefined){
      this.props.setMatadorPosition(this.nextMoveMatador(variantMove[this.state.position], this.state.position));
  }
}
applauseSound = () =>{
  let audio = new Audio(soundApplause);
  audio.play();
}

render(){
  return (
  <div>
  <img src={imageMatador} alt="Matador" />
  </div>
)
}
}

export default memo(
  OldMatador,
  (prevOldMatador:MatadorProps, nextOldMatador: MatadorProps)=>{
   if(prevOldMatador.applause !== nextOldMatador.applause && prevOldMatador.applause !==3 && nextOldMatador.applause === 3){
    return false;
   }
   return true;
});