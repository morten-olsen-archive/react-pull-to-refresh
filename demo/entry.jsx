import React from 'react';
import ReactDOM from 'react-dom';

import { createScrollContainer } from 'react-scroll-view';
import PullToRefresh from '../src/pull-to-refresh';

const items = new Array(50).fill(undefined);
const renderItem = (item, i) => (
  <div
    style={{
      height: 40,
    }}
  >
    item {i}
  </div>
);

const Wrapper = () => (
  <div>
    <PullToRefresh
      render={({ drag }) => <div>pull: {drag}</div>}
      onRefresh={() => { console.log('should refresh'); }}
    />
    {items.map(renderItem)}

  </div>
);

ReactDOM.render(
  <Wrapper />,
  global.document.getElementById('root'),
);
