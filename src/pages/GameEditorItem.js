import React, { useState } from 'react';
import {Card, CardMedia, CardContent,  CardActionArea } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const GameItem = props => {
    const [clicked, setClicked] = useState(false)
    const [imgStyle, setImgStyle] = useState({
        width: "90px",
        height: "120px",
        position: "relative",
        transform: "translateX(-50%)",
        left: "50%",
        marginTop: "20px"
    })
    const [titleStyle, setTitleStyle] = useState({
        height: "100%",
        width: "100%",
        top: "50%",
        position: "relative",
        fontWeight: "bold"
    })
    const detailStyle = { fontWeight: "normal", textAlign: "left", width: "100%" }

    const handleClick = () => {
        setClicked(!clicked)

        if (clicked) {
            setImgStyle({
                width: "90px",
                height: "120px",
                position: "relative",
                transform: "translateX(-50%)",
                left: "50%",
                marginTop: "20px",
                transition: "all 0.2s"
            })
            setTitleStyle({
                height: "100%",
                width: "100%",
                top: "50%",
                position: "relative",
                fontWeight: "bold",
                transition: "all 0.2s"
            })
        } else {
            setImgStyle({
                width: "200px",
                height: "300px",
                position: "relative",
                transform: "translateX(-50%)",
                left: "50%",
                marginTop: "20px",
                transition: "all 0.2s"
            })

        }
    }
    return (
        <>
          <TableRow >
            {/* <TableCell>{index+1}</TableCell> */}
            <TableCell>-</TableCell>
            <TableCell>{props.game.name} </TableCell>
            <TableCell>{props.game.genre}</TableCell>
            <TableCell>{props.game.player}</TableCell>
            <TableCell>{props.game.platform}</TableCell>
            <TableCell>{props.game.release}</TableCell>
            <TableCell>
                <Card >
                <CardActionArea>
                    <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image= {props.game.image_url} style={imgStyle}
                    />
                </CardActionArea>
                </Card>
            </TableCell>
            <TableCell>
            </TableCell>
        </TableRow>
        </>
    )
}

export default GameItem
