import type { Category } from 'types/category'

// getAllCategories
export type GetAllCategories = () => Promise<Category[]>

// getCategoryByUID
export type GetCategoryByUID = ({ uid }: { uid: string }) => Promise<Category>
