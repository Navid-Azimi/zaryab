'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useState, useEffect, useRef } from 'react';
import axios from '@/utils/api';
import Heading1 from '@/components/Heading1/Heading1';
import ArrowLink from '@/components/ArrowLink/ArrowLink';
import OurAuthorCard from '@/components/OurAuthorCard/OurAuthorCard';
import FullAd from '@/components/FullAd/FullAd';
import SmallAd from '@/components/SmallAd/SmallAd';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MyAuthorPage({ data, similarData }) {
  // animation

  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    if (data) {
      gsap.to(imageRef.current, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 90%',
          end: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to(nameRef.current, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        delay: 0.5,
        scrollTrigger: {
          trigger: nameRef.current,
          start: 'top 90%',
          end: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to(textRef.current, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 90%',
          end: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, [data]);

  // similar section animation

  const titleRef = useRef(null);

  useGSAP(() => {
    if (similarData) {
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%',
          end: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, [similarData]);
  return (
    // the main container of the page
    <div className="w-full min-h-100vh">
      <div className="flex flex-col items-center mt-130px xl:mt-50px mb-50px">
        {/* the author section */}
        <div className="main-container mt-7 rtl">
          {/*  it has 7 rows  */}
          <div
            className="col-span-6 md:col-span-3 border-2 border-black p-7 translate-y-200px opacity-0"
            ref={imageRef}
          >
            <div className="w-full h-290px md:h-300px xl:h-220px 2xl:h-300px relative">
              {data?.featured_image ? (
                <Image
                  src={data?.featured_image}
                  alt={data?.name ? data?.name : 'not found'}
                  layout="fill"
                  objectFit="cover"
                  className="absolute"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center"></div>
              )}
            </div>
          </div>
          <div
            className="col-span-6 md:col-span-3 xl:col-span-9 flex flex-col justify-end mr-7 translate-y-200px opacity-0"
            ref={nameRef}
          >
            {data?.name && (
              <div className="font-pashto text-50px md:text-60px rtl text-black">
                {data?.name}
              </div>
            )}
            <div className="flex rtl mt-7 text-black">
              <div className="font-common-heavy text-20px ml-1">موقعیت:</div>
              {data?.location && (
                <div className="font-pashto text-20px">{data?.location}</div>
              )}
            </div>
            <div className="flex rtl mt-3 text-black">
              <div className="font-common-heavy text-20px ml-1">وظیفه:</div>
              {data?.job && (
                <div className="font-pashto text-20px">{data?.job}</div>
              )}
            </div>
            <div className="flex rtl mt-3 text-black">
              <div className="font-common-heavy text-20px ml-1">
                {' '}
                تعداد آثار:
              </div>
              {data?.total_letters && (
                <div className="font-common-regular text-20px">
                  {data?.total_letters}
                </div>
              )}
            </div>
            <div className="flex rtl mt-3 text-black">
              <div className="font-common-heavy text-20px ml-1">سن:</div>
              {data?.age && (
                <div className="font-common-regular text-20px">{data?.age}</div>
              )}
            </div>
            <div className="flex mt-3 justify-start">
              {data?.facebook && (
                <Link href={data?.facebook || '#'}>
                  <Image
                    src="/assets/svg/facebook.svg"
                    alt="facebook logo"
                    width={20}
                    height={20}
                  />
                </Link>
              )}
              {data?.instagram && (
                <Link href={data?.instagram || '#'}>
                  <Image
                    src="/assets/svg/instagram.svg"
                    alt="instagram logo"
                    width={20}
                    height={20}
                  />
                </Link>
              )}
              {data?.telegram && (
                <Link href={data?.telegram || '#'}>
                  <Image
                    src="/assets/svg/telegram.svg"
                    alt="telegram logo"
                    width={20}
                    height={20}
                  />
                </Link>
              )}
              {data?.youtube && (
                <Link href={data?.youtube || '#'}>
                  <Image
                    src="/assets/svg/youtube.svg"
                    alt="youtube logo"
                    width={20}
                    height={20}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
        {/*  introduction section  */}
        <div
          className="main-container mt-14 rtl translate-y-200px opacity-0"
          ref={textRef}
        >
          {/*  title  */}
          <div className="col-span-6 xl:col-span-12">
            <Heading1 title="معرفی نامه" />
          </div>
          {/*  the text  */}
          {data?.content && (
            <div
              dangerouslySetInnerHTML={{
                __html: data?.content,
              }}
              className="font-pashto col-span-6 xl:col-span-12  text-justify md:text-right text-20px lg:text-25px xl:text-30px rtl mt-7"
            ></div>
          )}
        </div>
        {/* full ad */}
        {/* <FullAd /> */}
        {/* authors section */}
        <div className="mt-7">
          <div className="flex flex-col">
            {/* it have two rows */}
            <div
              className="flex flex-col-reverse items-end w-full md:flex-row-reverse md:justify-between md:items-center translate-y-200px opacity-0"
              ref={titleRef}
            >
              <Heading1 title="نویسنده ها و شاعران آوای زریاب" />
              <ArrowLink
                title="همه نویسنده و شاعران"
                path="/authors"
              />
            </div>
            <div className="main-container mt-7">
              {Array.isArray(similarData) &&
                similarData?.map((data, index) => (
                  <OurAuthorCard
                    key={index}
                    data={data}
                  />
                ))}
            </div>
          </div>
        </div>
        {/* small ad */}
        {/* <SmallAd /> */}
      </div>
    </div>
  );
}
