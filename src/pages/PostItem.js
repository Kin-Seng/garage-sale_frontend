import React, { Component } from 'react';

import loadingIcon from '../image/loading-icon.gif'

import Loading from '../components/Loading';
import axios from 'axios';
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input
   } from 'reactstrap';



class SellingPosts extends Component {
    state = {
        users: [],
        // isLoading: true,
        isLoading: false,
        isLogin: false,
        currentUserID: this.props.userId,
        showModal: false, 
      }

  postSellItem = (e) => {
    e.preventDefault()

    let SellItem={
      "product_name":document.getElementById('productName').value,
      "price": document.getElementById('price').value,
      "seller_id": localStorage.getItem('user_id')
    }
    // console.log(SellItem)
    axios.post('https://garage-sales-backend.herokuapp.com/api/v1/selling_post/create',SellItem)
    .then(result => {
      if(result.data.status === "success"){
        alert('Your item is ready to be sell')
        this.props.history.push("/market");
        // window.location.reload();
      }
      else{
        alert("Unexpected error occurred when u post item for sale")
      }
      
    })
    .catch(error => {
      console.log(error.response);
    })
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
        <h1>Post Item for Sale</h1>
        <Form onSubmit={this.postSellItem}>
          <FormGroup>
            <Label for="productName">Product Name</Label>
            <Input type="text" name="productName" id="productName" placeholder="eg: Vase" />
          </FormGroup>
          <FormGroup>
            <Label for="Price">Price</Label>
            <Input type="integer" id="price" placeholder="eg: 100" />
          </FormGroup>
          <Button color="success">Post</Button>
        </Form>
      </>
    )
  }
}

export default SellingPosts;