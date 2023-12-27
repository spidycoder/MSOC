"use client";
import React, { useEffect, useState } from "react";
import { like, profileIcon, heart } from "@/public/images";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
  userId: string;
  postId: string;
  likeCnt1: number;
  heartCnt1: number;
}
const LikeFeature = ({ userId, postId, likeCnt1, heartCnt1 }: Props) => {
  const { data: session, status: sessionStatus } = useSession();
  //checking if localstorage is available or not
  const localStorageAvailable = typeof localStorage !== "undefined";
  //if user logout then delete it's info from localstorage
  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      localStorage.clear();
    }
  }, [sessionStatus]);

  const [likeCnt, setLikeCnt] = useState(likeCnt1);
  const [heartCnt, setHeartCnt] = useState(heartCnt1);
  //getting likedInfo from localstorage,i.e user has liked which posts
  const [likeClicked, setLikeClicked] = useState(
    localStorageAvailable &&
      localStorage.getItem(`like_${postId}_${userId}`) === "true"
  );
  const [heartClicked, setHeartClicked] = useState(
    localStorageAvailable &&
      localStorage.getItem(`heart_${postId}_${userId}`) === "true"
  );

  useEffect(() => {
    //updating the localstorage if likeCount is clicked
    if (localStorageAvailable) {
      if (likeClicked) {
        localStorage.setItem(`like_${postId}_${userId}`, "true");
      } else {
        localStorage.removeItem(`like_${postId}_${userId}`);
      }
    }
  }, [likeClicked, postId, userId, localStorageAvailable]);

  useEffect(() => {
    // updating the localstorage when heartcount is clicked
    if (localStorageAvailable) {
      if (heartClicked) {
        localStorage.setItem(`heart_${postId}_${userId}`, "true");
      } else {
        localStorage.removeItem(`heart_${postId}_${userId}`);
      }
    }
  }, [heartClicked, postId, userId, localStorageAvailable]);

  const handleClick1 = async (e: any) => {
    e.preventDefault();
    if (!likeClicked && sessionStatus === "authenticated") {
      setLikeCnt(likeCnt + 1);
      setLikeClicked(true);
      try {
        const res = await fetch("/api/likepost", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            postId: postId,
            likeCnt: likeCnt,
          }),
        });
        if (res.status === 400) {
          console.error("Error while Liking the post");
        } else if (res.status === 200) {
        }
      } catch (error: any) {
        console.error(error);
      }
    }
  };
  const handleClick2 = async (e: any) => {
    e.preventDefault();
    if (!heartClicked && sessionStatus === "authenticated") {
      setHeartCnt(heartCnt + 1);
      setHeartClicked(true);
      try {
        const res = await fetch("/api/heartpost", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            postId: postId,
            heartCnt: heartCnt,
          }),
        });
        if (res.status === 400) {
          console.error("Error while Liking the post");
        } else if (res.status === 200) {
        }
      } catch (error: any) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-evenly mt-8 pb-7">
        <button onClick={handleClick1} className="flex flex-row gap-1">
          <div
            className={` ${
              likeClicked ? "bg-blue-500 rounded-md" : "bg-transparent"
            }`}
          >
            <Image src={like} alt="like" height={24} width={24} />
          </div>
          <div>{likeCnt}</div>
        </button>
        <button onClick={handleClick2} className="flex flex-row gap-1">
          <div
            className={` ${
              heartClicked ? "bg-pink-500 rounded-md" : "bg-transparent"
            }`}
          >
            <Image src={heart} alt="heart" height={24} width={24} />
          </div>
          <div>{heartCnt}</div>
        </button>
        <Link href={`/profile/${userId}`}>
          <Image src={profileIcon} alt="like" height={24} width={24} />
        </Link>
      </div>
    </div>
  );
};

export default LikeFeature;
