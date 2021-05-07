import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { container, formButton, formError, formInput } from './CommentForm.module.scss';
import FormInput from './FormInput';
import FormInputArea from './FormInputArea';

const CommentForm = ({ slug }) => {
  const [serverState, setServerState] = useState({ ok: true, message: '' });
  const [showForm, setShowForm] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleServerResponse = (ok, message) => {
    setServerState({ ok, message });
  };

  const onSubmit = async (data, event) => {
    try {
      const { Email: email, Name: name, Comments: text } = data;
      await axios({
        url: '/api/submit-comment',
        method: 'POST',
        data: {
          email,
          name,
          slug,
          text,
          parentCommentId: null,
        },
      });
      // console.log('Response: ', response);
      handleServerResponse(true, 'Thanks for your comment it will be reviewed and posted shortly.');
      event.target.reset();
      setShowForm(false);
    } catch (error) {
      if (error.response) {
        console.log('Server responded with non 2xx code: ', error.response.data);
      } else if (error.request) {
        console.log('No response received: ', error.request);
      } else {
        console.log('Error setting up response: ', error.message);
      }
      handleServerResponse(
        false,
        'There was an error processing your comment.  Please try again later.',
      );
    }
  };

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!showForm) {
    return null;
  }

  return (
    <form className={container} onSubmit={handleSubmit(onSubmit)}>
      <h3>Leave a comment:</h3>
      <div className={formInput}>
        <FormInput
          ariaInvalid={!!errors.Name}
          ariaLabel="Enter your name"
          id="comment-name"
          label="Name"
          maxLength={32}
          register={register}
          required
        />
        {errors.Name ? (
          <span className={formError}>
            <small>
              We use your name for spam detection. It will appear along with your comment.
            </small>
          </span>
        ) : null}
      </div>
      <div className={formInput}>
        <FormInput
          ariaInvalid={!!errors.Email}
          ariaLabel="Enter your email address"
          id="comment-email"
          label="Email"
          maxLength={32}
          pattern={emailRegex}
          register={register}
          required
        />
        {errors.Email ? (
          <span id="comment-email-error" className={formError}>
            <small>
              We use your email address for spam detection purposes only. It is not stored on our
              database and does not appear alongside your comment.
            </small>
          </span>
        ) : null}
      </div>
      <div className={formInput}>
        <FormInputArea
          ariaInvalid={!!errors.Comments}
          ariaLabel="Enter your comment"
          id="comment"
          label="Comments"
          maxLength={512}
          register={register}
          required
        />
        {errors.Comments ? (
          <span className={formError}>
            Please enter a comment. Limit your text to 512 characters.
          </span>
        ) : null}
      </div>
      <div className={formButton}>
        <input type="submit" value="Submit your comment" />
        {serverState.message ? (
          <small className={serverState.ok ? '' : formError}>{serverState.message}</small>
        ) : null}
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  slug: PropTypes.string.isRequired,
};

export { CommentForm as default };
