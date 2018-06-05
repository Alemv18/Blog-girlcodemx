import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router';
import {Button, Icon} from 'react-materialize';

import loadData from '../utils/load_data';
import * as actionCreators from '../actions/index';
import axios from 'axios';

class Post extends Component {

  constructor(props) {
    super();
    this.state = {
      title: null,
      categories: null
    }

    axios.get('/api/get_post/' + props.params.postId).then((result) => {
       this.setState({
          post: result.data
       })
    })

  }

  onDelete() {
    axios.post('/api/delete_post/' + this.post.id).then((result) => {

      router.push('/')
    })
  }

  render() {
    const { post } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 m-y-1">
          <Link to="/">&lsaquo; Back to posts</Link>
        </div>
        <div className="col-md-8">
          <PostContent post={this.state.post} />
        </div>
        <div className="col-md-4 text-xs-right">
          <Button waves='light'onClick={this.onDelete} className="btn btn-danger"><Icon left>cloud</Icon>
            Delete Post
          </Button>
        </div>
      </div>
    );
  }
};

const PostContent = ({ post }) => {
  if (!post) return <PostNotFound />;

  return (
    <div>
      <header className="m-b-2">
        <h1>{post.title}</h1>
        <h6>Categories: {post.categories}</h6>
      </header>
      <div>{post.content}</div>
    </div>
  );
}

const PostNotFound = () => (
  <p>The requested post does not exist.</p>
);

// function mapStateToProps(state, ownProps) {
//   return {
//     post: state.posts[ownProps.params.postId]
//   };
// }

// function load(props, cb) {
//   props.getPost(props.params.postId).then(cb);
// }

export default Post;
