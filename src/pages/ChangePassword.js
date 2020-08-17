import React, {useState, useEffect} from "react"
import axios from "axios"


import Button from '@material-ui/core/Button';

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
      alert("Akun Berhasil Dibuat")
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        username: "",
        password: ""
      })
    }
  

  }

  const Action = ({itemId}) =>{

    
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
      </>
    )
  }



  return(
    <>

    
 <div class="login">
<form onSubmit={handleSubmit}>

<label>Username: </label>
<input  type="text" name="username"  onChange={handleChange}/>
<br/>

<label>Password: </label>
<input type="password" name="password" onChange={handleChange} />
<br/>

<button class="btn">Login</button>



</form>

    </div>


    </>
  )
}

export default Users