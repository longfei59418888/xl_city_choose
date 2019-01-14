import React, { Fragment } from 'react';
import './index.scss';
import { getVendorPrefix } from 'xl_extend';


class Main extends React.Component {
  state = {
    showPlaceholder: false,
  }
  componentDidMount() {
    const { placeholder } = this.refs;
    this.placeholderWidth = placeholder.offsetWidth;
    placeholder.style.marginLeft = `-${this.placeholderWidth / 2}px`;
  }
  searchBlur = (type) => {
    const { placeholder, searchBox } = this.refs;
    const {
      onChange,
    } = this.props;
    if (type === 1) searchBox.querySelector('input').value = '';
    const val = searchBox.querySelector('input').value;
    if (val.length > 0) return;
    onChange('');
    this.setState({
      showPlaceholder: false,
    });
    searchBox.style.width = 'calc(100% - 50Px)';
    placeholder.style.left = '50%';
    placeholder.style.marginLeft = `-${this.placeholderWidth / 2}px`;
  }
  searchFours = () => {
    const { placeholder, searchBox } = this.refs;
    const { onChange } = this.props;
    const prefix = getVendorPrefix();
    placeholder.style[`${prefix}Transition`] = 'all .2s linear';
    searchBox.style[`${prefix}Transition`] = 'all .2s linear';
    searchBox.style.width = 'calc(90% - 50Px)';
    placeholder.style.left = 0;
    placeholder.style.marginLeft = 0;
    if (onChange) onChange(searchBox.querySelector('input').value);
    setTimeout(() => {
      this.setState({
        showPlaceholder: true,
      });
    }, 250);
  }
  render() {
    const {
      placeholder,
      onChange,
    } = this.props;
    const {
      showPlaceholder,
    } = this.state;
    return (
      <Fragment>
        <div className="xl_city_search">
          <div>
            <div ref="searchBox" className="search-box">
              {showPlaceholder ? (
                <img
                  onClick={() => {
                    this.refs.searchBox.querySelector('input').value = '';
                    onChange('');
                  }}
                  src={require('./cha.png')}
                  alt="" />
              ) : ''}
              <input
                type="text"
                onFocus={this.searchFours}
                onBlur={this.searchBlur}
                onChange={(e) => {
                  if (onChange) onChange(e.target.value);
                }}
                placeholder={showPlaceholder ? placeholder : ''} />
              <div className="placeholder">
                <p
                  ref="placeholder">
                  <img src={require('./search.png')} alt="" />
                  <span>{showPlaceholder ? '' : placeholder}</span>
                </p>
              </div>
            </div>
          </div>
          <span onClick={() => {
            this.searchBlur(1);
          }}>
            取消
          </span>
        </div>
      </Fragment>

    );
  }
}

export default Main;
