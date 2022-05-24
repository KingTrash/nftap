import React, {Component, useState} from 'react'
import {Button, Grid, Image, List, ListItem, Table} from 'semantic-ui-react'
import axios from "axios";

export default function Leaderboard (){

        const [userL, setUL] = useState([])
        axios.get("https://nftap-server.herokuapp.com/users").then(res =>{
                setUL(res.data)
            })


        return(

            <Table celled inverted selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Rank</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Balance</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {userL.map((child, i) =>{
                        return(
                        <Table.Row>
                            <Table.Cell>{i+1}</Table.Cell>
                            <Table.Cell>{child.username}</Table.Cell>
                            <Table.Cell>€{child.balance}</Table.Cell>
                        </Table.Row>
                        )
                    })}

                </Table.Body>



            </Table>
        )


}
