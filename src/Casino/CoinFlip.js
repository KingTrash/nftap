import React, {useContext, useEffect, useState} from "react";
import {Button, Grid, Input} from "semantic-ui-react";

import axios from "axios";
import {UserContext} from "../UserContext";


export default function CoinFlip(){

    const [selected,setSelected] = useState("")

    const {user, setUser} = useContext(UserContext)

    let [result, setResult] = useState("")
    const [counter, setCounter] = useState(0)
    const [userMoney, setMoney] = useState(0)
    const [isPepe, setPepe] = useState(true)
    const [win, setWin] = useState(false)
    const [disableButton, setDB] = useState(true)
    const [amount, setAmount] = useState(0)
    const [reload, setReload] = useState(false)

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
            setCounter(counter+1)
        if (amount > user.balance){
        }else{
            if (selected === result){
                setWin(true)
                user.balance = user.balance + Number(amount)
                await sleep(1500)
                setMoney(user.balance)
                setCounter(counter+1)
            }else{

                setWin(false)
                user.balance = user.balance - amount
            }
            axios.put("https://nftap-server.herokuapp.com/users/addBalance/" + user.id, user)
        }
    }

    useEffect(async () => {


        setMoney(user.balance)
        const ges = user.balance - amount
        if (ges < 0){
            setAmount(0)
        }
        await sleep(2500)
        setDB(false)


    },[counter, amount, user.balance])


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

                    }}/>
                    <pre>Balance: €{userMoney - amount}</pre>
                    <Grid.Row>
                        <img style={{height:200}} onClick={()=>setSelected("pepe")} src={"https://github.com/KingTrash/NFT-images/blob/main/pepe-end.png?raw=true"} alt={"PEPE"}/>
                        <img style={{height:200}} onClick={()=> setSelected("amongus")} src={"https://github.com/KingTrash/NFT-images/blob/main/amongus-end.png?raw=true"} alt={"AMONGUS"}/>
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
                                    src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "pepe" + ".gif?raw=true"} alt={"PEPE GIF"}/>
                                </div>)
                                : (<div><img
                                    src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "amongus" + ".gif?raw=true"} alt={"AMONGUS GIF"}/>
                                </div>)
                            }
                        </div>
                    ):(
                        <div>
                            {isPepe ? (<div><img
                                    src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "pepe2" + ".gif?raw=true"} alt={"PEPE GIF"}/>
                                </div>)
                                : (<div><img
                                    src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "amongus2" + ".gif?raw=true"} alt={"AMONGUS GIF"}/>
                                </div>)
                            }
                        </div>
                    )}
                </Grid.Column>
            </Grid>
                  <div>
                  {win ? (<h1>YOU WON</h1>) : (<h1>MAYBE NEXT TIME</h1>)}
                  </div>
        </div>
    )

}
