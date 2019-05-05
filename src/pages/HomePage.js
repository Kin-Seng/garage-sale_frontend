import React, { Component } from 'react';

// import UserImage from '../containers/UserImage';
import loadingIcon from '../image/loading-icon.gif'
// import ProfilePicSection from '../components/ProfilePicSection';
// import FlexibleButton from '../components/FlexibleButton';
import Loading from '../components/Loading';
// import axios from 'axios';
import { Container, 
    Row, 
    Col,
    Jumbotron,
    Button, 
    Form, 
    // FormGroup, 
    Label, 
    Input, 
    // FormText 
} from 'reactstrap';

class HomePage extends Component {
    state = {
        users: [],
        // isLoading: true,
        isLoading: false,
        isLogin: false,
        currentUserID: this.props.userId,
        showModal: false, 
      }

    
    routeChange_Market = () =>{
    let path = "/market";
    this.props.history.push(path);
    }   



    //We should never fetch any data in render method.
  render(){

    if(this.state.isLoading){
      return (
        <div id="loadingIcon">
          <Loading imgSrc={loadingIcon} size='500px'/>
        </div>
      )
    }
    return (
      <div id="homepage">
        <h1>Home Page</h1><br />

        <Jumbotron>
            <Container>
                <Row>
                    <Col xs="6">
                        <h1>Garage Sale</h1>
                        <p>This is where you can find second-hand stuff at a very reasonable price</p>
                        <hr/>
                        <p>Unable to pay for the full price, there is where you can find your treasures</p><br/>
                        <Button onClick={this.routeChange_Market}>Click Me to Find Your Stuff</Button>
                    </Col>
                    <Col xs="6" id="jumbo_img1">
                    
                    </Col>
                </Row>
            </Container>    

            
        </Jumbotron><br></br>

        <section>
            How to Buy (Step by Step Guidance)

        </section><br />


        
        <section>
            <Container>
            <Row>
                <Col xs="4"></Col>
                <Col xs="2"></Col>
                <Col xs="6">
                    <Form>
                        <Label style={{textAlign:"center"}}>Drop Us Your Thoughts via Email</Label><br />
                        <Input id="sender_name" type="text" placeholder="Your Name"/><br />
                        <Input id="phone_" type="text" placeholder="Phone"/><br />
                        <Input id="email" type="email" placeholder="Email"/><br />
                        <Input id="msg" type="text" placeholder="Message"/>
                    
                    </Form>
                </Col>
            </Row>
            </Container>

        </section>
      
      </div>
    )
  }
}

export default HomePage;