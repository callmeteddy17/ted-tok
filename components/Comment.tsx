import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '@/store/authStore';
import NoResult from './NoResult';
import { IUser } from '@/types';

interface IProps {
  isPostingComment: boolean;
  comment: string;
  addComment: (e: React.FormEvent) => void;
  setComment: Dispatch<SetStateAction<string>>;
  comments: IComment[];
}
interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comment = ({
  isPostingComment,
  addComment,
  comment,
  comments,
  setComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 border-b-2 px-10 bg=[#f8f8f8] lg:pb-0 pb=[100px]">
      <div className=" overflow-scroll h-[475px] ">
        {comments?.length ? (
          comments?.map((comment, i) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  user._id ===
                    (comment.postedBy._id || comment.postedBy._ref) && (
                    <div
                      className="p-2 items-center bg-gray-100 py-4 px-3 my-2 rounded-3xl"
                      key={i}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8">
                            <Image
                              alt="profile image"
                              src={user.image}
                              width={34}
                              height={34}
                              className="rounded-full"
                            />
                          </div>
                          <div className="flex font-semibold gap-2">
                            <p>{user.userName}</p>
                            <span className="text-blue-400">
                              <GoVerified />
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="ml-10">
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResult text="No comments yet" />
        )}
      </div>
      {userProfile && (
        <div className="absolute lg:bottom-0 bottom-[-110px] left-4 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              placeholder="Comment here..."
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[600px] lg:w-[300px] border-gray-100 focus:outline-none forcus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComment ? 'Commenting.....' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comment;
