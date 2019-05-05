import React, { Component } from 'react';
import loadingIcon from '../image/loading-icon.gif'
import Loading from '../components/Loading';
import axios from 'axios';
import { Container, 
  Row, 
  Col,
  Table,
  Button
} from 'reactstrap';




class Market extends Component {
    state = {
        users: [],
        // isLoading: true,
        isLoading: false,
        isLogin: false,
        currentUserID: this.props.userId,
        showModal: false, 
        posts:[]
      }


  fetchMarket= ()=>{
    debugger
    axios.get(`http://localhost:5000/api/v1/selling_post/market`)
    // axios.get(`http://localhost:5000/api/v1/selling_post/market`,{
    // axios.get(`http://localhost:5000/api/v1/selling_post/market`,{  
    //   headers: {
    //     "Authorization": "Bearer " + localStorage.getItem("JWT")
    //   }
    // })
    .then(result => {
      console.log(result)
      this.setState({posts:result.data.market})
      
    })
    .catch(error => {
        console.log('ERROR: ', error)
    })
  }   
  //We should never fetch any data in render method.
  componentDidMount(){

    this.fetchMarket()
    
  }

  render(){
    if(this.state.isLogin){
      return (
        <div id="loadingIcon">
          <Loading imgSrc={loadingIcon} size='500px'/>
        </div>
      )
    }
    return (
      <>
        <h1>Market Place/Selling Post</h1>

        <br></br><br></br>
        <Button> Create a new Selling Post</Button>
        <Container>
            <Row>
              <Col xs="12">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Sold by</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.posts.map((post,index ) => 
                      {
                        return (
                        <tr>
                          <th scope="row">{index}</th>
                          <td>123</td>
                        </tr>
                        )
                      }
                    )}

                 
                </tbody>
              </Table> 
                    
                    
              </Col>
                
              
                
            </Row>
        </Container> 
      </>
    )
  }
}

export default Market;