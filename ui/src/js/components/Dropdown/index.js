import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import T from 'prop-types';

import _T from 'Services/custom-prop-types';

const styles = () => ({
  root: {},
});

class Dropdown extends React.Component {
  state = {
    selected: this.props.defaultSelected,
    showDropdown: false,
    loading: false,
    asyncOptions: [],
    search: '',
  };

  showItems = async () => {
    const { options } = this.props;
    const { asyncOptions } = this.state;

    if (options.length || asyncOptions.length) {
      this.setState(state => ({
        showDropdown: !state.showDropdown,
      }));
    } else { // No options -- fetch
      this.setState({
        loading: true,
      });
      try {
        const fetchedOptions = await this.props.fetchItems();
        this.setState({
          loading: false,
          asyncOptions: fetchedOptions,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: e,
        });
      }
    }
  }

  updateSearch = e => {
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    const { searchable, options, label, classes } = this.props;
    const { selected, search, loading, asyncOptions } = this.state;
    const dropdownOptions = options.length ? options : asyncOptions;
    console.log(asyncOptions, options);

    return (
      <div className={classes.root}>
        <button className={classes.button} onClick={this.showItems}>{label}</button>
        <div className={classes.optionsWrapper}>
          {loading ? <span className={classes.loading}>Loading</span> :
            <ol className={classes.options}>
              {searchable && (
                <li className={classes.search}>
                  <input type="text" placeholder="search" value={search} onChange={this.updateSearch} />
                </li>
              )}
              {
                dropdownOptions.length === 0 ? <span>No results</span> : (
                  dropdownOptions.map(option => {
                    return (
                      <li key={option.id} className={classes.option}>
                        <button className={classes.selectOption} onClick={this.selectItem}>
                          <label>{option.label}</label>
                          <input type="checkbox" value={selected[option.id]} onChange={this.selectItemCheckbox}></input>
                        </button>
                      </li>
                    )
                  })
                )
              }
            </ol>}
        </div>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  defaultSelected: {},
  options: [],
};

Dropdown.propTypes = {
  searchable: T.bool,
  options: T.arrayOf(T.shape({
    id: T.string,
    label: T.string,
  })),
  label: T.string,
  defaultSelected: T.object,
  fetchItems: T.func,
  onChange: T.func,
  classes: _T.classes.isRequired,
};

export default withStyles(styles)(Dropdown);
