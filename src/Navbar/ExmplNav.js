import React, {Component, useContext, useState} from 'react'
import {Button, Grid, Header, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react'
import DropdownUser from "./dropdown";
import {Link, Route, Routes} from "react-router-dom";
import {settingUP} from "../Register/GetUserDB";
import Register from "../Register/register";
import Login from "../Register/Login";
import RegisterGift from "../Register/RegisterGift";
import NFTColl from "./Navbar.Item.NFTColl/NFTColl";
import Leaderboard from "./Navbar.Item.Leaderboard/leaderboard";
import Game from "../Game/game";
import MyNftColl from "./Navbar.Item.NFTColl/MyNftColl";
import {UserContext} from "../UserContext";
import Home from "../Home";

export default function Nftap () {
    const [activeItem, setActiveItem] = useState("home")
    const [check, setCheck] = useState(false)
    const {user} = useContext(UserContext)
    const [screenTaken, setST] = useState(false)


    return (
            <div className={"darken"}>
            <Segment inverted>
                <Menu inverted pointing secondary>

                    <Menu.Item>
                        {check ? (<Button inverted color={"teal"}
                                icon={"angle double left"}
                                onClick={e => setCheck(true)}
                            />) :
                            (<Button inverted color={"teal"}
                                icon={"angle double right"}
                                onClick={e => setCheck(true)}
                            />)}
                    </Menu.Item>
                    <Menu.Item
                        name="home"
                        active={activeItem === 'home'}
                        onClick={
                            async () =>{
                                setActiveItem("home")
                            }}
                        as={Link} to={'/home'}
                    />
                    <Menu.Item
                        name="nfts"
                        active={activeItem === 'nfts'}
                        onClick={
                            async () =>{
                                setActiveItem("nfts")
                            }}
                        as={Link} to={'/nfts'}
                    />
                    <Menu.Item
                        name="rank"
                        active={activeItem === 'rank'}
                        onClick={
                            async () =>{
                                setActiveItem("rank")

                            }}
                        as={Link} to={'/rank'}
                    />

                    <Menu.Item className={"right"}>
                        <Image style={{height: 125, marginRight: 150}} src={"https://raw.githubusercontent.com/KingTrash/NFT-images/main/logo.png"}/>
                    </Menu.Item>
                    <Menu.Item className="right">
                        <DropdownUser/>
                    </Menu.Item>
                </Menu>



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
                    height='100%'
                >
                    <Menu.Item  as={Link} to={"/home"}>
                        <Icon  name='home'/>
                        Home
                    </Menu.Item>
                    {user ? ( <Link to={"/game"}>
                        <Menu.Item as='a'>
                            <Icon name='gamepad'/>
                            Games
                        </Menu.Item>
                    </Link>) : ( <Link to={"/login"}>
                        <Menu.Item as='a'>
                            <Icon name='gamepad'/>
                            Games
                        </Menu.Item>
                    </Link>)}

                    <Menu.Item as='a'>
                        <Icon name='camera'/>
                        Channels
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={check}>
                    <Segment basic>

                        <Routes>
                            <Route path="/home"
                                   element={<Home/>}>
                            </Route>
                            <Route path="/register"
                                   element={<Register/>}>
                            </Route>

                            <Route path="/login"
                                   exact element={<Login/>}>
                            </Route>
                            <Route path="/RegisterGift"
                                   element={<RegisterGift/>}>
                            </Route>

                            <Route path="/NFTs"
                                   element={<NFTColl/>}>
                            </Route>

                            <Route path="/rank"
                                   element={<Leaderboard/>}>
                            </Route>

                            <Route path="/game"
                                   element={<Game/>}>
                            </Route>

                            <Route path="/MyNfts"
                                   element={<MyNftColl/>}>
                            </Route>

                        </Routes>


                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
            </Segment>

            </div>
        )
}