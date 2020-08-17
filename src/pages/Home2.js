import React, {Component} from "react"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
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
  alert("Review")
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


class Home2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      games: []
    }
  }

  componentDidMount(){
    axios.get(`https://www.backendexample.sanbersy.com/api/games`)
    .then(res => {
      let games = res.data.map(el=>{ return {
        id: el.id, 
        name: el.name, 
        genre: el.genre,
        singlePlayer: el.singlePlayer,
        multiplayer: el.multiplayer,
        platform: el.platform,
        release: el.release,
        image_url: el.image_url
      }})
      this.setState({games})
    })
  }

  render(){
    return (
      <>

    <div class="nav-link">
      <Breadcrumbs aria-label="breadcrumb"  container spacing={3}>
          <Link color="inherit" href="/">
           Games
          </Link>
          <Link
            color="textPrimary"
            href=""
            aria-current="page"
          >
           List Game
          </Link>
        </Breadcrumbs>
        </div>

      <Container>
      <div className={useStyles.root}>
      <Grid container spacing={3}>
      {
            this.state.games.map((item)=>{
              return(
        <Grid item xs={3}>
          <Card className={useStyles.root}>
            <CardActionArea>

              <CardMedia
                style={{height: 0, paddingTop: '56.25%'}}
                image= {item.image_url}
                title="lorem ipsum"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>

                <Typography variant="body2">
                 Genre {item.genre} || Relase : {item.release}
                </Typography>

                <Typography variant="body2">

                  <ReadSinglePlayer singlePlayer={item.singlePlayer}/>
                 <ReadMultiplayer multiplayer={item.multiplayer}/>

                </Typography>

                
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
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

export default Home2