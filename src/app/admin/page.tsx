import AdminGallery from "@/components/Admin/AdminGallery";
import ImageUpload from "@/components/Admin/ImageUpload";

export default function Home() {
  return (
    <div className="flex flex-col gap-32">
      <ImageUpload />
      <AdminGallery />
    </div>
  );
}
