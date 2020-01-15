import React, { useState } from 'react';
import T from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';

import _T from 'Services/custom-prop-types';
import Button from '../../components/Button';
import UnorderedList from '../../components/UnorderedList';

const styles = () => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
});

function ProblemsFilterItem({ filter, selected, filterChangeCallback, classes }) {
    const [filterOpen, setFilterOpen] = useState(false);
    return selected ? (
        <div className={classes.root}>
            <Button variant="text" size="small" onClick={setFilterOpen(!filterOpen)}>
                {filter.label}: {selected}
            </Button>
            <Collapse in={filterOpen}>
                <UnorderedList>
                    {filter.options.map(option => (
                        <li>
                            <Button variant="text" size="small" onClick={e => filterChangeCallback(e, option)}>
                                {option.label}
                            </Button>
                        </li>
                    ))
                    }
                </UnorderedList>
            </Collapse>
        </div>
    ) : null;
}
ProblemsFilterItem.defaultProps = {
    selected: '',
};

ProblemsFilterItem.propTypes = {
    filter: T.object.isRequired,
    selected: T.any,
    filterChangeCallback: T.func.isRequired,
    classes: _T.classes.isRequired,
};


export default withStyles(styles)(ProblemsFilterItem);
