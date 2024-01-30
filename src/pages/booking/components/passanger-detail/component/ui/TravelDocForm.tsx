import React from "react";

import { Text } from "@mantine/core";
import { Input } from "@/components/ui/input";

import { FormikValues } from "formik";
import ExpirationDateForm from "../containers/ExpDateForm";

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
  _age: string;
  formik: FormikValues;
}

interface PassengerData {
  nik: string;
  fullName: string;
  dateOfBirth: Date | null;
  courtesy_title: string;
  vaccinated: string;
}

interface FormValues {
  passengers: {
    adults: Record<string, PassengerData>;
    childs: Record<string, PassengerData>;
    infants: Record<string, PassengerData>;
  };
}

const TravelDocForm: React.FC<TravelDocFormProps> = ({
  _index,
  _nthPassenger,
  _age,
  formik,
}) => {
  //   const docTypeKey = `${_age}-doc-type-${
  //     _index + 1
  //   }` as keyof FormValues["passengers"]["adults"];
  const docNumberKey = `${_age}-doc-num-${
    _index + 1
  }` as keyof FormValues["passengers"]["adults"];
  //   const nationalityKey = `${_age}-nation-${
  //     _index + 1
  //   }` as keyof FormValues["passengers"]["adults"];
  const expDateKey = `${_age}-exp-date-${
    _index + 1
  }` as keyof FormValues["passengers"]["adults"];

  return (
    <div className="space-y-8">
      <Text className="text-md font-semibold text-black">{`Passenger ${
        _nthPassenger + 1
      } Travel Documents`}</Text>
      <Select>
        <SelectTrigger className="w-full rounded-none border-b p-0 text-gray-300">
          <SelectValue
            className="rounded-none px-0 py-2.5 text-base"
            placeholder="Document Type"
          />
        </SelectTrigger>
        <SelectContent onChange={formik.handleChange}>
          <SelectItem value="Passport">Passport</SelectItem>
          <SelectItem value="Visa">Visa</SelectItem>
          <SelectItem value="Residence Permit">Residence Permit</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full rounded-none border-b p-0 text-gray-300">
          <SelectValue
            className="rounded-none px-0 py-2.5 text-base"
            placeholder="Nationality"
          />
        </SelectTrigger>
        <SelectContent onChange={formik.handleChange}>
          <SelectItem value="Passport">Indonesia</SelectItem>
          <SelectItem value="Visa">US</SelectItem>
          <SelectItem value="Residence Permit">France</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="text"
        id={`${_age}-doc-num-${_index + 1}`}
        name={`${_age}-doc-num-${_index + 1}`}
        placeholder="Document Number"
        autoComplete="off"
        className="rounded-none border-b px-0 py-2.5 text-base placeholder:text-gray-300"
        onChange={formik.handleChange}
        value={formik.values[docNumberKey]?.toString()}
        required
      />
      <ExpirationDateForm
        formik={formik}
        _id={`${_age}-exp-date-${_index + 1}`}
        _expKey={expDateKey}
      />
      <label
        htmlFor="dropzone-file"
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
          id="dropzone-file"
          type="file"
          className="hidden h-full w-full border-4 border-dashed"
        />
      </label>
      <div className="flex flex-col items-start justify-center gap-3">
        <Button variant="primary" className="flex flex-row gap-2">
          Add Visa
          <Plus size={18} />
        </Button>
        <Button variant="primary" className="flex flex-row gap-2">
          Add Residence Permit
          <Plus size={18} />
        </Button>
        <Button variant="outline" className="flex flex-row gap-2">
          Add Other Travel Documents
          <Plus size={18} />
        </Button>
      </div>
    </div>
  );
};

export default TravelDocForm;
