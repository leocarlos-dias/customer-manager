export const Modal = ({
  children,
  handleCloseModal,
}: {
  children: React.ReactNode;
  handleCloseModal: () => void;
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-full  w-full items-center justify-center overflow-x-hidden p-4 backdrop-blur-sm md:inset-0 md:h-full">
      <div className="relative h-full w-full max-w-md md:h-auto">
        <div className="relative rounded-lg bg-gray-800 shadow">
          <button
            onClick={handleCloseModal}
            type="button"
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent text-sm text-gray-800 hover:bg-gray-200 hover:fill-gray-800 hover:text-gray-800 "
          >
            <svg
              className="h-10 w-10 fill-white p-1.5 hover:fill-gray-800"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};
