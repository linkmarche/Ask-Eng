import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'
import Register from './Register'
import Login from './LoginBox/Login'
import Profile from './LoginBox/Profile'
import AskQuestion from './AskQuestion/AskQuestion'
import DefaultAskQuestion from './AskQuestion/DefaultAskQuestion'
import { connect } from 'react-redux'
class Body extends Component {

  constructor(props) {
    super(props);
    this.handleShowRegister = this.handleShowRegister.bind(this);
    this.handleCloseRegister = this.handleCloseRegister.bind(this);
    this.state = {
      showRegister: false,
    };
  }

  handleCloseRegister() {
    this.setState({ showRegister: false });
  }

  handleShowRegister() {
    this.setState({ showRegister: true });
  }

  render() {
    let login, askQuestion, profileCard;
    if ((Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) { //if no user is login 
      login = <div className="box-login"> <Login registerModal={this.handleShowRegister} /> </div>
      askQuestion = <DefaultAskQuestion register={this.handleShowRegister} />
    } else {
      askQuestion = <div className="ask-question-box"> <AskQuestion /> </div>
      profileCard = <div className="profile-card"><Profile /> </div>
    }

    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} lg={8}>
              {/* body part */}
              {askQuestion}
            </Col>
            <Col xs={12} lgOffset={1} lg={3}>
              {/* sidebar */}
              {login}
              {profileCard}
            </Col>
          </Row>
          <Register
            show={this.state.showRegister}
            handleClose={this.handleCloseRegister} />
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

Body = connect(
  mapStateToProps,
)(Body);

export default Body;
