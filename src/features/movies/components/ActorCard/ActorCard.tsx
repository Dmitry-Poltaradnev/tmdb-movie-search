import s from './ActorCard.module.css'
import type { ActorType } from '../../../../api/schema/actor.schema.ts'

type ActorCardProps = {
  actor: ActorType
}

export type MovieCastType = {
  id: number
  cast: ActorType[]
}

export const ActorCard = (actor: ActorCardProps) => {
  const { character, name, profile_path } = actor.actor || {}
  return (
    <li className={s.actorCard}>
      <img
        className={s.actorPhoto}
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w500${profile_path}`
            : 'https://placehold.co/140x140?text=No+Photo'
        }
        alt="actorPhoto"
      />
      <p className={s.actorName}>{name}</p>
      <p>{character}</p>
    </li>
  )
}
