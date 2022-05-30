import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Grid, Header, Icon, Image, Modal, Progress, Segment} from "semantic-ui-react";
import {Scrollbars} from "react-custom-scrollbars";
import Canvas, {koords, isScreening} from "./Canvas";
import {UserContext} from "../UserContext";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";


export let resetCanvas = false
export default function Game () {


    const {user, setUser} = useContext(UserContext)

    useEffect(() => {


        console.log(koords)
        console.log(progress)
        function handleKeyDown(e) {
            if (e.keyCode === 46) {
                setSK(true)
                resetCanvas = false
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }



    }, []);



    const[nftArray, setNA] = useState([])
    axios.get("https://nftap-server.herokuapp.com/nftColl/get").then(res => {
        setNA(res.data)
    })

    const [selectedNft, setSN] = useState([])
    const [nftCheck, setCheck] = useState(false)
    const [screenKey, setSK] = useState(false)
    const [savePressed, setPressed] = useState(false)

    const [open, setOpen] = useState(false)


    let [progress, setPro] = useState(0)


    async function modalClose() {
        setOpen(false)
        setPro(0)

        //Add to database
        const tempSelected = {
            nftRank: selectedNft.rank,
            nftName: selectedNft.name,
            nftValue: selectedNft.value
        }
        user.myNfts.push(tempSelected)
        axios.put("https://nftap-server.herokuapp.com/users/addNFT/" + user.id, user)
            .then(res => console.log(res.data))
    }

    async function sellNft() {
        console.log(user)
        setOpen(false)
        setPro(0)
        user.balance = user.balance + selectedNft.value
        axios.put("https://nftap-server.herokuapp.com/users/addBalance/" + user.id, user)
            .then(res => console.log(user))
    }
    async function checkArea(){
        resetCanvas = true
            if (screenKey)
            {
                if (koords.x1 < 50 && koords.x2 > 200 && koords.y1 < 50 && koords.y2 > 200){
                    if (selectedNft.rank === 'S')
                    {
                        progress = progress + 2
                    }
                    if (selectedNft.rank === 'A')
                    {
                        progress = progress + 4
                    }
                    if (selectedNft.rank === 'B')
                    {
                        progress = progress + 10
                    }
                    if (selectedNft.rank === 'C')
                    {
                        progress = progress + 20
                    }
                    if (selectedNft.rank === 'D')
                    {
                        progress = progress + 25
                    }
                    if (selectedNft.rank === 'E')
                    {
                        progress = progress + 34
                    }
                    setPro(progress)

                }
                if(koords.x1 > 55 && koords.x2 < 195 && koords.y1 > 55 && koords.y2 < 195){
                    if (selectedNft.rank === 'S')
                    {
                        progress = progress + 1
                    }
                    if (selectedNft.rank === 'A')
                    {
                        progress = progress + 2
                    }
                    if (selectedNft.rank === 'B')
                    {
                        progress = progress + 5
                    }
                    if (selectedNft.rank === 'C')
                    {
                        progress = progress + 10
                    }
                    if (selectedNft.rank === 'D')
                    {
                        progress = progress + 12
                    }
                    if (selectedNft.rank === 'E')
                    {
                        progress = progress + 16
                    }
                    setPro(progress)

                }

            }

        if (progress >= 100) {
            setPressed(true)
            setOpen(true)
            setPro(0)

        }
        setSK(false)

    }


    return(
        <div>
            <Grid columns={2} divided >
                <Grid.Row stretched>
                    <Grid.Column>
                        <Scrollbars style={{width: 500, height: 300}}autoHeightMin={100} autoHeightMax={700}>
                    <Segment>
                            <Card.Group itemsPerRow={2}>
                            {nftArray.map((child,i) => {
                                return (
                                    <div style={{width: 150, padding: 5, margin: 3}}>
                                    <Card inverted fluid onClick={event => {
                                        setSN(child)
                                        setCheck(true)
                                        setPro(0)
                                    }}>
                                        <Image styles={{height:500}}
                                            src={"https://github.com/KingTrash/NFT-images/blob/main/" + child.name + ".png?raw=true"}
                                            wrapped ui={true}/>
                                        <Card.Content>
                                            <Card.Header>{child.name}</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>Class: {child.rank}</span>
                                            </Card.Meta>
                                            <Card.Description>
                                                {"€" + child.value}
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </div>)
                            })}
                            </Card.Group>

                    </Segment>
                        </Scrollbars>
                    </Grid.Column>

                    <Grid.Column>
                {nftCheck ? (
                    <div>
                        <Segment>
                            <div><h1>Press [entf] to screenshot</h1><Progress progress content={"Progress"} percent={progress}/></div>
                        </Segment>

                    <div className={"outsideWrapper"}>
                                <div  className={"insideWrapper"} style={{padding:50}}>
                                    <Image centered className={"coveredImage"} src={"https://github.com/KingTrash/NFT-images/blob/main/" + selectedNft.name + ".png?raw=true"}/>
                                    {screenKey ? (
                                        //Screenshot
                                        <div>
                                        <div className={"coveringCanvas"}>
                                            <Canvas/>
                                        </div>
                                        </div>
                                        ):(<></>)}
                                </div>
                    </div>
                         <Button fluid whileHover={{scale:1.1}} inverted color={"teal"} onClick={checkArea} content={"save"} style={{marginTop: 5}}/>
                        {savePressed ? ( <Modal
                            basic
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            size='small'
                        >
                            <Modal.Content>
                                <div className={"center"}>
                                    <h1>{selectedNft.name} collected!</h1>
                                </div>
                                <div className={"center"}>
                                <Image className={"scaleImage"}
                                       src={"https://github.com/KingTrash/NFT-images/blob/main/" + selectedNft.name + ".png?raw=true"}
                                />
                                </div>
                            </Modal.Content>

                            <Modal.Actions>
                                <div className={"center"}>
                                    <Button color='green' inverted onClick={modalClose}>
                                        <Icon name='play' /> MORE!
                                    </Button>
                                    <Button basic color='teal' inverted onClick={modalClose} as={Link} to={"/MyNfts"}>
                                        <Icon name='save' /> Inventory
                                    </Button>
                                    <Button  basic color='red' inverted onClick={sellNft}>
                                        <Icon name='dollar sign' /> SELL
                                    </Button>
                                </div>
                            </Modal.Actions>
                        </Modal>) : (<></>)}

                    </div>

                            ) : (<Segment><h1>Select a NFT!</h1></Segment>)
                        }

                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>

      )
}




