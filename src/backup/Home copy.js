import React, {Component} from "react"
import axios from "axios"

function minuteToHours(num){
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return ( rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount(){
    axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
    .then(res => {
      let movies = res.data.map(el=>{ return {
        id: el.id, 
        title: el.title, 
        rating: el.rating,
        duration: el.duration,
        genre: el.genre,
        description: el.description
      }})
      this.setState({movies})
    })
  }

  render(){
    return (
      <>
        <h1>Home</h1>
          {
            this.state.movies.map((item)=>{
              return(
                <div>
                  <h3>{item.title}</h3>
                  <strong>Rating {item.rating}</strong><br/>
                  <strong>Durasi: {minuteToHours(item.duration)}</strong><br/>
                  <strong>genre: {item.genre}</strong>
                  <p>
                    <strong>deskripsi</strong>: 
                    {item.description}
                  </p>
                  <hr/>
                </div>
              )
            })
          }
      </>
    )
  }
}

export default Home