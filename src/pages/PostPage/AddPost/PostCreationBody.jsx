import { FileInput, HelperText, Label, TextInput } from "flowbite-react";

const PostCreationBody = () => {
  return (
    <div className=" m-4  p-4 bg-gray-800 ">
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title">Title</Label>
          </div>
          <TextInput id="title" type="text" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description">Description</Label>
          </div>
          <TextInput id="description" type="text" />
        </div>
        <div id="fileUpload" className="max-w-md">
          <Label className="mb-2 block" htmlFor="cover_image">
            Cover Image
          </Label>

          <FileInput id="cover_image" />
          <HelperText className="mt-1">
            A cover Image is useful to make your post looks good
          </HelperText>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="content">Content</Label>
          </div>
          <TextInput id="large" type="text" sizing="lg" />
        </div>
      </div>
    </div>
  );
};

export default PostCreationBody;
