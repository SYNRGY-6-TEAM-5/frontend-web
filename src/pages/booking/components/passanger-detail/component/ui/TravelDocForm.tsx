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
        <SelectTrigger className="border-b rounded-none w-full p-0 text-gray-300">
          <SelectValue className="rounded-none px-0 py-2.5 text-base" placeholder="Document Type" />
        </SelectTrigger>
        <SelectContent onChange={formik.handleChange}>
          <SelectItem value="Passport">Passport</SelectItem>
          <SelectItem value="Visa">Visa</SelectItem>
          <SelectItem value="Residence Permit">Residence Permit</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="border-b rounded-none w-full p-0 text-gray-300">
          <SelectValue className="rounded-none px-0 py-2.5 text-base" placeholder="Nationality" />
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
        className="border-b px-0 rounded-none py-2.5 text-base placeholder:text-gray-300"
        onChange={formik.handleChange}
        value={formik.values[docNumberKey]?.toString()}
        required
      />
      <ExpirationDateForm
        formik={formik}
        _id={`${_age}-exp-date-${_index + 1}`}
        _expKey={expDateKey}
      />
    </div>
  );
};

export default TravelDocForm;
