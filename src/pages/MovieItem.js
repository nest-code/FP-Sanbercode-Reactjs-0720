import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Card, CardMedia, CardContent } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const MovieItem = props => {
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
                width: "300px",
                height: "400px",
                position: "relative",
                transform: "translateX(-50%)",
                left: "50%",
                marginTop: "20px",
                transition: "all 0.2s"
            })
            setTitleStyle({
                height: "100%",
                width: "100%",
                top: "100%",
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
                    <Card style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column" }}>
                        <CardMedia image={props.movie.image_url} style={imgStyle} />
                        <CardContent> 
                            <span style={titleStyle}> {props.movie.title} ({props.movie.year} )</span> 
                        </CardContent>
                    </Card>
                </AccordionSummary>

                <AccordionDetails>
                    <div style={{ width: "100%" }}>
                        <h4 style={detailStyle}> <span> Year: </span> {props.movie.year} </h4>
                        <h4 style={detailStyle}> <span> Genre: </span> {props.movie.genre} </h4>
                        <h4 style={detailStyle}> <span> Duration: </span> {props.movie.duration} </h4>
                        <h4 style={detailStyle}> <span> Rating: {props.movie.rating}</span> </h4>
                        <h4 style={detailStyle}> <span> Description: </span> {props.movie.description} </h4>
                        <h4 style={detailStyle}> <span> Review: </span> {props.movie.review} </h4>
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default MovieItem
