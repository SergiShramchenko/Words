import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Word from '../components/word/Word';
import Profile from '../components/profile/Profile';

import WordSceleton from '../util/WordSceleton';

import { connect } from 'react-redux';
import { getWords } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getWords();
  }
  render() {
    const { words, loading } = this.props.data;
    let recentWordsMarckup = !loading ? (
      words.map(word => <Word key={word.wordId} word={word} />)
    ) : (
      <WordSceleton />
    );
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentWordsMarckup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getWords: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getWords }
)(home);

//  <Grid item sm={4} xs={12}>  xs -- extra small
