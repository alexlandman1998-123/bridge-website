function normalizeReleaseValue(value, fallback) {
  const normalized = String(value || '').trim().toLowerCase()
  return normalized || fallback
}

export const HOME_VARIANT = normalizeReleaseValue(
  import.meta.env.VITE_ARCH9_HOME_VARIANT,
  import.meta.env.DEV ? 'role-gateway' : 'legacy',
)

export const ROLE_LINKS_VISIBLE = normalizeReleaseValue(
  import.meta.env.VITE_ARCH9_ROLE_LINKS,
  import.meta.env.DEV ? 'true' : 'false',
) === 'true'

export const isRoleGatewayHome = HOME_VARIANT === 'role-gateway'
