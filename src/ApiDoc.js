import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import {Scrollbars} from "react-custom-scrollbars";
import './api.css'
export default function ApiDoc () {
    return(
        <div className={"center"}>
        <Scrollbars style={{width: 1000, height: 720}}autoHeightMin={100} autoHeightMax={700}>
        <SwaggerUI style={{marginBottom:100, }} url="https://raw.githubusercontent.com/KingTrash/nftap/main/src/swagger.json" />
        </Scrollbars>
        </div>
    )
}
