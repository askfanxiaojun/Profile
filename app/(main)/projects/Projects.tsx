import { projects } from '~/content/site-config'

import { ProjectCard } from './ProjectCard'

export function Projects() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </ul>
  )
}
