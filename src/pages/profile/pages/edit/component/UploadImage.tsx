import { ImageProfileEdit } from "@/assets/svg";
import { Image } from "@/components/ui/Image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@mantine/core";
import { FormikValues } from "formik";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface props {
  formik: FormikValues;
}

const UploadImage = ({ formik }: props) => {
  return (
    <>
      <Label htmlFor="imageUpload" className="m-auto w-fit">
        {formik.values.image !== null ? (
          <>
            <Image
              className="m-auto mb-4 h-32 w-32 cursor-pointer"
              image={URL.createObjectURL(formik.values.image)}
              objectCover="object-cover rounded-full"
              alt="Upload Image"
            />
            {formik.values.image && (
              <Text className="mb-6 cursor-pointer text-center text-sm text-gray-500">
                {formik.values.image.name}
              </Text>
            )}
          </>
        ) : (
          <>
            {formik.values.imageUrl !== "" ? (
              <Avatar
                className="h-[120px] w-[120px]"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <AvatarImage src={formik.values.imageUrl} />
                <AvatarFallback>{"NA"}</AvatarFallback>
              </Avatar>
            ) : (
              <ImageProfileEdit className="mb-6 h-32 w-full cursor-pointer text-center" />
            )}

            <Text className="mb-6 cursor-pointer text-center font-medium text-primary-500">
              Change
            </Text>
          </>
        )}
        <Input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={(event) => {
            formik.setFieldValue(
              "image",
              event.currentTarget.files?.[0] || null,
            );
          }}
          style={{ display: "none" }}
        />
      </Label>
    </>
  );
};

export default UploadImage;
