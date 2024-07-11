"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/contexts/auth.context";

const supabase = createClient();

const Section = ({ label, children }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
    <label className="block text-gray-700 mb-2">{label}</label>
    <hr className="border-gray-300 mb-2" />
    {children}
  </div>
);

const NewResumePage = () => {
  const { isLoggedIn, me } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    email: "",
    birth_date: "",
    name: "",
    gender: "",
    address: "",
    phone: "",
    personalInfo: "",
    career: [""],
    education: [""],
    skills: [""],
    awards: [""],
    introduction: "",
    links: [""],
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/log-in");
    } else if (id) {
      const fetchResume = async () => {
        const { data, error } = await supabase
          .from("resumes")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching resume:", error);
        } else {
          setFormData(data);
        }
      };
      fetchResume();
    }
  }, [id, isLoggedIn]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index?: number,
    field?: string
  ) => {
    if (field) {
      const newArray = [...formData[field]];
      newArray[index] = e.target.value;
      setFormData({ ...formData, [field]: newArray });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAddField = (field: string) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.email ||
      !formData.birth_date ||
      !formData.name ||
      !formData.gender ||
      !formData.address ||
      !formData.phone
    ) {
      alert("모든 필수 항목을 입력하세요.");
      return;
    }

    const resumeData = {
      ...formData,
      id: formData.id || uuidv4(), // 새로운 uuid 생성 또는 기존 id 사용
      email: me?.email, // 로그인한 사용자의 이메일 사용
    };

    try {
      if (id) {
        const { data, error } = await supabase
          .from("resumes")
          .update(resumeData)
          .eq("id", id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("resumes")
          .insert([resumeData]);

        if (error) throw error;
      }

      router.push("/resume");
    } catch (error) {
      console.error("Error submitting resume:", error);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4">
        기업에게 나에 대해 알려줍시다. 강점, 목표, 관심분야도 좋아요😊
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Section label="이력서 제목 (필수)">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded placeholder-gray-400"
            placeholder="이력서 제목(필수)"
            required
          />
        </Section>

        <Section label="인적사항 (필수)">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded mb-2"
                placeholder="이름"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">생년월일</label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded mb-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">성별</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded mb-2"
                required
              >
                <option value="" disabled>
                  성별
                </option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded mb-2"
                placeholder="이메일"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">전화번호</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded mb-2"
                placeholder="전화번호"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">주소</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded mb-2"
                placeholder="주소"
                required
              />
            </div>
          </div>
        </Section>

        <Section label="간단 소개글">
          <textarea
            name="personalInfo"
            value={formData.personalInfo}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히 작성해주세요. 3-5줄로 요약하여 작성하는 것을 추천합니다!"
          />
        </Section>

        <Section label="경력">
          {formData.career.map((career, index) => (
            <textarea
              key={index}
              value={career}
              onChange={(e) => handleChange(e, index, "career")}
              className="w-full border border-gray-300 p-2 rounded mb-2"
              placeholder="담당하신 업무 중 우선순위가 높은 업무를 선별하여 최신순으로 작성해주세요. 신입의 경우, 직무와 관련된 대외활동, 인턴, 계약직 경력 등이 있다면 작성해주세요. 업무 또는 활동 시 담당했던 역할과 과정, 성과에 대해 자세히 작성해주세요. 업무 성과는 되도록 구체적인 숫자 혹은 %로 표현해주세요! 커리어 조회 후 기업명이 실제와 다른 경우, 부서명/직책 란에 원하시는 기업명을 작성해주세요."
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField("career")}
            className="text-blue-500"
          >
            + 추가
          </button>
        </Section>

        <Section label="학력">
          {formData.education.map((edu, index) => (
            <textarea
              key={index}
              value={edu}
              onChange={(e) => handleChange(e, index, "education")}
              className="w-full border border-gray-300 p-2 rounded mb-2"
              placeholder="최신순으로 학력을 작성해주세요."
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField("education")}
            className="text-blue-500"
          >
            + 추가
          </button>
        </Section>

        <Section label="스킬">
          {formData.skills.map((skill, index) => (
            <textarea
              key={index}
              value={skill}
              onChange={(e) => handleChange(e, index, "skills")}
              className="w-full border border-gray-300 p-2 rounded mb-2"
              placeholder="개발 스택, 디자인 툴, 마케팅 툴 등 가지고 있는 직무와 관련된 스킬을 추가해보세요. 데이터 분석 툴이나 협업 툴 등의 사용해본 경험이 있으신 툴들도 추가해보세요."
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField("skills")}
            className="text-blue-500"
          >
            + 추가
          </button>
        </Section>

        <Section label="수상 및 기타">
          {formData.awards.map((award, index) => (
            <textarea
              key={index}
              value={award}
              onChange={(e) => handleChange(e, index, "awards")}
              className="w-full border border-gray-300 p-2 rounded mb-2"
              placeholder="수상 이력, 직무 관련 자격증, 수료한 교육이나 참석한 외부활동 등이 있다면 간략히 작성해주세요. 지원하는 회사에서 요구하는 경우가 아니라면 운전면허증과 같은 자격증은 생략하는 것이 좋습니다!"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField("awards")}
            className="text-blue-500"
          >
            + 추가
          </button>
        </Section>

        <Section label="링크">
          {formData.links.map((link, index) => (
            <input
              key={index}
              type="text"
              value={link}
              onChange={(e) => handleChange(e, index, "links")}
              className="w-full border border-gray-300 p-2 rounded mb-2"
              placeholder="깃헙, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 작성해주세요."
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField("links")}
            className="text-blue-500"
          >
            + 추가
          </button>
        </Section>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default NewResumePage;
