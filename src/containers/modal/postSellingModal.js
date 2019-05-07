import React from 'react';
import { Form, FormGroup, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import {Redirect} from "react-router-dom";


class postSellingModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: true,
          isShowSellModal: false,
          username:'',
          email:'',
          password:'',
          newUser:{},
          signUpMessage:'',
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }


    state ={
        userId:null,
        userPwd:null,
        isLogin:null,
     }

    login = (e) =>{

        e.preventDefault();
        
        let userInputId = document.getElementById('login-id').value;
        let userInputPwd = document.getElementById('login-pwd').value;
   
        
        this.setState({
           userId: userInputId,
           userPwd:userInputPwd,
           isLogin: true,
        })
       
        
        if(userInputId !== '' || userInputPwd !== ''){
   
           if(userInputPwd.length < 8){
               alert('Your Password must be at least 8 in length')
           }
           else{
               this.props.history.push('/user/' + userInputId);
           }
   
        }
        else{
            alert('Please enter your login id or password')
        }
        
    }

    handleUserNameInput = event => {
        this.setState({ username: event.target.value })
    }

    handleEmailInput = event => {
        this.setState({ email: event.target.value })
    }     

    handlePwdInput = event => {
        this.setState({ password: event.target.value })
    } 

    handleSubmit = event => {
        event.preventDefault()

        let newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios({
            method: 'post',
            url: 'https://garage-sales-backend.herokuapp.com/api/v1/users/create',
            header: {
                'content-type': 'application/json'
            },
            data: newUser
        })
        .then(result => {
            // get JWT from endpoint
            let authtoken = result.data.access_token
            
            if(result.data.status === "success"){

                //Storing JWT in Web Storage/Session
                sessionStorage.setItem('newUserJWT', authtoken)
                sessionStorage.setItem('current_user', result.data.user)

                localStorage.setItem('JWT', authtoken)
                localStorage.setItem('current_user', result.data.user)

                this.setState({
                    signUpMessage: 'You have successfully registered with us! Pls proceed to login.'
                })

                alert(this.state.signUpMessage)

                this.props.toggleLoginModal();
                this.props.toggleSignUpModal();
            }

        })
        .catch(error => {
            console.log(error.response);
        })

    }

    render() {
        // if(!this.State.signUpMessage){
        if(!this.setState.signUpMessage){
            return(
                <div className="Modal">
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
            
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Hello Selling Modal</Label><br></br>
                                   
                                </FormGroup>
                                
                            </Form>
                        </ModalBody>
                    </Modal>
    
                </div>
            )
        }
        else{
            return <Redirect to="/market" />
        }
    }

}

export default postSellingModal;