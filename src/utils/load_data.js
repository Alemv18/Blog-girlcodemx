import React, { Component } from 'react';

const loadData = load => BaseComponent =>
  class LoadData extends Component {
    state = { hasLoaded: false };

    componentDidMount() {
      load(this.props, data =>
        this.setState({
          hasLoaded: true,
          data
        })
      )
    }

    render() {
      if (!this.state.hasLoaded) return null;
      return <BaseComponent {...this.props} {...this.data} />
    }
  }

export default loadData;
