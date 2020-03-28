import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, List, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class About extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container text>
          <Header as="h1" textAlign="left">What is stuff?</Header>
          <p>Here are some definitions of stuff:</p>
          <List bulleted>
            <List.Item>matter, material, articles, or activities of a specified or indeterminate kind that are being
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              referred to, indicated, or implied. "she's good at the technical stuff"</List.Item>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <List.Item>a person's belongings, equipment, or baggage. "he took his stuff and went"</List.Item>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <List.Item>worthless or foolish ideas, speech, or writing; rubbish. "stuff and nonsense!"</List.Item>
          </List>
        </Container>
    );
  }
}
/** Require an array of Stuff documents in the props. */
About.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(About);
