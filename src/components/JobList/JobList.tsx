"use client";

import { useGetJobs } from "@/hooks/query/useGetJobs";
import useSearchStore from "@/store/search.store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import dropdown from "../../../public/assets/images/dropdown.png";
import dropdown2 from "../../../public/assets/images/dropdown2.png";
import loading from "../../../public/assets/images/loading_spinner.png";
import EduDropDown from "../EduDropDown/EduDropDown";
import JobDropDown from "../JobDropDown/JobDropDown";
import LocationDropDown from "../LocationDropDown/LocationDropDown";

const JobList = () => {
  const { job, edu, location, setLocation, setEdu } = useSearchStore(
    (state) => state
  );
  const { jobsData, fetchNextPage, error } = useGetJobs({ job, edu, location });
  const { ref, inView } = useInView();
  const [locationView, setLocationView] = useState(false);
  const [jobView, setJobView] = useState(false);
  const [educationView, setEducationView] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("근무지");
  const [selectedJob, setSelectedJob] = useState("직군");
  const [selectedEducation, setSelectedEducation] = useState("학력조건");

  const locationRef = useRef<HTMLButtonElement>(null);
  const jobRef = useRef<HTMLButtonElement>(null);
  const eduRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handleButtonClick = (
    buttonName: string,
    existingHandler: () => void
  ) => {
    existingHandler();
  };

  const handleLocationClick = () => {
    setLocationView(!locationView);
    setJobView(false);
    setEducationView(false);
  };

  const handleJobClick = () => {
    setJobView(!jobView);
    setLocationView(false);
    setEducationView(false);
  };

  const handleEducationClick = () => {
    setEducationView(!educationView);
    setLocationView(false);
    setJobView(false);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setLocationView(false);
  };

  const handleJobSelect = (job: string) => {
    setSelectedJob(job);
    setJobView(false);
  };

  const handleEducationSelect = (education: string) => {
    setSelectedEducation(education);
    setEducationView(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node) &&
        jobRef.current &&
        !jobRef.current.contains(event.target as Node) &&
        eduRef.current &&
        !eduRef.current.contains(event.target as Node)
      ) {
        setLocationView(false);
        setJobView(false);
        setEducationView(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col container mx-auto max-w-[1400px] px-5 h-16">
      <h1 className="flex flex-row text-start text-2xl font-bold my-5 gap-4">
        채용공고
        <div className="relative flex flex-row ml-auto text-base text-gray-500 font-light gap-3">
          <button
            ref={locationRef}
            onClick={() => handleButtonClick("location", handleLocationClick)}
            className={`border border-gray-300 rounded-md px-4 py-2 gap-1 hover:bg-gray-100`}
          >
            <div className="flex flex-row items-center gap-1">
              {selectedLocation}
              {locationView ? (
                <Image
                  src={dropdown2}
                  alt="dropdown"
                  width={15}
                  height={15}
                  priority={true}
                />
              ) : (
                <Image
                  src={dropdown}
                  alt="dropdown"
                  width={15}
                  height={15}
                  priority={true}
                />
              )}
            </div>
            {locationView && (
              <LocationDropDown onSelect={handleLocationSelect} />
            )}
          </button>
          <button
            ref={jobRef}
            onClick={() => handleButtonClick("job", handleJobClick)}
            className={`border border-gray-300 rounded-md px-4 py-2 gap-1 hover:bg-gray-100`}
          >
            <div className="flex flex-row items-center gap-1">
              {selectedJob}
              {jobView ? (
                <Image
                  src={dropdown2}
                  alt="dropdown"
                  width={15}
                  height={15}
                  priority={true}
                />
              ) : (
                <Image
                  src={dropdown}
                  alt="dropdown"
                  width={15}
                  height={15}
                  priority={true}
                />
              )}
            </div>
            {jobView && <JobDropDown onSelect={handleJobSelect} />}
          </button>
          <button
            ref={eduRef}
            onClick={() => handleButtonClick("edu", handleEducationClick)}
            className={`border border-gray-300 rounded-md px-4 py-2 gap-1 hover:bg-gray-100`}
          >
            <div className="flex flex-row items-center gap-1">
              {selectedEducation}
              {educationView ? (
                <Image
                  src={dropdown2}
                  alt="dropdown"
                  width={15}
                  height={15}
                  priority={true}
                />
              ) : (
                <Image
                  src={dropdown}
                  alt="dropdown"
                  width={15}
                  height={15}
                  priority={true}
                />
              )}
            </div>
            {educationView && <EduDropDown onSelect={handleEducationSelect} />}
          </button>
        </div>
      </h1>
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {jobsData.map((job, index) => (
          <li
            key={index}
            className="flex flex-col border border-gray-300 rounded-md p-3 gap-y-4 cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-transform transform hover:-translate-y-2 duration-300"
          >
            <Link
              href={`/detail-page/${job.recrutPblntSn}`}
              className="flex flex-col h-full"
            >
              <h2>{job.recrutPbancTtl}</h2>
              <div className="mt-auto text-sm text-gray-400">
                <p>위치: {job.workRgnNmLst}</p>
                <p>신입/경력: {job.recrutSeNm}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={ref} className="flex justify-center pt-4">
        {inView && (
          <Image
            className="spin"
            src={loading}
            alt="loading"
            width={40}
            height={40}
            priority={true}
          />
        )}
      </div>
    </div>
  );
};

export default JobList;
