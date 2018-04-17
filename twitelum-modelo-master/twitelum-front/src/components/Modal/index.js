import React, { Component } from 'react'

import './modal.css'

class Modal extends Component {
  render() {
    return (
      <div className={ `modal ${ this.props.isOpen && 'modal--active' }`}
           onClick={ this.props.closeModal }>
        <div className="modal__wrap">
          { this.props.isOpen && this.props.children }
        </div>
      </div>
    )
  }
}

export default Modal
