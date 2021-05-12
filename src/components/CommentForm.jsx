import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import {
  container,
  formButton,
  formError,
  formInput,
  successText,
} from './CommentForm.module.scss';
import FormInput from './FormInput';
import FormInputArea from './FormInputArea';
import { ExternalLink } from './Link';

const CommentForm = ({ slug }) => {
  const [serverState, setServerState] = useState({ ok: true, message: '' });
  const [showForm, setShowForm] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
      setSubmitting(true);
      const { Email: email, Name: name, Comments: text } = data;
      const response = await axios({
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
      console.log('Response: ', response);
      handleServerResponse(true, 'Thanks for your comment it will be reviewed and posted shortly.');
      setSubmitting(false);
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
    return (
      <div className={successText}>
        <p>{serverState.message}</p>
      </div>
    );
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
          maxLength={64}
          register={register}
          required
        />
        {errors.Name ? (
          <span className={formError}>
            <small>
              Please let us know your name, it will appear along with your comment.
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
          maxLength={64}
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
            <small>Please enter a comment. Limit your text to 512 characters.</small>
          </span>
        ) : null}
      </div>
      <div className={formButton}>
        <small>
          This site uses Akismet to reduce spam.
          {' '}
          <ExternalLink
            aria-label="Lear how Akismet process comment data"
            href="https://akismet.com/privacy/"
          >
            Learn how your comment data is processed
          </ExternalLink>
          . We pass your comment, name, email, IP address and
          {' '}
          <ExternalLink
            aria-label="Learn more about browser user agent from M D N"
            href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent"
          >
            browser user agent
          </ExternalLink>
          {' '}
          to Akismet for spam detection. Neither your email address, IP address or user agent is
          stored in our database.
        </small>
        <input type="submit" aria-disabled={submitting} disabled={submitting} value="Submit your comment" />
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
