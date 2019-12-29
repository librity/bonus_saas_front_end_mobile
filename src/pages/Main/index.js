import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

function Main({ activeTeam }) {
  return (
    <View style={styles.backgroundWrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}
            onPress={() => {}}
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
    </View>
  );
}

Main.propTypes = {
  activeTeam: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Main.defaultProps = {
  activeTeam: null,
};

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
});

export default connect()(Main);
