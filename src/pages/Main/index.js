import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SideMenu from 'react-native-side-menu';

import styles from './styles';

import TeamSwitcher from '~/components/TeamSwitcher';

class Main extends Component {
  static propTypes = {
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }),
  };

  static defaultProps = {
    activeTeam: null,
  };

  state = {
    leftOpen: false,
    rightOpen: false,
  };

  toggleMenu = (positon, isOpen) => {
    this.setState({ [`${positon}Open`]: isOpen });
  };

  render() {
    const { activeTeam } = this.props;
    const { leftOpen } = this.state;

    return (
      <View style={styles.backgroundWrapper}>
        <SideMenu
          isOpen={leftOpen}
          disableGestures
          onChange={isOpen => this.toggleMenu('left', isOpen)}
          openMenuOffset={70}
          menu={<TeamSwitcher />}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}
                onPress={() => this.toggleMenu('left', true)}
              >
                <Icon name="menu" size={24} color="#fff" />
              </TouchableOpacity>

              <Text style={styles.teamTitle}>
                {activeTeam ? activeTeam.name : 'Selecione um time'}
              </Text>

              <TouchableOpacity
                hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}
                onPress={() => {}}
              >
                <Icon name="group" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </SideMenu>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
});

export default connect()(Main);
