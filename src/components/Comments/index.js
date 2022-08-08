import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
  }

  likeOrUnlike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onChangeInputName = event => {
    this.setState({name: event.target.value})
  }

  onChangeInputComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()

    const {name, comment} = this.state

    const randomNum = Math.floor(
      Math.random() * initialContainerBackgroundClassNames.length + 1,
    )

    const newComment = {
      id: v4(),
      name,
      comment,
      isLiked: false,
      dateOfComment: formatDistanceToNow(new Date()),
      initialBackgroundColor: initialContainerBackgroundClassNames[randomNum],
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state

    const filterdComments = commentsList.filter(
      eachComment => eachComment.id !== id,
    )

    this.setState({commentsList: filterdComments})
  }

  render() {
    const {name, comment, commentsList} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Comments</h1>
        <div className="top-container">
          <form className="inputs-container" onSubmit={this.onAddComment}>
            <p className="description">say something about 4.0 technologies</p>
            <input
              className="input-name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={this.onChangeInputName}
            />
            <textarea
              className="input-content"
              cols="30"
              rows="10"
              placeholder="Your Comment"
              value={comment}
              onChange={this.onChangeInputComment}
            />
            <button
              type="button"
              className="comment-btn"
              onClick={this.onAddComment}
            >
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr className="separator" />
        <div className="comments-container">
          <p className="description">
            <span className="count">{commentsList.length}</span>Comments
          </p>
          <ul className="comments-list">
            {commentsList.map(eachComment => (
              <CommentItem
                commentDetails={eachComment}
                key={eachComment.id}
                likeOrUnlike={this.likeOrUnlike}
                onDeleteComment={this.onDeleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
