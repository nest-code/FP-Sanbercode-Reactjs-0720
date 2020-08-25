import React, { useState } from 'react';
import { Card, CardMedia, CardActionArea } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const MovieItem = props => {
    const [clicked, setClicked] = useState(false)
    const [imgStyle, setImgStyle] = useState({
        width: "100px",
        height: "120px",
        position: "relative",
        transform: "translateX(-50%)",
        left: "50%",
        marginTop: "20px"
    })
  
    return (
        <>
    <TableRow >
        {/* <TableCell>{index+1}</TableCell> */}
        <TableCell>-</TableCell>
        <TableCell>{props.movie.title} </TableCell>
        <TableCell>{props.movie.year}</TableCell>
        <TableCell>{props.movie.year}</TableCell>
        <TableCell>{props.movie.duration}</TableCell>
        <TableCell>{props.movie.genre}</TableCell>
        <TableCell>{props.movie.rating}</TableCell>
        <TableCell>review</TableCell>
        {/* <TableCell>{props.movie.review}</TableCell> */}

        <TableCell>
            <Card >
            <CardActionArea>
                <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                image= {props.movie.image_url} style={imgStyle}
                />
            </CardActionArea>
            </Card>
        </TableCell>
        
        <TableCell>
        {/* button */}
        </TableCell>
    </TableRow>
        </>
    )
}

export default MovieItem
