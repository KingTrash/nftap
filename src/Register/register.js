import React, {useState} from 'react'
import {Grid, GridColumn} from 'semantic-ui-react'
import axios from "axios";

export default function Register () {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [checkUser, setUC] = useState(false)
    const [userL, setUL] = useState([])


     function handleSubmit (){
        axios.get("https://nftap-server.herokuapp.com/users").then(res =>{
            setUL(res.data)

        })

         userL.forEach((user)=>{
             if (user.username === username){
                 const user = {
                     username,
                     password,
                     email,
                     balance: 0
                 }
                 axios.post('https://nftap-server.herokuapp.com/users/add', user)
                 setUC(false)
                 window.location = '/login'
             }else{
                 setUC(true)
             }
         })



    }
        return (
            <Grid columns={3}>
                <GridColumn/>
            <GridColumn>
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                        <img src={"https://raw.githubusercontent.com/KingTrash/NFT-images/main/logo.png"} className="image" alt={"Logo"}/>
                        <div className="content">
                            Create a new account
                        </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"/>
                                    <input onChange={e=>setUsername(e.target.value)} value={username} type="text" name="username"
                                           placeholder="Username"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"/>
                                    <input onChange={e=>setPassword(e.target.value)} value={password} type="password" name="password"
                                           placeholder="Password"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="envelope icon"/>
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
                <Grid.Row>
                    <GridColumn>
                    {!checkUser ? (<h1 className={"ui header"}>USERNAME ALREADY EXISTS</h1>) : (<></>)}
                    </GridColumn>
                </Grid.Row>
            </Grid>
        )
}