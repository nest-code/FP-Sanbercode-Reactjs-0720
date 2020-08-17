import React, {Component} from "react"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {Card, CardActionArea,CardMedia,CardContent,CardActions} from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },media: {
    height: 140,
  },Container: {
    margin : 20
  },
  
}));


  const handleShow = (event) =>{
      alert("Get Review")
    }
    

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
        description: el.description,
        year: el.year, 
        rating: el.rating,
        duration: el.duration,
        genre: el.genre,
        image_url: el.image_url

      }})
      this.setState({movies})
    })
  }

  render(){
    return (
      <>


      <div class="nav-link">
      <Breadcrumbs aria-label="breadcrumb"  container spacing={3}>
          <Link color="inherit" href="/">
           Movies
          </Link>
         
          <Link
            color="textPrimary"
            href="/components/breadcrumbs/"
            
            aria-current="page"
          >
           List Movie
          </Link>
        </Breadcrumbs>
        </div>
    

    
      <Container>
     

      <div className={useStyles.root}>
      <Grid container spacing={3}>
      {
            this.state.movies.map((item)=>{
              return(
        <Grid item xs={3}>
          <Card className={useStyles.root}>
            <CardActionArea>
              <CardMedia maxWidth="lg" component="div" style={{ backgroundColor: '#fff'}} />
            
              <CardMedia
                style={{height: 0, paddingTop: '96.25%'}}
                image= {item.image_url}
                title="lorem ipsum"
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {item.title}
                </Typography>
                <Typography variant="body2">
                 Genre : {item.genre} ||  Duration : {item.duration}
                </Typography>

                <Typography variant="body2">
                  Rating : {item.rating} ||    Year : {item.year}
                </Typography>

              </CardContent>
            </CardActionArea>

            <CardActions>
              <Button size="small" color="primary" onClick={handleShow} >
                Review
              </Button>
              
            </CardActions>
          </Card>
        </Grid>
      )
      })
      }
      </Grid>
    </div>
 

      </Container>
      </>
    )
  }
}

export default Home