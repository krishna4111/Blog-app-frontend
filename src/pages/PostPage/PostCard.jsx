import { Card } from "flowbite-react";

const PostCard = ({ post }) => {
  return (
    <div>
      <h1>Cards goes here</h1>
      <div>
        <Card
          className="max-w-sm"
          renderImage={() => (
            <Image
              width={500}
              height={500}
              src="/images/blog/image-1.jpg"
              alt="image 1"
            />
          )}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PostCard;
