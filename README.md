# React Scroll View

A more sane way to work with scrolling inside React. The basis idea is to wrap elements which should be able to scroll inside a `createScrollContainer` function and then wrap elements which should interact with the scroll container inside a `withScrollApi` function, which will then add the scroll API to it's props.

If for instance we have a `parent.js`

```javascript
import React from 'react';
import { createScrollContainer } from 'react-scroll-view';

export default createScrollContainer()(({ children }) => (
  <div>
    {children}
  </div>
));
```

it's children would then be able to interact with it using `this.props.scroll`

```javascript
import React, { Component } from 'react';
import { withScrollApi } from 'react-scroll-view';

export default withScrollApi(class Child extends Component {
  constructor() {
    this.state = {
      atEnd: false;
      items: new Array(500).fill(undefined);
    }
  }
  componentDidMount() {
    const { scroll } = this.props;
    scroll.addEventListener('onend', () => {
      this.setState({
        atEnd: true,
      })
    });
  }
  render() {
    return (
      <div>
        {this.state.items.map(() => <div>{this.state.etEnd ? 'true' : 'false' }</div>)}
      </div>
    )
  }
});
```
