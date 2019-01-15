import React, { Fragment } from 'react';

export default class Main extends React.Component {
  render() {
    const {
      showList,
      chooseItem,
    } = this.props;
    return (
    <Fragment>
    {showList.length > 0 ? (
      <div ref="box" className="xl_city_search_list">
      <div className="list">
      {showList.map((item, index) => (
        <div
    key={index}
    className="item hover-bg"
    onClick={() => {
      chooseItem(item);
    }}>
    {item.name}
  </div>
  ))}
  </div>
    </div>
  ) : ''}
  </Fragment>
  );
  }
}
