import { z } from 'zod'

const client = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().min(1).default('http://localhost:3000'),
})

const processEnv = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
}

const merged = client

let env = /** @type {z.infer<typeof merged>} */ (process.env)

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const parsed = merged.safeParse(processEnv)

  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors
    )
    throw new Error('Invalid environment variables')
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined
      return target[/** @type {keyof typeof target} */ (prop)]
    },
  })
}

export { env }
