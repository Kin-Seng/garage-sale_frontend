import React from 'react';
import { Form, FormGroup, Label, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import axios from 'axios';


class loginModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: true,
          email:'',
          password:'',
          jwt:'',
          authUserID:'',
        };

        this.toggle = this.toggle.bind(this);
    }  
    
    toggle = () =>{
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    
    handleEmailinput = event => {
        this.setState({ email: event.target.value })
    }

    handlePwdinput = event => {
        this.setState({ password: event.target.value })
    }   

    handleSubmit = event => {
        event.preventDefault()
        
        let validEmailFlag = this.validateEmail()
        let validPwd = this.validatePwd()

        const currentUser = {
            email: this.state.email,
            password: this.state.password,
        }        
        
        if(validEmailFlag && validPwd){
            axios({
                method: 'post',
                url: 'https://garage-sales-backend.herokuapp.com/api/v1/users/login',
                data: currentUser
            })
            .then(response => {

                alert('Successfully Log In! ');
         
                localStorage.setItem('username', response.data.user.username)
                localStorage.setItem('user_id', response.data.user.id)
                localStorage.setItem('JWT', response.data.access_token)
              
                sessionStorage.setItem('username', response.data.user.username)
                sessionStorage.setItem('user_id', response.data.user.id)
                sessionStorage.setItem('JWT', response.data.access_token)
            })
            .catch(error => {
                // console.log(error)
                console.log(error.response)
            })

            this.props.toggleLogOut()
            this.toggle()
        }
    }


    validatePwd = () => {
        let inputPwd = this.state.password;
        if(inputPwd){
            if(inputPwd.length >= 8){
                return true;
            } else{
                return false;
            }
        }
        else{
            alert('Your password cannot be blank')
            return false
        }
    }

    validateEmail = () =>{
        let inputEmail = this.state.email.toLowerCase();
        let regex = /[^@]+@[^@]+\.[^@]+/;
        let validEmail = regex.test(String(inputEmail))
        
        // console.log(Validator.isEmail(inputEmail))

        if(validEmail){
            this.setState({ email: inputEmail })
            
            return true;
        }
        else{
            alert("your email is not an valid email")
            return false;
        }
    } 


    render() {
        if(this.state.modal === false){
            return null;
        }

        return(
            <>
                <div className="Modal">
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Login</ModalHeader>
            
                        <ModalBody>
                            <Form className="was-validated" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label>Email</Label><br></br>
                                    <input id="login-email" type="text" onChange={this.handleEmailinput} placeholder=" abc@gmail.com"
                                    required  
                                    title="Please ensure you give proper email address" value={this.state.email}/>
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label>Password</Label><br></br>
                                    <input id="login-pwd" type="password" onChange={this.handlePwdinput} placeholder=" Enter your Password Here"
                                    title="Please ensure you give proper password" required minLength="8" maxLength="10" value={this.state.password}/>
                                </FormGroup>
                                
                                <Label>New member?<a href="/signUp" onClick={(e)=>{
                                    e.preventDefault();
                                    this.props.toggleLoginModal();
                                    this.props.toggleSignUpModal();
                                }}>  Sign up here.</a></Label>
                                <hr></hr>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                <Button type="submit" color="primary" disabled={!(this.state.email && this.state.password)} onClick={this.handleSubmit}>Log In</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            
            </>
        )
    }

}

export default loginModal;