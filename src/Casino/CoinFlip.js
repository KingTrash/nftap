import React, {useContext, useEffect, useState} from "react";
import {Button, Grid, Input} from "semantic-ui-react";

import axios from "axios";
import {UserContext} from "../UserContext";
import {queryAllByAttribute} from "@testing-library/react";


export default function CoinFlip(){

    const [selected,setSelected] = useState("pepe")

    const {user, setUser} = useContext(UserContext)

    const [result, setResult] = useState("pepe")
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
        setPepeGif("https://github.com/KingTrash/NFT-images/blob/main/coin-pepe.png?raw=true")
        setAmongusGif("https://github.com/KingTrash/NFT-images/blob/main/coin-amongus.png?raw=true")
        setCounter(counter+1)
        console.log(amount)
        if (reload) {
            setReload(false)
        }
        else if (!reload){
            setReload(true)
        }else{
            setReload(true)
        }

        setDB(true)
        setSG(false)
        if (Math.random() < 0.5) {
            setResult("pepe")
            setPepe(true)
        } else {
            setResult("amongus")
            setPepe(false)
        }
        setCounter(counter+1)
        if (amount > user.balance){
            console.log("error not enough money")
            console.log()
        }else{
            if (selected === result){
                user.balance = user.balance +  amount * 2
                setWin(true)

            }else{
                user.balance = user.balance - amount
                setWin(false)
            }
            axios.put("https://nftap-server.herokuapp.com/users/addBalance/" + user.id, user)
                .then(res => console.log(user))
        }
        console.log(reload)
    }

    useEffect(async () => {


        const ges = user.balance - amount
        if (ges < 0){
            setAmount(0)
        }

        if (result === "amongus"){
            await sleep(2500)
            setSG(true)
            setDB(false)

        }
        else if (result === "pepe"){
            await sleep(2500)
            setSG(true)
            setDB(false)

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

                    <div>
                        {!isPepe ? (<div><img
                                src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "pepe" + ".gif?raw=true"}/>
                            </div>)
                            : (<div><img
                                src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "amongus" + ".gif?raw=true"}/>
                            </div>)
                        }
                    </div>
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