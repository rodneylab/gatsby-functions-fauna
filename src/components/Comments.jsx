import React from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import PropTypes from 'prop-types';

import relativeTime from 'dayjs/plugin/relativeTime';

import { container } from './Comments.module.scss';
import Card from './Card';
import { dayjsLocale } from '../../config/dateTime';

import 'dayjs/locale/en-gb';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale(dayjsLocale);

const Comments = ({ comments }) => (
  <div className={container}>
    <h2>Comments</h2>
    <ul>
      {comments.map((element) => {
        const {
          commentId, date, name, text,
        } = element.node;
        const dayjsDate = dayjs(date);
        const dateString = dayjsDate.fromNow();
        return (
          <li key={commentId}>
            <Card>
              <h3>{name}</h3>
              <div>
                <small>{dateString}</small>
              </div>
              <p>{text}</p>
            </Card>
          </li>
        );
      })}
    </ul>
  </div>
);

Comments.propTypes = PropTypes.arrayOf(
  PropTypes.shape({
    node: PropTypes.shape({
      commentId: PropTypes.string,
      date: PropTypes.string,
      name: PropTypes.string,
      text: PropTypes.text,
    }),
  }),
).isRequired;

export { Comments as default };
