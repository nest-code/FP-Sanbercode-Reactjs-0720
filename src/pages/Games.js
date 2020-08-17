import React, {useState, useEffect} from "react"
import axios from "axios"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import {Card, CardActionArea,CardMedia} from '@material-ui/core';



const Games = () => {
  
  const [games, setGames] =  useState(null)
  const [input, setInput]  =  useState({
    name: "",
    genre: "",
    platform: "",
    release: "",
    image_url:""

  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (games === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/games`)
      .then(res => {
          setGames(res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            genre: el.genre,
            platform: el.platform,
            release: el.release,
            image_url: el.image_url
          }
        }))
      })
    }
  }, [games])
  


  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, name: event.target.value});
        break
      }
      case "genre":
      {
        setInput({...input, genre: event.target.value});
          break
      }
      case "platform":
      {
        setInput({...input, platform: event.target.value});
          break
      }
      case "release":
      {
        setInput({...input, release: event.target.value});
          break
      }
      case "singlePlayer":
      {
        setInput({...input, singlePlayer: event.target.value});
          break
      }
      case "multiplayer":
        {
          setInput({...input, multiplayer: event.target.value});
            break
        }
      case "image_url":
      {
        setInput({...input, image_url: event.target.value});
          break
      }

        
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    event.preventDefault()

    let name = input.name
    console.log(input)

    if (name.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://www.backendexample.sanbersy.com/api/games`, {
          name: input.name,
          genre: input.genre,
          platform: input.platform,
          release: input.release,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          image_url: input.image_url
        })
        .then(res => {
            setGames([...games, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://www.backendexample.sanbersy.com/api/games/${selectedId}`, {
          name: input.name,
          genre: input.genre,
          platform: input.platform,
          release: input.release,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          image_url: input.image_url
        })
        .then(res => {
            let singleGame = games.find(el=> el.id === selectedId)
            singleGame.name = input.name
            singleGame.genre = input.genre
            singleGame.platform = input.platform
            singleGame.release = input.release
            singleGame.singlePlayer = input.singlePlayer
            singleGame.multiplayer = input.multiplayer
            singleGame.image_url = input.image_url


            setGames([...games])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        name: "",
        genre: "",
        platform: "",
        release: "",
        singlePlayer: "",
        multiplayer: "",
        image_url: ""


      })
    }

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newGames = games.filter(el => el.id != itemId)
        axios.delete(`https://www.backendexample.sanbersy.com/api/games/${itemId}`)
      .then(res => {
        console.log(res)
      })
            
      setGames([...newGames])
      
    }
    
    const handleEdit = () =>{
      let singleGame = games.find(x=> x.id === itemId)
      setInput({
        name: singleGame.name,
        genre: singleGame.genre,
        platform: singleGame.platform,
        release: singleGame.release,
        image_url: singleGame.image_url
      })
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
      <Button  variant="contained" size="small" color="primary"  onClick={handleEdit}>Edit</Button>
      <Button  variant="contained" size="small" color="secondary" onClick={handleDelete}>Delete</Button>
      </>
    )
  }

  
class ReadSinglePlayer extends React.Component {
  render() {
      return <li>Single : {this.props.singlePlayer === 1 ? "YA" : "TIDAK"} </li>
  }
}

class ReadMultiplayer extends React.Component {
  render() {
      return <li>Multiplayer : {this.props.multiplayer === 1 ? "YA" : "TIDAK"}</li>
  }
}




  return(
    <>
      <h1>Daftar Game</h1> 
        <TableContainer>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Playes</TableCell>
            <TableCell>Platform</TableCell>
            <TableCell>release</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            {
              games !== null && games.map((item, index)=>{
                return(                    
                  <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.genre}</TableCell>
                    <TableCell>
                      <ReadSinglePlayer singlePlayer={item.singlePlayer}/>
                      <ReadMultiplayer multiplayer={item.multiplayer}/>
                    </TableCell>

                    <TableCell>{item.platform}</TableCell>
                    <TableCell>{item.release}</TableCell>
                    <TableCell>
                      <Card >
                        <CardActionArea>
                          <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                            image= {item.image_url}
                          />
                        </CardActionArea>
                      </Card>
         
                      </TableCell>
                    <TableCell>
                      <Action itemId={item.id} />
                    </TableCell>
                  </TableRow>
                )
              })
            }
        </TableBody>
        </Table>
      </TableContainer>

      {/* Form */}
      <h1>Games Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{float: "left"}}>
            Nama:
          </label>
          <input style={{float: "right"}} type="text" name="name" value={input.name} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
   
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Genre:
          </label>
          <input style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
          <br/>
          <br/>
        </div>

        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Platform:
          </label>
          <input style={{float: "right"}} type="text" name="platform" value={input.platform} onChange={handleChange}/>
          <br/>
          <br/>
        </div>

        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Relase:
          </label>
          <input style={{float: "right"}} type="text" name="release" value={input.release} onChange={handleChange}/>
          <br/>
          <br/>
        </div>

        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            image Url:
          </label>
          <input style={{float: "right"}} type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
          <br/>
          <br/>
        </div>

    
        <button>submit</button>
      </form>
    </>
  )
}

export default Games