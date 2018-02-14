import React, { Component } from 'react'
import { Panel, Glyphicon, ListGroup, ListGroupItem, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

class Profile extends Component{
  render(){
    return(
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.props.user.fname} {this.props.user.lname}'s Profile</Panel.Title>
        </Panel.Heading>
          <ListGroup>
            <ListGroupItem>
              <Glyphicon glyph="user" />&nbsp;&nbsp;&nbsp;&nbsp;{this.props.user.engineer} engineering
              <br />
              <Glyphicon glyph="envelope" />&nbsp;&nbsp;&nbsp;&nbsp;{this.props.user.email}
              <br />
              <Glyphicon glyph="cog" />&nbsp;&nbsp;&nbsp;&nbsp;my settings
              <Table>
                <tr>
                  <td>
                    <Glyphicon glyph="comment" />&nbsp;&nbsp;&nbsp;&nbsp;my questions
                    <br />
                    <Glyphicon glyph="comment" />&nbsp;&nbsp;&nbsp;&nbsp;my answers
                  </td>
                  <td>
                    <Glyphicon glyph="thumbs-up" />&nbsp;&nbsp;&nbsp;&nbsp;{this.props.user.ups}
                    <br />
                    <Glyphicon glyph="thumbs-down" />&nbsp;&nbsp;&nbsp;&nbsp;{this.props.user.downs}
                  </td>
                </tr>
              </Table>
            </ListGroupItem>
          </ListGroup>
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

Profile = connect(
  mapStateToProps,
)(Profile);

export default Profile;