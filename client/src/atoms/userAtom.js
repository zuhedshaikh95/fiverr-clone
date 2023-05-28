import { atom } from 'recoil';

const userAtom = atom({
    key: 'user',
    default: null
});

export default userAtom;