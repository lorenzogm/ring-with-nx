export type Category = {
  id: string
  slug: string
  name: string
  description: string
  tags: string[]
}

// getAllCategories
export type GetAllCategories = () => GetAllCategoriesReturn
export type GetAllCategoriesReturn = Promise<Category[]>

// getCategoryByUID
export type GetCategoryByUID = ({
  uid,
}: GetCategoryByUIDProps) => GetCategoryByUIDReturn
export type GetCategoryByUIDProps = { uid: string }
export type GetCategoryByUIDReturn = Promise<Category>
