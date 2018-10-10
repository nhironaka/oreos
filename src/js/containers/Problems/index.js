import React from 'react';
import T from 'prop-types';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import UnorderedList from 'Components/UnorderedList';
import Typography from 'Components/Typography';
import { fetchProblems } from '../../actions/problems';
import { selectFetchingProblems, selectProblems } from '../../selectors/problems';

class QuestionsList extends React.Component {
  componentDidMount() {
    this.props.fetchProblems();
  }

  render() {
    const { loading, problems } = this.props;

    return (
      <UnorderedList>
        {problems.map(problem => (
          <li key={problem.id}>
            <Typography>{problem.title}</Typography>
            <Typography>{problem.question}</Typography>
          </li>
        ))}
      </UnorderedList>
    );
  }
}

QuestionsList.propTypes = {
  loading: T.bool.isRequired,
  problems: T.array.isRequired,
  fetchProblems: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectFetchingProblems,
  problems: selectProblems,
});

const mapDispatchToProps = {
  fetchProblems,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
