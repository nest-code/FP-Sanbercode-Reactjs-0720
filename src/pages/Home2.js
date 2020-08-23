import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@material-ui/core';
import GameItem from './GameItem';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import axios from 'axios';

const Home2 = () => {
    const [games, setGames] = useState([])
    const [gamesDummy, setGamesDummy] = useState([])
    const [search, setSearch] = useState("")

    const sorting = (a, b, key, order) => {
      
    }

    useEffect(() => {
        axios.get(` https://backendexample.sanbersy.com/api/games `)
            .then(res => {
                setGames(res.data.sort((a, b) => sorting(a, b, "name", "asc")))
                setGamesDummy(res.data.sort((a, b) => sorting(a, b, "name", "asc")))
            })
    }, [])

    useEffect(() => {
        if (search.length === 0) {
            setGamesDummy(games)
        } else {
            setGamesDummy(games.filter(el => {
                if (el.name.toUpperCase().indexOf(search) > -1) {
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
            <section>
                <h1> Games </h1>
                <div class="nav-link">
                <Breadcrumbs aria-label="breadcrumb"  container spacing={3}>
                  <Link color="inherit" href="/">Game</Link>
                  <Link color="textPrimary" href="" aria-current="page" >List Game</Link>
                </Breadcrumbs>
              </div>
                <Container>
                <TextField type="text" size="small" variant="outlined" value={search} onChange={handleChange} label="Search" style={{ width: "100%", margin:"20px auto 20px"}} />
                {gamesDummy.map(el => {
                    return (
                        <GameItem game={el} />
                    )
                })}
                </Container>
            </section>
        </>
    )
}

export default Home2
