import React from 'react';
import './index.scss';
import SearchBox from './searchBox';
import SearchList from './searchList';

class Main extends React.Component {
  constructor(props) {
    super(props);
    const {
      cityList,
      hotCity,
      currentCity,
    } = this.props;
    let CHAR = [];
    this.city = [];
    if (cityList) {
      this.city = Object.values(cityList).reduce((a, b) => a.concat(b), []);
      CHAR = Object.keys(cityList);
    }

    this.state = {
      searchList: [],
      hotCity: hotCity || [],
      currentCity: currentCity || null,
      CITY: cityList || null,
      CHAR,
    };
  }
  async componentWillMount() {
    const city = await import('./cityList.js');
    const CITY = city.default;
    const CHAR = Object.keys(CITY);
    this.setState({
      CITY,
      CHAR,
    });
    this.city = Object.values(CITY).reduce((a, b) => a.concat(b), []);
  }
  componentDidMount() {}
  search = (val) => {
    clearTimeout(this.loop);
    this.loop = setTimeout(() => {
      if (val.length < 1) {
        this.setState({
          searchList: [],
        });
        return;
      }
      const reg = new RegExp(`^${val}`);
      const searchList = this.city.filter((item) => {
        if (
          item.e_cname.match(reg) !== null
          || item.e_name.match(reg) !== null
          || item.name.match(reg) !== null
        ) return true;
        return false;
      });
      this.setState({
        searchList,
      });
    }, 300);
  };
  chooseItem = (item) => {
    const { chooseItem } = this.props;
    chooseItem(item);
    let latelyCity = localStorage.getItem('xl_city_choose_box_lately');
    latelyCity = latelyCity ? JSON.parse(latelyCity) : [];
    let hasItem = false;
    latelyCity.forEach((value) => {
      if (value.name === item.name) hasItem = true;
    });
    if (hasItem) return;
    latelyCity = [item].concat(latelyCity.slice(0, 1));
    localStorage.setItem('xl_city_choose_box_lately', JSON.stringify(latelyCity));
  }
  render() {
    const {
      placeholder,
    } = this.props;
    const {
      CITY, CHAR, searchList, currentCity, hotCity,
    } = this.state;
    let latelyCity = localStorage.getItem('xl_city_choose_box_lately');
    latelyCity = latelyCity ? JSON.parse(latelyCity) : [];
    const List = [];
    CHAR.forEach((item) => {
      if (CITY[item] && CITY[item].length > 0) {
        const childList = CITY[item].map(item => (
          <p key={item.c_name} onClick={() => this.chooseItem(item)}>
            {item.name}
          </p>
        ));
        List.push(
          <div key={item} id={item} className={`${item} item-box`}>
            <h5>{item}</h5>
            <div>{childList}</div>
          </div>,
        );
      }
    });
    return (
      <div className="xl_city_choose_box">
        <div className="over-div">
          <SearchBox
            ref="serachBox"
            placeholder={placeholder}
            onChange={this.search} />
        </div>
        <div className="xl_city_choose_content-box">
          <SearchList
            chooseItem={(item) => {
              this.refs.serachBox.searchBlur(true);
              this.setState({
                searchList: [],
              });
              this.chooseItem(item);
            }}
            showList={searchList} />
          <CharList
            goPage={(char) => {
              if (!CITY[char] || CITY[char].length < 1) return;
              const box = document.querySelector('.xl_city_choose_box');
              const y = document.querySelector(`.xl_city_choose_box #${char}`).getBoundingClientRect().y;
              box.scrollTop += (y - 50);
            }}
            list={CHAR} />
          <div>
            <div className="xl_city_choose_list">
              <div className="lately-city-box">
                <h5>定位/最近访问</h5>
                <div>
                  {currentCity ? (
                    <p
                      onClick={() => {
                        this.chooseItem(currentCity);
                      }}
                      className="lately-city-item">
                      <img src={require('./dingwei.png')} alt="" />
                      {currentCity.name}
                    </p>
                  ) : ''}

                  {latelyCity.map(item => (
                    <p onClick={(item) => {
                      this.chooseItem(item);
                    }}>
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="hot-city-box">
                <h5>热门城市</h5>
                <div>
                  {hotCity.map(item => (
                    <p onClick={(item) => {
                      this.chooseItem(item);
                    }}>
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="list-item">{List}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function CharList(props) {
  const { list, goPage } = props;

  return (
    <div className="xl_city_choose_char-list">
      {list.map(item => (
        <p className="hover-bg" onClick={() => goPage(item)}>
          {item}
        </p>
      ))}
    </div>
  );
}

export default Main;
