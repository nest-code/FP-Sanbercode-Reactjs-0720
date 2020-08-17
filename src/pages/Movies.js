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

const Movies = () => {
  
  const [movies, setMovies] =  useState(null)
  const [input, setInput]  =  useState({
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0,
    image_url: ""
  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (movies === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
      .then(res => {
          setMovies(res.data.map(el=>{ return {
            id: el.id, 
            title: el.title, 
            description: el.description,
            year: el.year,
            duration: el.duration,
            genre: el.genre,
            rating: el.rating,
            image_url: el.image_url

          }
        }))
      })
    }
  }, [movies])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "title":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "year":
      {
        setInput({...input, year: event.target.value});
          break
      }
      case "duration":
      {
        setInput({...input, duration: event.target.value});
          break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "rating":
        {
          setInput({...input, rating: event.target.value});
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

    let title = input.title
    console.log(input)

    if (title.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://www.backendexample.sanbersy.com/api/movies`, {
          title: input.title,
          description: input.description,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: parseInt(input.rating),
          image_url: input.image_url

        })
        .then(res => {
            setMovies([...movies, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://www.backendexample.sanbersy.com/api/movies/${selectedId}`, {
          title: input.title,
          description: input.description,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: parseInt(input.rating),
          image_url: input.image_url
        })
        .then(res => {
            let singleMovie = movies.find(el=> el.id === selectedId)
            singleMovie.title = input.title
            singleMovie.description = input.description
            singleMovie.year = input.year
            singleMovie.duration = input.duration
            singleMovie.genre = input.genre
            singleMovie.rating = input.rating
            singleMovie.image_url = input.image_url

            setMovies([...movies])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        title: "",
        description: "",
        year: 2020,
        duration: 120,
        genre: "",
        rating: 0,
        image_url: ""
      })
    }

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newMovies = movies.filter(el => el.id = itemId)
      axios.delete(`https://www.backendexample.sanbersy.com/api/movies/${itemId}`)
      .then(res => {
        console.log(res)
      })
            
      setMovies([...newMovies])
      
    }
    
    const handleEdit = () =>{
      let singleMovie = movies.find(x=> x.id === itemId)
      setInput({
        title: singleMovie.title,
        description: singleMovie.description,
        year: singleMovie.year,
        duration: singleMovie.duration,
        genre: singleMovie.genre,
        rating: singleMovie.rating,
        image_url: singleMovie.image_url
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

  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });



  return(
    <>
      <h1>Daftar Movie</h1> 

      <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
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
            <TableCell>Image</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
            {
              movies !== null && movies.map((item, index)=>{
                return(                    
                  <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    {/* <TableCell>{item.description}</TableCell> */}
                    <TableCell>{item.year}</TableCell>
                    <TableCell>{item.year}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell>{item.genre}</TableCell>
                    <TableCell>{item.rating}</TableCell>
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
      </table>


      {/* Form */}
      <h1>Movies Form</h1>
      <form onSubmit={handleSubmit}>
            <table style={{width: "100%"}} >
              <tr>
                <td>  Title:</td>
                <td>
                     <input  type="text" name="title" value={input.title} onChange={handleChange}/>
                </td>
              </tr>

              <tr>
                <td> Description:</td>
                <td>
                    <textarea  type="text" name="description" value={input.description} onChange={handleChange}/>
                </td>
              </tr>

              <tr>
                <td>Year:</td>
                <td> 
                     <input  type="number" max={2020} min={1980}  name="year" value={input.year} onChange={handleChange}/>
                </td>
              </tr>

              <tr>
                <td>Duration:</td>
                <td> <input  type="number" name="duration" value={input.duration} onChange={handleChange}/></td>
              </tr>

              <tr>
                <td>Genre:</td>
                <td>
                     <input  type="text" name="genre" value={input.genre} onChange={handleChange}/>
                </td>
              </tr>

                <tr>
                  <td>Rating:</td>
                  <td>
                  <input  type="number" max={10} min={0} name="rating" value={input.rating} onChange={handleChange}/>

                  </td>
              </tr>

              <tr>
                  <td>image_url::</td>
                  <td>
                  <input  type="text" name="image_url" value={input.image_url} onChange={handleChange}/>

                  </td>
              </tr>

              <tr>
                   <td colSpan="2" align="center">
                  <button>Submit</button>
                  </td>
              </tr>
            </table>
      </form>
    </>
  )




}

export default Movies