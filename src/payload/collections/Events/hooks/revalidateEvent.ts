import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateEvent: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate) {
    payload.logger.info(`Revalidating event paths: /events and /`)
    try {
      revalidatePath('/events')
      revalidatePath('/')
    } catch (err) {
      payload.logger.error(`Error revalidating event path: ${err}`)
    }
  }
  return doc
}

export const revalidateEventDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate) {
    payload.logger.info(`Revalidating event paths on delete: /events and /`)
    try {
      revalidatePath('/events')
      revalidatePath('/')
    } catch (err) {
      payload.logger.error(`Error revalidating event path: ${err}`)
    }
  }
  return doc
}
