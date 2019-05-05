import React, { Component } from 'react';

// import UserImage from '../containers/UserImage';
import loadingIcon from '../image/loading-icon.gif'
// import ProfilePicSection from '../components/ProfilePicSection';
// import FlexibleButton from '../components/FlexibleButton';
import Loading from '../components/Loading';
// import axios from 'axios';

class SellingPosts extends Component {
    state = {
        users: [],
        // isLoading: true,
        isLoading: false,
        isLogin: false,
        currentUserID: this.props.userId,
        showModal: false, 
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
      <>
        <h1>Market Place/Selling Post</h1>
      </>
    )
  }
}

export default SellingPosts;