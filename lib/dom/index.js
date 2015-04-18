export default {
  /**
   * Create an element appender function
   *
   * @param {HTMLElement} parent
   * @param {HTMLElement} child
   * @return {Function}
   */
  appender(parent, child) {
    return function() {
      parent.appendChild(child);
    }
  },

  /**
   * Create an html element
   *
   * @param {String} tag
   * @param {Object} attrs
   * @param {String} text
   * @return {HTMLElement}
   */
  createElement(tag, attrs, text) {
    let element = document.createElement(tag);
    for (let k of Object.keys(attrs)) {
      element[k] = attrs[k];
    }
    element.appendChild(document.createTextNode(text));
    return element;
  }
}
