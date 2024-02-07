import { Card, CardHeader } from "@/components/ui/card";

import { BaggageInsurance, FlightDelay, FullProtect } from "@/assets/svg";
import React from "react";
import { TripInsurance, useAddOnsStore } from "@/store/useAddOnsStore";

const ExtraProtect: React.FC = () => {
  const tripInsurance: TripInsurance = useAddOnsStore((state) => state.tripInsurance);
  const updateTripInsurance = useAddOnsStore((state) => state.updateTripInsurance);

  const handleInsuranceChange = (insuranceType: keyof TripInsurance, checked: boolean) => {
    updateTripInsurance(insuranceType, checked);
  };

  return (
    <>
      <h1 className="mb-3 text-base font-medium">Extra Protection</h1>
      <Card className="mb-4">
        <CardHeader>
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium">Full Protection</h2>
              <FullProtect />
            </div>
            <div>
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="mb-3 flex items-center justify-start gap-1">
                  <svg
                    className="pb-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M10.8538 6.14625C10.9002 6.19269 10.9371 6.24783 10.9623 6.30853C10.9874 6.36923 11.0004 6.43429 11.0004 6.5C11.0004 6.56571 10.9874 6.63077 10.9623 6.69147C10.9371 6.75217 10.9002 6.80731 10.8538 6.85375L7.35375 10.3537C7.30732 10.4002 7.25217 10.4371 7.19147 10.4623C7.13077 10.4874 7.06571 10.5004 7 10.5004C6.93429 10.5004 6.86923 10.4874 6.80853 10.4623C6.74783 10.4371 6.69269 10.4002 6.64625 10.3537L5.14625 8.85375C5.05243 8.75993 4.99972 8.63268 4.99972 8.5C4.99972 8.36732 5.05243 8.24007 5.14625 8.14625C5.24007 8.05243 5.36732 7.99972 5.5 7.99972C5.63268 7.99972 5.75993 8.05243 5.85375 8.14625L7 9.29312L10.1463 6.14625C10.1927 6.09976 10.2478 6.06288 10.3085 6.03772C10.3692 6.01256 10.4343 5.99961 10.5 5.99961C10.5657 5.99961 10.6308 6.01256 10.6915 6.03772C10.7522 6.06288 10.8073 6.09976 10.8538 6.14625ZM14.5 8C14.5 9.28558 14.1188 10.5423 13.4046 11.6112C12.6903 12.6801 11.6752 13.5132 10.4874 14.0052C9.29972 14.4972 7.99279 14.6259 6.73192 14.3751C5.47104 14.1243 4.31285 13.5052 3.40381 12.5962C2.49477 11.6872 1.8757 10.529 1.6249 9.26809C1.37409 8.00721 1.50282 6.70028 1.99479 5.51256C2.48676 4.32484 3.31988 3.30968 4.3888 2.59545C5.45772 1.88122 6.71442 1.5 8 1.5C9.72335 1.50182 11.3756 2.18722 12.5942 3.40582C13.8128 4.62441 14.4982 6.27665 14.5 8ZM13.5 8C13.5 6.9122 13.1774 5.84883 12.5731 4.94436C11.9687 4.03989 11.1098 3.33494 10.1048 2.91866C9.09977 2.50238 7.9939 2.39346 6.92701 2.60568C5.86011 2.8179 4.8801 3.34172 4.11092 4.11091C3.34173 4.8801 2.8179 5.86011 2.60568 6.927C2.39347 7.9939 2.50238 9.09977 2.91867 10.1048C3.33495 11.1098 4.0399 11.9687 4.94437 12.5731C5.84884 13.1774 6.91221 13.5 8 13.5C9.45819 13.4983 10.8562 12.9184 11.8873 11.8873C12.9184 10.8562 13.4983 9.45818 13.5 8Z"
                      fill="#F74E28"
                    />
                  </svg>
                  <p className="text-xs text-gray-500">
                    Compensation up to IDR 500,000,000 for various accidental
                    risk
                  </p>
                </div>
                <p className="text-xs font-medium text-primary-500">
                  More Info
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">{`IDR ${95000}/pax`}</p>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="full-protection-checkbox"
                  className={
                    tripInsurance.full_insurance.type === "Full Protection"
                      ? "text-sm font-medium text-black"
                      : "text-sm font-medium text-gray-300"
                  }
                >
                  Cover your trip
                </label>
                <input
                  type="checkbox"
                  id="full-protection-checkbox"
                  checked={tripInsurance.full_insurance.type === "Full Protection"}
                  onChange={(e) => handleInsuranceChange('full_insurance', e.target.checked)}
                  className="h-4 w-4 accent-primary-500"
                />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="mb-4">
        <CardHeader>
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium">Baggage Insurance</h2>
              <BaggageInsurance />
            </div>
            <div>
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="mb-3 flex items-center justify-start gap-1">
                  <svg
                    className="pb-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M10.8538 6.14625C10.9002 6.19269 10.9371 6.24783 10.9623 6.30853C10.9874 6.36923 11.0004 6.43429 11.0004 6.5C11.0004 6.56571 10.9874 6.63077 10.9623 6.69147C10.9371 6.75217 10.9002 6.80731 10.8538 6.85375L7.35375 10.3537C7.30732 10.4002 7.25217 10.4371 7.19147 10.4623C7.13077 10.4874 7.06571 10.5004 7 10.5004C6.93429 10.5004 6.86923 10.4874 6.80853 10.4623C6.74783 10.4371 6.69269 10.4002 6.64625 10.3537L5.14625 8.85375C5.05243 8.75993 4.99972 8.63268 4.99972 8.5C4.99972 8.36732 5.05243 8.24007 5.14625 8.14625C5.24007 8.05243 5.36732 7.99972 5.5 7.99972C5.63268 7.99972 5.75993 8.05243 5.85375 8.14625L7 9.29312L10.1463 6.14625C10.1927 6.09976 10.2478 6.06288 10.3085 6.03772C10.3692 6.01256 10.4343 5.99961 10.5 5.99961C10.5657 5.99961 10.6308 6.01256 10.6915 6.03772C10.7522 6.06288 10.8073 6.09976 10.8538 6.14625ZM14.5 8C14.5 9.28558 14.1188 10.5423 13.4046 11.6112C12.6903 12.6801 11.6752 13.5132 10.4874 14.0052C9.29972 14.4972 7.99279 14.6259 6.73192 14.3751C5.47104 14.1243 4.31285 13.5052 3.40381 12.5962C2.49477 11.6872 1.8757 10.529 1.6249 9.26809C1.37409 8.00721 1.50282 6.70028 1.99479 5.51256C2.48676 4.32484 3.31988 3.30968 4.3888 2.59545C5.45772 1.88122 6.71442 1.5 8 1.5C9.72335 1.50182 11.3756 2.18722 12.5942 3.40582C13.8128 4.62441 14.4982 6.27665 14.5 8ZM13.5 8C13.5 6.9122 13.1774 5.84883 12.5731 4.94436C11.9687 4.03989 11.1098 3.33494 10.1048 2.91866C9.09977 2.50238 7.9939 2.39346 6.92701 2.60568C5.86011 2.8179 4.8801 3.34172 4.11092 4.11091C3.34173 4.8801 2.8179 5.86011 2.60568 6.927C2.39347 7.9939 2.50238 9.09977 2.91867 10.1048C3.33495 11.1098 4.0399 11.9687 4.94437 12.5731C5.84884 13.1774 6.91221 13.5 8 13.5C9.45819 13.4983 10.8562 12.9184 11.8873 11.8873C12.9184 10.8562 13.4983 9.45818 13.5 8Z"
                      fill="#F74E28"
                    />
                  </svg>
                  <p className="text-xs text-gray-500">
                    Protect baggage from damage or loss up to IDR 25.000.000
                  </p>
                </div>
                <p className="text-xs font-medium text-primary-500">
                  More Info
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">{`IDR ${95000}/pax`}</p>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="full-protection-checkbox"
                  className={
                    tripInsurance.baggage_insurance.type === "Baggage Insurance"
                      ? "text-sm font-medium text-black"
                      : "text-sm font-medium text-gray-300"
                  }
                >
                  Cover your trip
                </label>
                <input
                  type="checkbox"
                  id="full-protection-checkbox"
                  checked={tripInsurance.baggage_insurance.type === "Baggage Insurance"}
                  onChange={(e) => handleInsuranceChange('baggage_insurance', e.target.checked)}
                  className="h-4 w-4 accent-primary-500"
                />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="mb-4">
        <CardHeader>
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium">Flight Delay</h2>
              <FlightDelay />
            </div>
            <div>
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="mb-3 flex items-center justify-start gap-1">
                  <svg
                    className="pb-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M10.8538 6.14625C10.9002 6.19269 10.9371 6.24783 10.9623 6.30853C10.9874 6.36923 11.0004 6.43429 11.0004 6.5C11.0004 6.56571 10.9874 6.63077 10.9623 6.69147C10.9371 6.75217 10.9002 6.80731 10.8538 6.85375L7.35375 10.3537C7.30732 10.4002 7.25217 10.4371 7.19147 10.4623C7.13077 10.4874 7.06571 10.5004 7 10.5004C6.93429 10.5004 6.86923 10.4874 6.80853 10.4623C6.74783 10.4371 6.69269 10.4002 6.64625 10.3537L5.14625 8.85375C5.05243 8.75993 4.99972 8.63268 4.99972 8.5C4.99972 8.36732 5.05243 8.24007 5.14625 8.14625C5.24007 8.05243 5.36732 7.99972 5.5 7.99972C5.63268 7.99972 5.75993 8.05243 5.85375 8.14625L7 9.29312L10.1463 6.14625C10.1927 6.09976 10.2478 6.06288 10.3085 6.03772C10.3692 6.01256 10.4343 5.99961 10.5 5.99961C10.5657 5.99961 10.6308 6.01256 10.6915 6.03772C10.7522 6.06288 10.8073 6.09976 10.8538 6.14625ZM14.5 8C14.5 9.28558 14.1188 10.5423 13.4046 11.6112C12.6903 12.6801 11.6752 13.5132 10.4874 14.0052C9.29972 14.4972 7.99279 14.6259 6.73192 14.3751C5.47104 14.1243 4.31285 13.5052 3.40381 12.5962C2.49477 11.6872 1.8757 10.529 1.6249 9.26809C1.37409 8.00721 1.50282 6.70028 1.99479 5.51256C2.48676 4.32484 3.31988 3.30968 4.3888 2.59545C5.45772 1.88122 6.71442 1.5 8 1.5C9.72335 1.50182 11.3756 2.18722 12.5942 3.40582C13.8128 4.62441 14.4982 6.27665 14.5 8ZM13.5 8C13.5 6.9122 13.1774 5.84883 12.5731 4.94436C11.9687 4.03989 11.1098 3.33494 10.1048 2.91866C9.09977 2.50238 7.9939 2.39346 6.92701 2.60568C5.86011 2.8179 4.8801 3.34172 4.11092 4.11091C3.34173 4.8801 2.8179 5.86011 2.60568 6.927C2.39347 7.9939 2.50238 9.09977 2.91867 10.1048C3.33495 11.1098 4.0399 11.9687 4.94437 12.5731C5.84884 13.1774 6.91221 13.5 8 13.5C9.45819 13.4983 10.8562 12.9184 11.8873 11.8873C12.9184 10.8562 13.4983 9.45818 13.5 8Z"
                      fill="#F74E28"
                    />
                  </svg>
                  <p className="text-xs text-gray-500">
                    Compensation IDR 200,000 per 2 hour for any delay risk
                  </p>
                </div>
                <p className="text-xs font-medium text-primary-500">
                  More Info
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">{`IDR ${95000}/pax`}</p>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="full-protection-checkbox"
                  className={
                    tripInsurance.baggage_insurance.type === "Flight Delay"
                      ? "text-sm font-medium text-black"
                      : "text-sm font-medium text-gray-300"
                  }
                >
                  Cover your trip
                </label>
                <input
                  type="checkbox"
                  id="full-protection-checkbox"
                  checked={tripInsurance.flight_delay_insurance.type === "Flight Delay"}
                  onChange={(e) => handleInsuranceChange('flight_delay_insurance', e.target.checked)}
                  className="h-4 w-4 accent-primary-500"
                />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default ExtraProtect;
