
import React from 'react'
import { findUserWithEmail } from "@/lib/action";
import PostTemplate from './PostTemplate';


const UserProfileTemplate = async ({email}:{email:string}) => {
    const user = await findUserWithEmail(email);
  return (
    <div>
      <h1>{email}</h1>
      {user.posts.map((post: any) => (
        <PostTemplate heading={post.heading} description={post.description} id={user._id.toString()}/>
      ))}
    </div>
  )
}

export default UserProfileTemplate
