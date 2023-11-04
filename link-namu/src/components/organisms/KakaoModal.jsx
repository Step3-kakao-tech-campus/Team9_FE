import { useEffect, useState } from "react";

import MultiStepModalBase from "./MultiStepModalBase";
import KakaoFileUpload from "../molecules/KakaoFileUpload";
import KakaoSelectBookmark from "../molecules/KakaoSelectBookmark";

const KakaoModal = () => {
  const [linkList, setLinkList] = useState();
  const getLinkList = () => {
    return linkList;
  };

  const contentList = [];
  contentList.push(KakaoFileUpload({ changeHandler: setLinkList }));
  contentList.push(KakaoSelectBookmark({ data: linkList, getLinkList }));

  return <MultiStepModalBase size="lg">{contentList}</MultiStepModalBase>;
};

export default KakaoModal;
