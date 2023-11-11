import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto py-20 border text-center">
      <h1 className="text-xl font-bold">404 Not Found</h1>
      <button className="p-3 rounded border" onClick={() => navigate("/")}>
        🎄 LinkNamu 홈으로 이동
      </button>
    </div>
  );
};

export default NotFoundPage;
