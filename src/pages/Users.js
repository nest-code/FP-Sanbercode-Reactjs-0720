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
import MaterialTable from '@material-ui/core/Table';


const Users = () => {
  
  const [users, setUsers] =  useState(null)
  const [input, setInput]  =  useState({
    username: "",
    password: ""


  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (users === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/users`)
      .then(res => {
         setUsers(res.data.map(el=>{ return {
            id: el.id, 
            username: el.username, 
            password: el.username

          }
        }))
      })
    }
  }, [users])
  


  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "username":
      {
        setInput({...input, username: event.target.value});
        break
      }
      case "password":
        {
          setInput({...input,password: event.target.value});
            break
        }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    event.preventDefault()

    let username = input.username
    console.log(input)

    if (username.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://www.backendexample.sanbersy.com/api/users`, {
        username: input.username,
        password: input.password
        })
        .then(res => {
           setUsers([...users, {id: res.data.id, ...input}])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        username: "",
        password: ""



      })
    }

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newUsers = users.filter(el => el.id != itemId)
  
      axios.delete(`https://www.backendexample.sanbersy.com/api/users/${itemId}`)
      .then(res => {
        console.log(res)
      })
            
     setUsers([...newUsers])
      
    }
    
    const handleEdit = () =>{
      let singleUser = users.find(x=> x.id === itemId)
      setInput({
        username: singleUser.username,
        password: singleUser.password,
      })
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
      <Button variant="contained" color="primary" onClick={handleEdit}>Edit</Button>
      <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
      </>
    )
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
          </TableRow>
        </TableHead>
        <TableBody>

            {
              users !== null && users.map((item, index)=>{
                return(                    
                  <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.password}</TableCell>

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
            Username:
          </label>
          <input style={{float: "right"}} type="text" name="username"  onChange={handleChange}/>
          <br/>
          <br/>
        </div>
   
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
           password:
          </label>
          <input style={{float: "right"}} type="text" name="password"  onChange={handleChange}/>
          <br/>
          <br/>
        </div>



       

    
        <button>submit</button>
      </form>
    </>
  )
}

export default Users