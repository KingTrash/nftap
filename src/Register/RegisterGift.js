import React, {Component, useContext, useEffect} from "react";
import {Button, Grid, GridRow, Icon} from "semantic-ui-react";
import axios from "axios";
import {UserContext} from "../UserContext";
import {Link} from "react-router-dom";


export default function RegisterGift(){

    const { user } = useContext(UserContext);


     async function  handleClick(){
         const newBalance = user.balance + 100
         const userx ={
             username: user.username,
             password: user.password,
             email: user.email,
             balance: newBalance
         }
           axios.post("http://localhost:5000/users/addBalance/" + user.id, userx)
               .then(res => console.log(res.data))

     }
     console.log(user)

        return(

            <Grid columns={3} centered>
                <br/>
                <h1>Hey <Icon name={"hand peace"}/> {user.username}</h1>
                <br/>
            <h1>Claim Your free €100 Gift</h1>
            <Button content={"CLAIM"} icon={"gift"} as={Link} to={"/MyNfts"} onClick={handleClick}/>
            </Grid>
        )
}

