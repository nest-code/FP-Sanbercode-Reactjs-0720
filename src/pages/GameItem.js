import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Card, CardMedia, CardContent } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
            setTitleStyle({
                height: "100%",
                width: "100%",
                top: "50%",
                position: "relative",
                fontWeight: "bold",
                fontSize: "34px",
                transition: "all 0.2s"
            })
        }
    }


    
    return (
        <>
            <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={handleClick}>
                    <Card style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", backgroundColor: "rgba(232, 165, 88, 0.1)" }}>
                        <CardMedia image={props.game.image_url} style={imgStyle} />
                        <CardContent> <span style={titleStyle}> {props.game.name} </span> </CardContent>
                    </Card>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ width: "100%" }}>
                        <h4 style={detailStyle}> <span> Genre: </span> {props.game.genre} </h4>
                        <h4 style={detailStyle}> <span> SinglePlayer: </span> {props.game.singlePlayer} </h4>
                        <h4 style={detailStyle}> <span> MultiPlayer: </span> {props.game.multiPlayer} </h4>
                        <h4 style={detailStyle}> <span> Platform: </span> {props.game.platform} </h4>
                        <h4 style={detailStyle}> <span> Release: </span> {props.game.release} </h4>
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default GameItem
