import { useEffect, useRef } from "react";

import classes from "./NewCommentForm.module.css";
import useHttp from "../../hooks/useHttp";
import { addComment } from "../../lib/api";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment, quoteId } = props;

  useEffect(() => {
    if (status === "completed" && !error) onAddedComment();
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const commentText = commentTextRef.current.value;
    // optional: Could validate here

    // send comment to server
    sendRequest({
      commentData: {
        text: commentText,
      },
      quoteId: quoteId,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
