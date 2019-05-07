import React, { Component } from 'react';

import loadingIcon from '../image/loading-icon.gif'

import Loading from '../components/Loading';
import axios from 'axios';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table
   } from 'reactstrap';



class SellingPosts extends Component {
    state = {
        users: [],
        // isLoading: true,
        isLoading: false,
        isLogin: false,
        currentUserID: this.props.userId,
        showModal: false, 
        myPosts:[]
      }

  fetchMyPosts=()=>{

    axios.get(`https://garage-sales-backend.herokuapp.com/api/v1/selling_post/mySellingPost/${this.props.match.params.id}`,{  
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT")
      }
    })
    .then(result => {
      console.log(result)

      if(result.data.status === "success"){
        this.setState({myPosts:result.data.myPosts})
      }
      else{
        alert("Unexpected error loading your selling posts")
      }

      
    })
    .catch(error => {
        console.log('ERROR: ', error)
    })
  }

  deletePost = (product_id) =>{

    axios.post(`https://garage-sales-backend.herokuapp.com/api/v1/selling_post/delete/${product_id}`,{  
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT")
      }
    })
    .then(result => {
      if(result.data.status === "success"){
        alert('You have successfully deleted this post')
        this.props.history.push("/market");
      }
      else{
        alert("Unexpected error occurred during your post deletion")
      }
      
    })
    .catch(error => {
      console.log(error.response);
    })
  }

  componentDidMount = () => {
    this.fetchMyPosts()
  }

  render(){

    if(this.state.isLoading){
      return (
        <div id="loadingIcon">
          <Loading imgSrc={loadingIcon} size='500px'/>
        </div>
      )
    }
    return (
      <>
        <h1>My Selling Posts</h1>

        <br></br><br></br>
        
        <Container>
            <Row>
              <Col xs="12">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Buyer</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.myPosts.map((myposts,index ) => 
                    {
                        return (
                        <tr key={index}>
                            <th scope="row" key={myposts.product_id}>{index}</th>
                            <td >{myposts.product_name}</td>
                            <td >{myposts.price}</td>
                            <td >{myposts.buyer_name}</td>
                            <td>
                              <Form id="buy_btn" value={myposts.product_id}>  
                                <Button color="danger" onClick={()=>this.deletePost(myposts.product_id)}>Delete</Button>
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

export default SellingPosts;