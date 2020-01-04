import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteWord from './DeleteWord';
import WordDialog from './WordDialog';
import LikeButton from './LikeButton';
// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// MUI icons
import ChatIicon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 20,
    objectFit: 'cover'
  }
};

class Word extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      word: {
        body,
        createdAt,
        userImage,
        userHandle,
        wordId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteWord wordId={wordId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="secondary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton wordId={wordId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIicon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <WordDialog
            wordId={wordId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Word.propTypes = {
  user: PropTypes.object.isRequired,
  word: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(withStyles(styles)(Word));
