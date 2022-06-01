import React, {useContext, useEffect, useState} from "react";
import {Button, Grid, Input} from "semantic-ui-react";

import axios from "axios";
import {UserContext} from "../UserContext";
import {queryAllByAttribute} from "@testing-library/react";


export default function CoinFlip(){

    const [selected,setSelected] = useState("")

    const {user, setUser} = useContext(UserContext)

    let [result, setResult] = useState("")
    const [counter, setCounter] = useState(0)
    const [isPepe, setPepe] = useState(true)
    const [stopGif, setSG] = useState(true)
    const [win, setWin] = useState(false)
    const [disableButton, setDB] = useState(true)
    const [amount, setAmount] = useState(0)
    const [reload, setReload] = useState(false)
    const [pepeGif, setPepeGif] = useState("https://github.com/KingTrash/NFT-images/blob/main/coin-pepe.png?raw=true")
    const [amongusGif, setAmongusGif] = useState("https://github.com/KingTrash/NFT-images/blob/main/coin-amongus.png?raw=true")


    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
     async function flip () {
        let rdm = Math.random() * (1000 - 1) + 1
        if (rdm <= 500) {
            result = "pepe"
            setResult(result)
            setPepe(true)
        } else if (rdm > 500) {
            result = "amongus"
            setResult(result)
            setPepe(false)
        }

        setCounter(counter+1)
        if (reload) {
            setReload(false)
        }
        else if (!reload){
            setReload(true)
        }else{
            setReload(true)
        }

        setDB(true)
         await sleep(1000)

        if (amount > user.balance){
        }else{
            if (selected === result){
                setWin(true)
                let temp = user.balance + amount
                user.balance = temp
            }else{

                setWin(false)
                user.balance = user.balance - amount
            }
            axios.put("https://nftap-server.herokuapp.com/users/addBalance/" + user.id, user)
        }
    }

    useEffect(async () => {

        await sleep(2500)
        setDB(false)

        const ges = user.balance - amount
        if (ges < 0){
            setAmount(0)
        }



    },[counter, amount])


    return (
        /*
        <img src={"https://github.com/KingTrash/NFT-images/blob/main/still-working.png?raw=true"}></img>
         */
          <div>
            <Grid columns={2}>
                <Grid.Column>
                    <Input placeholder={"Amount"}  onChange={(event) => {
                        setAmount(event.target.value)
                        setDB(false)
                        if (!/[0-9]/.test(event.target.value)) {
                            event.preventDefault();
                        }

                    }}/>
                    <pre>Balance: €{user.balance - amount}</pre>
                    <Grid.Row>
                        <img style={{height:200}} onClick={e=>{setSelected("pepe")}} src={"https://github.com/KingTrash/NFT-images/blob/main/pepe-end.png?raw=true"}/>
                        <img style={{height:200}} onClick={e=>{setSelected("amongus")}}src={"https://github.com/KingTrash/NFT-images/blob/main/amongus-end.png?raw=true"}/>
                    </Grid.Row>
                    <Grid.Row>
                    </Grid.Row>
                    <Grid.Row>
                    <Button onClick={flip} disabled={disableButton} content={"50/50"}/>
                    </Grid.Row>
                    <h1>{selected}</h1>

                </Grid.Column>
                <Grid.Column>
                    {reload ? (
                        <div>
                            {isPepe ? (<div><img
                                    src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "pepe" + ".gif?raw=true"}/>
                                </div>)
                                : (<div><img
                                    src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "amongus" + ".gif?raw=true"}/>
                                </div>)
                            }
                        </div>
                    ):(
                        <div>
                            {isPepe ? (<div><img
                                    src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "pepe2" + ".gif?raw=true"}/>
                                </div>)
                                : (<div><img
                                    src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "amongus2" + ".gif?raw=true"}/>
                                </div>)
                            }
                        </div>
                    )}

                </Grid.Column>
            </Grid>
              {stopGif ? (
                  <div>
                  {win ? (<h1>YOU WON</h1>) : (<h1>MAYBE NEXT TIME</h1>)}
                  </div>
              ): (<h1></h1>)}


        </div>



    )

}
