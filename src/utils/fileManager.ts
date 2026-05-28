import { supabase } from "../lib/supabase";

const bucketName = process.env.BUCKET_NAME || "ticketlemon-storage";

export async function uploadFile(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, buffer, {
      contentType: file.type,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  return data.publicUrl;
};

export async function deleteFile(publicUrl: string) {
  const url = new URL(publicUrl);
  const pathParts = url.pathname.split(`/object/public/${bucketName}/`);
  if (pathParts.length < 2) return;
  const fileName = pathParts[1];

  const { error } = await supabase.storage
    .from(bucketName)
    .remove([fileName]);

  if (error) {
    throw new Error(error.message);
  }
};
