import { atom } from 'recoil'
import { MatchStatus } from '../../models'

export const matchFilterAtom = atom({
  key: 'matchFilter',
  default: {
    status: MatchStatus.UNREVIEWED,
    advertisementId: null,
    theftId: null
  }
})
