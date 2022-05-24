import React, {Component, useState} from 'react'
import {
    Button,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react'
import {Link} from "react-router-dom";



export default function SidebarNav (){

    const [check, setCheck] = useState(false)

            return (
                <Grid columns={1}>
                    <Grid.Column>
                        {check ? (<Button
                            icon={"angle double left"}
                            onClick={e => setCheck(true)}
                        />) :
                            (<Button
                                icon={"angle double right"}
                                onClick={e => setCheck(true)}
                            />)}

                    </Grid.Column>

                    <Grid.Column>
                        <Sidebar.Pushable as={Segment}>
                            <Sidebar
                                as={Menu}
                                animation='slide along'
                                icon='labeled'
                                inverted
                                onHide={e =>setCheck(false)}
                                vertical
                                visible={check}
                                width='thin'
                            >
                                <Menu.Item as='a'>
                                    <Icon name='home'/>
                                    Home
                                </Menu.Item>
                                <Link to={"/game"}>
                                <Menu.Item as='a'>
                                    <Icon name='gamepad'/>
                                    Games
                                </Menu.Item>
                                </Link>
                                <Menu.Item as='a'>
                                    <Icon name='camera'/>
                                    Channels
                                </Menu.Item>
                            </Sidebar>

                            <Sidebar.Pusher dimmed={check}>
                                <Segment basic>



                                    <Header as='h3'>Application Content</Header>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>




                                </Segment>
                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                    </Grid.Column>
                </Grid>
            )
}