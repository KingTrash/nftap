import React from "react";
import {Link} from "react-router-dom";
import {Button, Divider, Icon} from "semantic-ui-react";


export default function Home(){


    return(
        <div className={"pusher"}>
        <div className={"ui inverted vertical masthead center aligned segment"}>
            <div className={"ui text container"}>
                <h1 className={"ui inverted header teal"}>NFTap</h1>
                <h2>A Website made for memer from memer</h2>
                <Button className="ui huge teal button" as={Link} to={"/register"}>Register NOW <Divider> <Icon name={"user plus"}/></Divider> </Button>
            </div>
        </div>
            <div className="ui vertical stripe segment">
                <div className="ui middle aligned stackable grid container">
                    <div className="row">
                        <div className="eight wide column">
                            <h3 className="ui huge header">Meme of the day: NFTs</h3>
                            <p>This little Website provides a couple of <Link to={"/nfts"}>NFts</Link> that can be screenshotted.
                            It's a fun game for those who love to troll NFT owner just by screenshotting their NFTS</p>
                            <h3 className="ui huge header">This Website includes</h3>
                            <ul>
                                <li>A User integretion</li>
                                <li>User can select and screenshot NFTs</li>
                                <li>Collecting NFTs and selling them will add up to your current balance</li>
                                <li>Balance can be seen in the <Link to={"/rank"}>Ranking</Link> tab</li>
                                <li>The casino can help boost your money or lose it all</li>
                            </ul>
                        </div>
                        <div className="six wide right floated column">
                            <img src="https://i.kym-cdn.com/photos/images/original/002/233/526/b86.png"
                                 className="ui large bordered rounded image"/>
                        </div>
                    </div>
                    <div className="row">

                    </div>
                </div>
            </div>


            <div className="ui vertical stripe quote segment">
                <div className="ui equal width stackable internally celled grid">
                    <div className="center aligned row">
                        <div className="column">
                            <h3 className={"ui huge header"}>Register NOW</h3>
                            <p>If this Website sounds like a hella fun ride pls consider to <Link to={"/register"}>Register here</Link></p>
                        </div>
                        <div className="column">
                            <h3 className={"ui huge header"}>Still not sure?</h3>
                            <p>If you don't know where to start you can find a quick <a href={"https://youtu.be/4jdh7EQRgps?t=25"}>Tutorial here</a> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}