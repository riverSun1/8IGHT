const DetailPageModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg mb-4"></h2>
        <div className="flex justify-end">
          <button>취소</button>
          <button>확인</button>
        </div>
      </div>
    </div>
  );
};

export default DetailPageModal;
