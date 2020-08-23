import React, {useState, useEffect} from "react"
import axios from "axios"
const Users = () => {
  
  const [users, setUsers] =  useState(null)
  const [input, setInput]  =  useState({
    username: "",
    password: ""
  })

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
    }
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
      
      <button class="btn">Daftar</button>
      </form>
    </div>
    </>
  )
}

export default Users