import React from 'react';

import LoginModal from '../containers/modal/loginModal';
import SignUpModal from '../containers/modal/signUpModal';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
     } from 'reactstrap';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {

          isLogin:false,
          isSignUp:false,
          isLogOut:false,
        }; 
      }

      state = {
        userId:null,
        isLoading:true,    
        
    }
    
    // toggle(e) {
    //     e.preventDefault();
    //     this.setState({
    //         showModal: !this.state.showModal
    //     })
    // }

    // toggle when screen size is mobile
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    //toggle Logout 
    toggleShowLogOut = () =>{
        
        this.setState({
            isLogOut: !this.state.isLogOut
        })
    }

    //toggle Logout 
    toggleLogOut = () =>{
       let jwt = sessionStorage.getItem('newUserJWT')
        if(jwt !== '' || jwt !== null ){
            
            //clear session variable
            sessionStorage.clear();

            //show Login instead of Logout
            this.toggleShowLogOut()
        }
        else{
            alert("Please Login 1st before you logout")
        }
    }

    //toggle Login 
    toggleLoginModal = () =>{
        
        this.setState({
            isLogin: !this.state.isLogin
        })
    }

    //toggle Sign Up
    toggleSignUpModal = () =>{
        
        this.setState({
            isSignUp: !this.state.isSignUp
        })
    }    
    // <NavbarBrand href="/">Home</NavbarBrand>
    render(){
        return(
            <div>
                <Navbar className="Navbar" color="dark" dark expand="md">
                    <NavbarBrand href="/">Home</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            {this.state.isLogOut 
                            ? null
                            :<NavLink href="/login" onClick={(e)=>{
                                e.preventDefault();
                                this.toggleLoginModal();
                                }}>Login</NavLink>
                            }
                        </NavItem>
                        <NavItem>
                            {this.state.isLogOut 
                            ? 
                                <NavLink href="/logout" id="logout" onClick={(e)=>{
                                    e.preventDefault();
                                    this.toggleLogOut();}}>
                                    Logout
                                </NavLink>
                            : null    
                            }
                            
                        </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>

                
                {this.state.isLogin? 
                    <LoginModal  isLogin={this.state.isLogin} isSignUp={this.state.isSignUp} toggleLoginModal={this.toggleLoginModal} toggleSignUpModal={this.toggleSignUpModal} toggleLogOut={this.toggleShowLogOut}/>
                : null}
                
                {this.state.isSignUp? 
                    <SignUpModal  isLogin={this.state.isLogin} isSignUp={this.state.isSignUp} toggleSignUpModal={this.toggleSignUpModal} toggleLoginModal={this.toggleLoginModal}/>
                : null}
            </div>
        )
    }
}

export default NavBar;