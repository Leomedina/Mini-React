/** 
 * 
 * 
 * 
 * 
*/

class MiniReact {

  static createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child =>
          typeof child === "object"
            ? child
            : this.createTextElement(child))
      }
    };
  };

  static createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: []
      }
    };
  };

};


module.exports = MiniReact;