'use strict';

import React from 'react';
import Actions from '../actions/Action';
import appStore from '../stores/AppStore';
import ReactTypeahead from 'react-typeahead';
import * as $ from 'jquery';

require('styles//Search.less');

class SearchComponent extends React.Component {

  componentWillMount() {
    this.appStoreId = appStore.registerView(() => { this.updateState(); });
    this.updateState();
  }

  componentWillUnmount() {
    appStore.deregisterView(this.appStoreId);
  }

  updateState() {
    this.setState({
      places: appStore.get('venues')
    });
  }

  render() {
    let onSearch = function() {
      //Actions.requestFlickrData(document.getElementById("search-text").value);
      //Actions.request4SquareData(document.getElementById("search-text").value);
      Actions.requestInstaTagData(document.getElementById("search-text").value);
    };
    let onRefresh = function() {
        appStore.set("isRefresh", true);
        Actions.requestInstaSearch({ latitude: appStore.get('lat'), longitude: appStore.get('lng') });
    };

    return (
      <div className="search-component">
        {/*<div>
          <input id="search-text" type="text" />
          <button onClick={onSearch}>Search</button>
        </div>*/}
          <ReactTypeahead.Typeahead
              name="myTypeahead"
              options={this.state.places}
              maxVisible={15}
              placeholder='Type and select location'
              onKeyUp={ e => { if (e.target.value.length > 3) Actions.request4SquareData(e.target.value); } }
              filterOption={ (input, option) => { /*console.log('filterOption:',input, option);*/ return true; } }
              displayOption={ (option, index) => { /*console.log('displayOption:', option, index);*/ return option.name + '(' + option.stats.checkinsCount + ')'; }}
              onOptionSelected={ o => { appStore.set("isRefresh", false); Actions.requestInstaSearch({ latitude: o.location.lat, longitude: o.location.lng }); appStore.set('lat', o.location.lat); appStore.set('lng', o.location.lng);  } }
              />
          <button onClick={onRefresh}>Refresh</button>
      </div>
    );
  }
}

SearchComponent.displayName = 'SearchComponent';

// Uncomment properties you need
// SearchComponent.propTypes = {};
// SearchComponent.defaultProps = {};

export default SearchComponent;
