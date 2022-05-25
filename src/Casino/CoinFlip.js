import {Button} from "semantic-ui-react";
import {useState} from "react";
import "./casino.css"


export default function CoinFlip() {
    const [result, setResult] = useState()
    const [nader, setNader] = useState("nader")
    flip = flip.bind(this)

   async function flip () {
        if (Math.random() < 0.5){
            setResult("heads")
        }else{
            setResult("tails")
        }
    }




    return(
        <div>
        <div id="coin" className={result} key={+new Date()}>
            <div className="side-a">
                <h2>TAIL</h2>
            </div>
            <div className="side-b">
                <h2>HEAD</h2>
            </div>
        </div>
    <h1>Flip a coin</h1>
    <Button onClick={flip}>
        Coin Toss
    </Button>
</div>
    )


}