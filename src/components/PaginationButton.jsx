import { Button } from "flowbite-react";

const PaginationButton = ({ paginationData, onPageChange }) => {
  const { page, totalPages } = paginationData;

  if (totalPages === 0) {
    return <p>No Data Found</p>;
  }
  return (
    <div className="">
      <div className="flex flex-row-reverse  gap-2 items-center p-2 mb-4">
        <Button
          disabled={page === totalPages}
          className="hover:cursor-pointer"
          onClick={() => {
            onPageChange((prev) => {
              return prev + 1;
            });
          }}
        >
          Next
        </Button>
        <p>
          Page {page} of {totalPages}
        </p>
        <Button
          disabled={page === 1}
          className="hover:cursor-pointer"
          onClick={() => {
            onPageChange((prev) => {
              return prev - 1;
            });
          }}
        >
          Prev
        </Button>
      </div>
    </div>
  );
};

export default PaginationButton;
