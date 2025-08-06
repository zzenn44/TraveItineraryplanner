import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold text-[#4c6444]">
        Showing category: {category}
      </h1>
      {/* you can load specific content here based on `category` */}
    </div>
  );
}
