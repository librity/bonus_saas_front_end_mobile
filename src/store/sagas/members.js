import { call, put } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import api from '~/services/api';

import MembersTypes from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, 'members');

  yield put(MembersTypes.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, {
      roles: roles.map(role => role.id),
    });

    yield put(ToastActionsCreators.displayInfo('Membro atualizado!'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Erro ao atualizar o membro!'));
  }
}

export function* inviteMember({ email }) {
  try {
    yield call(api.post, 'invites', {
      invites: [email],
    });

    yield put(ToastActionsCreators.displayInfo('Convite realizado!'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Erro ao realizar convite!'));
  }
}
