import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersActions from '~/store/ducks/members';

import styles from './styles';

import InviteMember from '~/components/InviteMember';
import RoleUpdater from '~/components/RoleUpdater';
import Can from '~/components/Can';

class Members extends Component {
  static propTypes = {
    getMembersRequest: PropTypes.func.isRequired,
  };

  state = {
    isInviteModalOpen: false,
    isRoleModalOpen: false,
    editMember: null,
  };

  componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();
  }

  toggleInviteModalOpen = () => {
    this.setState({ isInviteModalOpen: true });
  };

  toggleInviteModalClose = () => {
    this.setState({ isInviteModalOpen: false });
  };

  toggleRoleModalOpen = editMember => {
    this.setState({ isRoleModalOpen: true, editMember });
  };

  toggleRoleModalClose = () => {
    this.setState({ isRoleModalOpen: false, editMember: null });
  };

  render() {
    const { members } = this.props;
    const { isInviteModalOpen, isRoleModalOpen, editMember } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>MEMBROS</Text>

        <FlatList
          style={styles.memberList}
          data={members.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.memberContainer}>
              <Text style={styles.memberName}>{item.user.name}</Text>

              <Can checkRole="administrator">
                <TouchableOpacity
                  hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                  onPress={() => this.toggleRoleModalOpen(item)}
                >
                  <Icon name="settings" size={20} color="#b0b0b0" />
                </TouchableOpacity>
              </Can>
            </View>
          )}
          ListFooterComponent={() => (
            <Can checkPermission="invites_create">
              <TouchableOpacity
                style={styles.button}
                onPress={this.toggleInviteModalOpen}
              >
                <Text style={styles.buttonText}>Convidar</Text>
              </TouchableOpacity>
            </Can>
          )}
        />

        <Can checkPermission="invites_create">
          <InviteMember
            visible={isInviteModalOpen}
            onRequestClose={this.toggleInviteModalClose}
          />
        </Can>

        {editMember && (
          <RoleUpdater
            visible={isRoleModalOpen}
            onRequestClose={this.toggleRoleModalClose}
            editMember={editMember}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
