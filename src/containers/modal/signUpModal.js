import React from 'react';
import { Form, FormGroup, Label, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import {Redirect} from "react-router-dom";


class signUpModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: true,
          isLogin: false,
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
                                    <Label>Username</Label><br></br>
                                    <input id="signUp-id" type="text" onChange={this.handleUserNameInput} placeholder=" Enter Your Username Here"
                                     title="Name your Avatar" value={this.state.username}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email</Label><br></br>
                                    <input id="signUp-email" type="email" onChange={this.handleEmailInput} placeholder=" abc@gmail.com"
                                     pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                                     title="Please ensure you give proper email address" value={this.state.email}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label><br></br>
                                    <input id="signUp-pwd" type="password" onChange={this.handlePwdInput} placeholder=" Enter your Password Here"
                                     title="Please ensure you give proper password" value={this.state.password}/>
                                </FormGroup>
                                <Label>Already a member?<a href="/login" onClick={(e)=>{
                                    e.preventDefault();
                                    this.props.toggleLoginModal();
                                    this.props.toggleSignUpModal();
                                    
                                }}>  Log in here.</a></Label>
                                <hr></hr>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                <Button color="success" disabled={!(this.state.email && this.state.password && this.state.username)} onClick={this.handleSubmit}>Sign Up</Button>
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

export default signUpModal;