import EditBlogPageClient from "./edit-blog-client";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditBlogPageClient id={id} />;
}
