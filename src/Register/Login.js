import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Grid, GridColumn} from "semantic-ui-react";
import axios from "axios";
import { UserContext } from "../UserContext";
import {Link, useNavigate} from "react-router-dom";
import {render} from "@testing-library/react";
export default function Login(){
    const {user, setUser} = useContext(UserContext)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()




     async function handleClick(){
        console.log(username)
        axios.get("https://nftap-server.herokuapp.com/users").then(res =>{
            res.data.forEach((data) =>{
                if (data.username === username && data.password === password){
                    const userx = {
                        id: data._id,
                        username,
                        password,
                        email: data.email,
                        balance: data.balance,
                        myNfts: data.myNfts
                    }
                    setUser(userx)
                    console.log(user)
                }
            })
        })
    }

    return(
        <Grid columns={3}>
            <GridColumn></GridColumn>
        <GridColumn>
        <div className="ui middle aligned center aligned grid">
        {!user ? (
                <div className="column">
                    <h2 className="ui teal image header">
                        <img src={"https://raw.githubusercontent.com/KingTrash/NFT-images/main/logo.png"} className="image"/>
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input onChange={e=> setUsername(e.target.value)} value={username} type="text" name="username" placeholder="Username"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input onChange={e=> setPassword(e.target.value)} value={password} type="password" name="password" placeholder="Password"/>
                                </div>
                            </div>
                            <div onClick={handleClick} className="ui fluid large teal submit button">Login</div>
                        </div>

                        <div className="ui error message"></div>

                    </form>

                    <div className="ui message">
                        New to us? <Link to={"/register"}>Sign-Up</Link>
                    </div>
                </div>
            ):(<div className={"full-height"}>
            <h2 className="ui teal image header">
            <img src="assets/images/logo.png" className="image"/>
            <div className="content">
                Logged in as {username}
            </div>
        </h2>
        </div>)}


        </div>
        </GridColumn>
            <GridColumn></GridColumn>
        </Grid>
    )
}
