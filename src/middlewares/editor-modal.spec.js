/**
 * Created on 11-Sep-18.
 */
import * as editorModalMiddleware from './editor-modal';

const {OPEN_EDITOR_MODAL, default: middleware} = editorModalMiddleware;

describe('editorModalMiddleware', () => {
  const store = {getState: jest.fn()};
  const next = jest.fn();
  const boostEditorType = 'BOOST_EDITOR';
  const resumeEditorType = 'RESUME_EDITOR';
  let action;

  beforeEach(() => {
    // clear the result of the previous calls
    next.mockClear();
    action = {
      [OPEN_EDITOR_MODAL]: {
        boostEditorType,
        resumeEditorType,
        editorSelector: jest.fn(),
        data: undefined,
      }
    };
  });

  it(`ignores the action that does not have property '${OPEN_EDITOR_MODAL}'`, () => {
    const action = {type: 'NO OPEN_EDITOR_MODAL PROPERTY'};
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
  });

  it('throws an error when `boostEditorType` is not a string', () => {
    action[OPEN_EDITOR_MODAL].boostEditorType = undefined;
    expect(() => middleware(store)(next)(action)).toThrowError('Specify a string boostEditorType.');
  });

  it('throws an error when `resumeEditorType` is not a string', () => {
    action[OPEN_EDITOR_MODAL].resumeEditorType = undefined;
    expect(() => middleware(store)(next)(action)).toThrowError('Specify a string resumeEditorType.');
  });

  it('throws an error when `editorSelector` is not a function', () => {
    action[OPEN_EDITOR_MODAL].editorSelector = undefined;
    expect(() => middleware(store)(next)(action)).toThrowError('editorSelector must be a function.');
  });

  describe('when there is `retainedData` in `editor` state', () => {
    it('dispatches `resumeEditorType` action', () => {
      action[OPEN_EDITOR_MODAL].editorSelector.mockReturnValue({props: {foo: 'bar'}});
      middleware(store)(next)(action);
      expect(next).toBeCalledWith({type: resumeEditorType});
    });
  });

  describe('when there is no `retainedData` in `editor` state', () => {
    it('dispatches `boostEditorType` action with `action.data` and `withModal = true`', () => {
      action[OPEN_EDITOR_MODAL].editorSelector.mockReturnValue({props: null});
      action[OPEN_EDITOR_MODAL].data = {};
      middleware(store)(next)(action);
      expect(next).toBeCalledWith({
        type: boostEditorType,
        withModal: true,
        data: action[OPEN_EDITOR_MODAL].data,
      });
    });
  });

});
