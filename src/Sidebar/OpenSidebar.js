import React, { Component } from 'react'
import { Button, Divider, Image, Transition } from 'semantic-ui-react'

export default class TransitionExampleTransition extends Component {
    state = { visible: true }

    toggleVisibility = () =>
        this.setState((prevState) => ({ visible: !prevState.visible }))

    render() {
        const { visible } = this.state

        return (
            <div>
                <Transition visible={visible} animation='scale' duration={500}>
                <Button
                    className={visible ? 'icon=angle double left' : 'icon=angle double right'}
                    onClick={this.toggleVisibility}
                />
                <Divider hidden />

                </Transition>
            </div>
        )
    }
}