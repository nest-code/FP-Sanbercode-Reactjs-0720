import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@material-ui/core';
import MovieItem from './MovieEditorItem';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {Card, CardActionArea,CardMedia} from '@material-ui/core';
import axios from 'axios';

const Home = () => {
    const [movies, setMovies] = useState([])
    const [moviesDummy, setMoviesDummy] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get(` https://backendexample.sanbersy.com/api/movies `)
            .then(res => {
                setMovies(res.data.sort((a, b) => sorting(a, b, "title", "asc")))
                setMoviesDummy(res.data.sort((a, b) => sorting(a, b, "title", "asc")))
            })
    }, [])

    const sorting = (a, b, key, order) => {
      
    }

    useEffect(() => {
        axios.get(` https://backendexample.sanbersy.com/api/movies `)
            .then(res => {
                setMovies(res.data.sort((a, b) => sorting(a, b, "title", "asc")))
                setMoviesDummy(res.data.sort((a, b) => sorting(a, b, "title", "asc")))
            })
    }, [])

    useEffect(() => {
        if (search.length === 0) {
            setMoviesDummy(movies)
        } else {
            setMoviesDummy(movies.filter(el => {
                if (el.title.toUpperCase().indexOf(search) > -1) {
                    return el
                }
            }))
        }
    }, [search])

    const handleChange = (e) => {
        setSearch(e.target.value.toUpperCase())
    }

    return (
        <>


<h1>Movie List Editor</h1> 
            <div class="nav-link">
              <Breadcrumbs aria-label="breadcrumb"  container spacing={3}>
                <Link color="inherit" href="/">Movie</Link>
                <Link color="textPrimary" href="" aria-current="page" >Movie Editor</Link>
              </Breadcrumbs>
            </div>
            <Container>
                    <TextField type="text" size="small" variant="outlined" value={search} onChange={handleChange} label="Search" style={{ width: "100%", margin:"20px auto 20px"}} />
  
       <table style={{width: "100%"}} >
      <TableContainer>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Review</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          
        {moviesDummy.map(el => {
                    return (
                        <MovieItem movie={el} />
                    )
                })}
        </TableBody>
        </Table>
      </TableContainer>
      </table>
      </Container>
        </>
    )
}

export default Home
