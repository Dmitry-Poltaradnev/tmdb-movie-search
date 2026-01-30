import s from './ActorCard.module.css'

export const ActorCard = (actor: any) => {
  const { character, name, profile_path } = actor.actor || {}
  return (
    <li className={s.actorCard}>
      <img
        className={s.actorPhoto}
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w500${profile_path}`
            : 'https://placehold.co/160x160'
        }
        alt="actorPhoto"
      />
      <p>Actor name: {name}</p>
      <p>Character name: {character}</p>
    </li>
  )
}
