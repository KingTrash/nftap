import React, {Component, useEffect, useRef, useState} from 'react'
import {Form, Grid, GridColumn} from 'semantic-ui-react'
import axios from "axios";

export default function Register () {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [checkUser, setUC] = useState(false)
    const [userL, setUL] = useState([])


     function handleSubmit (){
        axios.get("https://nftap-server.herokuapp.com/users").then(res =>{
                    const user = {
                        username,
                        password,
                        email,
                        balance: 0
                    }
                    axios.post('https://nftap-server.herokuapp.com/users/add', user)
                    setUC(false)
                    window.location = '/login'
        }
        )
    }
        return (
            <Grid columns={3}>
                <GridColumn></GridColumn>
            <GridColumn>
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                        <img src={"https://raw.githubusercontent.com/KingTrash/NFT-images/main/logo.png"} className="image"/>
                        <div className="content">
                            Create a new account
                        </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input onChange={e=>setUsername(e.target.value)} value={username} type="text" name="username"
                                           placeholder="Username"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input onChange={e=>setPassword(e.target.value)} value={password} type="password" name="password"
                                           placeholder="Password"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="envelope icon"></i>
                                    <input onChange={e=>setEmail(e.target.value)} value={email} type="email" name="email"
                                           placeholder="Email"/>
                                </div>
                            </div>
                            <div onClick={handleSubmit} className="ui fluid large teal submit button">Register
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </GridColumn>
                <GridColumn></GridColumn>
            </Grid>
        )
}