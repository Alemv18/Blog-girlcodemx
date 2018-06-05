import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router';

import loadData from '../utils/load_data';
import * as actionCreators from '../actions/index';
import axios from 'axios';

class Navbar extends React.Component {
  render () {
    return() {
      
    }
  }
}

class HomePostItem extends React.Component {
  constructor(data) {
    super()
    this.state = {
      post: data.props
    }

  }
  render () {
    return (
    <div className="m-y-1">
      <Link to={`/posts/${this.state.post._id}`}>
        <div className="row">
          <h2 className="col-md-8">
            {this.state.post.title}
          </h2>
          <div className="col-md-4 text-md-right">
            {this.state.post.categories}
          </div>
        </div>
      </Link>
    </div>
    )
  }
}
class Home extends React.Component {
  constructor() {
    super()
    this.state = {
        posts: []
    }
    axios.get('/api/all_posts').then((results) => {
       this.setState({
          posts: results.data
       })
    })
  }
  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/new-post" className="btn btn-primary">
            Add a Blog Post
          </Link>
        </div>
        <div className="m-y-1">
          {this.state.posts.map(post => <HomePostItem props={post} />)}
        </div>
      </div>
    )
  }
}

function load(props) {
  var data = { "posts": []}
  debugger
  axios.get('/api/all_posts').then(function (results) {
    data["posts"] = results.data
  })

  return data
}

function mapStateToProps(state) {
  return {
    posts: Object.keys(state.posts).map(id => state.posts[id])
  };
}

export default Home;
