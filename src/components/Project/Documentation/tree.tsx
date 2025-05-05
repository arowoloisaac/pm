import { useMemo, useState } from "react";
import { IWiki, IWikiTree } from "../utils/utils";
import "rc-tree/assets/index.css";
import Tree from "rc-tree";
import { useNavigate } from "react-router-dom";

const TreeComponent = ({ getWiki }: { getWiki: IWiki[] }) => {
  const navigate = useNavigate();
  const [expandedKeys, setExpandedKeys] = useState(["0"]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  function mapToTree(wiki: IWiki): IWikiTree {
    const tree: IWikiTree = {
      key: wiki.id,
      title: wiki.title,
      children: wiki.wiki?.map((subWiki: IWiki) => mapToTree(subWiki)),
    };
    return tree;
  }

  const onSelect = (selectedKeysValue: any, info: any) => {
    setSelectedKeys(selectedKeysValue);
    console.log("Selected node:", info.node.key);
    navigate(`/project/1c5440c3-f4f4-4820-aed1-003a09f47043/overview/doc/${info.node.key}`);
  };

  const wikiData = useMemo(() => {
    return getWiki.length > 0 ? getWiki.map(mapToTree) : [];
  }, []);

  return (
    <Tree
      treeData={wikiData}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      // onExpand={setExpandedKeys}
      showLine
      selectable
    />
  );
};

export default TreeComponent;
