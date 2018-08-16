export default {
  entities: {
    hunches: {},
    boxes: {}
  },

  hunches: {
    byId: {}, // associative array
    editing: {
      modalOpen: false,
      hunch: {
        id: '',
        slug: '',
        wisdom: '',
        attribute: '',
        boxes: [],
      }
    }
  },

  boxes: {
    visible: [],
    active: '',
    isFetching: false,
    pageNumber: 0,
    nextPageUrl: ""
  },
};
