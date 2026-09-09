import canUseDOM from './canUseDOM'


export const getServerSideURL = (): string => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.URL) {
    return process.env.URL
  }

  if (!url) {
    url = process.env.NODE_ENV === 'production' ? 'https://codingclubcuh.online' : 'http://localhost:3000'
  }

  return url
}

export const getServerSideURL2 = getServerSideURL

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return getServerSideURL()
}

export const getClientSideURL2 = getClientSideURL
