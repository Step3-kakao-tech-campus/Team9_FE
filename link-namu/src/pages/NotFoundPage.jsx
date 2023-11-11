import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const logo = `${process.env.PUBLIC_URL}/logo192.png`;

  return (
    <div className="h-screen flex items-center bg-[#496f54]">
      <div className="w-[600px] h-[500px] mx-auto py-20 flex flex-col justify-around rounded-xl border text-center bg-white">
        <div>
          <h1 className="text-[250%] font-bold">404 Not Found</h1>
          <p>잘못된 주소입니다.</p>
        </div>
        <button
          className="mx-auto p-3 flex items-center gap-x-2 rounded border border-black text-xl"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="w-5 h-5" alt="logo" />
          LinkNamu 홈으로 이동
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
