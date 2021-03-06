import React, { Component } from 'react'
import { Panel, Glyphicon, Image, Media } from 'react-bootstrap'
import { fetchAPI } from '../../utility'
import {connect} from 'react-redux'

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alert: false,
			id: this.props.user.id,
			email: "",
			fname: "",
			lname: "",
			engineer: "",
			ups: "",
			downs: "",
			register_date: "",
			display_image: "",
		}
	}

	componentDidMount() {
		this.fetchUserInfo()
	}

	//fetches info on the user. Uses the id in the URL to find the user in the database and sets the corresponding state values to be
	//displayed
	async fetchUserInfo() {
		fetchAPI("GET", "/api/users/" + this.props.match.params.id).then(
			response => {
				try {
					if (response.success) {
						this.setState({ alert: false, display_image: response.user.display_image, register_date: response.user.register_date, email: response.user.email, fname: response.user.fname, lname: response.user.lname, engineer: response.user.engineer, ups: response.user.ups, downs: response.user.downs })
					}
					else {
						this.setState({ alert: true })

					}
				} catch (e) { console.error("Error", e) }
			}
		).catch((e) => console.error("Error:", e))
	}

	render() {
		console.log('profile');
		let points = {
			float: "right"
		}
		let avatarPath;
		if (this.state.display_image !== "") {
			avatarPath = "\\images\\avatar\\" + this.state.display_image
		} else {
			avatarPath = "\\images\\avatar\\3.png"
		}
		let ProfileInfo;
		//Own account
		if (!this.state.alert && (this.props.match.params.id === this.state.id)) {
			ProfileInfo = <div>
				<Panel bsStyle="primary">
					<Panel.Heading>
						<Media>
							<Media.Left>
								<Image src={avatarPath} width={64} circle />
							</Media.Left>
							<Media.Body>
								<Media.Heading>
									<Panel.Title>{this.state.fname}&nbsp;{this.state.lname}'s Profile</Panel.Title>
								</Media.Heading>
								{this.state.engineer} engineering
								</Media.Body>
						</Media>
					</Panel.Heading>
					<Panel.Body>
						<Glyphicon glyph="user" />&nbsp;&nbsp;&nbsp;&nbsp;user id: {this.props.match.params.id}
						<br />
						<Glyphicon glyph="envelope" />&nbsp;&nbsp;&nbsp;&nbsp;{this.state.email}
						<br />
						<Glyphicon glyph="calendar" />&nbsp;&nbsp;&nbsp;&nbsp;date registered: {this.state.register_date}
						<br />
						<Glyphicon glyph="cog" />&nbsp;&nbsp;&nbsp;&nbsp;my settings
							  <br /><br />
						<Glyphicon glyph="comment" />&nbsp;&nbsp;&nbsp;&nbsp;my questions
							  <div style={points}><Glyphicon glyph="thumbs-up" />&nbsp;&nbsp;&nbsp;&nbsp;{this.state.ups}</div>
						<br />
						<Glyphicon glyph="comment" />&nbsp;&nbsp;&nbsp;&nbsp;my answers
							  <div style={points}><Glyphicon glyph="thumbs-down" />&nbsp;&nbsp;&nbsp;&nbsp;{this.state.downs}</div>
					</Panel.Body>
				</Panel>
			</div>

		} else if (!this.state.alert && (!(this.props.match.params.id === this.state.id))) { //viewing another person's profile
			ProfileInfo = <div>
				<Panel bsStyle="primary">
					<Panel.Heading>
						<Media>
							<Media.Left>
								<Image src={avatarPath} width={64} circle />
							</Media.Left>
							<Media.Body>
								<Media.Heading>
									<Panel.Title>{this.state.fname}&nbsp;{this.state.lname}'s Profile</Panel.Title>
								</Media.Heading>
								{this.state.engineer} engineering
								</Media.Body>
						</Media>
					</Panel.Heading>
					<Panel.Body>
						<Glyphicon glyph="user" />&nbsp;&nbsp;&nbsp;&nbsp;user id: {this.props.match.params.id}
						<br />
						<Glyphicon glyph="envelope" />&nbsp;&nbsp;&nbsp;&nbsp;{this.state.email}
						<br />
						<Glyphicon glyph="calendar" />&nbsp;&nbsp;&nbsp;&nbsp;date registered: {this.state.register_date}
						<br /><br />
						<Glyphicon glyph="comment" />&nbsp;&nbsp;&nbsp;&nbsp;my questions
							  <div style={points}><Glyphicon glyph="thumbs-up" />&nbsp;&nbsp;&nbsp;&nbsp;{this.state.ups}</div>
						<br />
						<Glyphicon glyph="comment" />&nbsp;&nbsp;&nbsp;&nbsp;my answers
							  <div style={points}><Glyphicon glyph="thumbs-down" />&nbsp;&nbsp;&nbsp;&nbsp;{this.state.downs}</div>
					</Panel.Body>
				</Panel>
			</div>

		} else { //Profile inexistent
			ProfileInfo = <div> <h1> User was not found. </h1> </div>
		}
		
		return (
				<div>
					{ProfileInfo}
				</div>
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
