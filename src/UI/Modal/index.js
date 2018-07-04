import React, { Component } from 'react';
import './Modal.css'

class Modal extends Component {
    constructor(){
        super()
        this.state = {
            cssId: 'hide' 
        }
    }


    componentDidMount() {
        // console.log(this.state.cssId)
    }


    toggleForm = () => {
        let toggle = this.state.cssId
        if (toggle === ' ') {
            toggle = 'hide'
        } else if (toggle === 'hide') {
            toggle = ' '
        }
        this.setState({
            cssId: toggle
        })
    }

    render(){
        const {cssId} = this.state
        // let modalContent = this.props.content
      
        return (
            <div id={cssId} className="modal">
                <div onClick={this.toggleForm} className="clickableUnderlay"></div>
                <div className="bringToFore">
                    {this.props.children}
                </div>
            </div>
    
        )
    }
}
export default Modal