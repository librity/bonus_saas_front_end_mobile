import React, { Component } from 'react';
import api from '~/services/api';

import { View, Text, TouchableOpacity, Switch } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MembersActions from '~/store/ducks/members';

import styles from './styles';
import Modal from '~/components/Modal';

class RoleUpdater extends Component {
  state = {
    roles: [],
  };

  async componentDidMount() {
    const response = await api.get('roles');

    this.setState({ roles: response.data });
  }

  handleRoleChange = (value, role) => {
    const { updateMemberRequest, onRequestClose, editMember } = this.props;

    const roles = value
      ? [...editMember.roles, role]
      : editMember.roles.filter(memberRole => memberRole.id !== role.id);

    updateMemberRequest(editMember.id, roles);
    onRequestClose();
  };

  render() {
    const { visible, onRequestClose, editMember } = this.props;
    const { roles } = this.state;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <View>
          {roles.map(role => (
            <View key={role.id} style={styles.roleContainer}>
              <Text style={styles.roleText}>{role.name}</Text>
              <Switch
                value={
                  !!editMember.roles.find(
                    memberRole => memberRole.id === role.id
                  )
                }
                onValueChange={value => this.handleRoleChange(value, role)}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={onRequestClose} style={styles.cancel}>
          <Text style={styles.cancelText}>VOLTAR</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(null, mapDispatchToProps)(RoleUpdater);
