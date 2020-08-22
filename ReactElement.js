/** 
 * 
 * 
 * 
 * 
*/


//Create react element and if the children is not an object it will make a default text element
function createElement(type, props, ...children) {
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

//basic text element
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
};

function render(element, container) {
  const domElement =
    element.type = "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = key => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => { domElement[name] = element.props[name] })

  element.props.children.forEach(child => render(child, domElement))

  container.appendChild(domElement);
};


const MiniReact = {
  createElement,
  render
};

