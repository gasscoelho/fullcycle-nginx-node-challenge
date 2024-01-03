import { createAvatar } from '@dicebear/core'
import * as adventurer from '@dicebear/adventurer'
import defaultConfig from '#config/avatars'

export function generateAvatar(seed) {
  const avatar = createAvatar(adventurer, {
    ...defaultConfig,
    seed,
  })
  return avatar.toString()
}
