import React, {Component, useState} from 'react'
import {Button, Card, Divider, Grid, GridColumn, Image} from 'semantic-ui-react'
import axios from "axios";

export default function NFTColl (){
    const[nftArray, setNA] = useState([])
        axios.get("https://nftap-server.herokuapp.com/nftColl/get").then(res => {
            setNA(res.data)
        })


        return(
            <Grid columns={3} relaxed={"very"} centered>
                {nftArray.map((child,i) =>{
                    return(
                        <GridColumn>
                            <Card>
                                <Image src={"https://github.com/KingTrash/NFT-images/blob/main/" + child.name + ".png?raw=true"} wrapped ui={true} />
                                <Card.Content>
                                    <Card.Header>{child.name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Class: {child.rank}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {"€"+child.value}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </GridColumn>
                    )
                })}
            </Grid>
        )

}
