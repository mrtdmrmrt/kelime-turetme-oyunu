import { typeOf, isNil } from '../utils/utils';

export let store = (function () {
  let instance;

  function init() {
    // Singleton

    // Private methods and variables
    let __selectedNames = [];
    let __lastName = '';
    let __pcLastName = '';
    let __pcName = '';
    let __transcript = '';

    function _getSelected() {
      return __selectedNames;
    }

    function _getLastName() {
      return __lastName;
    }

    return {
      // Public methods and variables
      // Getters
      getSelectedName: function () {
        return _getSelected();
      },

      getLastName: function () {
        return _getLastName();
      },

      getPCName: function () {
        return __pcName;
      },
      getPCLastName: function () {
        return __pcLastName;
      },
      getTranscript: function () {
        return __transcript;
      },

      // Setters
      setSelectedName: function (payload) {
        if (typeOf(payload) !== 'array')
          throw new Error('Error setting new names - Unexpected value type');
        __selectedNames = payload;
      },

      setLastName: function (payload) {
        if (isNil(payload) && typeOf(payload) === 'string')
          throw new Error('An error occurred while specifying the name');
        __lastName = payload;
      },

      setPcName: function (payload) {
        if (isNil(payload) && typeOf(payload) === 'string')
          throw new Error('An error occurred - pcName');
        __pcName = payload;
      },

      setPCLastName: function (payload) {
        if (isNil(payload) && typeOf(payload) === 'string')
          throw new Error('An error occurred - pcName');
        __pcLastName = payload;
      },

      setTranscript: function (payload) {
        __transcript = payload;
      },
    };
  }

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
      if (!instance) {
        instance = init();
      }

      return instance;
    },
  };
})();
