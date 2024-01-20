import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Comment = {
  _id: string;
  name: string;
  email: string;
  movie_id: string;
  text: string;
  date: string;
}

type CommentProps = {
  deleteComment: (id: string) => {};
  comment: Comment;
}

const Comment = (props: CommentProps) => (
  <tr>
    <td>{props.comment.name}</td>
    <td>{props.comment.text}</td>
    <td>{props.comment.date}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.comment._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteComment(props.comment._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function CommentList() {
  const [comments, setComments] = useState([]);

  // This method fetches the comments from the database.
  useEffect(() => {
    async function getComments() {
      const response = await fetch(`http://localhost:5005/comments/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const comments = await response.json();
      setComments(comments);
    }

    getComments();

    return;
  }, [comments.length]);

  // This method will delete a comment
  async function deleteComment(id: string) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newComments = comments.filter((el: any) => el._id !== id);
    setComments(newComments);
  }

  // This method will map out the comments on the table
  function commentList() {
    return comments.map((comment: any) => {
      return (
        <Comment
          comment={comment}
          deleteComment={() => deleteComment(comment._id)}
          key={comment._id}
        />
      );
    });
  }

  // This following section will display the table with the comments of individuals.
  return (
    <div>
      <h3>Comment List</h3>
      <table className="table table-striped text-2xl my-5 mx-auto" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{commentList()}</tbody>
      </table>
    </div>
  );
}
