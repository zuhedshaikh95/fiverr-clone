import { atom } from 'recoil';

const userAtom = atom({
    key: 'userState',
    default: null
});

export default userAtom;