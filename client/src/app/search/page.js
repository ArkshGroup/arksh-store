import SearchAreaMain from "@components/search-area";

export const metadata = {
    title: "Search Product - Arksh Store",
};

export default function SearchPage({searchParams:{query}}) {
  return (
    <SearchAreaMain searchText={query} />
  );
}
