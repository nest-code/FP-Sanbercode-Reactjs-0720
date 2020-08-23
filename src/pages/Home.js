import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@material-ui/core';
import MovieItem from './MovieItem';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
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
            <h1> Movies </h1>
            <div class="nav-link">
              <Breadcrumbs aria-label="breadcrumb"  container spacing={3}>
                <Link color="inherit" href="/">Movie</Link>
                <Link color="textPrimary" href="" aria-current="page" >List Movie</Link>
              </Breadcrumbs>
            </div>
            <Container>
                    <TextField type="text" size="small" variant="outlined" value={search} onChange={handleChange} label="Search" style={{ width: "100%", margin:"20px auto 20px"}} />
  
                {moviesDummy.map(el => {
                    return (
                        <MovieItem movie={el} />
                    )
                })}
            </Container>
        </>
    )
}

export default Home
