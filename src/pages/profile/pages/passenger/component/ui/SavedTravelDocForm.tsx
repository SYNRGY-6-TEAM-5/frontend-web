import React from "react";

import { Box, Group, LoadingOverlay, Text, rem } from "@mantine/core";
import { Input } from "@/components/ui/input";
import { Image } from "@/components/ui/Image";
import { FieldArray, FormikValues } from "formik";
import SavedExpirationDateForm from "./SavedExpDateForm";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Cross, ImageSquare, Plus, Upload } from "@phosphor-icons/react";
import { usePassengerTravel } from "@/lib/hooks/usePassengerTravel";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { ISavedPassengerData } from "@/types/Booking";

interface SavedTravelDocFormProps {
  data: ISavedPassengerData;
  formik: FormikValues;
}

const SavedTravelDocForm: React.FC<SavedTravelDocFormProps & Partial<DropzoneProps>> = ({
  data,
  formik,
  ...dropzoneProps
}) => {
  const { values, handleChange, handleBlur } = formik;
  const { loadingCovers, fileItems, handleUploadTravelDoc } = usePassengerTravel();

  return (
    <div className="space-y-8">
      <FieldArray name={`travel_docs`}>
        {({ push, remove }) => (
          <div>
            {data.travel_docs.map((travel_doc: any, index: number) => {
              const isLastIndex = index === values.travel_docs.length - 1;

              const docTypeKey = `travel_docs.${index}.doc_type`;
              const nationalityKey = `travel_docs.${index}.nationality`;
              const docNumberKey = `travel_docs.${index}.doc_number`;
              const expireDateKey = `travel_docs.${index}.expired_date`;

              return (
                <div key={index} className="space-y-8">
                  <div className="flex items-center justify-between">
                    <Text className="text-md font-semibold text-black">
                      {`${data.name} Travel Documents - ${
                        travel_doc.doc_type.charAt(0).toUpperCase() +
                        travel_doc.doc_type.slice(1)
                      }`}
                    </Text>
                    {values.travel_docs.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-md text-red-500"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <Select
                    name={docTypeKey}
                    defaultValue={travel_doc.doc_type}
                    onValueChange={(value) => {
                      formik.setFieldValue(docTypeKey, value);
                    }}
                  >
                    <SelectTrigger className="w-full rounded-none border-b p-0">
                      <SelectValue
                        className="rounded-none px-0 py-2.5 text-base font-normal placeholder:text-gray-500"
                        placeholder={`Change Document Type - ${travel_doc.doc_type}`}
                        defaultValue={travel_doc.doc_type}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="residence-permit">
                        Residence Permit
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    id={`${nationalityKey}-${data.id}`}
                    name={nationalityKey}
                    placeholder="Nationality"
                    autoComplete="off"
                    className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                    value={travel_doc.nationality}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <Input
                    type="text"
                    id={`${docNumberKey}-${data.id}`}
                    name={docNumberKey}
                    placeholder="Document Number"
                    autoComplete="off"
                    className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                    value={travel_doc.doc_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <SavedExpirationDateForm
                    formik={formik}
                    fieldName={expireDateKey}
                    index={index}
                  />
                  <Box pos="relative" className="pb-8">
                    <LoadingOverlay
                      visible={loadingCovers[index]}
                      zIndex={1000}
                      overlayProps={{ radius: "sm", blur: 2 }}
                    />
                    <Dropzone
                      id={`travel_docs-${index}-image`}
                      onDrop={(files) => handleUploadTravelDoc(files, index, formik)}
                      onReject={(files) => console.log("rejected files", files)}
                      maxSize={5 * 1024 ** 2}
                      accept={IMAGE_MIME_TYPE}
                      {...dropzoneProps}
                    >
                      <Group
                        justify="center"
                        gap="xl"
                        mih={220}
                        className="cursor-pointer rounded-lg border-4 border-dashed bg-slate-200 hover:bg-slate-100"
                      >
                        <Dropzone.Accept>
                          <Upload
                            style={{
                              width: rem(52),
                              height: rem(52),
                              color: "var(--mantine-color-blue-6)",
                            }}
                          />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                          <Cross
                            style={{
                              width: rem(52),
                              height: rem(52),
                              color: "var(--mantine-color-red-6)",
                            }}
                          />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                          {fileItems[index]?.secure_url ? (
                            <Image
                              className="w-full"
                              image={fileItems[index].secure_url}
                              objectCover="cover"
                              alt="Hero Background Vector"
                            />
                          ) : (
                            <ImageSquare
                              style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-dimmed)",
                              }}
                            />
                          )}
                        </Dropzone.Idle>
                        {fileItems[index]?.secure_url ? (
                          ""
                        ) : (
                          <div>
                            <Text size="xl" inline>
                              Drag or Select Your Travel Docs here
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                              Attach as many files as you like, each file should
                              not exceed 5mb
                            </Text>
                          </div>
                        )}
                      </Group>
                    </Dropzone>
                  </Box>
                  {isLastIndex && (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex flex-row gap-2"
                      onClick={() =>
                        push({
                          doc_type: "",
                          nationality: "",
                          document_number: "",
                          expired_date: new Date(),
                          image_url: "",
                        })
                      }
                    >
                      Add Other Travel Documents
                      <Plus size={18} />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default SavedTravelDocForm;
