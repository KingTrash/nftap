import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {Button, Card, Divider, Grid, GridColumn, Icon, Image, ImageGroup, Segment} from "semantic-ui-react";
import {UserContext} from "../../UserContext";
import * as PropTypes from "prop-types";
import {key} from "wait-on/exampleConfig";
import {Link} from "react-router-dom";



export default function MyNftColl() {

    const {user, setUser} = useContext(UserContext)
    const [userNFT, setUN] = useState(user)
    const [pageReload, chReload] = useState(true)

     async function sellNFT (child, key) {
        //Page reload komplett unnötig aber muss sein weil react ne kleine hoe ist
         if (pageReload){
             chReload(false)
         }
         else if (pageReload === false){
             chReload(true)
         }
         else{
             chReload(true)
         }

         user.balance = user.balance + child.nftValue
         axios.put("https://nftap-server.herokuapp.com/users/addBalance/" + user.id, user)

         //Remove NFT
         console.log(user.myNfts.splice(key, 1))
         axios.put("https://nftap-server.herokuapp.com/users/rmNFT/" + user.id, user)
     }
    useEffect(()=>{
          user.myNfts.forEach((child, i)=>{
              userNFT[i] = child
          })
          setUN(userNFT)

         // setUser(user)
        //  setQN([...new Set(userNFT)])

    },[user])



    return(
        <div>
            {
                // Pre Tag mit Reload weil sich sonst die Komponente nicht reloaded (weil React ne hoe ist)
            }
            <pre>{pageReload}</pre>
            <Grid columns={3} >
                {userNFT.myNfts.map((child,i) =>{
                return(
                    <GridColumn>
                    <Card>
                        <Image src={"https://github.com/KingTrash/NFT-images/blob/main/" + child.nftName + ".png?raw=true"} wrapped ui={true} />
                        <Card.Content>
                            <Card.Header>{child.nftName}</Card.Header>
                            <Card.Meta>
                                <span className='date'>Class: {child.nftRank}</span>
                            </Card.Meta>
                            <Card.Description>

                                {"€"+child.nftValue} <Button floated className={"right"} content={"Sell"} onClick={e=>sellNFT(child, i)}/>
                            </Card.Description>
                        </Card.Content>
                    </Card>

                    </GridColumn>
                )
            })}

            </Grid>
        </div>
    )
}