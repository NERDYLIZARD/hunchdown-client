/**
 * Created on 08-Oct-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { BoxPreviewContextConsumer } from './BoxPreview';

export const BoxPreviewBody = ({onClick}) => {
  return (
    <BoxPreviewContextConsumer>
      {({box}) =>
        <div className="box-preview__body card-body" onClick={() => onClick(box)}>
          <p className="box-preview__body__title card-title">{box.title}</p>
          {box.description &&
          <p className="box-preview__body__description card-description">{box.description}</p>}
        </div>
      }
    </BoxPreviewContextConsumer>

    // <BoxPreviewContextConsumer>
    // {context => <BoxPreviewBodyPure ...context ...props/>}
    // </BoxPreviewContextConsumer>

  );
};

BoxPreviewBody.propTypes = {
  onClick: PropTypes.func.isRequired,
};
