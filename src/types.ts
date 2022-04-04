export type Ingredient = {
  ingredient: string
  unit: string | null
  quantity: string
}

export type Recipe = {
  title: string
  external_author: string
  description: string
  prep_time_minutes: number
  cook_time_minutes: number
  total_time_minutes: number
  ingredients: Ingredient[]
  instructions: string[]
  footnotes: string[]
  original_url: string
  photo_url: string
  rating_stars: number
  review_count: number
}