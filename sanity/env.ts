export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-17'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
"skthGFU60Hd9bMIqevNyMj0B2poxSTz2QzPSh9GWK1JVi6IreY8OiexNbTNuz0fFNga6yM18dg9b9zPtRwWFqv8CKM5yrmc0y3kI6kT17hLcqt2CSQQhihep7bBvk3YMwIOYG0uuQHQMXh2HSCWRWbDz8wvVchKLaRjuHAPAlkxZAYTPvKDz",
  'Missing environment variable: NEXT_PUBLIC_SANITY_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
