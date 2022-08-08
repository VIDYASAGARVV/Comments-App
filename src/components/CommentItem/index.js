// Write your code here
import './index.css'

const CommentItem = props => {
  const {commentDetails, likeOrUnlike, onDeleteComment} = props
  const {
    id,
    name,
    comment,
    isLiked,
    dateOfComment,
    initialBackgroundColor,
  } = commentDetails

  console.log(isLiked)

  const imgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likeClassName = isLiked ? 'liked' : 'like'

  const initialOfUser = name ? name[0].toUpperCase() : ''

  const onClickLike = () => {
    likeOrUnlike(id)
  }

  const deleteComment = () => {
    onDeleteComment(id)
  }

  return (
    <li className="comment">
      <div className="user-profile">
        <div className={initialBackgroundColor}>
          <p className="initial">{initialOfUser}</p>
        </div>
        <p className="user-name">{name}</p>
        <p className="date-of-comment">{dateOfComment}</p>
      </div>
      <p className="user-comment">{comment}</p>
      <div className="icons-container">
        <button type="button" className="button" onClick={onClickLike}>
          <img src={imgUrl} alt="like" />
          <span className={likeClassName}>Like</span>
        </button>
        <button
          type="button"
          className="button"
          onClick={deleteComment}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="separator" />
    </li>
  )
}

export default CommentItem
