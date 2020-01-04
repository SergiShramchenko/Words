import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Word from '../components/word/Word';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../components/profile/StaticProfile';

import WordSceleton from '../util/WordSceleton';
import ProfileSceleton from '../util/ProfileSceleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    wordIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const wordId = this.props.match.params.wordId;

    if (wordId) this.setState({ wordIdParam: wordId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({ profile: res.data.user });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { words, loading } = this.props.data;
    const { wordIdParam } = this.state;
    const wordsMarkup = loading ? (
      <WordSceleton />
    ) : words === null ? (
      <p>No words from this user</p>
    ) : !wordIdParam ? (
      words.map(word => <Word key={word.wordId} word={word} />)
    ) : (
      words.map(word => {
        if (word.wordId !== wordIdParam) {
          return <Word key={word.wordId} word={word} />;
        } else {
          return <Word key={word.wordId} word={word} openDialog />;
        }
      })
    );
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {wordsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSceleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
