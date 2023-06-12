import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './ModalR.module.css';

const modalRoot = document.querySelector('#modal-root');

class ModalR extends Component {
  
    componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  
    componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  
    handleClickBackdrop = e => {
      if (e.target === e.currentTarget) {
        this.props.onClose();
      }
    };
  
    handleKeyDown = e => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    };
  
    render() {
 
      return createPortal(
        <div className={css.Container} onClick={this.handleClickBackdrop}>
          <div className={css.ModalR}>
          <div className={css.allItems}>

<div className={css.unicorncontainer}>
  <div className={css.torso}></div>
  <div className={css.head}></div>
  <div className={css.belly}></div>
  <div className={css.nose}></div>
  <div className={css.ear}>
    <div className={css.innerear}></div>
  </div>
  <div className={css.eye}>
    <div className={css.blinkoverlay}></div>
  </div>
  <div className={css.horn}></div>
  <div className={css.mane}>
    <div className={css.manetop}></div>
    <div className={css.manemiddle}></div>
    <div className={css.manebottom}></div>
  </div>
  <div className={css.tail}>
    <div className={css.tailtop}></div>
    <div className={css.tailmiddle}></div>
    <div className={css.tailend}></div>
  </div>
  <div className={css.backlegbehind}></div>
  <div className={css.backlegfront}></div>
  <div className={css.frontlegbehind}></div>
  <div className={css.frontlegfront}></div>
</div>

<div className={css.rainbowbackground}>
  <ul className={css.rainbowlines}>
    <li className={css.red1}></li>
    <li className={css.orange1}></li>
    <li className={css.yellow1}></li>
    <li className={css.green1}></li>
    <li className={css.blue1}></li>
    <li className={css.purple1}></li>
    <li className={css.red2}></li>
    <li className={css.orange2}></li>
    <li className={css.yellow2}></li>
    <li className={css.green2}></li>
    <li className={css.blue2}></li>
    <li className={css.purple2}></li>
    <li className={css.red3}></li>
    <li className={css.orange3}></li>
    <li className={css.yellow3}></li>
    <li className={css.green3}></li>
    <li className={css.blue3}></li>
    <li className={css.purple3}></li>
    <li className={css.red4}></li>
    <li className={css.orange4}></li>
    <li className={css.yellow4}></li>
    <li className={css.green4}></li>
    <li className={css.blue4}></li>
    <li className={css.purple4}></li>
  </ul>
</div>
</div>
          </div>
        </div>,
        modalRoot
      );
    }
  }
  
  export default ModalR;