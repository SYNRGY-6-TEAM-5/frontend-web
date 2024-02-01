import React from "react";

import { Text } from "@mantine/core";
import { Input } from "@/components/ui/input";

import { FieldArray, FormikValues } from "formik";
import ExpirationDateForm from "./ExpDateForm";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react";

interface TravelDocFormProps {
  _index: number;
  _nthPassenger: number;
  formik: FormikValues;
}

const TravelDocForm: React.FC<TravelDocFormProps> = ({
  _index,
  _nthPassenger,
  formik,
}) => {
  const { values, handleChange, handleBlur } = formik;

  return (
    <div className="space-y-8">
      <FieldArray name={`travel_docs`}>
        {({ push, remove }) => (
          <div>
            {values.travel_docs.map((travel_doc: any, index: number) => {
              const docTypeKey = `travel_docs.${index}.doc_type`;
              const nationalityKey = `travel_docs.${index}.nationality`;
              const docNumberKey = `travel_docs.${index}.document_number`;
              const expireDateKey = `travel_docs.${index}.expire_date`;

              return (
                <div key={index} className="space-y-8">
                  <div className="flex items-center justify-between">
                    <Text className="text-md font-semibold text-black">
                      {`Passenger ${_nthPassenger + 1} Travel Documents - ${
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
                        placeholder="Select Document Types"
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
                    id={`${nationalityKey}-${_index + 1}`}
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
                    id={`${docNumberKey}-${_index + 1}`}
                    name={docNumberKey}
                    placeholder="Document Number"
                    autoComplete="off"
                    className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                    value={travel_doc.document_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <ExpirationDateForm
                    formik={formik}
                    fieldName={expireDateKey}
                    index={index}
                  />
                  <label
                    htmlFor="image"
                    className="dark:hover:bg-bray-800 flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>Upload your scanned document</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Accepted file types: PDF, PNG, or JPEG
                      </p>
                    </div>
                    <Input
                      id="image"
                      type="file"
                      className="hidden h-full w-full border-4 border-dashed"
                    />
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex flex-row gap-2"
                    onClick={() =>
                      push({
                        doc_type: "",
                        nationality: "",
                        document_number: "",
                        expire_date: new Date(),
                        image_url: "",
                      })
                    }
                  >
                    Add Other Travel Documents
                    <Plus size={18} />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default TravelDocForm;
