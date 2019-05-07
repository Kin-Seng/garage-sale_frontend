import React, { Component } from 'react';
import loadingIcon from '../image/loading-icon.gif'
import Loading from '../components/Loading';
import axios from 'axios';
import { Container, 
  Row, 
  Col,
  Table,
  Button,
  Form
} from 'reactstrap';

import {Link} from "react-router-dom";

class Market extends Component {
    state = {
        users: [],
        isLoading: false,
        isLogin: false,
        currentUserID: this.props.userId,
        showModal: false, 
        posts:[],
        sellingModal:false,

        clientToken: null,
        redirect:false
      }


  fetchMarket= ()=>{
    
    axios.get(`https://garage-sales-backend.herokuapp.com/api/v1/selling_post/market`,{  
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT")
      }
    })
    .then(result => {
      
      this.setState({posts:result.data.market})
      
    })
    .catch(error => {
        console.log('ERROR: ', error)
    })
  }   

  purchase = () => {

    let path = "/payment";
    this.props.history.push(path);
    
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
      
      <Container>
      <Row>
      <Col xs="12">
          <h1>Market Place/Selling Post</h1>

          <br></br><br></br>
          <Button color="primary"   onClick={this.routeChange} style={{'display': 'flex','margin':'0 auto'}}> Create a new Selling Post</Button>
          <br></br>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
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
                        <tr key={index}>
                            <th scope="row" key={post.product_id}>{index}</th>
                            <td >{post.product_name}</td>
                            <td>{new Intl.NumberFormat('en-GB', { 
                              style: 'currency', 
                              currency: 'MYR' 
                              }).format(post.price)}</td>
                            <td >{post.seller_name}</td>
                            <td>
                              <Form id="buy_btn" value={post.product_id}>  
                                
                                <Link to={{pathname:`/payment`,state:{product_id:post.product_id,product_name:post.product_name,product_price:post.price}}}><Button color="success">Buy</Button></Link>
                              </Form>
                            </td>
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