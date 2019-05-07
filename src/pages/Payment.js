import React, { Component } from 'react';

// import loadingIcon from '../image/loading-icon.gif'

// import Loading from '../components/Loading';
import axios from 'axios';
import {
  Button,
   } from 'reactstrap';
   import DropIn from "braintree-web-drop-in-react";


class Payment extends Component {
  state = {
    clientToken: null,
    redirect:false,
    product_id:'',
    buyer_id:'',
    price:''
  };


  productDetail = (username) =>{
    console.log(username)
  }

  componentDidMount() {

    // get Token from Braintree API
    // axios.get(`https://garage-sales-backend.herokuapp.com/api/v1/selling_post/getToken`,{
    axios.get(`https://localhost:5000/api/v1/selling_post/getToken`,{
      headers: {
          "Authorization": "Bearer " + localStorage.getItem("JWT")
      }})
      .then(result => {
        // console.log(result)
        // debugger
        this.setState({
            clientToken:result.data.client_token,
            product_id: this.props.location.state.product_id,
            buyer_id: localStorage.getItem('user_id'),
            price: this.props.location.state.product_price
        });
            
            // let buyThisItem ={
            //   product_id: this.props.location.state.product_id,
            //   buyer_id: localStorage.getItem('user_id'),
            //   price: this.props.location.state.product_price 
            // }

            

      })
      .catch(error => {
          console.log('ERROR: ', error)
      })
  
    }

    donepymt = () =>{
      
      let buyThisItem ={
        product_id: this.state.product_id,
        buyer_id: localStorage.getItem('user_id'),
        price: this.state.price
      }

      // payment & update DB
      axios.post('http://localhost:5000/api/v1/selling_post/purchase',buyThisItem)  
      // axios.post('https://garage-sales-backend.herokuapp.com/api/v1/selling_post/purchase',buyThisItem)
      .then(result => {
        if(result.data.status === "success"){
          alert('You have bought this item')
          
          this.props.history.push("/market");
          
        }
        else{
          alert("Unexpected error occurred during your purchase")
        }
        
      })
      .catch(error => {
        console.log(error.response);
      })
    }

    render(){
      return(
        <>
            {   
                this.state.clientToken ?
                <>
                    <div>

                        <DropIn
                        options={{ authorization: this.state.clientToken }}
                        onInstance={instance => (this.instance = instance)}></DropIn>

                        <p>Total Amount: {this.props.location.state.product_price}</p>

                        <Button className="btn-success btn-block" onClick={this.donepymt}>Pay</Button>
                    </div>
                </> : 
                <h5>loading...</h5>
            }

        </>
        
        )
    }
  }

export default Payment;