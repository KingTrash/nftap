import React, {useContext, useState} from "react";
import {Button, Divider, Grid, GridColumn, Icon} from "semantic-ui-react";
import axios from "axios";
import { UserContext } from "../UserContext";
import {Link} from "react-router-dom";

export default function Login(){
    const {user, setUser} = useContext(UserContext)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [checkUser, setCU] = useState(true)

     async function handleClick(){
        axios.get("https://nftap-server.herokuapp.com/users").then(res =>{
            res.data.forEach((data) =>{
                if (data.username === username && data.password === password){
                    setCU(true)
                    const userx = {
                        id: data._id,
                        username,
                        password,
                        email: data.email,
                        balance: data.balance,
                        myNfts: data.myNfts
                    }
                    setUser(userx)
                }else{
                    setCU(false)
                }
            })
        })
    }

    return(
        <Grid columns={3}>
            <GridColumn/>
        <GridColumn>
        <div className="ui middle aligned center aligned grid">
        {!user ? (
                <div className="column">
                    <h2 className="ui teal image header">
                        <img src={"https://raw.githubusercontent.com/KingTrash/NFT-images/main/logo.png"} className="image" alt={"Logo"}/>
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"/>
                                    <input onChange={e=> setUsername(e.target.value)} value={username} type="text" name="username" placeholder="Username"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"/>
                                    <input onChange={e=> setPassword(e.target.value)} value={password} type="password" name="password" placeholder="Password"/>
                                </div>
                            </div>
                            <div onClick={handleClick} className="ui fluid large teal submit button">Login</div>
                        </div>

                        <div className="ui error message"/>

                    </form>

                    <div className="ui message">
                        New to us? <Link to={"/register"}>Sign-Up</Link>
                    </div>
                </div>
            ):(
        <div className={"full-height"}>
            <div className={"pusher"}>
                <div className={"ui inverted masthead center aligned segment"}>
            <div className={"ui text container"}>
                <h1 className={"ui inverted header teal"}>Logged in as</h1>
                <h2>{user.username}</h2>
                <Button className="ui huge teal button" as={Link} to={"/home"}> BACK TO <Divider> <Icon name={"home"}/></Divider> </Button>
            </div>
                </div>
            </div>
    </div>
)}


        </div>
        </GridColumn>
            {!user ? (            <GridColumn>
                {!checkUser ? (<h1>WRONG USERNMAE OR PASSWORD</h1>) : (<h1/>)}
            </GridColumn>) :(<></>)}
        </Grid>
    )
}
