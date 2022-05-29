import React, {Component, useContext, useState} from 'react'
import {Button, Dropdown, DropdownMenu, Icon, IconGroup} from 'semantic-ui-react'
import {Link, useNavigate } from "react-router-dom";
import {UserContext} from "../UserContext";

export default function USerDoprdown (){

    const {user, setUser} = useContext(UserContext)

    return(
            <div className={"inverted"}>
        <Button.Group inverted color='teal'>
            {user ? (<Button icon={"user"} as={Link} to={'/MyNfts'}/>) : (<Button icon={"user plus"} as={Link} to={'/login'}/>)}

            <Dropdown className="icon button">
                <DropdownMenu>
                    <div className={"dropdownuser"}>
                    <Link  to="/login">
                        <Dropdown.Item>
                        <Button  tag={"Link"} className={"ui button"} to={"/register"} icon={"sign-in"} content={"Login"}/>
                        </Dropdown.Item>
                    </Link>

                    <Link  to="/register">
                        <Dropdown.Item>
                        <Button tag={"Link"} className={"ui button"} icon={"user plus"} content={"Register"}/>
                            </Dropdown.Item>
                    </Link>
                    <Link  to="/logout">
                        <Dropdown.Item>
                        <Button tag={"Link"} className={"ui button"} icon={"sign-out"} content={"Logout"} as={Link} to={'/home'} onClick={
                            ()  =>{
                                setUser(null)
                            }
                        }/>
                            </Dropdown.Item>
                    </Link>

                        <Link  to="/api-doc">
                            <Dropdown.Item>
                                <Button tag={"Link"} className={"ui button"} icon={"paper plane"} content={"Api-Doc"}/>
                            </Dropdown.Item>
                        </Link>
            </div>
</DropdownMenu>
            </Dropdown>
        </Button.Group>
            </div>
    )

}