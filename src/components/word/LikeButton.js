import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux stuff
import { connect } from 'react-redux';
import { likeWord, unlikeWord } from '../../redux/actions/dataActions';

class LikeButton extends Component {
  likedWord = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.wordId === this.props.wordId)
    )
      return true;
    else return false;
  };
  likeWord = () => {
    this.props.likeWord(this.props.wordId);
  };
  unlikeWord = () => {
    this.props.unlikeWord(this.props.wordId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedWord() ? (
      <MyButton tip="Undo like" onClick={this.unlikeWord}>
        <FavoriteIcon color="secondary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeWord}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  wordId: PropTypes.string.isRequired,
  likeWord: PropTypes.func.isRequired,
  unlikeWord: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeWord,
  unlikeWord
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
