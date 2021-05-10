import type { Category } from 'types/category'

// getAllCategories
export type GetAllCategories = ({
  ref,
}: {
  ref?: string
}) => Promise<Category[]>

// getCategoryByUID
export type GetCategoryByUID = ({
  uid,
  ref,
}: {
  uid: string
  ref?: string
}) => Promise<Category>
