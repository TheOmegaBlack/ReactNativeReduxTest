import React, { Component } from 'React';
import { Text, TouchableWithoutFeedback, View, NativeModules, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common'
import * as actions from '../actions'

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental(true);

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }
  render () {
    const { titleStyle } = styles;
    const { item, expanded } = this.props;
    const { title, id } = item;
    
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
          {
            expanded &&
            <Text style={{ flex: 1 }}>
              {item.description}
            </Text>
          }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.item.id;
  return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);