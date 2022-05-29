import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {Button, Divider, Dropdown, Grid, GridColumn, Input, Select} from "semantic-ui-react";
import {Selector} from "react-redux";
import {Image} from "react-konva";
import axios from "axios";
import {UserContext} from "../UserContext";



export default function CoinFlip(){

    const optionCoin = [
        { key: 'pepe', value: 'pepe', text: 'Pepe' },
        { key: 'amongus', value: 'amongus', text: 'Amongus' }]
    const [selected,setSelected] = useState("pepe")

    const {user, setUser} = useContext(UserContext)

    const [result, setResult] = useState("pepe")
    const [counter, setCounter] = useState(0)
    const [isPepe, setPepe] = useState(true)
    const [stopGif, setSG] = useState(true)
    const [win, setWin] = useState(false)
    const [disableButton, setDB] = useState(true)
    const [amount, setAmount] = useState(0)

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    async function flip () {
        console.log(amount)

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
        console.log(result)
    }

    useEffect(async () => {

        const ges = user.balance - amount
        if (ges < 0){
            setAmount(0)
        }

        if (result === "amongus"){
            await sleep(2250)
            setSG(true)
            setDB(false)

        }
        else if (result === "pepe"){
            await sleep(1600)
            setSG(true)
            setDB(false)

        }

    },[counter, amount])


    return (
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
                    {!stopGif ? (
                    <div>
                        {!isPepe ? (<div><img src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "pepe" +  ".gif?raw=true"}/></div>
                    ) : (     <div><img src={"https://github.com/KingTrash/NFT-images/blob/main/coin-" + "amongus" +  ".gif?raw=true"}/></div>
                    )}
                    </div>) : (<div>
                        {!isPepe ? (<img src={"https://github.com/KingTrash/NFT-images/blob/main/pepe-end.png?raw=true"}/>):(<img src={"https://github.com/KingTrash/NFT-images/blob/main/amongus-end.png?raw=true"}/>)}
                    </div>)}
                </Grid.Column>
            </Grid>
            {win ? (<h1>YOU WON</h1>) : (<h1>MAYBE NEXT TIME</h1>)}

        </div>
    )

}