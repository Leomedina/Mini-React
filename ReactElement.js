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

//Concurrent Mode: breaking the rendering into small units so the browser can interrupt between 
//              rendering units for anything else it needs to do


let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    );
    shouldYield = deadline.timeRemaining() < 1;
  };
  requestIdleCallback(workLoop);
}

/** 
 * We use requestIdleCallback to make a loop. 
 * You can think of requestIdleCallback as a setTimeout, but instead of us telling it when to run, 
 * the browser will run the callback when the main thread is idle.
 * */
requestIdleCallback(workLoop)

function performUnitOfWork(nextUnitOfWork) {
  // TODO
}

const MiniReact = {
  createElement,
  render
};

